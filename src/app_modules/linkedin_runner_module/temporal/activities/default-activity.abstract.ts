/* eslint-disable @typescript-eslint/no-explicit-any */
export abstract class DefaultActivity {
  protected abstract prepare(...args: Array<any>): any;
  protected abstract execute(...args: Array<any>): any;
  protected abstract check(...args: Array<any>): any;
}
