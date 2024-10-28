import { Injectable } from '@nestjs/common';
import { Page } from 'puppeteer-core';
import { PageManipulationService } from '@core_modules/puppeteer_module/page-manipulation.service';
import { IAccountTokenActivityInput } from '@app_modules/linkedin_automator_module/interfaces/activities/account-token-activity-input.interface';
import { DefaultActivity } from '@app_modules/linkedin_automator_module/temporal/activities/default-activity.abstract';
import { Activity } from 'nestjs-temporal';
import { GhostCursor } from 'ghost-cursor';
import { BrowserService } from '../../browser.service';

@Injectable()
export class MoveCursorToSelectorAndTypeActivity extends DefaultActivity {
  constructor(
    private readonly pageManipulationService: PageManipulationService,
    private readonly browserService: BrowserService,
  ) {
    super();
  }

  @Activity()
  public async actMoveCursorToSelectorAndType({
    accountToken,
    input: { selector, text },
  }: IAccountTokenActivityInput<{ selector: string; text: string }>): Promise<void> {
    const [browserPage, cursor] = this.prepare(accountToken);
    await this.execute({
      browserPage,
      cursor,
      selector,
      text,
    });
    this.check();
  }

  protected override prepare(accountToken: string): [Page, GhostCursor] {
    return this.browserService.findPageAndCursorByToken(accountToken)!;
  }

  protected override async execute({
    browserPage,
    cursor,
    selector,
    text,
  }: {
    browserPage: Page;
    cursor: GhostCursor;
    selector: string;
    text: string;
  }): Promise<void> {
    return this.pageManipulationService.moveCursorToSelectorAndType({
      browserPage,
      cursor,
      selector,
      text,
    });
  }

  protected override check(): boolean {
    return true;
  }
}
