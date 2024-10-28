import { Injectable } from '@nestjs/common';
import { ElementHandle, Page } from 'puppeteer-core';
import { PageManipulationService } from '@core_modules/puppeteer_module/page-manipulation.service';
import { IAccountTokenActivityInput } from '@app_modules/linkedin_automator_module/interfaces/activities/account-token-activity-input.interface';
import { DefaultActivity } from '@app_modules/linkedin_automator_module/temporal/activities/default-activity.abstract';
import { Activity } from 'nestjs-temporal';
import { BrowserService } from '../browser.service';

@Injectable()
export class QuerySelectorActivity extends DefaultActivity {
  constructor(
    private readonly pageManipulationService: PageManipulationService,
    private readonly browserService: BrowserService,
  ) {
    super();
  }

  @Activity()
  public async actQuerySelector({
    accountToken,
    input: { selector },
  }: IAccountTokenActivityInput<{ selector: string }>): Promise<ElementHandle<Element> | null> {
    const browserPage = this.prepare(accountToken);
    const handleElement = await this.execute(browserPage, selector);
    this.check();

    return handleElement;
  }

  protected override prepare(accountToken: string): Page {
    return this.browserService.findPageByToken(accountToken)!;
  }

  protected override async execute(
    browserPage: Page,
    selector: string,
  ): Promise<ElementHandle<Element> | null> {
    const elementHandle = await this.pageManipulationService.querySelector(browserPage, selector);

    return elementHandle;
  }

  protected override check(): boolean {
    return true;
  }
}
