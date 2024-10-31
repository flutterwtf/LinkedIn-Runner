import { Injectable } from '@nestjs/common';
import { PageManipulationService } from '@core_modules/puppeteer_module/page-manipulation.service';
import { IAccountTokenActivityInput } from 'src/linkedin_runner_module/interfaces/activities/account-token-activity-input.interface';
import { Activities, Activity } from 'nestjs-temporal';
import { BrowserService } from '../../browser.service';

@Injectable()
@Activities()
export class ExtractTextsFromSelectorActivity {
  constructor(
    private readonly pageManipulationService: PageManipulationService,
    private readonly browserService: BrowserService,
  ) {}

  @Activity()
  public async actExtractTextsFromSelector({
    accountToken,
    input: { selector },
  }: IAccountTokenActivityInput<{ selector: string }>): Promise<Array<string>> {
    const [browserPage] = this.browserService.findPageAndCursorByToken(accountToken)!;
    const result = await this.pageManipulationService.extractTextsFromSelector(
      browserPage,
      selector,
    );

    return result;
  }
}
