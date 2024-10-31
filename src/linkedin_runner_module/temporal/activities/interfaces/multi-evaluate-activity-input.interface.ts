export interface IMultiEvaluateActivityInput<T> {
  pageFunction: (elements: Array<Element>) => T;
  selector: string;
}
