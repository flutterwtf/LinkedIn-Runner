import { GetCurrentUrlActivity } from '@app_modules/linkedin_automator_module/services/activities/get-current-url.activity.service';
import { proxyActivities } from '@temporalio/workflow';
import { ClickOnSelectorAndOpenNewPageActivity } from '@app_modules/linkedin_automator_module/services/activities/click-on-selector-and-open-new-page.activity.service';
import { ClosePageActivity } from '@app_modules/linkedin_automator_module/services/activities/close-page.activity.service';
import { ReloadPageActivity } from '@app_modules/linkedin_automator_module/services/activities/reload-page.activity.service';
import { defaultActivityConfig } from './configs/default-activity.config';

export const { actClickOnSelectorAndOpenNewPage } =
  proxyActivities<ClickOnSelectorAndOpenNewPageActivity>(defaultActivityConfig);
export const { actClosePage } = proxyActivities<ClosePageActivity>(defaultActivityConfig);
export const { actGetCurrentUrl } = proxyActivities<GetCurrentUrlActivity>(defaultActivityConfig);
export const { actReloadPage } = proxyActivities<ReloadPageActivity>(defaultActivityConfig);
