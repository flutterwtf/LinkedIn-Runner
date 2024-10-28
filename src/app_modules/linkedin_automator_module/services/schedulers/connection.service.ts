import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SOURCE } from '@common/logging/source';
import { ACCOUNT_CONNECTION_STATUS } from '@app_modules/linkedin_automator_module/modules/erp_module/constants/account-connection-type';
import { ErpAccountsService } from '../../modules/erp_module/services/erp-accounts.service';
import { BrowserService } from '../browser.service';

@Injectable()
export class ConnectionService {
  constructor(
    private readonly erpAccountsService: ErpAccountsService,
    private readonly browserService: BrowserService,
    private readonly logger: Logger,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  public async syncAccounts(): Promise<void> {
    try {
      const { tokens } = this.browserService;

      for (const token of tokens) {
        await this.erpAccountsService.sync(token);
      }
    } catch (err) {
      this.logger.error(err);
    }
  }

  @Cron(CronExpression.EVERY_MINUTE)
  public async connectOfflineAccount(): Promise<void> {
    try {
      const offlineAccount = await this.erpAccountsService.findOfflineAccount();

      if (offlineAccount) {
        const { id, browserProfile } = offlineAccount;
        const { token } = await this.browserService.setUpBrowser(offlineAccount, browserProfile);
        await this.erpAccountsService.attachToken(id, token);
        await this.erpAccountsService.updateConnectionStatus(id, ACCOUNT_CONNECTION_STATUS.online);
        await this.erpAccountsService.sync(token);

        this.logger.log(`Connected account: ${id}`, SOURCE.connection);
      }
    } catch (err) {
      this.logger.error(err);
    }
  }
}
