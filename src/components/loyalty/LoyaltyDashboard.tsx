import React, { useState } from "react";
import DashboardTabs from "./DashboardTabs";
import RewardsSection from "./RewardsSection";
import GiftCardSection from "./GiftCardSection";
import CoinsSection from "./CoinsSection";
import { Toaster } from "@/components/ui/toaster";

interface LoyaltyDashboardProps {
  coinBalance?: number;
}

const LoyaltyDashboard: React.FC<LoyaltyDashboardProps> = ({
  coinBalance = 1250,
}) => {
  const [activeTab, setActiveTab] = useState("rewards");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "rewards":
        return <RewardsSection onBack={() => setActiveTab("discovery")} />;
      case "giftcards":
        return <GiftCardSection onBack={() => setActiveTab("discovery")} />;
      case "coins":
        return (
          <CoinsSection
            coinBalance={coinBalance}
            onBack={() => setActiveTab("discovery")}
          />
        );
      default:
        return <RewardsSection />;
    }
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md" dir="rtl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        لوحة برنامج الولاء
      </h1>

      <DashboardTabs activeTab={activeTab} onTabChange={handleTabChange} />

      <div className="mt-6">{renderTabContent()}</div>

      <Toaster />
    </div>
  );
};

export default LoyaltyDashboard;
