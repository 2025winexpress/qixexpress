import { supabase } from "@/lib/supabase";
import { User } from "@/types/user";

// User API endpoints
export const userApi = {
  // Get current user profile
  getCurrentUser: async (): Promise<User | null> => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return null;

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      return data as User;
    } catch (error) {
      console.error("Error fetching current user:", error);
      return null;
    }
  },

  // Update user profile
  updateProfile: async (
    userId: string,
    updates: Partial<User>,
  ): Promise<User | null> => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", userId)
        .select()
        .single();

      if (error) throw error;
      return data as User;
    } catch (error) {
      console.error("Error updating profile:", error);
      return null;
    }
  },

  // Sign in user
  signIn: async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    }
  },

  // Sign out user
  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return true;
    } catch (error) {
      console.error("Error signing out:", error);
      return false;
    }
  },
};
