// Services entry point
import { authService } from "./auth";
import { loyaltyService } from "./loyalty";
import { cartService } from "./cart";
import { orderService } from "./order";

// Export all services
export const services = {
  auth: authService,
  loyalty: loyaltyService,
  cart: cartService,
  order: orderService,
};
