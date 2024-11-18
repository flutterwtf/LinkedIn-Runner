import { IProductLocation } from './product-location.interface';

export interface IProduct {
  id: number;
  name: string;
  locations: Array<IProductLocation>;
  plans: Array<{
    id: number;
    name: string;
    price: number;
    min_quantity: number;
    max_quantity: number;
  }>;
  questions: Array<{
    id: number;
    text: string;
    is_required: boolean;
  }>;
  quantity_discounts: Array<{
    quantity_from: number;
    discount_percent: number;
  }>;
}
