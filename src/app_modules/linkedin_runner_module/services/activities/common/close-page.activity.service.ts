import { Activities, Activity } from 'nestjs-temporal';
import { IAccountTokenActivityInput } from '@app_modules/linkedin_runner_module/interfaces/activities/account-token-activity-input.interface';
import { Injectable } from '@nestjs/common';
import { PageManipulationService } from '@core_modules/puppeteer_module/page-manipulation.service';
import { BrowserService } from '../../browser.service';

@Injectable()
@Activities()
export class ClosePageActivity {
  constructor(
    private readonly pageManipulationService: PageManipulationService,
    private readonly browserService: BrowserService,
  ) {}

  @Activity()
  public async actClosePage({ accountToken }: IAccountTokenActivityInput<object>): Promise<void> {
    const [browserPage] = this.browserService.findPageAndCursorByToken(accountToken)!;
    await this.pageManipulationService.closePage(browserPage);
    this.browserService.removeFromConnectionPool(accountToken);
  }
}
