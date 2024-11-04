import { Injectable } from '@nestjs/common';
import { PageManipulationService } from '@core_modules/puppeteer_module/page-manipulation.service';
import { IBrowserProfileActivityInput } from '@linkedin_runner_module/interfaces/activities/common/browser-profile-activity-input.interface';
import { Activities, Activity } from 'nestjs-temporal';
import { IMultiEvaluateActivityInput } from '@linkedin_runner_module/interfaces/activities/multi-evaluate-activity-input.interface';
import { BrowserService } from '@linkedin_runner_module/logic/features/browser.service';

@Injectable()
@Activities()
export class MultiEvaluateActivity {
  constructor(
    private readonly browserService: BrowserService,
    private readonly pageManipulationService: PageManipulationService,
  ) {}

  @Activity()
  public async actMultiEvaluate<T>({
    browserProfile,
    input: { selector, pageFunction },
  }: IBrowserProfileActivityInput<IMultiEvaluateActivityInput<T>>): Promise<T> {
    const { page } = await this.browserService.getPageAndCursor(browserProfile);
    const result = await this.pageManipulationService.multiEvaluate({
      page,
      pageFunction,
      selector,
    });

    return result;
  }
}
