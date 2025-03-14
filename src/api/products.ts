import { supabase } from "@/lib/supabase";
import { Product, ProductCategory } from "@/types/products";

// Products API endpoints
export const productsApi = {
  // Get all products
  getAllProducts: async (): Promise<Product[]> => {
    try {
      const { data, error } = await supabase.from("products").select("*");

      if (error) throw error;
      return data as Product[];
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  },

  // Get products by category
  getProductsByCategory: async (
    category: ProductCategory,
  ): Promise<Product[]> => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("category", category);

      if (error) throw error;
      return data as Product[];
    } catch (error) {
      console.error("Error fetching products by category:", error);
      return [];
    }
  },

  // Get flash deals
  getFlashDeals: async (): Promise<Product[]> => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_flash_deal", true);

      if (error) throw error;
      return data as Product[];
    } catch (error) {
      console.error("Error fetching flash deals:", error);
      return [];
    }
  },

  // Get best sellers
  getBestSellers: async (): Promise<Product[]> => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_best_seller", true);

      if (error) throw error;
      return data as Product[];
    } catch (error) {
      console.error("Error fetching best sellers:", error);
      return [];
    }
  },

  // Get product by ID
  getProductById: async (productId: string): Promise<Product | null> => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .single();

      if (error) throw error;
      return data as Product;
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      return null;
    }
  },
};
