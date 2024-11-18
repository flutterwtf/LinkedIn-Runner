import { IMoveOptions } from '@core_modules/puppeteer_module/interfaces/move-options.interface';
import { IPoint } from '@core_modules/puppeteer_module/interfaces/point.interface';
import { TTarget } from '@core_modules/puppeteer_module/types/target.type';
import { Injectable } from '@nestjs/common';
import { ElementHandle, Page } from 'puppeteer-core';

@Injectable()
export class MouseTargetCalculationService {
  public async calcTargetPoint(
    page: Page,
    target: TTarget,
    { waitForSelector, paddingPercentage }: IMoveOptions,
  ): Promise<IPoint> {
    if (this.isPoint(target)) {
      return target as IPoint;
    }

    let element: ElementHandle;
    if (typeof target === 'string') {
      if (waitForSelector) {
        await page.waitForSelector(target, { timeout: waitForSelector });
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

    const padding = paddingPercentage ? paddingPercentage / 100 : 0.1;
    const minX = box.x + box.width * padding;
    const maxX = box.x + box.width * (1 - padding);
    const minY = box.y + box.height * padding;
    const maxY = box.y + box.height * (1 - padding);

    return {
      x: minX + Math.random() * (maxX - minX),
      y: minY + Math.random() * (maxY - minY),
    };
  }

  private isPoint(target: TTarget): target is IPoint {
    return typeof target === 'object' && 'x' in target && 'y' in target;
  }
}
