import { Injectable } from '@nestjs/common';
import { PageManipulationService } from '@core_modules/puppeteer_module/page-manipulation.service';
import { IAccountTokenActivityInput } from 'src/linkedin_runner_module/interfaces/activities/account-token-activity-input.interface';
import { Activities, Activity } from 'nestjs-temporal';
import { BrowserService } from '../../browser.service';

@Injectable()
@Activities()
export class WaitAndCheckIfSelectorExistsActivity {
  private readonly checkingExistenceTimeout = 5000;

  constructor(
    private readonly pageManipulationService: PageManipulationService,
    private readonly browserService: BrowserService,
  ) {}

  @Activity()
  public async actWaitAndCheckIfSelectorExists({
    accountToken,
    input: { selector, timeout = this.checkingExistenceTimeout },
  }: IAccountTokenActivityInput<{ selector: string; timeout: number }>): Promise<boolean> {
    const [browserPage] = this.browserService.findPageAndCursorByToken(accountToken)!;

    return this.pageManipulationService.waitAndCheckIfSelectorExists({
      browserPage,
      selector,
      timeout,
    });
  }
}
