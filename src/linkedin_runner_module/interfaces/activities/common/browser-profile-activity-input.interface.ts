import { TPageType } from '@linkedin_runner_module/constants/page-type';

export interface IBrowserProfileActivityInput<T> {
  browserProfile: string;
  pageType?: TPageType;
  input: T;
}
