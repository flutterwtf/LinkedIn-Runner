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
export class MultiEvaluateActivity extends DefaultActivity {
  constructor(
    private readonly pageManipulationService: PageManipulationService,
    private readonly browserService: BrowserService,
  ) {
    super();
  }

  @Activity()
  public async actMultiEvaluate<T>({
    accountToken,
    input: { selector, pageFunction },
  }: IAccountTokenActivityInput<{
    selector: string;
    pageFunction: (elements: Array<Element>) => T;
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
    pageFunction: (elements: Array<Element>) => T;
    selector: string;
  }): Promise<T> {
    return this.pageManipulationService.multiEvaluate({
      browserPage,
      pageFunction,
      selector,
    });
  }

  protected override check(): void {}
}
