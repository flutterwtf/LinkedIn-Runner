import { Page } from 'puppeteer-core';
import { Injectable } from '@nestjs/common';
import { IPageAndCursor } from '@linkedin_runner_module/interfaces/common/page-and-cursor.interface';
import { PageManipulationService } from '@core_modules/puppeteer_module/page-manipulation.service';

@Injectable()
export class AdditionalPageService {
  private readonly additionalPages: Map<string, IPageAndCursor> = new Map();

  constructor(private readonly pageManipulationService: PageManipulationService) {}

  public add(browserProfile: string, additionalPage: Page): void {
    this.additionalPages.set(browserProfile, {
      page: additionalPage,
      cursor: this.pageManipulationService.createCursor(additionalPage),
    });
  }

  public getPageAndCursor(browserProfile: string): IPageAndCursor | undefined {
    return this.additionalPages.get(browserProfile);
  }

  public remove(browserProfile: string): void {
    this.additionalPages.delete(browserProfile);
  }
}
