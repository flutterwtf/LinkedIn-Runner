import { Injectable } from '@nestjs/common';
import { PageManipulationService } from '@core_modules/puppeteer_module/page-manipulation.service';
import { IBrowserProfileActivityInput } from '@linkedin_runner_module/interfaces/activities/common/browser-profile-activity-input.interface';
import { Activities, Activity } from 'nestjs-temporal';
import { PageService } from '@linkedin_runner_module/modules/page_module/services/page.service';

@Injectable()
@Activities()
export class ScrollActivity {
  constructor(
    private readonly pageService: PageService,
    private readonly pageManipulationService: PageManipulationService,
  ) {}

  @Activity()
  public async actScroll({
    browserProfile,
    pageType,
  }: IBrowserProfileActivityInput<object>): Promise<number> {
    const { page } = await this.pageService.getPageAndCursor(browserProfile, pageType);
    return this.pageManipulationService.scrollBy(page);
  }
}
