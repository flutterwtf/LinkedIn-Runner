import { Activities, Activity } from 'nestjs-temporal';
import { IAccountTokenActivityInput } from '@app_modules/linkedin_runner_module/interfaces/activities/account-token-activity-input.interface';
import { ISelector } from '@app_modules/linkedin_runner_module/interfaces/common/selector.interface';
import { Injectable } from '@nestjs/common';
import { GhostCursor } from 'ghost-cursor';
import { Page } from 'puppeteer-core';
import { PageManipulationService } from '@core_modules/puppeteer_module/page-manipulation.service';
import { DefaultActivity } from '../../../temporal/activities/default-activity.abstract';
import { BrowserService } from '../../browser.service';

@Injectable()
@Activities()
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
  }: IAccountTokenActivityInput<ISelector>): Promise<string> {
    const [browserPage, cursor] = this.prepare(accountToken);
    const token = this.execute({
      browserPage,
      cursor,
      selector,
    });
    this.check();

    return token;
  }

  protected async execute({
    browserPage,
    cursor,
    selector,
  }: {
    browserPage: Page;
    cursor: GhostCursor;
    selector: string;
  }): Promise<string> {
    const page = await this.pageManipulationService.clickOnSelectorAndOpenNewPage({
      browserPage,
      cursor,
      selector,
    });

    return this.browserService.addToConnectionPool(page);
  }

  protected override prepare(accountToken: string): [Page, GhostCursor] {
    return this.browserService.findPageAndCursorByToken(accountToken)!;
  }

  protected override check(): void {}
}
