import { IAutomatorResponse } from '../interfaces/automator-response.interface';

export class AutomationSuccessResponse<T> implements IAutomatorResponse<T> {
  success = true;
  data: T;

  constructor(data: T) {
    this.data = data;
  }
}
