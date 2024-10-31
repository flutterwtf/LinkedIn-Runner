import { TOrderStatus } from '../constants/order-status';
import { IProxy } from './proxy.interface';

export interface IOrder {
  id: number;
  note: null;
  product_name: string;
  plan_name: string;
  expire_date: string;
  status: TOrderStatus;
  location: string;
  quantity: number;
  questions_answers: [];
  proxy_data: {
    ports: {
      socks5: 12324;
      'http|https': 12323;
    };
    proxies: Array<IProxy>;
  };
  auto_extend_settings: null;
  extended_history: [];
}
