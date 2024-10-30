import { TConnectionRequestStatus } from '@app_modules/linkedin_runner_module/constants/connection-request-status';

export interface ICheckConnectionStatusWorkflowResult {
  status: TConnectionRequestStatus;
}
