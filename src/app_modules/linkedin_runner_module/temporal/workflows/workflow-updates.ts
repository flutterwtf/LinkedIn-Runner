import { defineUpdate } from '@temporalio/workflow';
import { IEvaluateActivityInput } from '../activities/interfaces/evaluate-activity-input.interface';
import { IMultiEvaluateActivityInput } from '../activities/interfaces/multi-evaluate-activity-input.interface';
import { ISelector } from '../../interfaces/common/selector.interface';
import { ITimeout } from '../../interfaces/common/timeout.interface';

export const WORKFLOW_UPDATES = {
  clickOnSelectorAndOpenNewPage: defineUpdate<string, [ISelector]>('clickOnSelectorAndOpenNewPage'),
  closePage: defineUpdate<void, [object]>('closePage'),
  getCurrentUrl: defineUpdate<string, [object]>('getCurrentUrl'),
  isPageClosed: defineUpdate<boolean, [object]>('isPageClosed'),
  reloadPage: defineUpdate<void, [object]>('reloadPage'),
  evaluate: defineUpdate<unknown, [IEvaluateActivityInput]>('evaluate'),
  multiEvaluate: defineUpdate<unknown, [IMultiEvaluateActivityInput]>('multiEvaluate'),
  extractLinksFromSelector: defineUpdate<Array<string>, [ISelector]>('extractLinksFromSelector'),
  extractSelectorContent: defineUpdate<string, [ISelector]>('extractSelectorContent'),
  extractTextsFromSelector: defineUpdate<Array<string>, [ISelector]>('extractTextsFromSelector'),
  goBack: defineUpdate<void, [object]>('goBack'),
  goToPage: defineUpdate<void, [{ page: string }]>('goToPage'),
  moveCursorAndScrollRandomly: defineUpdate<void, [object]>('moveCursorAndScrollRandomly'),
  moveCursorToSelectorAndClick: defineUpdate<void, [ISelector]>('moveCursorToSelectorAndClick'),
  moveCursorToSelectorAndType: defineUpdate<void, [{ text: string } & ISelector]>(
    'moveCursorToSelectorAndType',
  ),
  scrollBy: defineUpdate<number, [object]>('scrollBy'),
  scrollToTop: defineUpdate<void, [object]>('scrollToTop'),
  waitAndCheckIfSelectorExists: defineUpdate<boolean, [ITimeout & ISelector]>(
    'waitAndCheckIfSelectorExists',
  ),
  waitForSelector: defineUpdate<void, [ITimeout & ISelector]>('waitForSelector'),
} as const;
