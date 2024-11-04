import { Injectable } from '@nestjs/common';
import { PageManipulationService } from '@core_modules/puppeteer_module/page-manipulation.service';
import { IBrowserProfileActivityInput } from '@linkedin_runner_module/interfaces/activities/common/browser-profile-activity-input.interface';
import { ISelector } from '@linkedin_runner_module/interfaces/common/selector.interface';
import { Activities, Activity } from 'nestjs-temporal';
import { IText } from '@linkedin_runner_module/interfaces/common/text.interface';
import { BrowserService } from '@linkedin_runner_module/logic/features/browser.service';

@Injectable()
@Activities()
export class MoveCursorToSelectorAndTypeActivity {
  constructor(
    private readonly browserService: BrowserService,
    private readonly pageManipulationService: PageManipulationService,
  ) {}

  @Activity()
  public async actMoveCursorToSelectorAndType({
    browserProfile,
    input: { selector, text },
  }: IBrowserProfileActivityInput<ISelector & IText>): Promise<void> {
    const { page, cursor } = await this.browserService.getPageAndCursor(browserProfile);
    await this.pageManipulationService.moveCursorToSelectorAndType({
      page,
      cursor,
      selector,
      text,
    });
  }
}
