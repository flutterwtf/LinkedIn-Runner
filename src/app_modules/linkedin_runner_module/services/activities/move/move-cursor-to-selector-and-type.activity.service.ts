import { Injectable } from '@nestjs/common';
import { PageManipulationService } from '@core_modules/puppeteer_module/page-manipulation.service';
import { IAccountTokenActivityInput } from '@app_modules/linkedin_runner_module/interfaces/activities/account-token-activity-input.interface';
import { ISelector } from '@app_modules/linkedin_runner_module/interfaces/common/selector.interface';
import { Activities, Activity } from 'nestjs-temporal';
import { BrowserService } from '../../browser.service';

@Injectable()
@Activities()
export class MoveCursorToSelectorAndTypeActivity {
  constructor(
    private readonly pageManipulationService: PageManipulationService,
    private readonly browserService: BrowserService,
  ) {}

  @Activity()
  public async actMoveCursorToSelectorAndType({
    accountToken,
    input: { selector, text },
  }: IAccountTokenActivityInput<ISelector & { text: string }>): Promise<void> {
    const [browserPage, cursor] = this.browserService.findPageAndCursorByToken(accountToken)!;
    await this.pageManipulationService.moveCursorToSelectorAndType({
      browserPage,
      cursor,
      selector,
      text,
    });
  }
}
