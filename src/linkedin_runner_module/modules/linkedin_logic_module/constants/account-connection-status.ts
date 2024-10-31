export const ACCOUNT_CONNECTION_STATUS = {
  online: 'Online',
  offline: 'Offline',
} as const;
export type TAccountConnectionStatus =
  (typeof ACCOUNT_CONNECTION_STATUS)[keyof typeof ACCOUNT_CONNECTION_STATUS];
