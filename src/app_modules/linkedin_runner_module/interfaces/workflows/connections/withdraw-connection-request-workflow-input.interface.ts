import { IUrl } from '../../common/url.interface';
import { IWorkflowInput } from '../workflow-input.interface';

export interface IWithdrawConnectionRequestWorkflowInput
  extends IWorkflowInput<
    {
      unfollow: boolean;
    } & IUrl
  > {}
