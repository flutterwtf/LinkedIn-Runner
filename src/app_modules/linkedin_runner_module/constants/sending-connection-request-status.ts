export const SENDING_CONNECTION_REQUEST_STATUS = {
  pending: 'Pending',
  accepted: 'Accepted',
  cantSend: "Can't Send",
  withdrawLimit: 'Withdrawing Limit',
  emailRequired: 'Email Required',
  success: 'Success',
} as const;
export type TSendingConnectionRequestStatus =
  (typeof SENDING_CONNECTION_REQUEST_STATUS)[keyof typeof SENDING_CONNECTION_REQUEST_STATUS];
