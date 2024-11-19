import { generateRandomValue } from '@common/utils/generate-random-value';
import { Injectable } from '@nestjs/common';
import { Browser, ElementHandle, Page } from 'puppeteer-core';
import { BrowserConnectionService } from '../browser-connection.service';
import { VIEW_PORT } from '../constants/view-port';
import { MouseControlService } from './mouse/mouse-control.service';
import { IPoint } from '../interfaces/point.interface';

@Injectable()
export class PageManipulationService {
  private readonly navigationTimeout = 90000;
  private readonly waitingSelectorTimeout = 20000;
  private readonly checkingExistenceTimeout = 5000;
  private readonly waitingRedirectTimeout = 500;

  constructor(
    private readonly browserConnectionService: BrowserConnectionService,
    private readonly mouseControlService: MouseControlService,
  ) {}

  public async clickOnSelectorAndOpenNewPage({
    page,
    selector,
  }: {
    page: Page;
    selector: string;
  }): Promise<Page> {
    const browser = this.browserConnectionService.getBrowserByPage(page)!;

    const newPage = await this.createNewPage({
      browser,
      page,
      selector,
    });
    await this.setupNewPage(newPage);

    return newPage;
  }

  public async reload(page: Page): Promise<void> {
    await page.reload({ waitUntil: ['domcontentloaded', 'load'] });
  }

  public async closePage(page: Page): Promise<void> {
    return page.close();
  }

  public async getCurrentUrl(page: Page): Promise<string> {
    await this.waitForRedirect(page);

    return page.url();
  }

  public async goToPage(page: Page, url: string): Promise<void> {
    const maxRetries = 3;
    let retries = 0;

    while (retries < maxRetries) {
      try {
        await page.goto(url, {
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
            await this.reload(page);
          } else {
            throw error;
          }
        } else {
          throw error;
        }
      }
    }
  }

  public async goBack(page: Page): Promise<void> {
    await page.goBack({
      waitUntil: ['load', 'domcontentloaded'],
      timeout: this.navigationTimeout,
    });
  }

  public async waitAndCheckIfSelectorExists({
    page,
    selector,
    timeout = this.checkingExistenceTimeout,
  }: {
    page: Page;
    selector: string;
    timeout?: number;
  }): Promise<boolean> {
    try {
      await this.waitForSelector({
        page,
        selector,
        timeout,
      });
      const isExist = await this.checkIfSelectorExists(page, selector);

      return isExist;
    } catch {
      return false;
    }
  }

  public async waitForSelector({
    page,
    selector,
    timeout = this.waitingSelectorTimeout,
  }: {
    page: Page;
    selector: string;
    timeout?: number;
  }): Promise<void> {
    await page.waitForSelector(selector, { timeout });
  }

