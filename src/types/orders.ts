// Order types
export type OrderStatus =
  | "pending"
  | "processing"
  | "preparing"
  | "delivering"
  | "completed"
  | "rejected";

export interface OrderItem {
  id?: string;
  order_id?: string;
  product_id: string;
  quantity: number;
  price: number;
  options?: string[];
  extras?: string[];
}

export interface Order {
  id: string;
  user_id: string;
  total: number;
  discount: number;
  status: OrderStatus;
  delivery_date: string;
  delivery_time: string;
  payment_method: "cash" | "coins";
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  created_at: string;
  items: OrderItem[];
}
