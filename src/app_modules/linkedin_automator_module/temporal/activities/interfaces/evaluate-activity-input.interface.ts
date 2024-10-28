export interface IEvaluateActivityInput {
  pageFunction: (selector: string | Element, ...args: Array<unknown>) => unknown;
  selector: string;
}
