import { ClickOnSelectorAndOpenNewPageActivity } from '@app_modules/linkedin_automator_module/services/activities/click-on-selector-and-open-new-page.activity.service';
import { ClosePageActivity } from '@app_modules/linkedin_automator_module/services/activities/close-page.activity.service';
import { GetCurrentUrlActivity } from '@app_modules/linkedin_automator_module/services/activities/get-current-url.activity.service';
import { QuerySelectorActivity } from '@app_modules/linkedin_automator_module/services/activities/query-selector.activity.service';
import { ReloadPageActivity } from '@app_modules/linkedin_automator_module/services/activities/reload-page.activity.service';

export const activitiesBundle = [
  ClickOnSelectorAndOpenNewPageActivity,
  ClosePageActivity,
  GetCurrentUrlActivity,
  QuerySelectorActivity,
  ReloadPageActivity,
];
