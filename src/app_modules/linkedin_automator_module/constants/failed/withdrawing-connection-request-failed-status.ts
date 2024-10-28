export const WITHDRAWING_CONNECTION_REQUEST_FAILED_STATUS = {
  notPending: 'Not Pending',
} as const;
export type TWithdrawingConnectionRequestFailedStatus =
  (typeof WITHDRAWING_CONNECTION_REQUEST_FAILED_STATUS)[keyof typeof WITHDRAWING_CONNECTION_REQUEST_FAILED_STATUS];
