import { Activities, Activity } from 'nestjs-temporal';
import { Injectable } from '@nestjs/common';
import { IBrowserProfileActivityInput } from '@linkedin_runner_module/interfaces/activities/common/browser-profile-activity-input.interface';
import { PageManipulationService } from '@core_modules/puppeteer_module/services/page-manipulation.service';
import { PageService } from '@linkedin_runner_module/modules/page_module/services/page.service';
import { PAGE_TYPE } from '@linkedin_runner_module/constants/page-type';

@Injectable()
@Activities()
export class CloseAdditionalPageActivity {
  constructor(
    private readonly pageManipulationService: PageManipulationService,
    private readonly pageService: PageService,
  ) {}

  @Activity()
  public async actCloseAdditionalPage({
    browserProfile,
  }: IBrowserProfileActivityInput<object>): Promise<void> {
    const additionalPageAndCursor = await this.pageService.getPageAndCursor(
      browserProfile,
      PAGE_TYPE.additional,
    );

    if (additionalPageAndCursor) {
      await this.pageManipulationService.closePage(additionalPageAndCursor.page);
      this.pageService.removeAdditionalPage(browserProfile);
    }
  }
}
