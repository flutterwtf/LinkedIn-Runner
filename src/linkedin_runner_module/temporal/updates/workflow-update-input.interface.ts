import { TPageType } from '@linkedin_runner_module/constants/page-type';

export interface IWorkflowUpdateInput<T> {
  input: T;
  pageType?: TPageType;
}
