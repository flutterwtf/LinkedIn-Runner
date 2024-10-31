import { Activities, Activity } from 'nestjs-temporal';
import { IAccountTokenActivityInput } from 'src/linkedin_runner_module/interfaces/activities/account-token-activity-input.interface';
import { ISelector } from 'src/linkedin_runner_module/interfaces/common/selector.interface';
import { Injectable } from '@nestjs/common';
import { PageManipulationService } from '@core_modules/puppeteer_module/page-manipulation.service';
import { BrowserService } from '../../browser.service';

@Injectable()
@Activities()
export class ClickOnSelectorAndOpenNewPageActivity {
  constructor(
    private readonly pageManipulationService: PageManipulationService,
    private readonly browserService: BrowserService,
  ) {}

  @Activity()
  public async actClickOnSelectorAndOpenNewPage({
    accountToken,
    input: { selector },
  }: IAccountTokenActivityInput<ISelector>): Promise<string> {
    const [browserPage, cursor] = this.browserService.findPageAndCursorByToken(accountToken)!;
    const page = await this.pageManipulationService.clickOnSelectorAndOpenNewPage({
      browserPage,
      cursor,
      selector,
    });

    return this.browserService.addToConnectionPool(page);
  }
}
