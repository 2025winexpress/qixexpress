import { supabase } from "@/lib/supabase";
import { Order, OrderItem, OrderStatus } from "@/types/orders";

// Orders API endpoints
export const ordersApi = {
  // Create a new order
  createOrder: async (
    order: Omit<Order, "id" | "created_at" | "status">,
  ): Promise<Order | null> => {
    try {
      // First create the order
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: order.user_id,
          total: order.total,
          discount: order.discount,
          delivery_date: order.delivery_date,
          delivery_time: order.delivery_time,
          payment_method: order.payment_method,
          status: "pending" as OrderStatus,
          customer_name: order.customer_name,
          customer_phone: order.customer_phone,
          customer_address: order.customer_address,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Then create the order items
      const orderItems = order.items.map((item) => ({
        order_id: orderData.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price,
        options: item.options,
        extras: item.extras,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Return the created order with items
      return {
        ...orderData,
        items: order.items,
      } as Order;
    } catch (error) {
      console.error("Error creating order:", error);
      return null;
    }
  },

  // Get user's orders
  getUserOrders: async (userId: string): Promise<Order[]> => {
    try {
      const { data: orders, error: ordersError } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", userId);

      if (ordersError) throw ordersError;

      // Get order items for each order
      const ordersWithItems = await Promise.all(
        orders.map(async (order) => {
          const { data: items, error: itemsError } = await supabase
            .from("order_items")
            .select("*")
            .eq("order_id", order.id);

          if (itemsError) throw itemsError;

          return {
            ...order,
            items: items as OrderItem[],
          };
        }),
      );

      return ordersWithItems as Order[];
    } catch (error) {
      console.error("Error fetching user orders:", error);
      return [];
    }
  },

  // Get order by ID
  getOrderById: async (orderId: string): Promise<Order | null> => {
    try {
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .select("*")
        .eq("id", orderId)
        .single();

      if (orderError) throw orderError;

      const { data: items, error: itemsError } = await supabase
        .from("order_items")
        .select("*")
        .eq("order_id", orderId);

      if (itemsError) throw itemsError;

      return {
        ...order,
        items: items as OrderItem[],
      } as Order;
    } catch (error) {
      console.error("Error fetching order by ID:", error);
      return null;
    }
  },

  // Update order status
  updateOrderStatus: async (
    orderId: string,
    status: OrderStatus,
  ): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from("orders")
        .update({ status })
        .eq("id", orderId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error("Error updating order status:", error);
      return false;
    }
  },
};
