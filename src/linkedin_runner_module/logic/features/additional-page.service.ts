import { Page } from 'puppeteer-core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AdditionalPageService {
  private readonly additionalPages: Map<Page, Page> = new Map();

  public add(originalPage: Page, additionalPage: Page): void {
    this.additionalPages.set(originalPage, additionalPage);
  }

  public get(originalPage: Page): Page | undefined {
    return this.additionalPages.get(originalPage);
  }

  public remove(originalPage: Page): void {
    this.additionalPages.delete(originalPage);
  }
}
