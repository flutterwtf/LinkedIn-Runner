import { IAccountTokenActivityInput } from 'src/linkedin_runner_module/interfaces/activities/account-token-activity-input.interface';

export const createActivityInput = <T>(
  accountToken: string,
  input: T,
): IAccountTokenActivityInput<T> => ({
  accountToken,
  input,
});
