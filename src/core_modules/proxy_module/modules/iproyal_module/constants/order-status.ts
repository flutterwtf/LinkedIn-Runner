export const ORDER_STATUS = {
  inProgress: 'in-progress',
  confirmed: 'confirmed',
  expired: 'expired',
};
export type TOrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];
