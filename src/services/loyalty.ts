import { api } from "@/api";
import { LoyaltyCard, CardType } from "@/types/loyalty";

// Loyalty service
export const loyaltyService = {
  // Get user's loyalty cards
  getUserCards: async (userId: string): Promise<LoyaltyCard[]> => {
    return api.loyalty.getUserCards(userId);
  },

  // Add a new loyalty card
  addCard: async (
    userId: string,
    cardNumber: string,
    cardType: CardType,
  ): Promise<LoyaltyCard | null> => {
    return api.loyalty.addCard(userId, cardNumber, cardType);
  },

  // Verify a card number
  verifyCard: async (
    cardNumber: string,
  ): Promise<{ valid: boolean; type?: CardType; balance?: number }> => {
    return api.loyalty.verifyCard(cardNumber);
  },

  // Get user's coin balance
  getCoinBalance: async (userId: string): Promise<number> => {
    return api.loyalty.getCoinBalance(userId);
  },

  // Update user's coin balance
  updateCoinBalance: async (
    userId: string,
    newBalance: number,
  ): Promise<boolean> => {
    return api.loyalty.updateCoinBalance(userId, newBalance);
  },

  // Transfer coins between users
  transferCoins: async (
    fromUserId: string,
    toUserId: string,
    amount: number,
  ): Promise<boolean> => {
    try {
      // Get current balances
      const fromBalance = await api.loyalty.getCoinBalance(fromUserId);
      const toBalance = await api.loyalty.getCoinBalance(toUserId);

      // Check if sender has enough coins
      if (fromBalance < amount) {
        throw new Error("Insufficient coins");
      }

      // Update balances
      const updateFrom = await api.loyalty.updateCoinBalance(
        fromUserId,
        fromBalance - amount,
      );
      const updateTo = await api.loyalty.updateCoinBalance(
        toUserId,
        toBalance + amount,
      );

      return updateFrom && updateTo;
    } catch (error) {
      console.error("Error transferring coins:", error);
      return false;
    }
  },

  // Redeem a reward
  redeemReward: async (userId: string, cardId: string): Promise<boolean> => {
    // This would be implemented with actual API calls in a real app
    return true;
  },
};
