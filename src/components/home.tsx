import React, { useState } from "react";
import Header from "./loyalty/Header";
import CardDiscovery from "./loyalty/CardDiscovery";
import LoyaltyDashboard from "./loyalty/LoyaltyDashboard";
import LoyaltyWallet from "./loyalty/LoyaltyWallet";
import StoreSection from "./loyalty/StoreSection";
import LoyaltyOverview from "./loyalty/LoyaltyOverview";
import { Toaster } from "../components/ui/toaster";
import MobileNavigation from "./layout/MobileNavigation";

type CardType = "rewards" | "gift" | "coins";
type ActiveView = "discovery" | "dashboard" | "wallet" | "store" | "home";

interface Card {
  cardNumber: string;
  cardType: CardType;
  dateAdded: string;
}

const Home = () => {
  const [activeView, setActiveView] = useState<ActiveView>("home");
  const [userCards, setUserCards] = useState<Card[]>([
    {
      cardNumber: "4111222233334444",
      cardType: "rewards",
      dateAdded: "2023-05-15",
    },
    {
      cardNumber: "5111222233334444",
      cardType: "gift",
      dateAdded: "2023-06-10",
    },
  ]);

  // User information (mock data)
  const userData = {
    name: "جين سميث",
    level: "عضو ذهبي",
    points: 1250,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
    notificationCount: 3,
  };

  const handleTabChange = (tab: "discovery" | "dashboard") => {
    setActiveView(tab);
  };

  const handleCardAdded = (cardNumber: string, cardType: CardType) => {
    const newCard: Card = {
      cardNumber,
      cardType,
      dateAdded: new Date().toISOString().split("T")[0], // Format as YYYY-MM-DD
    };

    setUserCards([...userCards, newCard]);

    // Automatically switch to dashboard after adding a card
    setActiveView("dashboard");
  };

  const handleNavigate = (view: ActiveView) => {
    setActiveView(view);
  };

  const renderContent = () => {
    switch (activeView) {
      case "home":
        return (
          <>
            <LoyaltyOverview
              stamps={7}
              totalStamps={10}
              coinBalance={userData.points}
              giftCards={
                userCards.filter((card) => card.cardType === "gift").length
              }
              onDiscoverCards={() => setActiveView("discovery")}
              onViewDashboard={() => setActiveView("dashboard")}
            />
            <div className="mt-8">
              <StoreSection coinBalance={userData.points} />
            </div>
          </>
        );
      case "discovery":
        return <CardDiscovery onCardAdded={handleCardAdded} />;
      case "dashboard":
        return <LoyaltyDashboard coinBalance={userData.points} />;
      case "wallet":
        return <LoyaltyWallet coinBalance={userData.points} />;
      case "store":
        return <StoreSection coinBalance={userData.points} />;
      default:
        return <CardDiscovery onCardAdded={handleCardAdded} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        activeTab={
          activeView === "discovery"
            ? "discovery"
            : activeView === "dashboard"
              ? "dashboard"
              : "home"
        }
        onTabChange={handleTabChange}
        userName={userData.name}
        userAvatar={userData.avatar}
        notificationCount={userData.notificationCount}
        onNavigate={handleNavigate}
      />

      <main className="container mx-auto py-6 px-4 pb-20">
        {renderContent()}
      </main>

      <MobileNavigation
        activeTab={
          activeView === "store"
            ? "store"
            : activeView === "wallet"
              ? "wallet"
              : activeView === "dashboard"
                ? "loyalty"
                : "home"
        }
        onNavigate={(tab) => {
          if (tab === "loyalty") {
            setActiveView("dashboard");
          } else {
            setActiveView(tab as ActiveView);
          }
        }}
      />

      <footer className="bg-white border-t border-gray-200 py-6 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-600 text-sm">
                © 2023 برنامج الولاء. جميع الحقوق محفوظة.
              </p>
            </div>
            <div className="flex space-x-6 rtl:space-x-reverse">
              <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                شروط الخدمة
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                سياسة الخصوصية
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                اتصل بنا
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Toast notifications container */}
      <Toaster />
    </div>
  );
};

export default Home;
