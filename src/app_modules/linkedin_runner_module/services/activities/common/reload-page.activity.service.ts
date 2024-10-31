import { Injectable } from '@nestjs/common';
import { PageManipulationService } from '@core_modules/puppeteer_module/page-manipulation.service';
import { IAccountTokenActivityInput } from '@app_modules/linkedin_runner_module/interfaces/activities/account-token-activity-input.interface';
import { Activities, Activity } from 'nestjs-temporal';
import { BrowserService } from '../../browser.service';

@Injectable()
@Activities()
export class ReloadPageActivity {
  constructor(
    private readonly pageManipulationService: PageManipulationService,
    private readonly browserService: BrowserService,
  ) {}

  @Activity()
  public async actReloadPage({ accountToken }: IAccountTokenActivityInput<object>): Promise<void> {
    const [browserPage] = this.browserService.findPageAndCursorByToken(accountToken)!;
    await this.pageManipulationService.reload(browserPage);
  }
}
