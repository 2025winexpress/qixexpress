import { CartItem } from "@/types/cart";

// Cart service
export const cartService = {
  // Get cart items from local storage
  getCartItems: (): CartItem[] => {
    try {
      const cartItems = localStorage.getItem("cartItems");
      return cartItems ? JSON.parse(cartItems) : [];
    } catch (error) {
      console.error("Error getting cart items:", error);
      return [];
    }
  },

  // Add item to cart
  addToCart: (item: CartItem): boolean => {
    try {
      const cartItems = cartService.getCartItems();

      // Check if item already exists in cart
      const existingItemIndex = cartItems.findIndex(
        (cartItem) =>
          cartItem.id === item.id &&
          JSON.stringify(cartItem.options) === JSON.stringify(item.options) &&
          JSON.stringify(cartItem.extras) === JSON.stringify(item.extras),
      );

      if (existingItemIndex !== -1) {
        // Update quantity if item exists
        cartItems[existingItemIndex].quantity += item.quantity;
      } else {
        // Add new item
        cartItems.push(item);
      }

      // Save to local storage
      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      // Update cart count
      const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
      localStorage.setItem("cartCount", cartCount.toString());

      // Dispatch event to update UI
      const event = new CustomEvent("cartUpdated", {
        detail: { count: cartCount },
      });
      window.dispatchEvent(event);

      return true;
    } catch (error) {
      console.error("Error adding to cart:", error);
      return false;
    }
  },

  // Update item quantity
  updateQuantity: (itemIndex: number, quantity: number): boolean => {
    try {
      const cartItems = cartService.getCartItems();

      if (itemIndex < 0 || itemIndex >= cartItems.length) {
        return false;
      }

      if (quantity <= 0) {
        // Remove item if quantity is 0 or less
        cartItems.splice(itemIndex, 1);
      } else {
        // Update quantity
        cartItems[itemIndex].quantity = quantity;
      }

      // Save to local storage
      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      // Update cart count
      const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
      localStorage.setItem("cartCount", cartCount.toString());

      // Dispatch event to update UI
      const event = new CustomEvent("cartUpdated", {
        detail: { count: cartCount },
      });
      window.dispatchEvent(event);

      return true;
    } catch (error) {
      console.error("Error updating quantity:", error);
      return false;
    }
  },

  // Remove item from cart
  removeItem: (itemIndex: number): boolean => {
    try {
      const cartItems = cartService.getCartItems();

      if (itemIndex < 0 || itemIndex >= cartItems.length) {
        return false;
      }

      // Remove item
      cartItems.splice(itemIndex, 1);

      // Save to local storage
      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      // Update cart count
      const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
      localStorage.setItem("cartCount", cartCount.toString());

      // Dispatch event to update UI
      const event = new CustomEvent("cartUpdated", {
        detail: { count: cartCount },
      });
      window.dispatchEvent(event);

      return true;
    } catch (error) {
      console.error("Error removing item:", error);
      return false;
    }
  },

  // Clear cart
  clearCart: (): boolean => {
    try {
      localStorage.removeItem("cartItems");
      localStorage.setItem("cartCount", "0");

      // Dispatch event to update UI
      const event = new CustomEvent("cartUpdated", {
        detail: { count: 0 },
      });
      window.dispatchEvent(event);

      return true;
    } catch (error) {
      console.error("Error clearing cart:", error);
      return false;
    }
  },

  // Get cart count
  getCartCount: (): number => {
    try {
      const cartCount = localStorage.getItem("cartCount");
      return cartCount ? parseInt(cartCount) : 0;
    } catch (error) {
      console.error("Error getting cart count:", error);
      return 0;
    }
  },

  // Calculate cart total
  calculateTotal: (): number => {
    try {
      const cartItems = cartService.getCartItems();
      return cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );
    } catch (error) {
      console.error("Error calculating total:", error);
      return 0;
    }
  },
};
