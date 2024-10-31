import { Injectable } from '@nestjs/common';
import { PageManipulationService } from '@core_modules/puppeteer_module/page-manipulation.service';
import { IAccountTokenActivityInput } from 'src/linkedin_runner_module/interfaces/activities/account-token-activity-input.interface';
import { Activities, Activity } from 'nestjs-temporal';
import { BrowserService } from '../../browser.service';

@Injectable()
@Activities()
export class ScrollToTopActivity {
  constructor(
    private readonly pageManipulationService: PageManipulationService,
    private readonly browserService: BrowserService,
  ) {}

  @Activity()
  public async actScrollToTop({ accountToken }: IAccountTokenActivityInput<object>): Promise<void> {
    const [browserPage] = this.browserService.findPageAndCursorByToken(accountToken)!;
    await this.pageManipulationService.scrollToTop(browserPage);
  }
}
