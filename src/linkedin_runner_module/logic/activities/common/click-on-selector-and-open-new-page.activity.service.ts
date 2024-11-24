import { Activities, Activity } from 'nestjs-temporal';
import { IBrowserProfileActivityInput } from '@linkedin_runner_module/interfaces/activities/common/browser-profile-activity-input.interface';
import { ISelector } from '@linkedin_runner_module/interfaces/common/selector.interface';
import { Injectable } from '@nestjs/common';
import { PageManipulationService } from '@core_modules/puppeteer_module/page-manipulation.service';
import { PageService } from '@linkedin_runner_module/modules/page_module/services/page.service';

@Injectable()
@Activities()
export class ClickOnSelectorAndOpenAdditionalPageActivity {
  constructor(
    private readonly pageService: PageService,
    private readonly pageManipulationService: PageManipulationService,
  ) {}

  @Activity()
  public async actClickOnSelectorAndOpenAdditionalPage({
    browserProfile,
    input: { selector },
  }: IBrowserProfileActivityInput<ISelector>): Promise<void> {
    const { page, cursor } = await this.pageService.getPageAndCursor(browserProfile);
    const additionalPage = await this.pageManipulationService.clickOnSelectorAndOpenNewPage({
      page,
      cursor,
      selector,
    });

    return this.pageService.addAdditionalPage(browserProfile, additionalPage);
  }
}
