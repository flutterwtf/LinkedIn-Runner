import { Injectable } from '@nestjs/common';
import { IBrowserProfileActivityInput } from '@linkedin_runner_module/interfaces/activities/common/browser-profile-activity-input.interface';
import { Activities, Activity } from 'nestjs-temporal';
import { ISelector } from '@linkedin_runner_module/interfaces/common/selector.interface';
import { ITimeout } from '@linkedin_runner_module/interfaces/common/timeout.interface';
import { PageManipulationService } from '@core_modules/puppeteer_module/page-manipulation.service';
import { BrowserService } from '@linkedin_runner_module/logic/features/browser.service';

@Injectable()
@Activities()
export class WaitForSelectorActivity {
  private readonly waitingSelectorTimeout = 20000;

  constructor(
    private readonly browserService: BrowserService,
    private readonly pageManipulationService: PageManipulationService,
  ) {}

  @Activity()
  public async actWaitForSelector({
    browserProfile,
    input: { selector, timeout = this.waitingSelectorTimeout },
  }: IBrowserProfileActivityInput<ISelector & ITimeout>): Promise<void> {
    const { page } = await this.browserService.getPageAndCursor(browserProfile);
    await this.pageManipulationService.waitForSelector({
      page,
      selector,
      timeout,
    });
  }
}
