import { OrderItem } from "./orderItem.model";
import { User } from '@dwll/users'

export class Order {
  id?: string;
  orderItems?: OrderItem[];
  shippingAddress1?: string;
  shippingAddress2?: string;
  city?: string;
  zip?: string;
  phone?: string;
  status?: number;
  totalPrice?: string;
  user?: User;
  dateOrdered?: string;
}
