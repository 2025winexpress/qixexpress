// Application configuration

// API configuration
export const apiConfig = {
  baseUrl: import.meta.env.VITE_API_URL || "",
  timeout: 30000, // 30 seconds
};

// Authentication configuration
export const authConfig = {
  storageKey: "auth_token",
  refreshTokenKey: "refresh_token",
};

// Loyalty program configuration
export const loyaltyConfig = {
  coinConversionRate: 0.1, // 1 coin = 0.1 MAD
  minCoinsForRedemption: 100,
  maxCoinsPerTransaction: 5000,
};

// App settings
export const appSettings = {
  defaultLanguage: "ar",
  supportedLanguages: ["ar", "en", "fr"],
  defaultTheme: "light",
  appName: "برنامج الولاء",
  appVersion: "1.0.0",
};

// Feature flags
export const featureFlags = {
  enableCoinTransfer: true,
  enableGiftCards: true,
  enableRewards: true,
  enablePushNotifications: false,
};
