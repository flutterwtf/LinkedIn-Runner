import { PAGE_TYPE, TPageType } from '@linkedin_runner_module/constants/page-type';
import { Injectable } from '@nestjs/common';
import { Page } from 'puppeteer-core';
import { AdditionalPageService } from './additional-page.service';
import { OriginalPageService } from './original-page.service';

@Injectable()
export class PageService {
  constructor(
    private readonly originalPageService: OriginalPageService,
    private readonly additionalPageService: AdditionalPageService,
  ) {}

  public async getPageAndCursor(
    browserProfile: string,
    pageType: TPageType = PAGE_TYPE.original,
  ): Promise<Page> {
    if (pageType === PAGE_TYPE.original) {
      return this.originalPageService.getPageAndCursorOrConnect(browserProfile);
    }

    const additionalPage = this.additionalPageService.getPageAndCursor(browserProfile);
    if (!additionalPage) {
      throw new Error("There isn't an additional page!");
    }

    return additionalPage;
  }

  public addAdditionalPage(browserProfile: string, additionalPage: Page): void {
    return this.additionalPageService.add(browserProfile, additionalPage);
  }

  public removeAdditionalPage(browserProfile: string): void {
    return this.additionalPageService.remove(browserProfile);
  }
}
