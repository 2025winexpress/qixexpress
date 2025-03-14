import { api } from "@/api";
import { cartService } from "./cart";
import { Order, OrderStatus } from "@/types/orders";

// Order service
export const orderService = {
  // Create a new order
  createOrder: async (orderData: {
    userId: string;
    customerName: string;
    customerPhone: string;
    customerAddress: string;
    deliveryDate: string;
    deliveryTime: string;
    paymentMethod: "cash" | "coins";
    discount: number;
  }): Promise<Order | null> => {
    try {
      // Get cart items
      const cartItems = cartService.getCartItems();

      if (cartItems.length === 0) {
        throw new Error("Cart is empty");
      }

      // Calculate total
      const total = cartService.calculateTotal();

      // Create order object
      const order = {
        user_id: orderData.userId,
        total,
        discount: orderData.discount,
        delivery_date: orderData.deliveryDate,
        delivery_time: orderData.deliveryTime,
        payment_method: orderData.paymentMethod,
        customer_name: orderData.customerName,
        customer_phone: orderData.customerPhone,
        customer_address: orderData.customerAddress,
        items: cartItems.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
          price: item.price,
          options: item.options || [],
          extras: item.extras || [],
        })),
      };

      // Create order in database
      const createdOrder = await api.orders.createOrder(order);

      if (createdOrder) {
        // Clear cart after successful order
        cartService.clearCart();
      }

      return createdOrder;
    } catch (error) {
      console.error("Error creating order:", error);
      return null;
    }
  },

  // Get user's orders
  getUserOrders: async (userId: string): Promise<Order[]> => {
    return api.orders.getUserOrders(userId);
  },

  // Get order by ID
  getOrderById: async (orderId: string): Promise<Order | null> => {
    return api.orders.getOrderById(orderId);
  },

  // Update order status
  updateOrderStatus: async (
    orderId: string,
    status: OrderStatus,
  ): Promise<boolean> => {
    return api.orders.updateOrderStatus(orderId, status);
  },
};
