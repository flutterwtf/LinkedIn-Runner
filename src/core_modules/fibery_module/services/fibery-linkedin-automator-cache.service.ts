import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { GLOBAL_ERROR_MESSAGE } from '@common/errors/global-error-message';
import { ERROR_MESSAGE } from '@core_modules/proxy_module/errors/error-message';
import { TCacheType } from '@app_modules/linkedin_automator_module/constants/cache-type';
import { CACHE_PRIVACY } from '@app_modules/linkedin_automator_module/constants/cache-privacy';
import { IFiberyId } from '../interfaces/common/fibery-id.interface';
import { FiberyUtils } from '../utils/fibery-utils';
import { FiberyLinkedInAutomatorAccountService } from './fibery-linkedin-automator-account.service';
import { FIBERY_DOCUMENT_FORMAT } from '../constants/fibery-document-format';
import { IFiberyCacheValueSecret } from '../interfaces/fibery-cache-value-secret.interface';
import { FiberyDataSource } from '../fibery.datasource';

@Injectable()
export class FiberyLinkedinAutomatorCacheService {
  constructor(
    private readonly fiberyLinkedInAutomatorAccountService: FiberyLinkedInAutomatorAccountService,
    private readonly fiberyDataSource: FiberyDataSource,
    private readonly fiberyUtils: FiberyUtils,
  ) {}

  public async getCacheByKey({
    key,
    token,
    type,
  }: {
    key: string;
    token?: string;
    type: TCacheType;
  }): Promise<string | undefined> {
    if (token) {
      const privateCache = await this.getPrivateCache(key, token, type);
      if (privateCache) {
        return privateCache;
      }
    }

    return this.getPublicCacheByKey(key, type);
  }

  public async getCacheByValue(value: string, type: TCacheType): Promise<string | undefined> {
    return this.getPublicCacheByValue(value, type);
  }

  public async setPrivateCache({
    token,
    type,
    key,
    value,
  }: {
    token: string;
    type: TCacheType;
    key: string;
    value: string;
  }): Promise<void> {
    const accountId = await this.fiberyLinkedInAutomatorAccountService.fetchAccountIdByToken(token);
    const cacheTypeId = await this.fetchCacheTypeIdByName(type);
    const privacyId = await this.fetchPrivatePrivacyId();

    const cacheId = await this.createPrivateCache({
      accountId,
      key,
      cacheTypeId,
      privacyId,
    });
    if (!cacheId) {
      throw new Error(GLOBAL_ERROR_MESSAGE.cacheCreationError);
    }

    await this.getSecretAndAttachCacheValue(cacheId, value);
  }

  public async setPublicCache({
    type,
    key,
    value,
  }: {
    type: TCacheType;
    key: string;
    value: string;
  }): Promise<void> {
    const cacheTypeId = await this.fetchCacheTypeIdByName(type);
    const privacyId = await this.fetchPublicPrivacyId();

    const cacheId = await this.createPublicCache({
      key,
      cacheTypeId,
      privacyId,
    });
    if (!cacheId) {
      throw new Error(GLOBAL_ERROR_MESSAGE.cacheCreationError);
    }

    await this.getSecretAndAttachCacheValue(cacheId, value);
  }

  private async getPublicCacheByKey(key: string, type: TCacheType): Promise<string | undefined> {
    return this.getPublicCache({
      key,
      type,
      isKeySearch: true,
    });
  }

  private async getPublicCacheByValue(
    value: string,
    type: TCacheType,
  ): Promise<string | undefined> {
    return this.getPublicCache({
      key: value,
      type,
      isKeySearch: false,
    });
  }

  private async getPublicCache({
    key,
    type,
    isKeySearch,
  }: {
    key: string;
    type: TCacheType;
    isKeySearch: boolean;
  }): Promise<string | undefined> {
    const data = await this.fiberyDataSource.queryEntity<Array<IFiberyCacheValueSecret>>(
      {
        'q/from': 'LinkedIn Automation/Cache',
        'q/select': [
          'LinkedIn Automation/Name',
          {
            'LinkedIn Automation/Value': [
              'fibery/id',
              'Collaboration~Documents/secret',
              'Collaboration~Documents/Snippet',
            ],
          },
        ],
        'q/where': [
          'q/and',
          ['=', ['LinkedIn Automation/Cache Type', 'LinkedIn Automation/Name'], '$type'],
          [
            'q/contains',
            isKeySearch
              ? ['LinkedIn Automation/Name']
              : ['LinkedIn Automation/Value', 'Collaboration~Documents/Snippet'],
            '$searchValue',
          ],
          ['=', ['LinkedIn Automation/Privacy', 'enum/name'], '$privacy'],
        ],
        'q/limit': 1,
      },
      {
        $type: type,
        $searchValue: key,
        $privacy: CACHE_PRIVACY.public,
      },
    );

    if (!data.length) {
      return undefined;
    }

    if (!isKeySearch) {
      return data[0]!['LinkedIn Automation/Name'];
    }

    const descriptionSecret =
      data[0]!['LinkedIn Automation/Value']['Collaboration~Documents/secret'];

    return this.extractDataFromDocument(descriptionSecret);
  }

