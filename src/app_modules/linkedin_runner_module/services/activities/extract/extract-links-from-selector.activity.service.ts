import { Injectable } from '@nestjs/common';
import { PageManipulationService } from '@core_modules/puppeteer_module/page-manipulation.service';
import { IAccountTokenActivityInput } from '@app_modules/linkedin_runner_module/interfaces/activities/account-token-activity-input.interface';
import { Activities, Activity } from 'nestjs-temporal';
import { BrowserService } from '../../browser.service';

@Injectable()
@Activities()
export class ExtractLinksFromSelectorActivity {
  constructor(
    private readonly pageManipulationService: PageManipulationService,
    private readonly browserService: BrowserService,
  ) {}

  @Activity()
  public async actExtractLinksFromSelector({
    accountToken,
    input: { selector },
  }: IAccountTokenActivityInput<{ selector: string }>): Promise<Array<string>> {
    const [browserPage] = this.browserService.findPageAndCursorByToken(accountToken)!;
    const links = await this.pageManipulationService.extractLinksFromSelector(
      browserPage,
      selector,
    );

    return links;
  }
}
