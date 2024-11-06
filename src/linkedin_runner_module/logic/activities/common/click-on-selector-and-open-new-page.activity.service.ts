import { Activities, Activity } from 'nestjs-temporal';
import { IBrowserProfileActivityInput } from '@linkedin_runner_module/interfaces/activities/common/browser-profile-activity-input.interface';
import { ISelector } from '@linkedin_runner_module/interfaces/common/selector.interface';
import { Injectable } from '@nestjs/common';
import { PageManipulationService } from '@core_modules/puppeteer_module/page-manipulation.service';
import { AdditionalPageService } from '@linkedin_runner_module/logic/features/additional-page.service';
import { BrowserService } from '@linkedin_runner_module/logic/features/browser.service';

@Injectable()
@Activities()
export class ClickOnSelectorAndOpenNewPageActivity {
  constructor(
    private readonly browserService: BrowserService,
    private readonly pageManipulationService: PageManipulationService,
    private readonly additionalPageService: AdditionalPageService,
  ) {}

  @Activity()
  public async actClickOnSelectorAndOpenNewPage({
    browserProfile,
    input: { selector },
  }: IBrowserProfileActivityInput<ISelector>): Promise<void> {
    const { page, cursor } = await this.browserService.getPageAndCursor(browserProfile);
    const additionalPage = await this.pageManipulationService.clickOnSelectorAndOpenNewPage({
      page,
      cursor,
      selector,
    });

    return this.additionalPageService.add(page, additionalPage);
  }
}
