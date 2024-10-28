import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
import { SuccessResponse } from '../models/success-response.model';
import { TAccountConnectionStatus } from '../constants/account-connection-type';
import { IOfflineAccount } from '../interfaces/offline-account.interface';

@Injectable()
export class ErpAccountsService {
  private readonly axios: AxiosInstance;

  constructor(private readonly configService: ConfigService) {
    const apiToken = this.configService.getOrThrow<string>('erpConfig.apiToken');
    const hostUrl = this.configService.getOrThrow<string>('erpConfig.hostUrl');

    this.axios = axios.create({
      baseURL: `${hostUrl}/linkedin/automator/accounts`,
      headers: {
        'Content-type': 'application/json',
        'x-api-key': apiToken,
      },
    });
  }

  public async findOfflineAccount(): Promise<IOfflineAccount | null> {
    const accountType = this.configService.getOrThrow<string>('erpConfig.accountType');
    const { data }: { data: IOfflineAccount | null } = await this.axios.get(
      `/offline?accountType=${accountType}`,
    );

    return data;
  }

  public async updateConnectionStatus(
    accountId: string,
    connectionStatus: TAccountConnectionStatus,
  ): Promise<SuccessResponse> {
    return this.axios.patch(`/${accountId}`, { connectionStatus });
  }

  public async attachToken(accountId: string, token: string): Promise<SuccessResponse> {
    return this.axios.patch(`/${accountId}`, { token });
  }

  public async sync(token: string): Promise<SuccessResponse> {
    return this.axios.patch('/synchronization', { token });
  }
}
