import { Activities, Activity } from 'nestjs-temporal';
import { IAccountTokenActivityInput } from '@app_modules/linkedin_automator_module/interfaces/activities/account-token-activity-input.interface';
import { Injectable } from '@nestjs/common';
import { GhostCursor } from 'ghost-cursor';
import { Page } from 'puppeteer-core';
import { DefaultActivity } from '../../../temporal/activities/default-activity.abstract';
import { BrowserService } from '../../browser.service';

@Injectable()
@Activities()
export class IsPageClosedActivity extends DefaultActivity {
  constructor(private readonly browserService: BrowserService) {
    super();
  }

  @Activity()
  public async actIsPageClosed({
    accountToken,
  }: IAccountTokenActivityInput<object>): Promise<boolean> {
    const [browserPage] = this.prepare(accountToken);
    const result = this.execute(browserPage);
    this.check();

    return result;
  }

  protected async execute(browserPage: Page): Promise<boolean> {
    return !browserPage || browserPage.isClosed();
  }

  protected override prepare(accountToken: string): [Page, GhostCursor] {
    return this.browserService.findPageAndCursorByToken(accountToken)!;
  }

  protected override check(): void {}
}
