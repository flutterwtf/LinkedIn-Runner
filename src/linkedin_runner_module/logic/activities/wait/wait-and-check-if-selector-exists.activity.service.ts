import { Injectable } from '@nestjs/common';
import { PageManipulationService } from '@core_modules/puppeteer_module/services/page-manipulation.service';
import { IBrowserProfileActivityInput } from '@linkedin_runner_module/interfaces/activities/common/browser-profile-activity-input.interface';
import { Activities, Activity } from 'nestjs-temporal';
import { ISelector } from '@linkedin_runner_module/interfaces/common/selector.interface';
import { ITimeout } from '@linkedin_runner_module/interfaces/common/timeout.interface';
import { PageService } from '../../../modules/page_module/services/page.service';

@Injectable()
@Activities()
export class WaitAndCheckIfSelectorExistsActivity {
  private readonly checkingExistenceTimeout = 5000;

  constructor(
    private readonly pageManipulationService: PageManipulationService,
    private readonly pageService: PageService,
  ) {}

  @Activity()
  public async actWaitAndCheckIfSelectorExists({
    browserProfile,
    pageType,
    input: { selector, timeout = this.checkingExistenceTimeout },
  }: IBrowserProfileActivityInput<ISelector & ITimeout>): Promise<boolean> {
    const { page } = await this.pageService.getPageAndCursor(browserProfile, pageType);

    return this.pageManipulationService.waitAndCheckIfSelectorExists({
      page,
      selector,
      timeout,
    });
  }
}
