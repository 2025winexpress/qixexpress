import { api } from "@/api";
import { User } from "@/types/user";

// Authentication service
export const authService = {
  // Get current user
  getCurrentUser: async (): Promise<User | null> => {
    return api.user.getCurrentUser();
  },

  // Sign in
  signIn: async (email: string, password: string) => {
    try {
      const result = await api.user.signIn(email, password);
      // Store auth token or user info in localStorage if needed
      localStorage.setItem("isLoggedIn", "true");
      return result;
    } catch (error) {
      console.error("Sign in error:", error);
      throw error;
    }
  },

  // Sign out
  signOut: async (): Promise<boolean> => {
    try {
      const result = await api.user.signOut();
      // Clear local storage
      localStorage.removeItem("isLoggedIn");
      return result;
    } catch (error) {
      console.error("Sign out error:", error);
      return false;
    }
  },

  // Check if user is logged in
  isLoggedIn: (): boolean => {
    return localStorage.getItem("isLoggedIn") === "true";
  },

  // Update user profile
  updateProfile: async (
    userId: string,
    updates: Partial<User>,
  ): Promise<User | null> => {
    return api.user.updateProfile(userId, updates);
  },
};
