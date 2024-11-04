import { Activities, Activity } from 'nestjs-temporal';
import { Injectable } from '@nestjs/common';
import { BrowserService } from '@linkedin_runner_module/logic/features/browser.service';
import { AdditionalPageService } from '@linkedin_runner_module/logic/features/additional-page.service';
import { IBrowserProfileActivityInput } from '@linkedin_runner_module/interfaces/activities/common/browser-profile-activity-input.interface';
import { PageManipulationService } from '@core_modules/puppeteer_module/page-manipulation.service';

@Injectable()
@Activities()
export class CloseAdditionalPageActivity {
  constructor(
    private readonly pageManipulationService: PageManipulationService,
    private readonly additionalPageService: AdditionalPageService,
    private readonly browserService: BrowserService,
  ) {}

  @Activity()
  public async actCloseAdditionalPage({
    browserProfile,
  }: IBrowserProfileActivityInput<object>): Promise<void> {
    const { page } = await this.browserService.getPageAndCursor(browserProfile)!;
    const additionalPage = this.additionalPageService.get(page);

    if (additionalPage) {
      await this.pageManipulationService.closePage(additionalPage);
      this.additionalPageService.remove(additionalPage);
    }
  }
}
