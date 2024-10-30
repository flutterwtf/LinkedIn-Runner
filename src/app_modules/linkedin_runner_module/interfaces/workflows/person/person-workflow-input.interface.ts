import { IUrl } from '../../common/url.interface';
import { IWorkflowInput } from '../workflow-input.interface';

export interface IPersonWorkflowInput
  extends IWorkflowInput<
    IUrl & {
      activityStats?: object;
    }
  > {}
