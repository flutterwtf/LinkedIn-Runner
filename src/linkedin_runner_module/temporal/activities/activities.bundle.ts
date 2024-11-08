import { CloseAdditionalPageActivity } from '@linkedin_runner_module/logic/activities/common/close-additional-page.activity.service';
import { GetCurrentUrlActivity } from '@linkedin_runner_module/logic/activities/common/get-current-url.activity.service';
import { ReloadPageActivity } from '@linkedin_runner_module/logic/activities/common/reload-page.activity.service';
import { ExtractLinksFromSelectorActivity } from '@linkedin_runner_module/logic/activities/extract/extract-links-from-selector.activity.service';
import { ExtractSelectorContentActivity } from '@linkedin_runner_module/logic/activities/extract/extract-selector-content.activity.service';
import { ExtractTextsFromSelectorActivity } from '@linkedin_runner_module/logic/activities/extract/extract-texts-from-selector.activity.service';
import { GoBackActivity } from '@linkedin_runner_module/logic/activities/go/go-back.activity.service';
import { GoToPageActivity } from '@linkedin_runner_module/logic/activities/go/go-to-page.activity.service';
import { MoveCursorAndScrollRandomlyActivity } from '@linkedin_runner_module/logic/activities/move/move-cursor-and-scroll-randomly.activity.service';
import { MoveCursorToSelectorAndClickActivity } from '@linkedin_runner_module/logic/activities/move/move-cursor-to-selector-and-click.activity.service';
import { MoveCursorToSelectorAndTypeActivity } from '@linkedin_runner_module/logic/activities/move/move-cursor-to-selector-and-type.activity.service';
import { ScrollActivity } from '@linkedin_runner_module/logic/activities/scroll/scroll.activity.service';
import { ScrollToTopActivity } from '@linkedin_runner_module/logic/activities/scroll/scroll-to-top.activity.service';
import { WaitAndCheckIfSelectorExistsActivity } from '@linkedin_runner_module/logic/activities/wait/wait-and-check-if-selector-exists.activity.service';
import { WaitForSelectorActivity } from '@linkedin_runner_module/logic/activities/wait/wait-for-selector.activity.service';
import { ScrollToBottomActivity } from '@linkedin_runner_module/logic/activities/scroll/scroll-to-bottom.activity.service';
import { ClickOnSelectorAndOpenAdditionalPageActivity } from '@linkedin_runner_module/logic/activities/common/click-on-selector-and-open-new-page.activity.service';

export const activitiesBundle = [
  ClickOnSelectorAndOpenAdditionalPageActivity,
  CloseAdditionalPageActivity,
  GetCurrentUrlActivity,
  ReloadPageActivity,
  ExtractLinksFromSelectorActivity,
  ExtractSelectorContentActivity,
  ExtractTextsFromSelectorActivity,
  GoBackActivity,
  GoToPageActivity,
  MoveCursorAndScrollRandomlyActivity,
  MoveCursorToSelectorAndClickActivity,
  MoveCursorToSelectorAndTypeActivity,
  ScrollActivity,
  ScrollToBottomActivity,
  ScrollToTopActivity,
  WaitAndCheckIfSelectorExistsActivity,
  WaitForSelectorActivity,
];
