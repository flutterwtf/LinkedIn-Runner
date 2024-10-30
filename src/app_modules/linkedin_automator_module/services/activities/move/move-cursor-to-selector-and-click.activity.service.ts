import { Injectable } from '@nestjs/common';
import { Page } from 'puppeteer-core';
import { PageManipulationService } from '@core_modules/puppeteer_module/page-manipulation.service';
import { BrowserService } from '@app_modules/linkedin_automator_module/services/browser.service';
import { IAccountTokenActivityInput } from '@app_modules/linkedin_automator_module/interfaces/activities/account-token-activity-input.interface';
import { Activities, Activity } from 'nestjs-temporal';
import { DefaultActivity } from '@app_modules/linkedin_automator_module/temporal/activities/default-activity.abstract';
import { GhostCursor } from 'ghost-cursor';

@Injectable()
@Activities()
export class MoveCursorToSelectorAndClickActivity extends DefaultActivity {
  constructor(
    private readonly pageManipulationService: PageManipulationService,
    private readonly browserService: BrowserService,
  ) {
    super();
  }

  @Activity()
  public async actMoveCursorToSelectorAndClick({
    accountToken,
    input: { selector },
  }: IAccountTokenActivityInput<{ selector: string }>): Promise<void> {
    const [, cursor] = this.prepare(accountToken);
    await this.execute(cursor, selector);
    this.check();
  }

  protected override prepare(accountToken: string): [Page, GhostCursor] {
    return this.browserService.findPageAndCursorByToken(accountToken)!;
  }

  protected override async execute(cursor: GhostCursor, selector: string): Promise<void> {
    return this.pageManipulationService.moveCursorToSelectorAndClick(cursor, selector);
  }

  protected override check(): void {}
}
