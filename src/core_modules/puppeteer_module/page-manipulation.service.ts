import { Injectable } from '@nestjs/common';
import { generateRandomValue } from '@common/utils/get-random-value';
import { GhostCursor, createCursor } from 'ghost-cursor';
import { ElementHandle, Page } from 'puppeteer-core';
import { CursorUtil } from './utils/cursor-util';
import { BrowserConnectionService } from './browser-connection.service';

@Injectable()
export class PageManipulationService {
  private readonly navigationTimeout = 90000;
  private readonly waitingSelectorTimeout = 20000;
  private readonly checkingExistenceTimeout = 5000;

  constructor(
    private readonly cursorUtil: CursorUtil,
    private readonly browserConnectionService: BrowserConnectionService,
  ) {}

  public async clickOnSelectorAndOpenNewPage({
    browserPage,
    cursor,
    selector,
  }: {
    browserPage: Page;
    cursor: GhostCursor;
    selector: string;
  }): Promise<Page> {
    const browser = this.browserConnectionService.getBrowserByPage(browserPage)!;
    let newPage: Page | null = null;

    try {
      [newPage] = await Promise.all([
        new Promise<Page>((resolve) => {
          browser.once('targetcreated', async (target) => resolve((await target.page())!));
        }),
        this.moveCursorToSelectorAndClick(cursor, selector),
      ]);

      if (!newPage) {
        throw new Error('New page was not created');
      }

      await newPage.setViewport({
        width: 1920,
        height: 1080,
        deviceScaleFactor: 1,
      });
      await this.cursorUtil.installMouseHelper(newPage);
      await this.reload(newPage);

      return newPage;
    } catch (err) {
      if (newPage) {
        await newPage.close();
      }

      throw err;
    }
  }

  public async reload(browserPage: Page): Promise<void> {
    await browserPage.reload({ waitUntil: ['domcontentloaded', 'load'] });
  }

  public async closePage(browserPage: Page): Promise<void> {
    return browserPage.close();
  }

  public createCursor(browserPage: Page): GhostCursor {
    return createCursor(browserPage, {
      x: generateRandomValue(300),
      y: generateRandomValue(500),
    });
  }

  public getCurrentUrl(browserPage: Page): string {
    return browserPage.url();
  }

  public async querySelector(
    browserPage: Page,
    selector: string,
  ): Promise<ElementHandle<Element> | null> {
    await browserPage.waitForSelector(selector, { timeout: this.waitingSelectorTimeout });

    return browserPage.$(selector);
  }

  public async querySelectorAll(
    browserPage: Page,
    selector: string,
  ): Promise<Array<ElementHandle<Element>>> {
    await browserPage.waitForSelector(selector, { timeout: this.waitingSelectorTimeout });

    return browserPage.$$(selector);
  }

  public async evaluate<T>({
    browserPage,
    pageFunction,
    selector,
  }: {
    browserPage: Page;
    pageFunction: (selector: string | Element, ...args: Array<unknown>) => T | Promise<T>;
    selector: string | ElementHandle<Element>;
  }): Promise<T> {
    if (typeof selector === 'string') {
      await browserPage.waitForSelector(selector, { timeout: this.waitingSelectorTimeout });
    }

    return browserPage.evaluate(pageFunction, selector);
  }

  public async evaluateHandle<T>({
    browserPage,
    pageFunction,
    selector,
  }: {
    browserPage: Page;
    pageFunction: (selector: string | Element) => T | Promise<T>;
    selector: string | ElementHandle<Element>;
  }) {
    return browserPage.evaluateHandle(pageFunction, selector);
  }

  public async multiEvaluate<T>({
    browserPage,
    pageFunction,
    selector,
  }: {
    browserPage: Page;
    pageFunction: (elements: Array<Element>) => T;
    selector: string;
  }): Promise<T> {
    return browserPage.$$eval(selector, pageFunction);
  }

  public async goToPage(browserPage: Page, page: string): Promise<void> {
    const maxRetries = 3;
    let retries = 0;

    while (retries < maxRetries) {
      try {
        await browserPage.goto(page, {
          waitUntil: ['load', 'domcontentloaded'],
          timeout: this.navigationTimeout,
        });
        return;
      } catch (error) {
        if (
          error instanceof Error &&
          error.message.includes('net::ERR_TOO_MANY_RETRIES') &&
          error.message.includes('net::ERR_INSUFFICIENT_RESOURCES')
        ) {
          retries += 1;

          if (retries < maxRetries) {
            await this.reload(browserPage);
          } else {
            throw error;
          }
        } else {
          throw error;
        }
      }
    }
  }

  public async goBack(browserPage: Page): Promise<void> {
    await browserPage.goBack({
      waitUntil: ['load', 'domcontentloaded'],
      timeout: this.navigationTimeout,
    });
  }

