import { Injectable } from '@nestjs/common';
import { IBrowserProfileActivityInput } from '@linkedin_runner_module/interfaces/activities/common/browser-profile-activity-input.interface';
import { Activities, Activity } from 'nestjs-temporal';
import { ISelector } from '@linkedin_runner_module/interfaces/common/selector.interface';
import { ITimeout } from '@linkedin_runner_module/interfaces/common/timeout.interface';
import { PageManipulationService } from '@core_modules/puppeteer_module/page-manipulation.service';
import { PageService } from '@linkedin_runner_module/modules/page_module/services/page.service';

@Injectable()
@Activities()
export class WaitForSelectorActivity {
  private readonly waitingSelectorTimeout = 20000;

  constructor(
    private readonly pageService: PageService,
    private readonly pageManipulationService: PageManipulationService,
  ) {}

  @Activity()
  public async actWaitForSelector({
    browserProfile,
    pageType,
    input: { selector, timeout = this.waitingSelectorTimeout },
  }: IBrowserProfileActivityInput<ISelector & ITimeout>): Promise<void> {
    const { page } = await this.pageService.getPageAndCursor(browserProfile, pageType);
    await this.pageManipulationService.waitForSelector({
      page,
      selector,
      timeout,
    });
  }
}
