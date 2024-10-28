import { IWorkflowInput } from '../workflow-input.interface';
import { IUrl } from '../../common/url.interface';
import { ICompanyWorkflowInclude } from './company-workflow-include.interface';

export interface ICompanyWorkflowInput extends IWorkflowInput<IUrl & ICompanyWorkflowInclude> {}
