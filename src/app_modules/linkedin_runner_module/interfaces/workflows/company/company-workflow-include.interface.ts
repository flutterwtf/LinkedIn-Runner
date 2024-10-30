import { TLinkedInFrom } from '@app_modules/linkedin_runner_module/constants/linkedin-from';

export interface ICompanyWorkflowInclude {
  include: {
    basicInfo?: object;
    activityStats?: object;
    employees?: {
      from: TLinkedInFrom;
    };
    decisionMakers?: {
      from: TLinkedInFrom;
      limit: number;
    };
  };
}
