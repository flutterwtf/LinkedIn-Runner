import { IUrl } from '../../common/url.interface';
import { IWorkflowInput } from '../workflow-input.interface';

export interface ISendConnectionRequestWorkflowInput
  extends IWorkflowInput<
    {
      message?: string;
      email?: string;
    } & IUrl
  > {}