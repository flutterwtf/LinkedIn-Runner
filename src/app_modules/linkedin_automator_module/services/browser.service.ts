import { hashObject } from '@common/utils/hash-object';
import { Page } from 'puppeteer-core';
import { Injectable, Logger } from '@nestjs/common';
import { BrowserConnectionService } from '@core_modules/puppeteer_module/browser-connection.service';
import { setTimeout } from 'timers/promises';

@Injectable()
export class BrowserService {
  private readonly connectionProfilePool: Map<string, string> = new Map();
  private readonly connectionPool: Map<string, Page> = new Map();

  constructor(
    private readonly browserConnectionService: BrowserConnectionService,
    private readonly logger: Logger,
  ) {}

  public async recreateBrowser(token: string): Promise<Page> {
    const currPage = this.findPageByToken(token)!;

    await this.browserConnectionService.closeBrowser(currPage);
    await setTimeout(3000);
    await this.reconnectBrowser(token);

    return this.findPageByToken(token)!;
  }

  public async reconnectBrowser(token: string): Promise<void> {
    const currentPage = this.findPageByToken(token)!;
    this.browserConnectionService.deleteFromBrowserMap(currentPage);

    const profileId = this.connectionProfilePool.get(token)!;

    const newPage = await this.connect(token, profileId);
    this.updatePageByToken(token, newPage);
    this.logger.log('Reconnected browser');
  }

  public addToConnectionPool(page: Page): string {
    const token = hashObject(page);
    this.connectionPool.set(token, page);

    return token;
  }

  public removeFromConnectionPool(token: string): void {
    this.connectionPool.delete(token);
  }

  public async setUpBrowser(
    config: object,
    browserProfile: string,
  ): Promise<{
    browserPage: Page;
    token: string;
  }> {
    const token = hashObject(config);
    const browserPage = await this.connect(token, browserProfile);

    return {
      browserPage,
      token,
    };
  }

  public findPageByToken(token: string): Page | undefined {
    return this.connectionPool.get(token);
  }

  public get tokens(): Array<string> {
    return [...this.connectionPool.keys()];
  }

  public async recreatePageAndUpdatePool(token: string): Promise<Page> {
    const currPage = this.findPageByToken(token)!;
    const newPage = await this.browserConnectionService.recreatePage(currPage);
    this.updatePageByToken(token, newPage);

    return newPage;
  }

  private async connect(token: string, profileId: string): Promise<Page> {
    this.connectionProfilePool.set(token, profileId);
    const page = await this.browserConnectionService.connect(profileId);
    this.connectionPool.set(token, page);

    return this.connectionPool.get(token)!;
  }

  private updatePageByToken(token: string, page: Page): void {
    this.connectionPool.set(token, page)!;
  }
}
