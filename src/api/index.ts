// API entry point
import { userApi } from "./user";
import { loyaltyApi } from "./loyalty";
import { productsApi } from "./products";
import { ordersApi } from "./orders";

// Export all API endpoints
export const api = {
  user: userApi,
  loyalty: loyaltyApi,
  products: productsApi,
  orders: ordersApi,
};
