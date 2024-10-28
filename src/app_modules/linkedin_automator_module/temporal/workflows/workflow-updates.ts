import { defineUpdate } from '@temporalio/workflow';
import { IEvaluateActivityInput } from '../activities/interfaces/evaluate-activity-input.interface';
import { IMultiEvaluateActivityInput } from '../activities/interfaces/multi-evaluate-activity-input.interface';
import { ISelector } from '../activities/interfaces/common/selector.interface';

export const workflowUpdates = {
  clickOnSelectorAndOpenNewPage: defineUpdate<unknown, [ISelector]>(
    'clickOnSelectorAndOpenNewPage',
  ),
  closePage: defineUpdate<unknown, [object]>('closePage'),
  getCurrentUrl: defineUpdate<unknown, [object]>('getCurrentUrl'),
  reloadPage: defineUpdate<unknown, [object]>('reloadPage'),
  evaluate: defineUpdate<unknown, [IEvaluateActivityInput]>('evaluate'),
  multiEvaluate: defineUpdate<unknown, [IMultiEvaluateActivityInput]>('multiEvaluate'),
  extractLinksFromSelector: defineUpdate<unknown, [ISelector]>('extractLinksFromSelector'),
  extractSelectorContent: defineUpdate<unknown, [ISelector]>('extractSelectorContent'),
  extractTextsFromSelector: defineUpdate<unknown, [ISelector]>('extractTextsFromSelector'),
  goBack: defineUpdate<unknown, [object]>('goBack'),
  goToPage: defineUpdate<unknown, [{ page: string }]>('goToPage'),
  moveCursorAndScrollRandomly: defineUpdate<unknown, [object]>('moveCursorAndScrollRandomly'),
  moveCursorToSelectorAndClick: defineUpdate<unknown, [ISelector]>('moveCursorToSelectorAndClick'),
  moveCursorToSelectorAndType: defineUpdate<unknown, [{ text: string }]>(
    'moveCursorToSelectorAndType',
  ),
  scrollBy: defineUpdate<unknown, [object]>('scrollBy'),
  scrollToTop: defineUpdate<unknown, [object]>('scrollToTop'),
  waitAndCheckIfSelectorExists: defineUpdate<unknown, [{ timeout: number } & ISelector]>(
    'waitAndCheckIfSelectorExists',
  ),
  waitForSelector: defineUpdate<unknown, [{ timeout: number } & ISelector]>('waitForSelector'),
};
