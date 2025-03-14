// Loyalty types
export type CardType = "rewards" | "gift" | "coins";

export interface LoyaltyCard {
  id: string;
  user_id: string;
  card_number: string;
  card_type: CardType;
  balance: number;
  max_balance?: number;
  expiry_date?: string;
  date_added: string;
  is_active: boolean;
}

export interface RewardStage {
  id: string;
  card_id: string;
  name: string;
  required_stamps: number;
  description: string;
}

export interface CoinTransaction {
  id: string;
  user_id: string;
  amount: number;
  type: "earned" | "spent" | "transferred" | "received";
  description: string;
  created_at: string;
  reference_id?: string;
}
