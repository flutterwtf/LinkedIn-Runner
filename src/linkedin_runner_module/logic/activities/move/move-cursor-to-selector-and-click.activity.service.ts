import { Injectable } from '@nestjs/common';
import { PageManipulationService } from '@core_modules/puppeteer_module/page-manipulation.service';
import { IBrowserProfileActivityInput } from '@linkedin_runner_module/interfaces/activities/common/browser-profile-activity-input.interface';
import { Activities, Activity } from 'nestjs-temporal';
import { ISelector } from '@linkedin_runner_module/interfaces/common/selector.interface';
import { PageService } from '@linkedin_runner_module/modules/page_module/services/page.service';

@Injectable()
@Activities()
export class MoveCursorToSelectorAndClickActivity {
  constructor(
    private readonly pageService: PageService,
    private readonly pageManipulationService: PageManipulationService,
  ) {}

  @Activity()
  public async actMoveCursorToSelectorAndClick({
    browserProfile,
    pageType,
    input: { selector },
  }: IBrowserProfileActivityInput<ISelector>): Promise<void> {
    const { page } = await this.pageService.getPageAndCursor(browserProfile, pageType);
    await this.pageManipulationService.moveCursorToSelectorAndClick(page, selector);
  }
}
