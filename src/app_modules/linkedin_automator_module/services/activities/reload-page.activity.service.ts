import { Injectable } from '@nestjs/common';
import { Page } from 'puppeteer-core';
import { PageManipulationService } from '@core_modules/puppeteer_module/page-manipulation.service';
import { IAccountTokenActivityInput } from '@app_modules/linkedin_automator_module/interfaces/activities/account-token-activity-input.interface';
import { DefaultActivity } from '@app_modules/linkedin_automator_module/temporal/activities/default-activity.abstract';
import { Activity } from 'nestjs-temporal';
import { BrowserService } from '../browser.service';

@Injectable()
export class ReloadPageActivity extends DefaultActivity {
  constructor(
    private readonly pageManipulationService: PageManipulationService,
    private readonly browserService: BrowserService,
  ) {
    super();
  }

  @Activity()
  public async actReloadPage({
    accountToken,
  }: IAccountTokenActivityInput<{ selector: string }>): Promise<void> {
    const browserPage = this.prepare(accountToken);
    const token = this.execute(browserPage);
    this.check();

    return token;
  }

  protected override prepare(accountToken: string): Page {
    return this.browserService.findPageByToken(accountToken)!;
  }

  protected override async execute(browserPage: Page): Promise<void> {
    return this.pageManipulationService.reload(browserPage);
  }

  protected override check(): boolean {
    return true;
  }
}