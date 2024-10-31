import { Injectable } from '@nestjs/common';
import { IAccountTokenActivityInput } from '@app_modules/linkedin_runner_module/interfaces/activities/account-token-activity-input.interface';
import { Activities, Activity } from 'nestjs-temporal';
import { ISelector } from '@app_modules/linkedin_runner_module/interfaces/common/selector.interface';
import { ITimeout } from '@app_modules/linkedin_runner_module/interfaces/common/timeout.interface';
import { BrowserService } from '../../browser.service';

@Injectable()
@Activities()
export class WaitForSelectorActivity {
  private readonly waitingSelectorTimeout = 20000;

  constructor(private readonly browserService: BrowserService) {}

  @Activity()
  public async actWaitForSelector({
    accountToken,
    input: { selector, timeout = this.waitingSelectorTimeout },
  }: IAccountTokenActivityInput<ISelector & ITimeout>): Promise<void> {
    const [browserPage] = this.browserService.findPageAndCursorByToken(accountToken)!;
    await browserPage.waitForSelector(selector, { timeout });
  }
}
