import { Activities, Activity } from 'nestjs-temporal';
import { IAccountTokenActivityInput } from '@app_modules/linkedin_automator_module/interfaces/activities/account-token-activity-input.interface';
import { Injectable } from '@nestjs/common';
import { Page } from 'puppeteer-core';
import { PageManipulationService } from '@core_modules/puppeteer_module/page-manipulation.service';
import { DefaultActivity } from '../../temporal/activities/default-activity.abstract';
import { BrowserService } from '../browser.service';

@Activities()
@Injectable()
export class ClickOnSelectorAndOpenNewPageActivity extends DefaultActivity {
  constructor(
    private readonly pageManipulationService: PageManipulationService,
    private readonly browserService: BrowserService,
  ) {
    super();
  }

  @Activity()
  public async actClickOnSelectorAndOpenNewPage({
    accountToken,
    input: { selector },
  }: IAccountTokenActivityInput<{ selector: string }>): Promise<string> {
    const browserPage = this.prepare(accountToken);
    const token = this.execute(browserPage, selector);
    this.check();

    return token;
  }

  protected async execute(browserPage: Page, selector: string): Promise<string> {
    const cursor = this.pageManipulationService.createCursor(browserPage);
    const page = await this.pageManipulationService.clickOnSelectorAndOpenNewPage({
      browserPage,
      cursor,
      selector,
    });

    return this.browserService.addToConnectionPool(page);
  }

  protected override prepare(accountToken: string): Page {
    return this.browserService.findPageByToken(accountToken)!;
  }

  protected override check(): boolean {
    return true;
  }
}
