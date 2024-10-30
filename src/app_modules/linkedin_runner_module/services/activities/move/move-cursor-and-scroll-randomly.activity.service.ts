import { Injectable } from '@nestjs/common';
import { Page } from 'puppeteer-core';
import { PageManipulationService } from '@core_modules/puppeteer_module/page-manipulation.service';
import { BrowserService } from '@app_modules/linkedin_runner_module/services/browser.service';
import { IAccountTokenActivityInput } from '@app_modules/linkedin_runner_module/interfaces/activities/account-token-activity-input.interface';
import { Activities, Activity } from 'nestjs-temporal';
import { DefaultActivity } from '@app_modules/linkedin_runner_module/temporal/activities/default-activity.abstract';
import { GhostCursor } from 'ghost-cursor';

@Injectable()
@Activities()
export class MoveCursorAndScrollRandomlyActivity extends DefaultActivity {
  constructor(
    private readonly pageManipulationService: PageManipulationService,
    private readonly browserService: BrowserService,
  ) {
    super();
  }

  @Activity()
  public async actMoveCursorAndScrollRandomly({
    accountToken,
  }: IAccountTokenActivityInput<object>): Promise<void> {
    const [browserPage, cursor] = this.prepare(accountToken);
    await this.execute(browserPage, cursor);
    this.check();
  }

  protected override prepare(accountToken: string): [Page, GhostCursor] {
    return this.browserService.findPageAndCursorByToken(accountToken)!;
  }

  protected override async execute(browserPage: Page, cursor: GhostCursor): Promise<void> {
    return this.pageManipulationService.moveCursorAndScrollRandomly(browserPage, cursor);
  }

  protected override check(): void {}
}
