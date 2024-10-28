import { Injectable } from '@nestjs/common';
import puppeteer, { Browser, Page } from 'puppeteer-core';
import { CursorUtil } from './utils/cursor-util';

@Injectable()
export class BrowserConnectionService {
  private readonly browserMap: Map<Page, Browser> = new Map();

  constructor(private readonly cursorUtil: CursorUtil) {}

  public async connect(profileId: string): Promise<Page> {
    const browser = await this.launchBrowser(profileId);
    await this.closeAllPages(browser);

    return this.createPageAndSetToMap(browser);
  }

  public getBrowserByPage(page: Page): Browser | undefined {
    return this.browserMap.get(page);
  }

  public deleteFromBrowserMap(page: Page): void {
    this.browserMap.delete(page);
  }

  public async recreatePage(browserPage: Page): Promise<Page> {
    const browser = this.browserMap.get(browserPage)!;
    this.browserMap.delete(browserPage);
    await browserPage.close();

    return this.createPageAndSetToMap(browser);
  }

  public async closeBrowser(browserPage: Page): Promise<void> {
    const browser = this.browserMap.get(browserPage)!;

    await browserPage.close();
    await browser.close();

    this.browserMap.delete(browserPage);
  }

  public getBrowser(browserPage: Page): Browser {
    const browser = this.browserMap.get(browserPage);
    if (!browser) {
      throw new Error('Browser not found for the given page');
    }
    return browser;
  }

  private async launchBrowser(profileId: string): Promise<Browser> {
    const commonArgs = [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--disable-gpu',
      '--no-default-browser-check',
    ];
    const { userDataDir, executablePath } = this.getConfigForTargetOs(profileId);

    return puppeteer.launch({
      headless: false,
      args: [...commonArgs, `--user-data-dir=${userDataDir}`],
      executablePath,
    });
  }

  private async closeAllPages(browser: Browser): Promise<void> {
    const pages = await browser.pages();
    for (const page of pages) {
      await page.close();
    }
  }

  private async createPageAndSetToMap(browser: Browser): Promise<Page> {
    const page = await browser.newPage();
    this.browserMap.set(page, browser);
    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
    });
    await this.cursorUtil.installMouseHelper(page);

    return page;
  }

  private getConfigForTargetOs(profileId: string): {
    userDataDir: string;
    executablePath: string;
  } {
    const configs = {
      linux: {
        userDataDir: `/home/ubuntu/.config/google-chrome/${profileId}`,
        executablePath: '/usr/bin/google-chrome-stable',
      },
      darwin: {
        userDataDir: `${process.env.HOME}/Library/Application Support/Google/Chrome/${profileId}`,
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      },
      win32: {
        userDataDir: `${process.env.LOCALAPPDATA}\\Google\\Chrome\\User Data\\${profileId}`,
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      },
    };

    const config = configs[process.platform as keyof typeof configs];
    if (!config) {
      throw new Error('Unsupported operating system');
    }

    return config;
  }
}
