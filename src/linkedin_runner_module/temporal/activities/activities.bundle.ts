import { ClickOnSelectorAndOpenNewPageActivity } from 'src/linkedin_runner_module/services/activities/common/click-on-selector-and-open-new-page.activity.service';
import { ClosePageActivity } from 'src/linkedin_runner_module/services/activities/common/close-page.activity.service';
import { GetCurrentUrlActivity } from 'src/linkedin_runner_module/services/activities/common/get-current-url.activity.service';
import { IsPageClosedActivity } from 'src/linkedin_runner_module/services/activities/common/is-page-closed.activity.service';
import { ReloadPageActivity } from 'src/linkedin_runner_module/services/activities/common/reload-page.activity.service';
import { EvaluateActivity } from 'src/linkedin_runner_module/services/activities/evaluate/evalutate.activity.service';
import { MultiEvaluateActivity } from 'src/linkedin_runner_module/services/activities/evaluate/multi-evaluate.activity.service';
import { ExtractLinksFromSelectorActivity } from 'src/linkedin_runner_module/services/activities/extract/extract-links-from-selector.activity.service';
import { ExtractSelectorContentActivity } from 'src/linkedin_runner_module/services/activities/extract/extract-selector-content.activity.service';
import { ExtractTextsFromSelectorActivity } from 'src/linkedin_runner_module/services/activities/extract/extract-texts-from-selector.activity.service';
import { GoBackActivity } from 'src/linkedin_runner_module/services/activities/go/go-back.activity.service';
import { GoToPageActivity } from 'src/linkedin_runner_module/services/activities/go/go-to-page.activity.service';
import { MoveCursorAndScrollRandomlyActivity } from 'src/linkedin_runner_module/services/activities/move/move-cursor-and-scroll-randomly.activity.service';
import { MoveCursorToSelectorAndClickActivity } from 'src/linkedin_runner_module/services/activities/move/move-cursor-to-selector-and-click.activity.service';
import { MoveCursorToSelectorAndTypeActivity } from 'src/linkedin_runner_module/services/activities/move/move-cursor-to-selector-and-type.activity.service';
import { ScrollByActivity } from 'src/linkedin_runner_module/services/activities/scroll/scroll-by.activity.service';
import { ScrollToTopActivity } from 'src/linkedin_runner_module/services/activities/scroll/scroll-to-top.activity.service';
import { WaitAndCheckIfSelectorExistsActivity } from 'src/linkedin_runner_module/services/activities/wait/wait-and-check-if-selector-exists.activity.service';
import { WaitForSelectorActivity } from 'src/linkedin_runner_module/services/activities/wait/wait-for-selector.activity.service';

export const activitiesBundle = [
  ClickOnSelectorAndOpenNewPageActivity,
  ClosePageActivity,
  GetCurrentUrlActivity,
  IsPageClosedActivity,
  ReloadPageActivity,
  EvaluateActivity,
  MultiEvaluateActivity,
  ExtractLinksFromSelectorActivity,
  ExtractSelectorContentActivity,
  ExtractTextsFromSelectorActivity,
  GoBackActivity,
  GoToPageActivity,
  MoveCursorAndScrollRandomlyActivity,
  MoveCursorToSelectorAndClickActivity,
  MoveCursorToSelectorAndTypeActivity,
  ScrollByActivity,
  ScrollToTopActivity,
  WaitAndCheckIfSelectorExistsActivity,
  WaitForSelectorActivity,
];
