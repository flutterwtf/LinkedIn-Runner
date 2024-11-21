import { Injectable } from '@nestjs/common';
import puppeteer, { Browser, Page } from 'puppeteer-core';
import { CursorUtil } from './utils/cursor-util';
import { VIEW_PORT } from './constants/view-port';

@Injectable()
export class BrowserConnectionService {
  private readonly browserMap: Map<Page, Browser> = new Map();

  constructor(private readonly cursorUtil: CursorUtil) {}

  public async connect(profileId: string): Promise<Page> {
    const browser = await this.launchBrowser(profileId);

    const page = await this.createPageAndSetToMap(browser);
    await this.closeAllUselessPages(browser);

    return page;
  }

  public getBrowserByPage(page: Page): Browser | undefined {
    return this.browserMap.get(page);
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

  private async closeAllUselessPages(browser: Browser): Promise<void> {
    const pages = await browser.pages();
    const pagesToClose = pages.slice(0, -1);

    await Promise.all(
      pagesToClose.map(async (page) => {
        await page.close();
      }),
    );
  }

  private async createPageAndSetToMap(browser: Browser): Promise<Page> {
    const page = await browser.newPage();
    this.browserMap.set(page, browser);

    const { width, height, deviceScaleFactor } = VIEW_PORT;
    await page.setViewport({
      width,
      height,
      deviceScaleFactor,
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
