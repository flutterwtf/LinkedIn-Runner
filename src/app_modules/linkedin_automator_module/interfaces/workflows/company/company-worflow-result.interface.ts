import { ICompanyActivityStats } from './company-activity-stats.interface';
import { ICompanyInfo } from './company-info.interface';
import { IPersonInfo } from './person-info.interface';
import { IPersonSalesNavigatorInfo } from './person-sales-navigator-info.interface';

export interface ICompanyWorkflowResult {
  basicInfo?: ICompanyInfo;
  employees?: Array<IPersonInfo> | Array<IPersonSalesNavigatorInfo>;
  activityStats?: ICompanyActivityStats;
  decisionMakers?: Array<IPersonInfo> | Array<IPersonSalesNavigatorInfo>;
}
