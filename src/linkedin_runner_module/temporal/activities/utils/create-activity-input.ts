import { IBrowserProfileActivityInput } from '@linkedin_runner_module/interfaces/activities/common/browser-profile-activity-input.interface';
import { IWorkflowUpdateInput } from '@linkedin_runner_module/temporal/updates/workflow-update-input.interface';

export const createActivityInput = <T>(
  browserProfile: string,
  { input, pageType }: IWorkflowUpdateInput<T>,
): IBrowserProfileActivityInput<T> => ({
  browserProfile,
  pageType,
  input,
});
