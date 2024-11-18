import { ElementHandle } from 'puppeteer-core';
import { IPoint } from '../interfaces/point.interface';

export type TTarget = string | ElementHandle | IPoint;
