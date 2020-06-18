export class OrdersInfo {
  ordersList: OrdersList[];
  status: string;
  error: string;
}

export class OrdersList {
  order_id: string;
  customer_id: string;
  store_id: string;
  user_id: string;
  date: string;
  total_amount: string;
  order: string;
  details: string;
  total_discount: string;
  order_discount: string;
  service_charge: string;
  paid_amount: string;
  due_amount: string;
  file_path: string;
  status: string;
  customer_name: string;

}

