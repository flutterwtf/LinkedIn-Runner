import { Injectable } from '@nestjs/common';
import { PageManipulationService } from '@core_modules/puppeteer_module/page-manipulation.service';
import { IBrowserProfileActivityInput } from '@linkedin_runner_module/interfaces/activities/common/browser-profile-activity-input.interface';
import { Activities, Activity } from 'nestjs-temporal';
import { IEvaluateActivityInput } from '@linkedin_runner_module/interfaces/activities/evaluate-activity-input.interface';
import { BrowserService } from '@linkedin_runner_module/logic/features/browser.service';

@Injectable()
@Activities()
export class EvaluateActivity {
  constructor(
    private readonly browserService: BrowserService,
    private readonly pageManipulationService: PageManipulationService,
  ) {}

  @Activity()
  public async actEvaluate<T>({
    browserProfile,
    input: { selector, pageFunction },
  }: IBrowserProfileActivityInput<IEvaluateActivityInput<T>>): Promise<T> {
    const { page } = await this.browserService.getPageAndCursor(browserProfile);
    const result = this.pageManipulationService.evaluate({
      page,
      pageFunction,
      selector,
    });

    return result;
  }
}
