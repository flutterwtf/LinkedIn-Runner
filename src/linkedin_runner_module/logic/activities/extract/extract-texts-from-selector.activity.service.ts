import { Injectable } from '@nestjs/common';
import { PageManipulationService } from '@core_modules/puppeteer_module/page-manipulation.service';
import { IBrowserProfileActivityInput } from '@linkedin_runner_module/interfaces/activities/common/browser-profile-activity-input.interface';
import { Activities, Activity } from 'nestjs-temporal';
import { ISelector } from '@linkedin_runner_module/interfaces/common/selector.interface';
import { PageService } from '@linkedin_runner_module/modules/page_module/services/page.service';

@Injectable()
@Activities()
export class ExtractTextsFromSelectorActivity {
  constructor(
    private readonly pageService: PageService,
    private readonly pageManipulationService: PageManipulationService,
  ) {}

  @Activity()
  public async actExtractTextsFromSelector({
    browserProfile,
    pageType,
    input: { selector },
  }: IBrowserProfileActivityInput<ISelector>): Promise<Array<string>> {
    const { page } = await this.pageService.getPageAndCursor(browserProfile, pageType);
    const result = await this.pageManipulationService.extractTextsFromSelector(page, selector);

    return result;
  }
}
