import { Injectable } from '@nestjs/common';
import { Page } from 'puppeteer-core';
import { PageManipulationService } from '@core_modules/puppeteer_module/page-manipulation.service';
import { IAccountTokenActivityInput } from '@app_modules/linkedin_automator_module/interfaces/activities/account-token-activity-input.interface';
import { DefaultActivity } from '@app_modules/linkedin_automator_module/temporal/activities/default-activity.abstract';
import { Activities, Activity } from 'nestjs-temporal';
import { GhostCursor } from 'ghost-cursor';
import { BrowserService } from '../../browser.service';

@Injectable()
@Activities()
export class WaitAndCheckIfSelectorExistsActivity extends DefaultActivity {
  private readonly checkingExistenceTimeout = 5000;

  constructor(
    private readonly pageManipulationService: PageManipulationService,
    private readonly browserService: BrowserService,
  ) {
    super();
  }

  @Activity()
  public async actWaitAndCheckIfSelectorExists({
    accountToken,
    input: { selector, timeout = this.checkingExistenceTimeout },
  }: IAccountTokenActivityInput<{ selector: string; timeout: number }>): Promise<boolean> {
    const [browserPage] = this.prepare(accountToken);
    const result = this.execute({
      browserPage,
      selector,
      timeout,
    });
    this.check();

    return result;
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
  }): Promise<boolean> {
    return this.pageManipulationService.waitAndCheckIfSelectorExists({
      browserPage,
      selector,
      timeout,
    });
  }

  protected override check(): void {}
}
