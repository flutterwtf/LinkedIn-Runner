import { proxyActivities } from '@temporalio/workflow';
import { EvaluateActivity } from 'src/linkedin_runner_module/services/activities/evaluate/evalutate.activity.service';
import { ExtractLinksFromSelectorActivity } from 'src/linkedin_runner_module/services/activities/extract/extract-links-from-selector.activity.service';
import { ExtractTextsFromSelectorActivity } from 'src/linkedin_runner_module/services/activities/extract/extract-texts-from-selector.activity.service';
import { ExtractSelectorContentActivity } from 'src/linkedin_runner_module/services/activities/extract/extract-selector-content.activity.service';
import { GoBackActivity } from 'src/linkedin_runner_module/services/activities/go/go-back.activity.service';
import { GoToPageActivity } from 'src/linkedin_runner_module/services/activities/go/go-to-page.activity.service';
import { MoveCursorAndScrollRandomlyActivity } from 'src/linkedin_runner_module/services/activities/move/move-cursor-and-scroll-randomly.activity.service';
import { MoveCursorToSelectorAndClickActivity } from 'src/linkedin_runner_module/services/activities/move/move-cursor-to-selector-and-click.activity.service';
import { MoveCursorToSelectorAndTypeActivity } from 'src/linkedin_runner_module/services/activities/move/move-cursor-to-selector-and-type.activity.service';
import { MultiEvaluateActivity } from 'src/linkedin_runner_module/services/activities/evaluate/multi-evaluate.activity.service';
import { ScrollToTopActivity } from 'src/linkedin_runner_module/services/activities/scroll/scroll-to-top.activity.service';
import { WaitForSelectorActivity } from 'src/linkedin_runner_module/services/activities/wait/wait-for-selector.activity.service';
import { ClickOnSelectorAndOpenNewPageActivity } from 'src/linkedin_runner_module/services/activities/common/click-on-selector-and-open-new-page.activity.service';
import { ClosePageActivity } from 'src/linkedin_runner_module/services/activities/common/close-page.activity.service';
import { GetCurrentUrlActivity } from 'src/linkedin_runner_module/services/activities/common/get-current-url.activity.service';
import { ReloadPageActivity } from 'src/linkedin_runner_module/services/activities/common/reload-page.activity.service';
import { ScrollByActivity } from 'src/linkedin_runner_module/services/activities/scroll/scroll-by.activity.service';
import { WaitAndCheckIfSelectorExistsActivity } from 'src/linkedin_runner_module/services/activities/wait/wait-and-check-if-selector-exists.activity.service';
import { IsPageClosedActivity } from 'src/linkedin_runner_module/services/activities/common/is-page-closed.activity.service';
import { defaultActivityConfig } from './configs/default-activity.config';

// Common
export const { actClickOnSelectorAndOpenNewPage } =
  proxyActivities<ClickOnSelectorAndOpenNewPageActivity>(defaultActivityConfig);
export const { actClosePage } = proxyActivities<ClosePageActivity>(defaultActivityConfig);
export const { actGetCurrentUrl } = proxyActivities<GetCurrentUrlActivity>(defaultActivityConfig);
export const { actIsPageClosed } = proxyActivities<IsPageClosedActivity>(defaultActivityConfig);
export const { actReloadPage } = proxyActivities<ReloadPageActivity>(defaultActivityConfig);

// Evaluate
export const { actEvaluate } = proxyActivities<EvaluateActivity>(defaultActivityConfig);
export const { actMultiEvaluate } = proxyActivities<MultiEvaluateActivity>(defaultActivityConfig);

// Extract
export const { actExtractLinksFromSelector } =
  proxyActivities<ExtractLinksFromSelectorActivity>(defaultActivityConfig);
export const { actExtractSelectorContent } =
  proxyActivities<ExtractSelectorContentActivity>(defaultActivityConfig);
export const { actExtractTextsFromSelector } =
  proxyActivities<ExtractTextsFromSelectorActivity>(defaultActivityConfig);

// Go
export const { actGoBack } = proxyActivities<GoBackActivity>(defaultActivityConfig);
export const { actGoToPage } = proxyActivities<GoToPageActivity>(defaultActivityConfig);

// Move
export const { actMoveCursorAndScrollRandomly } =
  proxyActivities<MoveCursorAndScrollRandomlyActivity>(defaultActivityConfig);
export const { actMoveCursorToSelectorAndClick } =
  proxyActivities<MoveCursorToSelectorAndClickActivity>(defaultActivityConfig);
export const { actMoveCursorToSelectorAndType } =
  proxyActivities<MoveCursorToSelectorAndTypeActivity>(defaultActivityConfig);

// Scroll
export const { actScrollBy } = proxyActivities<ScrollByActivity>(defaultActivityConfig);
export const { actScrollToTop } = proxyActivities<ScrollToTopActivity>(defaultActivityConfig);

// Wait
export const { actWaitAndCheckIfSelectorExists } =
  proxyActivities<WaitAndCheckIfSelectorExistsActivity>(defaultActivityConfig);
export const { actWaitForSelector } =
  proxyActivities<WaitForSelectorActivity>(defaultActivityConfig);
