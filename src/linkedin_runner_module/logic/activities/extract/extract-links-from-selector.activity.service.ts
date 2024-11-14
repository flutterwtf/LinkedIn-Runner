import { PageManipulationService } from '@core_modules/puppeteer_module/services/page-manipulation.service';
import { IBrowserProfileActivityInput } from '@linkedin_runner_module/interfaces/activities/common/browser-profile-activity-input.interface';
import { ISelector } from '@linkedin_runner_module/interfaces/common/selector.interface';
import { PageService } from '@linkedin_runner_module/modules/page_module/services/page.service';
import { Injectable } from '@nestjs/common';
import { Activities, Activity } from 'nestjs-temporal';

@Injectable()
@Activities()
export class ExtractLinksFromSelectorActivity {
  constructor(
    private readonly pageService: PageService,
    private readonly pageManipulationService: PageManipulationService,
  ) {}

  @Activity()
  public async actExtractLinksFromSelector({
    browserProfile,
    pageType,
    input: { selector },
  }: IBrowserProfileActivityInput<ISelector>): Promise<Array<string>> {
    const { page } = await this.pageService.getPageAndCursor(browserProfile, pageType);
    const links = await this.pageManipulationService.extractLinksFromSelector(page, selector);

    return links;
  }
}
