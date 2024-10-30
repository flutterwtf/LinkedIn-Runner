import { setHandler } from '@temporalio/workflow';
import {
  actClosePage,
  actEvaluate,
  actExtractLinksFromSelector,
  actExtractSelectorContent,
  actExtractTextsFromSelector,
  actGetCurrentUrl,
  actGoBack,
  actGoToPage,
  actIsPageClosed,
  actMoveCursorAndScrollRandomly,
  actMoveCursorToSelectorAndClick,
  actMoveCursorToSelectorAndType,
  actMultiEvaluate,
  actReloadPage,
  actScrollBy,
  actScrollToTop,
  actWaitAndCheckIfSelectorExists,
  actWaitForSelector,
} from '../activities/activities.export';
import { createActivityInput } from '../activities/utils/create-activity-input';
import { IMultiEvaluateActivityInput } from '../activities/interfaces/multi-evaluate-activity-input.interface';
import { WORKFLOW_UPDATES } from './workflow-updates';
import { IEvaluateActivityInput } from '../activities/interfaces/evaluate-activity-input.interface';
import { ISelector } from '../../interfaces/common/selector.interface';

export async function pageManipulationWorkflow({
  accountToken,
}: {
  accountToken: string;
}): Promise<void> {
  const handlers = {
    clickOnSelectorAndOpenNewPage: (input: ISelector) =>
      actGetCurrentUrl(createActivityInput(accountToken, input)),
    closePage: (input: object) => actClosePage(createActivityInput(accountToken, input)),
    getCurrentUrl: (input: object) => actGetCurrentUrl(createActivityInput(accountToken, input)),
    isPageClosed: (input: object) => actIsPageClosed(createActivityInput(accountToken, input)),
    reloadPage: (input: object) => actReloadPage(createActivityInput(accountToken, input)),
    evaluate: (input: IEvaluateActivityInput) =>
      actEvaluate(createActivityInput(accountToken, input)),
    multiEvaluate: (input: IMultiEvaluateActivityInput) =>
      actMultiEvaluate(createActivityInput(accountToken, input)),
    extractLinksFromSelector: (input: ISelector) =>
      actExtractLinksFromSelector(createActivityInput(accountToken, input)),
    extractSelectorContent: (input: ISelector) =>
      actExtractSelectorContent(createActivityInput(accountToken, input)),
    extractTextsFromSelector: (input: ISelector) =>
      actExtractTextsFromSelector(createActivityInput(accountToken, input)),
    goBack: (input: object) => actGoBack(createActivityInput(accountToken, input)),
    goToPage: (input: { page: string }) => actGoToPage(createActivityInput(accountToken, input)),
    moveCursorAndScrollRandomly: (input: object) =>
      actMoveCursorAndScrollRandomly(createActivityInput(accountToken, input)),
    moveCursorToSelectorAndClick: (input: ISelector) =>
      actMoveCursorToSelectorAndClick(createActivityInput(accountToken, input)),
    moveCursorToSelectorAndType: (input: { text: string } & ISelector) =>
      actMoveCursorToSelectorAndType(createActivityInput(accountToken, input)),
    scrollBy: (input: object) => actScrollBy(createActivityInput(accountToken, input)),
    scrollToTop: (input: object) => actScrollToTop(createActivityInput(accountToken, input)),
    waitAndCheckIfSelectorExists: (input: { timeout: number } & ISelector) =>
      actWaitAndCheckIfSelectorExists(createActivityInput(accountToken, input)),
    waitForSelector: (input: { timeout: number } & ISelector) =>
      actWaitForSelector(createActivityInput(accountToken, input)),
  };

  Object.entries(WORKFLOW_UPDATES).forEach(([key, update]) => {
    setHandler(update, async (input: unknown) =>
      handlers[key as keyof typeof handlers](input as never),
    );
  });

  await new Promise(() => {});
}
