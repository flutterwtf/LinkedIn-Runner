export interface IMultiEvaluateActivityInput {
  pageFunction: (elements: Array<Element>) => unknown;
  selector: string;
}
