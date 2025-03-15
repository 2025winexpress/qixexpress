import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../loyalty/Header";
import ProductCategories from "./ProductCategories";
import FlashDeals from "./FlashDeals";
import BestSellers from "./BestSellers";
import { Toaster } from "@/components/ui/toaster";
import MobileNavigation from "../layout/MobileNavigation";

const StorePage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  // User information (mock data)
  const userData = {
    name: "جين سميث",
    level: "عضو ذهبي",
    points: 1250,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
    notificationCount: 3,
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  const handleNavigate = (
    view: "discovery" | "dashboard" | "wallet" | "store" | "home" | "profile",
  ) => {
    // Handle navigation based on view
    switch (view) {
      case "home":
        navigate("/", { replace: true });
        break;
      case "discovery":
        navigate("/", { replace: true });
        // Set the active view to discovery in the Home component
        setTimeout(() => {
          const event = new CustomEvent("setActiveView", {
            detail: "discovery",
          });
          window.dispatchEvent(event);
        }, 100);
        break;
      case "dashboard":
        navigate("/", { replace: true });
        // Set the active view to dashboard in the Home component
        setTimeout(() => {
          const event = new CustomEvent("setActiveView", {
            detail: "dashboard",
          });
          window.dispatchEvent(event);
        }, 100);
        break;
      case "wallet":
        navigate("/", { replace: true });
        // Set the active view to wallet in the Home component
        setTimeout(() => {
          const event = new CustomEvent("setActiveView", { detail: "wallet" });
          window.dispatchEvent(event);
        }, 100);
        break;
      case "store":
        navigate("/store", { replace: true });
        break;
      case "profile":
        navigate("/profile", { replace: true });
        break;
      default:
        navigate("/", { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        activeTab="store"
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
