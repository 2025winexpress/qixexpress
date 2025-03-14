// Product types
export type ProductCategory =
  | "all"
  | "food"
  | "drinks"
  | "desserts"
  | "icecream";

export interface ProductOption {
  id: string;
  name: string;
  price?: number;
  is_default?: boolean;
}

export interface ProductExtra {
  id: string;
  name: string;
  price: number;
  is_default?: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discount_price?: number;
  coin_price: number;
  image_url: string;
  category: ProductCategory;
  is_flash_deal: boolean;
  is_best_seller: boolean;
  rating?: number;
  review_count?: number;
  end_time?: string;
  options?: ProductOption[];
  extras?: ProductExtra[];
  created_at: string;
  updated_at: string;
}
