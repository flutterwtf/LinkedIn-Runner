import { Injectable } from '@nestjs/common';
import { PageManipulationService } from '@core_modules/puppeteer_module/page-manipulation.service';
import { IBrowserProfileActivityInput } from '@linkedin_runner_module/interfaces/activities/common/browser-profile-activity-input.interface';
import { Activities, Activity } from 'nestjs-temporal';
import { ISelector } from '@linkedin_runner_module/interfaces/common/selector.interface';
import { BrowserService } from '@linkedin_runner_module/logic/features/browser.service';

@Injectable()
@Activities()
export class ExtractLinksFromSelectorActivity {
  constructor(
    private readonly browserService: BrowserService,
    private readonly pageManipulationService: PageManipulationService,
  ) {}

  @Activity()
  public async actExtractLinksFromSelector({
    browserProfile,
    input: { selector },
  }: IBrowserProfileActivityInput<ISelector>): Promise<Array<string>> {
    const { page } = await this.browserService.getPageAndCursor(browserProfile);
    const links = await this.pageManipulationService.extractLinksFromSelector(page, selector);

    return links;
  }
}
