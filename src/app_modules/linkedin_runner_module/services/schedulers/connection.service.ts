import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SOURCE } from '@common/logging/source';
import { ACCOUNT_CONNECTION_STATUS } from '@app_modules/linkedin_runner_module/modules/linkedin_logic_module/constants/account-connection-type';
import { LinkedInLogicAccountsService } from '../../modules/linkedin_logic_module/services/linkedin-logic-accounts.service';
import { BrowserService } from '../browser.service';

@Injectable()
export class ConnectionService {
  constructor(
    private readonly linkedInLogicAccountsService: LinkedInLogicAccountsService,
    private readonly browserService: BrowserService,
    private readonly logger: Logger,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  public async syncAccounts(): Promise<void> {
    try {
      const { tokens } = this.browserService;

      for (const token of tokens) {
        await this.linkedInLogicAccountsService.sync(token);
      }
    } catch (err) {
      this.logger.error(err);
    }
  }

  @Cron(CronExpression.EVERY_MINUTE)
  public async connectOfflineAccount(): Promise<void> {
    try {
      const offlineAccount = await this.linkedInLogicAccountsService.findOfflineAccount();

      if (offlineAccount) {
        const { id, browserProfile } = offlineAccount;
        const { token } = await this.browserService.setUpBrowser(offlineAccount, browserProfile);
        await this.linkedInLogicAccountsService.attachToken(id, token);
        await this.linkedInLogicAccountsService.updateConnectionStatus(
          id,
          ACCOUNT_CONNECTION_STATUS.online,
        );
        await this.linkedInLogicAccountsService.sync(token);

        this.logger.log(`Connected account: ${id}`, SOURCE.connection);
      }
    } catch (err) {
      this.logger.error(err);
    }
  }
}