  public async waitAndCheckIfSelectorExists({
    browserPage,
    selector,
    timeout = this.checkingExistenceTimeout,
  }: {
    browserPage: Page;
    selector: string;
    timeout?: number;
  }): Promise<boolean> {
    try {
      await this.waitForSelector({
        browserPage,
        selector,
        timeout,
      });
      const isExist = await this.checkIfSelectorExists(browserPage, selector);

      return isExist;
    } catch {
      return false;
    }
  }

  public async waitForSelector({
    browserPage,
    selector,
    timeout = this.waitingSelectorTimeout,
  }: {
    browserPage: Page;
    selector: string;
    timeout?: number;
  }): Promise<void> {
    await browserPage.waitForSelector(selector, { timeout });
  }

  public async extractTextsFromSelector(
    browserPage: Page,
    selector: string,
  ): Promise<Array<string>> {
    const elements = await browserPage.$$(selector);
    const contents = await Promise.all(
      elements.map(async (element) => {
        const rawText = await element.evaluate((node) => node.textContent?.trim() || '');
        const text = rawText.trim();
        const innerTextElem = await element.$('span');
        const innerText = (await innerTextElem?.evaluate((node) => node.textContent?.trim())) || '';

        return innerTextElem ? innerText : text;
      }),
    );

    return contents;
  }

  public async extractLinksFromSelector(
    browserPage: Page,
    selector: string,
  ): Promise<Array<string>> {
    const elements = await browserPage.$$(selector);
    const contents = await Promise.all(
      elements.map(async (element) => {
        const hrefProperty = await element.getProperty('href');
        const href = (await hrefProperty.jsonValue()) as string;

        return href;
      }),
    );

    return contents;
  }

  public async parseSelectorContent(browserPage: Page, selector: string): Promise<string> {
    await browserPage.waitForSelector(selector, { timeout: this.waitingSelectorTimeout });

    return browserPage.$eval(selector, (el) => (el as HTMLElement).innerText);
  }

  public async moveCursorToSelectorAndType({
    browserPage,
    cursor,
    selector,
    text,
  }: {
    browserPage: Page;
    cursor: GhostCursor;
    selector: string;
    text: string;
  }): Promise<void> {
    await this.moveCursorToSelectorAndClick(cursor, selector);
    await this.clearInputElement(browserPage, selector);
    await this.typeInElement({
      browserPage,
      selector,
      text,
    });
  }

  public async moveCursorAndScrollRandomly(browserPage: Page, cursor: GhostCursor): Promise<void> {
    await cursor.moveTo(
      {
        x: generateRandomValue(1080),
        y: generateRandomValue(1920),
      },
      { randomizeMoveDelay: true },
    );

    await this.scrollBy(browserPage);
  }

  public async scrollBy(browserPage: Page): Promise<number> {
    const scrollPosition = await browserPage.evaluate(() => {
      window.scrollBy({
        top: window.innerHeight,
        behavior: 'smooth',
      });

      return window.scrollY;
    });

    return scrollPosition;
  }

  public async scrollToTop(browserPage: Page): Promise<void> {
    await browserPage.evaluate(() => {
      window.scrollTo({
        top: 0,
      });
    });
  }

  public async moveCursorToSelectorAndClick(
    cursor: GhostCursor,
    selector: string | ElementHandle,
  ): Promise<void> {
    await cursor.move(selector, {
      randomizeMoveDelay: true,
      paddingPercentage: 99,
      waitForSelector: this.waitingSelectorTimeout,
    });
    await cursor.click(selector, {
      waitForClick: generateRandomValue(100),
      hesitate: generateRandomValue(100),
      paddingPercentage: 99,
      waitForSelector: this.waitingSelectorTimeout,
    });
  }

  private async typeInElement({
    browserPage,
    selector,
    text,
  }: {
    browserPage: Page;
    selector: string;
    text: string;
  }): Promise<void> {
    await browserPage.waitForSelector(selector, { timeout: this.waitingSelectorTimeout });

    for (const char of text) {
      await browserPage.type(selector, char, { delay: generateRandomValue(150) });
    }
  }

  private async clearInputElement(browserPage: Page, selector: string): Promise<void> {
    await browserPage.waitForSelector(selector, { timeout: this.waitingSelectorTimeout });

    const inputElement = (await browserPage.$(selector)) as ElementHandle<HTMLInputElement>;
    const inputValue: string = await browserPage.evaluate((el) => el.value, inputElement);

    if (inputValue.trim() !== '') {
      await inputElement.click({ clickCount: 3 });
      await inputElement.press('Backspace');
    }
  }

  private async checkIfSelectorExists(browserPage: Page, selector: string): Promise<boolean> {
    const element = await browserPage.$(selector);

    return element !== null;
  }
}
