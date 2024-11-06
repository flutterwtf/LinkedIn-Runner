/* eslint-disable import/no-unused-modules */
import { setHandler } from '@temporalio/workflow';
import { createActivityInput } from '@linkedin_runner_module/temporal/activities/utils/create-activity-input';
import { WORKFLOW_UPDATE } from '@linkedin_runner_module/temporal/updates/workflow-update';
import { ISelector } from '@linkedin_runner_module/interfaces/common/selector.interface';
import {
  actClickOnSelectorAndOpenNewPage,
  actExtractLinksFromSelector,
  actExtractSelectorContent,
  actExtractTextsFromSelector,
  actGetCurrentUrl,
  actGoBack,
  actGoToPage,
  actMoveCursorAndScrollRandomly,
  actMoveCursorToSelectorAndClick,
  actMoveCursorToSelectorAndType,
  actReloadPage,
  actScroll,
  actScrollToBottom,
  actScrollToTop,
  actWaitAndCheckIfSelectorExists,
  actWaitForSelector,
  actCloseAdditionalPage,
} from '../../temporal/activities/activities.export';

export async function pageManipulationWorkflow({
  browserProfile,
}: {
  browserProfile: string;
}): Promise<void> {
  const handlers = {
    clickOnSelectorAndOpenNewPage: (input: ISelector) =>
      actClickOnSelectorAndOpenNewPage(createActivityInput(browserProfile, input)),
    closeAdditionalPage: (input: object) =>
      actCloseAdditionalPage(createActivityInput(browserProfile, input)),
    getCurrentUrl: (input: object) => actGetCurrentUrl(createActivityInput(browserProfile, input)),
    reloadPage: (input: object) => actReloadPage(createActivityInput(browserProfile, input)),
    extractLinksFromSelector: (input: ISelector) =>
      actExtractLinksFromSelector(createActivityInput(browserProfile, input)),
    extractSelectorContent: (input: ISelector) =>
      actExtractSelectorContent(createActivityInput(browserProfile, input)),
    extractTextsFromSelector: (input: ISelector) =>
      actExtractTextsFromSelector(createActivityInput(browserProfile, input)),
    goBack: (input: object) => actGoBack(createActivityInput(browserProfile, input)),
    goToPage: (input: { page: string }) => actGoToPage(createActivityInput(browserProfile, input)),
    moveCursorAndScrollRandomly: (input: object) =>
      actMoveCursorAndScrollRandomly(createActivityInput(browserProfile, input)),
    moveCursorToSelectorAndClick: (input: ISelector) =>
      actMoveCursorToSelectorAndClick(createActivityInput(browserProfile, input)),
    moveCursorToSelectorAndType: (input: { text: string } & ISelector) =>
      actMoveCursorToSelectorAndType(createActivityInput(browserProfile, input)),
    scroll: (input: object) => actScroll(createActivityInput(browserProfile, input)),
    scrollToBottom: (input: object) =>
      actScrollToBottom(createActivityInput(browserProfile, input)),
    scrollToTop: (input: object) => actScrollToTop(createActivityInput(browserProfile, input)),
    waitAndCheckIfSelectorExists: (input: { timeout: number } & ISelector) =>
      actWaitAndCheckIfSelectorExists(createActivityInput(browserProfile, input)),
    waitForSelector: (input: { timeout: number } & ISelector) =>
      actWaitForSelector(createActivityInput(browserProfile, input)),
  };

  Object.entries(WORKFLOW_UPDATE).forEach(([key, update]) => {
    setHandler(update, async (input: unknown) => {
      const result = await handlers[key as keyof typeof handlers](input as never);
      return result as string;
    });
  });

  await new Promise(() => {});
}
