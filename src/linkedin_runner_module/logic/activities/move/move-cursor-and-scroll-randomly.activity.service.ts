import { Injectable } from '@nestjs/common';
import { PageManipulationService } from '@core_modules/puppeteer_module/page-manipulation.service';
import { IBrowserProfileActivityInput } from '@linkedin_runner_module/interfaces/activities/common/browser-profile-activity-input.interface';
import { Activities, Activity } from 'nestjs-temporal';
import { BrowserService } from '@linkedin_runner_module/logic/features/browser.service';

@Injectable()
@Activities()
export class MoveCursorAndScrollRandomlyActivity {
  constructor(
    private readonly browserService: BrowserService,
    private readonly pageManipulationService: PageManipulationService,
  ) {}

  @Activity()
  public async actMoveCursorAndScrollRandomly({
    browserProfile,
  }: IBrowserProfileActivityInput<object>): Promise<void> {
    const { page, cursor } = await this.browserService.getPageAndCursor(browserProfile);
    await this.pageManipulationService.moveCursorAndScrollRandomly(page, cursor);
  }
}
