import { Injectable } from '@nestjs/common';
import { Page } from 'puppeteer-core';
import { IAccountTokenActivityInput } from '@app_modules/linkedin_automator_module/interfaces/activities/account-token-activity-input.interface';
import { DefaultActivity } from '@app_modules/linkedin_automator_module/temporal/activities/default-activity.abstract';
import { Activities, Activity } from 'nestjs-temporal';
import { GhostCursor } from 'ghost-cursor';
import { BrowserService } from '../../browser.service';

@Injectable()
@Activities()
export class WaitForSelectorActivity extends DefaultActivity {
  private readonly waitingSelectorTimeout = 20000;

  constructor(private readonly browserService: BrowserService) {
    super();
  }

  @Activity()
  public async actWaitForSelector({
    accountToken,
    input: { selector, timeout = this.waitingSelectorTimeout },
  }: IAccountTokenActivityInput<{ selector: string; timeout: number }>): Promise<void> {
    const [browserPage] = this.prepare(accountToken);
    await this.execute({
      browserPage,
      selector,
      timeout,
    });
    this.check();
  }

  protected override prepare(accountToken: string): [Page, GhostCursor] {
    return this.browserService.findPageAndCursorByToken(accountToken)!;
  }

  protected override async execute({
    browserPage,
    selector,
    timeout,
  }: {
    browserPage: Page;
    selector: string;
    timeout: number;
  }): Promise<void> {
    await browserPage.waitForSelector(selector, { timeout });
  }

  protected override check(): void {}
}
