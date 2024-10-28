import { defineUpdate } from '@temporalio/workflow';
import { IEvaluateActivityInput } from '../activities/interfaces/evaluate-activity-input.interface';
import { IMultiEvaluateActivityInput } from '../activities/interfaces/multi-evaluate-activity-input.interface';

export const workflowUpdates = {
  clickOnSelectorAndOpenNewPage: defineUpdate<string, [{ selector: string }]>(
    'clickOnSelectorAndOpenNewPage',
  ),
  closePage: defineUpdate<void, [object]>('closePage'),
  getCurrentUrl: defineUpdate<string, [object]>('getCurrentUrl'),
  reloadPage: defineUpdate<void, [object]>('reloadPage'),
  evaluate: defineUpdate<unknown, [IEvaluateActivityInput]>('evaluate'),
  multiEvaluate: defineUpdate<unknown, [IMultiEvaluateActivityInput]>('multiEvaluate'),
};
