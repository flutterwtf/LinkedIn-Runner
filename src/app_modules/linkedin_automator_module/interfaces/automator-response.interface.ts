export interface IAutomatorResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}
