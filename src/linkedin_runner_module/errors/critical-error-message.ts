/* eslint-disable import/no-unused-modules */
export const CRITICAL_ERROR_MESSAGE = [
  /connection closed/i,
  /target closed/i,
  /session closed/i,
  /not attached to an active page/i,
  /attempted to use detached frame/i,
  /navigating frame was detached/i,
  /frame got detached/i,
] as const;
