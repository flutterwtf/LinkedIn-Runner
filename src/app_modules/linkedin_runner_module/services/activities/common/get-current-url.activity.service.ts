import { Injectable } from '@nestjs/common';
import { PageManipulationService } from '@core_modules/puppeteer_module/page-manipulation.service';
import { BrowserService } from '@app_modules/linkedin_runner_module/services/browser.service';
import { IAccountTokenActivityInput } from '@app_modules/linkedin_runner_module/interfaces/activities/account-token-activity-input.interface';
import { Activities, Activity } from 'nestjs-temporal';

@Injectable()
@Activities()
export class GetCurrentUrlActivity {
  constructor(
    private readonly pageManipulationService: PageManipulationService,
    private readonly browserService: BrowserService,
  ) {}

  @Activity()
  public async actGetCurrentUrl({
    accountToken,
  }: IAccountTokenActivityInput<object>): Promise<string> {
    const [browserPage] = this.browserService.findPageAndCursorByToken(accountToken)!;

    return this.pageManipulationService.getCurrentUrl(browserPage);
  }
}
