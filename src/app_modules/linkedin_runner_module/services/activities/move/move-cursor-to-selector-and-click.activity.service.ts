import { Injectable } from '@nestjs/common';
import { PageManipulationService } from '@core_modules/puppeteer_module/page-manipulation.service';
import { BrowserService } from '@app_modules/linkedin_runner_module/services/browser.service';
import { IAccountTokenActivityInput } from '@app_modules/linkedin_runner_module/interfaces/activities/account-token-activity-input.interface';
import { Activities, Activity } from 'nestjs-temporal';

@Injectable()
@Activities()
export class MoveCursorToSelectorAndClickActivity {
  constructor(
    private readonly pageManipulationService: PageManipulationService,
    private readonly browserService: BrowserService,
  ) {}

  @Activity()
  public async actMoveCursorToSelectorAndClick({
    accountToken,
    input: { selector },
  }: IAccountTokenActivityInput<{ selector: string }>): Promise<void> {
    const [, cursor] = this.browserService.findPageAndCursorByToken(accountToken)!;
    await this.pageManipulationService.moveCursorToSelectorAndClick(cursor, selector);
  }
}
