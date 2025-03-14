import { supabase } from "@/lib/supabase";
import { LoyaltyCard, CardType } from "@/types/loyalty";

// Loyalty API endpoints
export const loyaltyApi = {
  // Get user's loyalty cards
  getUserCards: async (userId: string): Promise<LoyaltyCard[]> => {
    try {
      const { data, error } = await supabase
        .from("loyalty_cards")
        .select("*")
        .eq("user_id", userId);

      if (error) throw error;
      return data as LoyaltyCard[];
    } catch (error) {
      console.error("Error fetching loyalty cards:", error);
      return [];
    }
  },

  // Add a new loyalty card
  addCard: async (
    userId: string,
    cardNumber: string,
    cardType: CardType,
  ): Promise<LoyaltyCard | null> => {
    try {
      const { data, error } = await supabase
        .from("loyalty_cards")
        .insert({
          user_id: userId,
          card_number: cardNumber,
          card_type: cardType,
          date_added: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      return data as LoyaltyCard;
    } catch (error) {
      console.error("Error adding loyalty card:", error);
      return null;
    }
  },

  // Verify a card number
  verifyCard: async (
    cardNumber: string,
  ): Promise<{ valid: boolean; type?: CardType; balance?: number }> => {
    try {
      // In a real app, this would verify against a database
      // For demo purposes, we'll use a simple validation
      if (cardNumber.length !== 16) {
        return { valid: false };
      }

      // Determine card type based on first digit
      const firstDigit = cardNumber.charAt(0);
      let type: CardType;
      let balance = 0;

      if (firstDigit === "4") {
        type = "rewards";
        balance = Math.floor(Math.random() * 10); // Random stamps (0-9)
      } else if (firstDigit === "5") {
        type = "gift";
        balance = Math.floor(Math.random() * 100) + 10; // Random balance (10-109)
      } else if (firstDigit === "6") {
        type = "coins";
        balance = Math.floor(Math.random() * 1000) + 100; // Random coins (100-1099)
      } else {
        return { valid: false };
      }

      return { valid: true, type, balance };
    } catch (error) {
      console.error("Error verifying card:", error);
      return { valid: false };
    }
  },

  // Get user's coin balance
  getCoinBalance: async (userId: string): Promise<number> => {
    try {
      const { data, error } = await supabase
        .from("user_coins")
        .select("balance")
        .eq("user_id", userId)
        .single();

      if (error) throw error;
      return data?.balance || 0;
    } catch (error) {
      console.error("Error fetching coin balance:", error);
      return 0;
    }
  },

  // Update user's coin balance
  updateCoinBalance: async (
    userId: string,
    newBalance: number,
  ): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from("user_coins")
        .upsert({ user_id: userId, balance: newBalance })
        .select();

      if (error) throw error;
      return true;
    } catch (error) {
      console.error("Error updating coin balance:", error);
      return false;
    }
  },
};
