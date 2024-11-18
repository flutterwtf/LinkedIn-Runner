import { generateRandomValue } from '@common/utils/generate-random-value';
import { IClickOptions } from '@core_modules/puppeteer_module/interfaces/click-options.interface';
import { IMoveOptions } from '@core_modules/puppeteer_module/interfaces/move-options.interface';
import { IPoint } from '@core_modules/puppeteer_module/interfaces/point.interface';
import { TTarget } from '@core_modules/puppeteer_module/types/target.type';
import { Injectable } from '@nestjs/common';
import { ElementHandle, Page, Viewport } from 'puppeteer-core';
import { setTimeout } from 'timers/promises';
import { CursorService } from './cursor.service';
import { MouseTargetCalculationService } from './mouse-target-calculation.service';
import { WindMouseService } from './wind-mouse.service';

@Injectable()
export class MouseControlService {
  private readonly pagePositions = new Map<Page, IPoint>();

  constructor(
    private readonly mouseTargetCalculationService: MouseTargetCalculationService,
    private readonly windMouseService: WindMouseService,
    private readonly cursorService: CursorService,
  ) {}

  public async setMouseCursor(page: Page): Promise<void> {
    await this.cursorService.installMouseHelper(page);

    const viewport = this.getViewport(page);

    const initialPosition = {
      x: viewport.width / 2,
      y: viewport.height / 2,
    };

    this.pagePositions.set(page, initialPosition);
    await page.mouse.move(initialPosition.x, initialPosition.y);
  }

  public async click({
    page,
    target,
    options = {},
  }: {
    page: Page;
    target?: TTarget;
    options?: IClickOptions;
  }): Promise<void> {
    if (target) {
      await this.ensureTargetVisibility(page, target);
      await this.move({
        page,
        target,
      });
    }

    if (options.hesitate) {
      await setTimeout(options.hesitate);
    }

    await page.mouse.down();
    await setTimeout(generateRandomValue(10));
    await page.mouse.up();

    if (options.waitForClick) {
      await setTimeout(options.waitForClick);
    }
  }

  private async ensureTargetVisibility(page: Page, target: TTarget): Promise<void> {
    if (typeof target === 'string' || target instanceof ElementHandle) {
      const element = typeof target === 'string' ? await page.$(target) : target;

      if (!element) {
        throw new Error('Target element not found');
      }

      const isVisible = await element.isIntersectingViewport();

      if (!isVisible) {
        await element.evaluate((el) => {
          el.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center',
          });
        });

        await setTimeout(generateRandomValue(1000));
      }
    }
  }

  public async move({
    page,
    target,
    options = {},
  }: {
    page: Page;
    target: TTarget;
    options?: IMoveOptions;
  }): Promise<void> {
    await this.setupMousePositionTracking(page);
    this.setupPageLoadHandler(page);

    await this.ensureTargetVisibility(page, target);

    const targetPoint = await this.mouseTargetCalculationService.calcTargetPoint(
      page,
      target,
      options,
    );
    const movementPoints = this.generateMovementPoints(page, targetPoint);
    await this.executeMouseMovement(page, movementPoints);

    this.pagePositions.set(page, targetPoint);
  }

  private async setupMousePositionTracking(page: Page): Promise<void> {
    const currPosition = this.getCurrPosition(page);

    await page.evaluateOnNewDocument(`
      window.addEventListener('beforeunload', () => {
        window.__lastMousePosition = {
          x: ${currPosition.x},
          y: ${currPosition.y}
        };
      });
    `);
  }

  private setupPageLoadHandler(page: Page): void {
    page.on('load', async () => {
      const position = this.getCurrPosition(page);
      await page.mouse.move(position.x, position.y);
    });
  }

  private getViewport(page: Page): Viewport {
    const viewport = page.viewport();
    if (!viewport) {
      throw new Error('Viewport is not set');
    }

    return viewport;
  }

  private generateMovementPoints(page: Page, targetPoint: IPoint): Array<IPoint> {
    const currPosition = this.getCurrPosition(page);

    return this.windMouseService.generatePoints(currPosition, targetPoint);
  }

  private async executeMouseMovement(page: Page, points: Array<IPoint>): Promise<void> {
    for (const { x, y } of points) {
      await page.mouse.move(x, y);
      await setTimeout(generateRandomValue(2));
    }
  }

  private getCurrPosition(page: Page): IPoint {
    return (
      this.pagePositions.get(page) || {
        x: 0,
        y: 0,
      }
    );
  }
}
