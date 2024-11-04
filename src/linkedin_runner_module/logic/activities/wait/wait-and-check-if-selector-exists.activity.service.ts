import { Injectable } from '@nestjs/common';
import { PageManipulationService } from '@core_modules/puppeteer_module/page-manipulation.service';
import { IBrowserProfileActivityInput } from '@linkedin_runner_module/interfaces/activities/common/browser-profile-activity-input.interface';
import { Activities, Activity } from 'nestjs-temporal';
import { ISelector } from '@linkedin_runner_module/interfaces/common/selector.interface';
import { ITimeout } from '@linkedin_runner_module/interfaces/common/timeout.interface';
import { BrowserService } from '@linkedin_runner_module/logic/features/browser.service';

@Injectable()
@Activities()
export class WaitAndCheckIfSelectorExistsActivity {
  private readonly checkingExistenceTimeout = 5000;

  constructor(
    private readonly browserService: BrowserService,
    private readonly pageManipulationService: PageManipulationService,
  ) {}

  @Activity()
  public async actWaitAndCheckIfSelectorExists({
    browserProfile,
    input: { selector, timeout = this.checkingExistenceTimeout },
  }: IBrowserProfileActivityInput<ISelector & ITimeout>): Promise<boolean> {
    const { page } = await this.browserService.getPageAndCursor(browserProfile);

    return this.pageManipulationService.waitAndCheckIfSelectorExists({
      page,
      selector,
      timeout,
    });
  }
}
