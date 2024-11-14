import { Injectable } from '@nestjs/common';
import { IBrowserProfileActivityInput } from '@linkedin_runner_module/interfaces/activities/common/browser-profile-activity-input.interface';
import { Activities, Activity } from 'nestjs-temporal';
import { PageService } from '@linkedin_runner_module/modules/page_module/services/page.service';
import { AwsService } from '@core_modules/aws_module/aws.service';

@Injectable()
@Activities()
export class MakeScreenshotActivity {
  constructor(
    private readonly pageService: PageService,
    private readonly awsService: AwsService,
  ) {}

  @Activity()
  public async actMakeScreenshot({
    browserProfile,
    pageType,
  }: IBrowserProfileActivityInput<object>): Promise<string> {
    const page = await this.pageService.getPageAndCursor(browserProfile, pageType);
    const screenshot = await page.screenshot({ fullPage: true });
    const url = await this.awsService.uploadScreenshot({
      name: `${Date.now()}.png`,
      data: screenshot,
      workspaceName: browserProfile,
    });

    return url;
  }
}
