export interface IEvaluateActivityInput<T> {
  pageFunction: (selector: string | Element, ...args: Array<unknown>) => T;
  selector: string;
}
