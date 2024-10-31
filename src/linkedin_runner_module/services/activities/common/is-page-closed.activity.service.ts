import { Activities, Activity } from 'nestjs-temporal';
import { IAccountTokenActivityInput } from 'src/linkedin_runner_module/interfaces/activities/account-token-activity-input.interface';
import { Injectable } from '@nestjs/common';
import { BrowserService } from '../../browser.service';

@Injectable()
@Activities()
export class IsPageClosedActivity {
  constructor(private readonly browserService: BrowserService) {}

  @Activity()
  public async actIsPageClosed({
    accountToken,
  }: IAccountTokenActivityInput<object>): Promise<boolean> {
    const [browserPage] = this.browserService.findPageAndCursorByToken(accountToken)!;

    return !browserPage || browserPage.isClosed();
  }
}
