import { Injectable } from '@nestjs/common';
import { ElementHandle, Page } from 'puppeteer-core';
import { PageManipulationService } from '@core_modules/puppeteer_module/page-manipulation.service';
import { BrowserService } from '@app_modules/linkedin_automator_module/services/browser.service';
import { IAccountTokenActivityInput } from '@app_modules/linkedin_automator_module/interfaces/activities/account-token-activity-input.interface';
import { Activities, Activity } from 'nestjs-temporal';
import { DefaultActivity } from '@app_modules/linkedin_automator_module/temporal/activities/default-activity.abstract';
import { GhostCursor } from 'ghost-cursor';

@Injectable()
@Activities()
export class EvaluateActivity extends DefaultActivity {
  constructor(
    private readonly pageManipulationService: PageManipulationService,
    private readonly browserService: BrowserService,
  ) {
    super();
  }

  @Activity()
  public async actEvaluate<T>({
    accountToken,
    input: { selector, pageFunction },
  }: IAccountTokenActivityInput<{
    selector: string;
    pageFunction: (selector: string | Element, ...args: Array<unknown>) => T | Promise<T>;
  }>): Promise<T> {
    const [browserPage] = this.prepare(accountToken);
    const result = this.execute({
      browserPage,
      pageFunction,
      selector,
    });
    this.check();

    return result;
  }

  protected override prepare(accountToken: string): [Page, GhostCursor] {
    return this.browserService.findPageAndCursorByToken(accountToken)!;
  }

  protected override execute<T>({
    browserPage,
    pageFunction,
    selector,
  }: {
    browserPage: Page;
    pageFunction: (selector: string | Element, ...args: Array<unknown>) => T | Promise<T>;
    selector: string | ElementHandle<Element>;
  }): Promise<T> {
    return this.pageManipulationService.evaluate({
      browserPage,
      pageFunction,
      selector,
    });
  }

  protected override check(): void {}
}
