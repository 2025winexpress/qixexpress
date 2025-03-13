import React, { useState } from "react";
import Header from "../loyalty/Header";
import ProductCategories from "./ProductCategories";
import FlashDeals from "./FlashDeals";
import BestSellers from "./BestSellers";
import { Toaster } from "@/components/ui/toaster";
import MobileNavigation from "../layout/MobileNavigation";

const StorePage = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  // User information (mock data)
  const userData = {
    name: "Jane Smith",
    level: "Gold Member",
    points: 1250,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
    notificationCount: 3,
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  const handleNavigate = (
    view: "discovery" | "dashboard" | "wallet" | "store" | "home",
  ) => {
    // This would handle navigation in a real app
    console.log(`Navigating to ${view}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        activeTab="home"
        onTabChange={() => {}}
        userName={userData.name}
        userAvatar={userData.avatar}
        notificationCount={userData.notificationCount}
        onNavigate={handleNavigate}
      />

      <main className="container mx-auto py-6 px-4 pb-20">
        <ProductCategories
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        <FlashDeals />

        <BestSellers />
      </main>

      <MobileNavigation activeTab="store" />

      <Toaster />
    </div>
  );
};

export default StorePage;
