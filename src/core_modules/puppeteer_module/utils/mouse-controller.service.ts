import { generateRandomValue } from '@common/utils/generate-random-value';
import { Injectable } from '@nestjs/common';
import { ElementHandle, Page } from 'puppeteer-core';
import { setTimeout } from 'timers/promises';
import { Point, WindMouse } from './wind-mouse';

@Injectable()
export class MouseControllerService {
  private readonly windMouse = new WindMouse();
  private currentPosition: Point = {
    x: 0,
    y: 0,
  };

  public getCurrentPosition(): Point {
    return { ...this.currentPosition };
  }

  async move(
    page: Page,
    target: string | ElementHandle | Point,
    options: {
      waitForSelector?: number;
      paddingPercentage?: number;
    } = {},
  ): Promise<void> {
    await page.evaluateOnNewDocument(`
          window.addEventListener('beforeunload', () => {
            window.__lastMousePosition = { 
              x: ${this.currentPosition.x}, 
              y: ${this.currentPosition.y} 
            };
          });
        `);

    // Добавляем слушатель для восстановления позиции после загрузки
    page.on('load', async () => {
      await page.mouse.move(this.currentPosition.x, this.currentPosition.y);
    });

    const startPosition = { ...this.currentPosition };

    const viewport = await page.viewport();
    if (!viewport) {
      throw new Error('Viewport is not set');
    }

    const targetPoint = await this.getTargetPoint(page, target, options);
    const points = await this.windMouse.generatePoints(startPosition, targetPoint, {
      width: viewport.width,
      height: viewport.height,
    });

    for (const point of points) {
      await page.mouse.move(point.x, point.y);
      await setTimeout(generateRandomValue(2));
    }

    this.currentPosition = targetPoint;
  }

  async setInitialPosition(page: Page): Promise<void> {
    const viewport = await page.viewport();
    if (!viewport) {
      throw new Error('Viewport is not set');
    }

    this.currentPosition = {
      x: viewport.width / 2,
      y: viewport.height / 2,
    };

    await page.mouse.move(this.currentPosition.x, this.currentPosition.y);
  }

  async click(
    page: Page,
    target?: string | ElementHandle | Point,
    options: {
      waitForClick?: number;
      hesitate?: number;
    } = {},
  ): Promise<void> {
    if (target) {
      await this.move(page, target);
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

  private async getTargetPoint(
    page: Page,
    target: string | ElementHandle | Point,
    options: {
      waitForSelector?: number;
      paddingPercentage?: number;
    },
  ): Promise<Point> {
    if (this.isPoint(target)) {
      return target as Point;
    }

    let element: ElementHandle;
    if (typeof target === 'string') {
      if (options.waitForSelector) {
        await page.waitForSelector(target, { timeout: options.waitForSelector });
      }
      element = (await page.$(target))!;
    } else {
      element = target as ElementHandle;
    }

    if (!element) {
      throw new Error('Target element not found');
    }

    const box = await element.boundingBox();
    if (!box) {
      throw new Error('Unable to get element boundaries');
    }

    if (box.width < 30 || box.height < 30) {
      return {
        x: box.x + box.width / 2,
        y: box.y + box.height / 2,
      };
    }

    const padding = options.paddingPercentage ? options.paddingPercentage / 100 : 0.1;
    const minX = box.x + box.width * padding;
    const maxX = box.x + box.width * (1 - padding);
    const minY = box.y + box.height * padding;
    const maxY = box.y + box.height * (1 - padding);

    return {
      x: minX + Math.random() * (maxX - minX),
      y: minY + Math.random() * (maxY - minY),
    };
  }

  private isPoint(target: string | ElementHandle | Point): target is Point {
    return typeof target === 'object' && 'x' in target && 'y' in target;
  }
}