  private async getPrivateCache(
    key: string,
    token: string,
    type: TCacheType,
  ): Promise<string | undefined> {
    const data = await this.fiberyDataSource.queryEntity<Array<IFiberyCacheValueSecret>>(
      {
        'q/from': 'LinkedIn Automation/Cache',
        'q/select': [
          {
            'LinkedIn Automation/Value': [
              'fibery/id',
              'Collaboration~Documents/secret',
              'Collaboration~Documents/Snippet',
            ],
          },
        ],
        'q/where': [
          'q/and',
          ['=', ['LinkedIn Automation/Account', 'LinkedIn Automation/Token'], '$token'],
          ['=', ['LinkedIn Automation/Cache Type', 'LinkedIn Automation/Name'], '$type'],
          ['=', ['LinkedIn Automation/Name'], '$key'],
          ['=', ['LinkedIn Automation/Privacy', 'enum/name'], '$privacy'],
        ],
        'q/limit': 1,
      },
      {
        $type: type,
        $token: token,
        $key: key,
        $privacy: CACHE_PRIVACY.private,
      },
    );

    if (!data.length) {
      return undefined;
    }

    const descriptionSecret =
      data[0]?.['LinkedIn Automation/Value']['Collaboration~Documents/secret'];

    return this.extractDataFromDocument(descriptionSecret);
  }

  private async createPublicCache({
    key,
    cacheTypeId,
    privacyId,
  }: {
    key: string;
    cacheTypeId: string;
    privacyId: string;
  }): Promise<string | undefined> {
    const createdCache = await this.fiberyDataSource.createEntityBatch<
      Array<IFiberyCacheValueSecret>
    >([
      {
        type: 'LinkedIn Automation/Cache',
        entity: {
          'LinkedIn Automation/Name': key,
          'LinkedIn Automation/Cache Type': { 'fibery/id': cacheTypeId },
          'LinkedIn Automation/Privacy': { 'fibery/id': privacyId },
        },
      },
    ]);

    return createdCache[0]?.['fibery/id'];
  }

  private async createPrivateCache({
    accountId,
    key,
    cacheTypeId,
    privacyId,
  }: {
    accountId: string;
    key: string;
    cacheTypeId: string;
    privacyId: string;
  }): Promise<string | undefined> {
    const createdCache = await this.fiberyDataSource.createEntityBatch<
      Array<IFiberyCacheValueSecret>
    >([
      {
        type: 'LinkedIn Automation/Cache',
        entity: {
          'LinkedIn Automation/Name': key,
          'LinkedIn Automation/Account': { 'fibery/id': accountId },
          'LinkedIn Automation/Cache Type': { 'fibery/id': cacheTypeId },
          'LinkedIn Automation/Privacy': { 'fibery/id': privacyId },
        },
      },
    ]);

    return createdCache[0]?.['fibery/id'];
  }

  private async fetchCacheTypeIdByName(name: TCacheType): Promise<string> {
    const data = await this.fiberyDataSource.queryEntity<Array<IFiberyId>>(
      {
        'q/from': 'LinkedIn Automation/Cache Type',
        'q/select': ['fibery/id'],
        'q/where': ['=', ['LinkedIn Automation/Name'], '$name'],
        'q/limit': 1,
      },
      {
        $name: name,
      },
    );

    return data[0]!['fibery/id'];
  }

  private async getSecretAndAttachCacheValue(cacheId: string, value: string): Promise<void> {
    const data = await this.fiberyDataSource.queryEntity<Array<IFiberyCacheValueSecret>>(
      {
        'q/from': 'LinkedIn Automation/Cache',
        'q/select': [
          'fibery/id',
          {
            'LinkedIn Automation/Value': [
              'fibery/id',
              'Collaboration~Documents/secret',
              'Collaboration~Documents/Snippet',
            ],
          },
        ],
        'q/where': ['=', ['fibery/id'], '$id'],
        'q/limit': 1,
      },
      {
        $id: cacheId,
      },
    );

    const cacheSecret = data[0]!['LinkedIn Automation/Value']['Collaboration~Documents/secret'];
    await this.attachJsonDoc(cacheSecret, value);
  }

  private async fetchPublicPrivacyId(): Promise<string> {
    return this.fetchPrivacyIdByName(CACHE_PRIVACY.public);
  }

  private async fetchPrivatePrivacyId(): Promise<string> {
    return this.fetchPrivacyIdByName(CACHE_PRIVACY.private);
  }

  private async fetchPrivacyIdByName(name: string): Promise<string> {
    return this.fiberyUtils.fetchSingleSelectOptionId({
      space: 'LinkedIn Automation',
      db: 'Cache',
      field: 'Privacy',
      name,
    });
  }

  private async attachJsonDoc(descriptionSecret: string, config: string): Promise<void> {
    await this.fiberyDataSource.documentUpdate(
      descriptionSecret,
      `~~~json\n${config}\n~~~`,
      FIBERY_DOCUMENT_FORMAT.md,
    );
  }

  private async extractDataFromDocument(descriptionSecret?: string): Promise<string> {
    if (!descriptionSecret) {
      throw new InternalServerErrorException(ERROR_MESSAGE.descriptionSecretNotFound);
    }

    const data = await this.fiberyDataSource.getDocument(
      descriptionSecret,
      FIBERY_DOCUMENT_FORMAT.json,
    );

    try {
      const jsonData = JSON.parse(data);

      return jsonData.content.doc.content[0].content[0].text;
    } catch {
      throw new InternalServerErrorException(ERROR_MESSAGE.wrongJsonDocFormat);
    }
  }
}
