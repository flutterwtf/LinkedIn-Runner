import { Injectable } from '@nestjs/common';
import { PageManipulationService } from '@core_modules/puppeteer_module/page-manipulation.service';
import { BrowserService } from 'src/linkedin_runner_module/services/browser.service';
import { IAccountTokenActivityInput } from 'src/linkedin_runner_module/interfaces/activities/account-token-activity-input.interface';
import { Activities, Activity } from 'nestjs-temporal';
import { IEvaluateActivityInput } from 'src/linkedin_runner_module/temporal/activities/interfaces/evaluate-activity-input.interface';

@Injectable()
@Activities()
export class EvaluateActivity {
  constructor(
    private readonly pageManipulationService: PageManipulationService,
    private readonly browserService: BrowserService,
  ) {}

  @Activity()
  public async actEvaluate<T>({
    accountToken,
    input: { selector, pageFunction },
  }: IAccountTokenActivityInput<IEvaluateActivityInput<T>>): Promise<T> {
    const [browserPage] = this.browserService.findPageAndCursorByToken(accountToken)!;
    const result = this.pageManipulationService.evaluate({
      browserPage,
      pageFunction,
      selector,
    });

    return result;
  }
}
