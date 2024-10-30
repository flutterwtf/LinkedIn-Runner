export class SuccessResponse {
  success: boolean;
  message: string;

  constructor(message: string) {
    this.success = true;
    this.message = message;
  }
}