  public async extractTextsFromSelector(page: Page, selector: string): Promise<Array<string>> {
    const elements = await page.$$(selector);
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

  public async extractLinksFromSelector(page: Page, selector: string): Promise<Array<string>> {
    const elements = await page.$$(selector);
    const contents = await Promise.all(
      elements.map(async (element) => {
        const hrefProperty = await element.getProperty('href');
        const href = (await hrefProperty.jsonValue()) as string;

        return href;
      }),
    );

    return contents;
  }

  public async parseSelectorContent(page: Page, selector: string): Promise<string> {
    await page.waitForSelector(selector, { timeout: this.waitingSelectorTimeout });

    return page.$eval(selector, (el) => (el as HTMLElement).innerText);
  }

  public async moveCursorToSelectorAndType({
    page,
    selector,
    text,
  }: {
    page: Page;
    selector: string;
    text: string;
  }): Promise<void> {
    await this.moveCursorToSelectorAndClick(page, selector);
    await this.clearInputElement(page, selector);
    await this.typeInElement({
      page,
      selector,
      text,
    });
  }

  public async moveCursorAndScrollRandomly(page: Page): Promise<void> {
    const { width, height } = VIEW_PORT;
    const randomPoint: IPoint = {
      x: generateRandomValue(width),
      y: generateRandomValue(height),
    };

    await this.mouseControlService.move({
      page,
      target: randomPoint,
    });
    await this.scrollBy(page);
  }

  public async scrollBy(page: Page): Promise<number> {
    const scrollPosition = await page.evaluate(() => {
      window.scrollBy({
        top: window.innerHeight,
        behavior: 'smooth',
      });

      return window.scrollY;
    });

    return scrollPosition;
  }

  public async scrollToTop(page: Page): Promise<void> {
    await page.evaluate(() => {
      window.scrollTo({
        top: 0,
      });
    });
  }

  public async scrollToBottom(page: Page, selector?: string): Promise<void> {
    await page.evaluate(
      async (elementSelector?: string) =>
        new Promise<void>((resolve) => {
          if (!elementSelector) {
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: 'smooth',
            });
            setTimeout(resolve, 1000);
            return;
          }

          const element = document.querySelector(elementSelector)!;
          if (!element) {
            resolve();
            return;
          }

          const currentPosition = element.scrollTop;
          const targetPosition = element.scrollHeight;
          const duration = Math.random() * 3000 + 3000;
          const startTime = performance.now();

          function smoothScroll(timestamp: number) {
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease =
              progress < 0.5
                ? 4 * progress * progress * progress
                : 1 - (-2 * progress + 2) ** 3 / 2;

            element.scrollTop = currentPosition + (targetPosition - currentPosition) * ease;

            if (progress < 1) {
              requestAnimationFrame(smoothScroll);
            } else {
              resolve();
            }
          }

          requestAnimationFrame(smoothScroll);
        }),
      selector,
    );
  }

  public async moveCursorToSelectorAndClick(
    page: Page,
    selector: string | ElementHandle,
  ): Promise<void> {
    await this.mouseControlService.move({
      page,
      target: selector,
      options: {
        waitForSelector: this.waitingSelectorTimeout,
        paddingPercentage: 99,
      },
    });
    await this.mouseControlService.click({
      page,
      options: {
        waitForClick: generateRandomValue(100),
        hesitate: generateRandomValue(100),
      },
    });
  }

  private async createNewPage({
    browser,
    page,
    selector,
  }: {
    browser: Browser;
    page: Page;
    selector: string;
  }): Promise<Page> {
    const [newPage] = await Promise.all([
      new Promise<Page>((resolve) => {
        browser.once('targetcreated', async (target) => resolve((await target.page())!));
      }),
      this.moveCursorToSelectorAndClick(page, selector),
    ]);

    if (!newPage) {
      throw new Error('New page was not created');
    }

    return newPage;
  }

  private async setupNewPage(newPage: Page): Promise<void> {
    try {
      const { width, height, deviceScaleFactor } = VIEW_PORT;
      await newPage.setViewport({
        width,
        height,
        deviceScaleFactor,
      });

      await this.mouseControlService.setMouseCursor(newPage);
      await this.reload(newPage);
    } catch (err) {
      if (newPage) {
        await newPage.close();
      }

      throw err;
    }
  }

  private async typeInElement({
    page,
    selector,
    text,
  }: {
    page: Page;
    selector: string;
    text: string;
  }): Promise<void> {
    await page.waitForSelector(selector, { timeout: this.waitingSelectorTimeout });

    for (const char of text) {
      await page.type(selector, char, { delay: generateRandomValue(150) });
    }
  }

  private async clearInputElement(page: Page, selector: string): Promise<void> {
    await page.waitForSelector(selector, { timeout: this.waitingSelectorTimeout });

    const inputElement = (await page.$(selector)) as ElementHandle<HTMLInputElement>;
    const inputValue: string = await page.evaluate((el) => el.value, inputElement);

    if (inputValue.trim() !== '') {
      await inputElement.click({ clickCount: 3 });
      await inputElement.press('Backspace');
    }
  }

  private async checkIfSelectorExists(page: Page, selector: string): Promise<boolean> {
    const element = await page.$(selector);

    return element !== null;
  }

  private async waitForRedirect(page: Page): Promise<void> {
    try {
      await page.waitForNetworkIdle({ timeout: this.waitingRedirectTimeout });
      // eslint-disable-next-line no-empty
    } catch {}
  }
}
