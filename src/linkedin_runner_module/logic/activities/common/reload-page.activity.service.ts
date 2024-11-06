import { Injectable } from '@nestjs/common';
import { PageManipulationService } from '@core_modules/puppeteer_module/page-manipulation.service';
import { IBrowserProfileActivityInput } from '@linkedin_runner_module/interfaces/activities/common/browser-profile-activity-input.interface';
import { Activities, Activity } from 'nestjs-temporal';
import { BrowserService } from '@linkedin_runner_module/logic/features/browser.service';

@Injectable()
@Activities()
export class ReloadPageActivity {
  constructor(
    private readonly browserService: BrowserService,
    private readonly pageManipulationService: PageManipulationService,
  ) {}

  @Activity()
  public async actReloadPage({
    browserProfile,
  }: IBrowserProfileActivityInput<object>): Promise<void> {
    const { page } = await this.browserService.getPageAndCursor(browserProfile);
    await this.pageManipulationService.reload(page);
  }
}
