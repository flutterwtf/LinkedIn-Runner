export const CONNECTION_REQUEST_STATUS = {
  pending: 'Pending',
  connected: 'Connected',
  notConnected: 'Not Connected',
} as const;
export type TConnectionRequestStatus =
  (typeof CONNECTION_REQUEST_STATUS)[keyof typeof CONNECTION_REQUEST_STATUS];
