import { IWorkflowInput } from '../workflow-input.interface';
import { TSearchType } from './search-type';

export interface ISearchWorkflowInput
  extends IWorkflowInput<{
    type: TSearchType;
    query: string;
    limit: number;
  }> {}
