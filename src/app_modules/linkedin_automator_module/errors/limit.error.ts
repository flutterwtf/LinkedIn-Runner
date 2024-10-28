export const LIMIT_ERROR_MESSAGE = 'Limit';
export class LimitError extends Error {
  constructor() {
    super(LIMIT_ERROR_MESSAGE);

    this.name = 'LimitError';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, LimitError);
    }
  }
}
