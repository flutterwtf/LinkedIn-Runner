import { IBrowserProfileActivityInput } from '@linkedin_runner_module/interfaces/activities/common/browser-profile-activity-input.interface';

export const createActivityInput = <T>(
  browserProfile: string,
  input: T,
): IBrowserProfileActivityInput<T> => ({
  browserProfile,
  input,
});
