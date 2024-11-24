import { Injectable } from '@nestjs/common';
import { PageManipulationService } from '@core_modules/puppeteer_module/page-manipulation.service';
import { IBrowserProfileActivityInput } from '@linkedin_runner_module/interfaces/activities/common/browser-profile-activity-input.interface';
import { ISelector } from '@linkedin_runner_module/interfaces/common/selector.interface';
import { Activities, Activity } from 'nestjs-temporal';
import { IText } from '@linkedin_runner_module/interfaces/common/text.interface';
import { PageService } from '@linkedin_runner_module/modules/page_module/services/page.service';

@Injectable()
@Activities()
export class MoveCursorToSelectorAndTypeActivity {
  constructor(
    private readonly pageService: PageService,
    private readonly pageManipulationService: PageManipulationService,
  ) {}

  @Activity()
  public async actMoveCursorToSelectorAndType({
    browserProfile,
    pageType,
    input: { selector, text },
  }: IBrowserProfileActivityInput<ISelector & IText>): Promise<void> {
    const { page, cursor } = await this.pageService.getPageAndCursor(browserProfile, pageType);
    await this.pageManipulationService.moveCursorToSelectorAndType({
      page,
      cursor,
      selector,
      text,
    });
  }
}
