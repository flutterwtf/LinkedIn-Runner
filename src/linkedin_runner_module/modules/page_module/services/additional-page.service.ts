import { Page } from 'puppeteer-core';
import { Injectable } from '@nestjs/common';
import { IPageAndCursor } from '@linkedin_runner_module/interfaces/common/page-and-cursor.interface';
import { GhostCursor } from 'ghost-cursor';

@Injectable()
export class AdditionalPageService {
  private readonly additionalPages: Map<string, IPageAndCursor> = new Map();

  public add(browserProfile: string, additionalPage: Page): void {
    this.additionalPages.set(browserProfile, {
      page: additionalPage,
      cursor: {} as GhostCursor,
    });
  }

  public getPageAndCursor(browserProfile: string): IPageAndCursor | undefined {
    return this.additionalPages.get(browserProfile);
  }

  public remove(browserProfile: string): void {
    this.additionalPages.delete(browserProfile);
  }
}
