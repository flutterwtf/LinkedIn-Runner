import { Page } from 'puppeteer-core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AdditionalPageService {
  private readonly additionalPages: Map<string, Page> = new Map();

  public add(browserProfile: string, additionalPage: Page): void {
    this.additionalPages.set(browserProfile, additionalPage);
  }

  public getPageAndCursor(browserProfile: string): Page | undefined {
    return this.additionalPages.get(browserProfile);
  }

  public remove(browserProfile: string): void {
    this.additionalPages.delete(browserProfile);
  }
}
