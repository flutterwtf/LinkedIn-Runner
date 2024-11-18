/* eslint-disable import/no-unused-modules */
import { ISelector } from '@linkedin_runner_module/interfaces/common/selector.interface';
import { ITimeout } from '@linkedin_runner_module/interfaces/common/timeout.interface';
import { createActivityInput } from '@linkedin_runner_module/temporal/activities/utils/create-activity-input';
import { WORKFLOW_UPDATE } from '@linkedin_runner_module/temporal/updates/workflow-update';
import { IWorkflowUpdateInput } from '@linkedin_runner_module/temporal/updates/workflow-update-input.interface';
import { setHandler } from '@temporalio/workflow';
import {
  actClickOnSelectorAndOpenAdditionalPage,
  actCloseAdditionalPage,
  actExtractLinksFromSelector,
  actExtractSelectorContent,
  actExtractTextsFromSelector,
  actGetCurrentUrl,
  actGoBack,
  actGoToPage,
  actMakeScreenshot,
  actMoveCursorAndScrollRandomly,
  actMoveCursorToSelectorAndClick,
  actMoveCursorToSelectorAndType,
  actReloadPage,
  actScroll,
  actScrollToBottom,
  actScrollToTop,
  actWaitAndCheckIfSelectorExists,
  actWaitForSelector,
} from '../../temporal/activities/activities.export';

export async function pageManipulationWorkflow({
  browserProfile,
}: {
  browserProfile: string;
}): Promise<void> {
  const handlers = {
    clickOnSelectorAndOpenAdditionalPage: (input: IWorkflowUpdateInput<ISelector>) =>
      actClickOnSelectorAndOpenAdditionalPage(createActivityInput(browserProfile, input)),
    closeAdditionalPage: (input: IWorkflowUpdateInput<object>) =>
      actCloseAdditionalPage(createActivityInput(browserProfile, input)),
    getCurrentUrl: (input: IWorkflowUpdateInput<object>) =>
      actGetCurrentUrl(createActivityInput(browserProfile, input)),
    makeScreenshot: (input: IWorkflowUpdateInput<object>) =>
      actMakeScreenshot(createActivityInput(browserProfile, input)),
    reloadPage: (input: IWorkflowUpdateInput<object>) =>
      actReloadPage(createActivityInput(browserProfile, input)),
    extractLinksFromSelector: (input: IWorkflowUpdateInput<ISelector>) =>
      actExtractLinksFromSelector(createActivityInput(browserProfile, input)),
    extractSelectorContent: (input: IWorkflowUpdateInput<ISelector>) =>
      actExtractSelectorContent(createActivityInput(browserProfile, input)),
    extractTextsFromSelector: (input: IWorkflowUpdateInput<ISelector>) =>
      actExtractTextsFromSelector(createActivityInput(browserProfile, input)),
    goBack: (input: IWorkflowUpdateInput<object>) =>
      actGoBack(createActivityInput(browserProfile, input)),
    goToPage: (input: IWorkflowUpdateInput<{ page: string }>) =>
      actGoToPage(createActivityInput(browserProfile, input)),
    moveCursorAndScrollRandomly: (input: IWorkflowUpdateInput<object>) =>
      actMoveCursorAndScrollRandomly(createActivityInput(browserProfile, input)),
    moveCursorToSelectorAndClick: (input: IWorkflowUpdateInput<ISelector>) =>
      actMoveCursorToSelectorAndClick(createActivityInput(browserProfile, input)),
    moveCursorToSelectorAndType: (input: IWorkflowUpdateInput<ISelector & { text: string }>) =>
      actMoveCursorToSelectorAndType(createActivityInput(browserProfile, input)),
    scroll: (input: IWorkflowUpdateInput<object>) =>
      actScroll(createActivityInput(browserProfile, input)),
    scrollToBottom: (input: IWorkflowUpdateInput<Partial<ISelector>>) =>
      actScrollToBottom(createActivityInput(browserProfile, input)),
    scrollToTop: (input: IWorkflowUpdateInput<object>) =>
      actScrollToTop(createActivityInput(browserProfile, input)),
    waitAndCheckIfSelectorExists: (input: IWorkflowUpdateInput<ITimeout & ISelector>) =>
      actWaitAndCheckIfSelectorExists(createActivityInput(browserProfile, input)),
    waitForSelector: (input: IWorkflowUpdateInput<ITimeout & ISelector>) =>
      actWaitForSelector(createActivityInput(browserProfile, input)),
  };

  Object.entries(WORKFLOW_UPDATE).forEach(([key, update]) => {
    setHandler(update, async (input: IWorkflowUpdateInput<unknown>) => {
      const result = await handlers[key as keyof typeof handlers](input as never);
      return result as string;
    });
  });

  await new Promise(() => {});
}
