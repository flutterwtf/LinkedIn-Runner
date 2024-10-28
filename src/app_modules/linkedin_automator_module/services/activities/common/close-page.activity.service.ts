import { Activities, Activity } from 'nestjs-temporal';
import { IAccountTokenActivityInput } from '@app_modules/linkedin_automator_module/interfaces/activities/account-token-activity-input.interface';
import { Injectable } from '@nestjs/common';
import { GhostCursor } from 'ghost-cursor';
import { Page } from 'puppeteer-core';
import { PageManipulationService } from '@core_modules/puppeteer_module/page-manipulation.service';
import { DefaultActivity } from '../../../temporal/activities/default-activity.abstract';
import { BrowserService } from '../../browser.service';

@Activities()
@Injectable()
export class ClosePageActivity extends DefaultActivity {
  constructor(
    private readonly pageManipulationService: PageManipulationService,
    private readonly browserService: BrowserService,
  ) {
    super();
  }

  @Activity()
  public async actClosePage({ accountToken }: IAccountTokenActivityInput<object>): Promise<void> {
    const [browserPage] = this.prepare(accountToken);
    await this.execute(browserPage, accountToken);
    this.check();
  }

  protected override async execute(browserPage: Page, accountToken: string): Promise<void> {
    await this.pageManipulationService.closePage(browserPage);
    this.browserService.removeFromConnectionPool(accountToken);
  }

  protected override prepare(accountToken: string): [Page, GhostCursor] {
    return this.browserService.findPageAndCursorByToken(accountToken)!;
  }

  protected override check(): boolean {
    return true;
  }
}
