export interface ICreateOrderConfig {
  product_id: number;
  product_plan_id: number;
  product_location_id: number;
  quantity: number;
  coupon_code?: string;
  auto_extend?: boolean;
}
