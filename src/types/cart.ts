// Cart types
export interface CartItem {
  id: string;
  name: string;
  price: number;
  coinPrice: number;
  quantity: number;
  imageUrl: string;
  options?: string[];
  extras?: string[];
}
