import { Injectable } from '@nestjs/common';
import { BrowserConnectionService } from '@core_modules/puppeteer_module/browser-connection.service';
import { Page } from 'puppeteer-core';

@Injectable()
export class OriginalPageService {
  private readonly connectionPool: Map<string, Page> = new Map();

  constructor(private readonly browserConnectionService: BrowserConnectionService) {}

  public async getPageAndCursorOrConnect(browserProfile: string): Promise<Page> {
    let page = this.connectionPool.get(browserProfile);

    if (!page || page.isClosed()) {
      page = await this.connect(browserProfile);
    }
    return page;
  }

  private async connect(browserProfile: string): Promise<Page> {
    const page = await this.browserConnectionService.connect(browserProfile);
    this.connectionPool.set(browserProfile, page);

    return page;
  }
}
