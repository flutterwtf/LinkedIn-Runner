import { Injectable } from '@nestjs/common';
import { Page } from 'puppeteer-core';
import { PageManipulationService } from '@core_modules/puppeteer_module/page-manipulation.service';
import { BrowserService } from '@app_modules/linkedin_automator_module/services/browser.service';
import { IAccountTokenActivityInput } from '@app_modules/linkedin_automator_module/interfaces/activities/account-token-activity-input.interface';
import { Activities, Activity } from 'nestjs-temporal';
import { setTimeout } from 'timers/promises';
import { DefaultActivity } from '@app_modules/linkedin_automator_module/temporal/activities/default-activity.abstract';

@Injectable()
@Activities()
export class GetCurrentUrlActivity extends DefaultActivity {
  constructor(
    private readonly pageManipulationService: PageManipulationService,
    private readonly browserService: BrowserService,
  ) {
    super();
  }

  @Activity()
  public async actGetCurrentUrl({
    accountToken,
  }: IAccountTokenActivityInput<object>): Promise<string> {
    const browserPage = this.prepare(accountToken);
    await setTimeout(5000);
    const result = this.execute(browserPage);
    this.check();

    return result;
  }

  protected override prepare(accountToken: string): Page {
    return this.browserService.findPageByToken(accountToken)!;
  }

  protected override execute(browserPage: Page): string {
    return this.pageManipulationService.getCurrentUrl(browserPage);
  }

  protected override check(): boolean {
    return true;
  }
}
