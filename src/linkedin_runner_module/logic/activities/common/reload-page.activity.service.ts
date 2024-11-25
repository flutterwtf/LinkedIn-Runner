import { Injectable } from '@nestjs/common';
import { PageManipulationService } from '@core_modules/puppeteer_module/page-manipulation.service';
import { IBrowserProfileActivityInput } from '@linkedin_runner_module/interfaces/activities/common/browser-profile-activity-input.interface';
import { Activities, Activity } from 'nestjs-temporal';
import { PageService } from '@linkedin_runner_module/modules/page_module/services/page.service';

@Injectable()
@Activities()
export class ReloadPageActivity {
  constructor(
    private readonly pageService: PageService,
    private readonly pageManipulationService: PageManipulationService,
  ) {}

  @Activity()
  public async actReloadPage({
    browserProfile,
    pageType,
  }: IBrowserProfileActivityInput<object>): Promise<void> {
    const { page } = await this.pageService.getPageAndCursor(browserProfile, pageType);
    await this.pageManipulationService.reload(page);
  }
}
