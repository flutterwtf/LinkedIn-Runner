import { Injectable } from '@nestjs/common';
import { Page } from 'puppeteer-core';
import { PageManipulationService } from '@core_modules/puppeteer_module/page-manipulation.service';
import { IAccountTokenActivityInput } from '@app_modules/linkedin_automator_module/interfaces/activities/account-token-activity-input.interface';
import { DefaultActivity } from '@app_modules/linkedin_automator_module/temporal/activities/default-activity.abstract';
import { Activity } from 'nestjs-temporal';
import { GhostCursor } from 'ghost-cursor';
import { BrowserService } from '../../browser.service';

@Injectable()
export class ExtractLinksFromSelectorActivity extends DefaultActivity {
  constructor(
    private readonly pageManipulationService: PageManipulationService,
    private readonly browserService: BrowserService,
  ) {
    super();
  }

  @Activity()
  public async actExtractLinksFromSelector({
    accountToken,
    input: { selector },
  }: IAccountTokenActivityInput<{ selector: string }>): Promise<Array<string>> {
    const [browserPage] = this.prepare(accountToken);
    const links = await this.execute(browserPage, selector);
    this.check();

    return links;
  }

  protected override prepare(accountToken: string): [Page, GhostCursor] {
    return this.browserService.findPageAndCursorByToken(accountToken)!;
  }

  protected override async execute(browserPage: Page, selector: string): Promise<Array<string>> {
    return this.pageManipulationService.extractLinksFromSelector(browserPage, selector);
  }

  protected override check(): boolean {
    return true;
  }
}