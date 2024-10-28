import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Bottleneck from 'bottleneck';
import Fibery from 'fibery-unofficial';
import { TFiberyDocumentFormat } from './constants/fibery-document-format';

@Injectable()
export class FiberyDataSource {
  private readonly fiberyHost: string;
  private readonly fiberyToken: string;
  private readonly fibery: typeof Fibery;
  private readonly bottleneck: Bottleneck;

  constructor(private readonly configService: ConfigService) {
    this.fiberyHost = this.configService.getOrThrow<string>('fibery.host');
    this.fiberyToken = this.configService.getOrThrow<string>('fibery.token');
    if (!this.fibery) {
      this.fibery = new Fibery({
        host: this.fiberyHost,
        token: this.fiberyToken,
      });
    }

    this.bottleneck = new Bottleneck({
      maxConcurrent: 1,
      minTime: 333,
    });

    this.applyRateLimiting();
  }

  private applyRateLimiting(): void {
    const prototype = Object.getPrototypeOf(this);
    Object.getOwnPropertyNames(prototype)
      .filter((prop) => typeof prototype[prop] === 'function' && prop !== 'constructor')
      .forEach((methodName) => {
        const originalMethod = prototype[methodName];
        prototype[methodName] = this.bottleneck.wrap(originalMethod.bind(this));
      });
  }

  public queryField<T>(query: object, args: object = {}): Promise<T> {
    return this.fibery.field.query(query, args) satisfies Promise<T>;
  }

  public queryEntity<T>(query: object, args: object = {}): Promise<T> {
    return this.fibery.entity.query(query, args) satisfies Promise<T>;
  }

  public async deleteEntityBatch(
    ids: Array<{
      type: string;
      entity: Record<string, string>;
    }>,
  ): Promise<void> {
    await this.fibery.entity.deleteBatch(ids);
  }

  public async createEntityBatch<T>(
    entities: Array<{
      type: string;
      entity: Record<string, null | string | number | boolean | Date | Record<string, string>>;
    }>,
  ): Promise<T> {
    return (await this.fibery.entity.createBatch(entities)) as T;
  }

  public updateEntityBatch(
    entities: Array<{
      type: string;
      entity: Record<string, null | string | number | boolean | Date | Record<string, string>>;
    }>,
  ): Promise<boolean> {
    return this.fibery.entity.updateBatch(entities);
  }

  public addToEntityCollectionFieldBatch(
    entities: Array<{
      type: string;
      field: string;
      entity: Record<string, string>;
      items: Array<Record<string, string>>;
    }>,
  ): Promise<void> {
    return this.fibery.entity.addToEntityCollectionFieldBatch(entities);
  }

  public removeFromEntityCollectionFieldBatch(
    entities: Array<{
      type: string;
      field: string;
      entity: Record<string, string>;
      items: Array<Record<string, string>>;
    }>,
  ): Promise<void> {
    return this.fibery.entity.removeFromEntityCollectionFieldBatch(entities);
  }

  public async getDocument(uuid: string, format: TFiberyDocumentFormat): Promise<string> {
    return this.fibery.document.get(uuid, format);
  }

  public async documentUpdate(
    documentId: string,
    newContent: string,
    extension: TFiberyDocumentFormat,
  ): Promise<void> {
    await this.fibery.document.update(documentId, newContent, extension);
  }
}
