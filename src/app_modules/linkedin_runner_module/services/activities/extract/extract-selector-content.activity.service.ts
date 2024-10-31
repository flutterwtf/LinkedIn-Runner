import { Injectable } from '@nestjs/common';
import { PageManipulationService } from '@core_modules/puppeteer_module/page-manipulation.service';
import { IAccountTokenActivityInput } from '@app_modules/linkedin_runner_module/interfaces/activities/account-token-activity-input.interface';
import { Activities, Activity } from 'nestjs-temporal';
import { BrowserService } from '../../browser.service';

@Injectable()
@Activities()
export class ExtractSelectorContentActivity {
  constructor(
    private readonly pageManipulationService: PageManipulationService,
    private readonly browserService: BrowserService,
  ) {}

  @Activity()
  public async actExtractSelectorContent({
    accountToken,
    input: { selector },
  }: IAccountTokenActivityInput<{ selector: string }>): Promise<string> {
    const [browserPage] = this.browserService.findPageAndCursorByToken(accountToken)!;
    const content = await this.pageManipulationService.parseSelectorContent(browserPage, selector);

    return content;
  }
}
