import { IAutomatorResponse } from '../interfaces/automator-response.interface';

export class AutomationFailedResponse implements IAutomatorResponse<object> {
  success = false;
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}
