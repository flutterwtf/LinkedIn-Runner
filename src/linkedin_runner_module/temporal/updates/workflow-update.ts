import { ISelector } from '@linkedin_runner_module/interfaces/common/selector.interface';
import { IText } from '@linkedin_runner_module/interfaces/common/text.interface';
import { ITimeout } from '@linkedin_runner_module/interfaces/common/timeout.interface';
import { defineUpdate } from '@temporalio/workflow';
import { IWorkflowUpdateInput } from './workflow-update-input.interface';

export const WORKFLOW_UPDATE = {
  clickOnSelectorAndOpenAdditionalPage: defineUpdate<string, [IWorkflowUpdateInput<ISelector>]>(
    'clickOnSelectorAndOpenAdditionalPage',
  ),
  closeAdditionalPage: defineUpdate<void, [IWorkflowUpdateInput<object>]>('closeAdditionalPage'),
  getCurrentUrl: defineUpdate<string, [IWorkflowUpdateInput<object>]>('getCurrentUrl'),
  reloadPage: defineUpdate<void, [IWorkflowUpdateInput<object>]>('reloadPage'),
  extractLinksFromSelector: defineUpdate<Array<string>, [IWorkflowUpdateInput<ISelector>]>(
    'extractLinksFromSelector',
  ),
  extractSelectorContent: defineUpdate<string, [IWorkflowUpdateInput<ISelector>]>(
    'extractSelectorContent',
  ),
  extractTextsFromSelector: defineUpdate<Array<string>, [IWorkflowUpdateInput<ISelector>]>(
    'extractTextsFromSelector',
  ),
  goBack: defineUpdate<void, [IWorkflowUpdateInput<object>]>('goBack'),
  goToPage: defineUpdate<void, [IWorkflowUpdateInput<{ page: string }>]>('goToPage'),
  moveCursorAndScrollRandomly: defineUpdate<void, [IWorkflowUpdateInput<object>]>(
    'moveCursorAndScrollRandomly',
  ),
  moveCursorToSelectorAndClick: defineUpdate<void, [IWorkflowUpdateInput<ISelector>]>(
    'moveCursorToSelectorAndClick',
  ),
  moveCursorToSelectorAndType: defineUpdate<void, [IWorkflowUpdateInput<IText & ISelector>]>(
    'moveCursorToSelectorAndType',
  ),
  scroll: defineUpdate<void, [IWorkflowUpdateInput<object>]>('scroll'),
  scrollToBottom: defineUpdate<void, [IWorkflowUpdateInput<object>]>('scrollToBottom'),
  scrollToTop: defineUpdate<void, [IWorkflowUpdateInput<object>]>('scrollToTop'),
  waitAndCheckIfSelectorExists: defineUpdate<boolean, [IWorkflowUpdateInput<ITimeout & ISelector>]>(
    'waitAndCheckIfSelectorExists',
  ),
  waitForSelector: defineUpdate<void, [IWorkflowUpdateInput<ITimeout & ISelector>]>(
    'waitForSelector',
  ),
} as const;
