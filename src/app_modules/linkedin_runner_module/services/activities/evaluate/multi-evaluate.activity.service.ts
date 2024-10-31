import { Injectable } from '@nestjs/common';
import { PageManipulationService } from '@core_modules/puppeteer_module/page-manipulation.service';
import { BrowserService } from '@app_modules/linkedin_runner_module/services/browser.service';
import { IAccountTokenActivityInput } from '@app_modules/linkedin_runner_module/interfaces/activities/account-token-activity-input.interface';
import { Activities, Activity } from 'nestjs-temporal';
import { IMultiEvaluateActivityInput } from '@app_modules/linkedin_runner_module/temporal/activities/interfaces/multi-evaluate-activity-input.interface';

@Injectable()
@Activities()
export class MultiEvaluateActivity {
  constructor(
    private readonly pageManipulationService: PageManipulationService,
    private readonly browserService: BrowserService,
  ) {}

  @Activity()
  public async actMultiEvaluate<T>({
    accountToken,
    input: { selector, pageFunction },
  }: IAccountTokenActivityInput<IMultiEvaluateActivityInput<T>>): Promise<T> {
    const [browserPage] = this.browserService.findPageAndCursorByToken(accountToken)!;
    const result = await this.pageManipulationService.multiEvaluate({
      browserPage,
      pageFunction,
      selector,
    });

    return result;
  }
}
