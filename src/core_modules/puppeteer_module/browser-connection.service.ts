import { Injectable } from '@nestjs/common';
import puppeteer, { Browser, Page } from 'puppeteer-core';
import { VIEW_PORT } from './constants/view-port';
import { MouseControlService } from './services/mouse/mouse-control.service';

@Injectable()
export class BrowserConnectionService {
  private readonly browserMap: Map<Page, Browser> = new Map();

  constructor(private readonly mouseControlService: MouseControlService) {}

  public async connect(profileId: string): Promise<Page> {
    const browser = await this.launchBrowser(profileId);
    await this.closeAllPages(browser);

    return this.createPageAndSetToMap(browser);
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

  private async closeAllPages(browser: Browser): Promise<void> {
    const pages = await browser.pages();
    for (const page of pages) {
      await page.close();
    }
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
    await this.mouseControlService.setMouseCursor(page);

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
