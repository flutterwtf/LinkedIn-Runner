import { IEvaluateActivityInput } from '@linkedin_runner_module/interfaces/activities/evaluate-activity-input.interface';
import { IMultiEvaluateActivityInput } from '@linkedin_runner_module/interfaces/activities/multi-evaluate-activity-input.interface';
import { ISelector } from '@linkedin_runner_module/interfaces/common/selector.interface';
import { IText } from '@linkedin_runner_module/interfaces/common/text.interface';
import { ITimeout } from '@linkedin_runner_module/interfaces/common/timeout.interface';
import { defineUpdate } from '@temporalio/workflow';

export const WORKFLOW_UPDATE = {
  clickOnSelectorAndOpenNewPage: defineUpdate<string, [ISelector]>('clickOnSelectorAndOpenNewPage'),
  actCloseAdditionalPage: defineUpdate<boolean, [object]>('actCloseAdditionalPage'),
  getCurrentUrl: defineUpdate<string, [object]>('getCurrentUrl'),
  reloadPage: defineUpdate<void, [object]>('reloadPage'),
  evaluate: defineUpdate<unknown, [IEvaluateActivityInput<unknown>]>('evaluate'),
  multiEvaluate: defineUpdate<unknown, [IMultiEvaluateActivityInput<unknown>]>('multiEvaluate'),
  extractLinksFromSelector: defineUpdate<Array<string>, [ISelector]>('extractLinksFromSelector'),
  extractSelectorContent: defineUpdate<string, [ISelector]>('extractSelectorContent'),
  extractTextsFromSelector: defineUpdate<Array<string>, [ISelector]>('extractTextsFromSelector'),
  goBack: defineUpdate<void, [object]>('goBack'),
  goToPage: defineUpdate<void, [{ page: string }]>('goToPage'),
  moveCursorAndScrollRandomly: defineUpdate<void, [object]>('moveCursorAndScrollRandomly'),
  moveCursorToSelectorAndClick: defineUpdate<void, [ISelector]>('moveCursorToSelectorAndClick'),
  moveCursorToSelectorAndType: defineUpdate<void, [IText & ISelector]>(
    'moveCursorToSelectorAndType',
  ),
  scrollBy: defineUpdate<number, [object]>('scrollBy'),
  scrollToTop: defineUpdate<void, [object]>('scrollToTop'),
  waitAndCheckIfSelectorExists: defineUpdate<boolean, [ITimeout & ISelector]>(
    'waitAndCheckIfSelectorExists',
  ),
  waitForSelector: defineUpdate<void, [ITimeout & ISelector]>('waitForSelector'),
} as const;
