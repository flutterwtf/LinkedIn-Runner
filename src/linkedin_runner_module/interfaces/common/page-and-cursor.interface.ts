import { GhostCursor } from 'ghost-cursor';
import { Page } from 'puppeteer-core';

export interface IPageAndCursor {
  page: Page;
  cursor: GhostCursor;
}
