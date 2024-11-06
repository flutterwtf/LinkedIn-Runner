import { proxyActivities } from '@temporalio/workflow';
import { ExtractLinksFromSelectorActivity } from '@linkedin_runner_module/logic/activities/extract/extract-links-from-selector.activity.service';
import { ExtractTextsFromSelectorActivity } from '@linkedin_runner_module/logic/activities/extract/extract-texts-from-selector.activity.service';
import { ExtractSelectorContentActivity } from '@linkedin_runner_module/logic/activities/extract/extract-selector-content.activity.service';
import { GoBackActivity } from '@linkedin_runner_module/logic/activities/go/go-back.activity.service';
import { GoToPageActivity } from '@linkedin_runner_module/logic/activities/go/go-to-page.activity.service';
import { MoveCursorAndScrollRandomlyActivity } from '@linkedin_runner_module/logic/activities/move/move-cursor-and-scroll-randomly.activity.service';
import { MoveCursorToSelectorAndClickActivity } from '@linkedin_runner_module/logic/activities/move/move-cursor-to-selector-and-click.activity.service';
import { MoveCursorToSelectorAndTypeActivity } from '@linkedin_runner_module/logic/activities/move/move-cursor-to-selector-and-type.activity.service';
import { ScrollToTopActivity } from '@linkedin_runner_module/logic/activities/scroll/scroll-to-top.activity.service';
import { WaitForSelectorActivity } from '@linkedin_runner_module/logic/activities/wait/wait-for-selector.activity.service';
import { ClickOnSelectorAndOpenNewPageActivity } from '@linkedin_runner_module/logic/activities/common/click-on-selector-and-open-new-page.activity.service';
import { GetCurrentUrlActivity } from '@linkedin_runner_module/logic/activities/common/get-current-url.activity.service';
import { ReloadPageActivity } from '@linkedin_runner_module/logic/activities/common/reload-page.activity.service';
import { ScrollActivity } from '@linkedin_runner_module/logic/activities/scroll/scroll.activity.service';
import { ScrollToBottomActivity } from '@linkedin_runner_module/logic/activities/scroll/scroll-to-bottom.activity.service';
import { WaitAndCheckIfSelectorExistsActivity } from '@linkedin_runner_module/logic/activities/wait/wait-and-check-if-selector-exists.activity.service';
import { CloseAdditionalPageActivity } from '@linkedin_runner_module/logic/activities/common/close-additional-page.activity.service';
import { defaultActivityConfig } from './configs/default-activity.config';

// Common
export const { actClickOnSelectorAndOpenNewPage } =
  proxyActivities<ClickOnSelectorAndOpenNewPageActivity>(defaultActivityConfig);
export const { actCloseAdditionalPage } =
  proxyActivities<CloseAdditionalPageActivity>(defaultActivityConfig);
export const { actGetCurrentUrl } = proxyActivities<GetCurrentUrlActivity>(defaultActivityConfig);
export const { actReloadPage } = proxyActivities<ReloadPageActivity>(defaultActivityConfig);

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
export const { actScroll } = proxyActivities<ScrollActivity>(defaultActivityConfig);
export const { actScrollToBottom } = proxyActivities<ScrollToBottomActivity>(defaultActivityConfig);
export const { actScrollToTop } = proxyActivities<ScrollToTopActivity>(defaultActivityConfig);

// Wait
export const { actWaitAndCheckIfSelectorExists } =
  proxyActivities<WaitAndCheckIfSelectorExistsActivity>(defaultActivityConfig);
export const { actWaitForSelector } =
  proxyActivities<WaitForSelectorActivity>(defaultActivityConfig);
