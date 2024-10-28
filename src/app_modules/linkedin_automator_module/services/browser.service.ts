import { PageManipulationService } from '@core_modules/puppeteer_module/page-manipulation.service';
import { hashObject } from '@common/utils/hash-object';
import { Page } from 'puppeteer-core';
import { Injectable } from '@nestjs/common';
import { BrowserConnectionService } from '@core_modules/puppeteer_module/browser-connection.service';
import { GhostCursor } from 'ghost-cursor';

@Injectable()
export class BrowserService {
  private readonly connectionProfilePool: Map<string, string> = new Map();
  // вынести потом наверно
  private readonly connectionPool: Map<string, [Page, GhostCursor]> = new Map();

  constructor(
    private readonly pageManipulationService: PageManipulationService,
    private readonly browserConnectionService: BrowserConnectionService,
  ) {}

  public addToConnectionPool(page: Page): string {
    const token = hashObject(page);
    this.addNewConnection(token, page);

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
    const [browserPage] = await this.connect(token, browserProfile);

    return {
      browserPage,
      token,
    };
  }

  public findPageAndCursorByToken(token: string): [Page, GhostCursor] | undefined {
    return this.connectionPool.get(token);
  }

  public get tokens(): Array<string> {
    return [...this.connectionPool.keys()];
  }

  private async connect(token: string, profileId: string): Promise<[Page, GhostCursor]> {
    this.connectionProfilePool.set(token, profileId);
    const page = await this.browserConnectionService.connect(profileId);
    this.addNewConnection(token, page);

    return this.connectionPool.get(token)!;
  }

  private addNewConnection(token: string, page: Page): void {
    this.connectionPool.set(token, [page, this.pageManipulationService.createCursor(page)]);
  }
}
