import { Injectable } from '@nestjs/common';
import { PageManipulationService } from '@core_modules/puppeteer_module/page-manipulation.service';
import { IAccountTokenActivityInput } from 'src/linkedin_runner_module/interfaces/activities/account-token-activity-input.interface';
import { Activities, Activity } from 'nestjs-temporal';
import { BrowserService } from '../../browser.service';

@Injectable()
@Activities()
export class ScrollByActivity {
  constructor(
    private readonly pageManipulationService: PageManipulationService,
    private readonly browserService: BrowserService,
  ) {}

  @Activity()
  public async actScrollBy({ accountToken }: IAccountTokenActivityInput<object>): Promise<number> {
    const [browserPage] = this.browserService.findPageAndCursorByToken(accountToken)!;

    return this.pageManipulationService.scrollBy(browserPage);
  }
}
