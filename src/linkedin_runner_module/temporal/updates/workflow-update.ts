import { ISelector } from '@linkedin_runner_module/interfaces/common/selector.interface';
import { IText } from '@linkedin_runner_module/interfaces/common/text.interface';
import { ITimeout } from '@linkedin_runner_module/interfaces/common/timeout.interface';
import { defineUpdate } from '@temporalio/workflow';

export const WORKFLOW_UPDATE = {
  clickOnSelectorAndOpenNewPage: defineUpdate<string, [ISelector]>('clickOnSelectorAndOpenNewPage'),
  closeAdditionalPage: defineUpdate<void, [object]>('closeAdditionalPage'),
  getCurrentUrl: defineUpdate<string, [object]>('getCurrentUrl'),
  reloadPage: defineUpdate<void, [object]>('reloadPage'),
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
  scroll: defineUpdate<void, [object]>('scroll'),
  scrollToBottom: defineUpdate<void, [object]>('scrollToBottom'),
  scrollToTop: defineUpdate<void, [object]>('scrollToTop'),
  waitAndCheckIfSelectorExists: defineUpdate<boolean, [ITimeout & ISelector]>(
    'waitAndCheckIfSelectorExists',
  ),
  waitForSelector: defineUpdate<void, [ITimeout & ISelector]>('waitForSelector'),
} as const;
