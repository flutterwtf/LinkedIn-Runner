import { PageManipulationService } from '@core_modules/puppeteer_module/page-manipulation.service';
import { Injectable } from '@nestjs/common';
import { BrowserConnectionService } from '@core_modules/puppeteer_module/browser-connection.service';
import { IPageAndCursor } from '@linkedin_runner_module/interfaces/common/page-and-cursor.interface';

@Injectable()
export class OriginalPageService {
  private readonly connectionPool: Map<string, IPageAndCursor> = new Map();

  constructor(
    private readonly pageManipulationService: PageManipulationService,
    private readonly browserConnectionService: BrowserConnectionService,
  ) {}

  public async getPageAndCursorOrConnect(browserProfile: string): Promise<IPageAndCursor> {
    let pageAndCursor = this.connectionPool.get(browserProfile);

    const isPageClosed = !pageAndCursor || !pageAndCursor.page || pageAndCursor.page.isClosed();
    if (isPageClosed) {
      pageAndCursor = await this.connect(browserProfile);
    }

    return pageAndCursor!;
  }

  private async connect(browserProfile: string): Promise<IPageAndCursor> {
    const page = await this.browserConnectionService.connect(browserProfile);
    this.connectionPool.set(browserProfile, {
      page,
      cursor: this.pageManipulationService.createCursor(page),
    });

    return this.connectionPool.get(browserProfile)!;
  }
}
