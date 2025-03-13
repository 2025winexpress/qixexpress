import React from "react";
import { Home, ShoppingBag, Gift, Wallet, ShoppingCart } from "lucide-react";

interface MobileNavigationProps {
  activeTab?: "home" | "store" | "loyalty" | "wallet" | "cart";
  onNavigate?: (tab: "home" | "store" | "loyalty" | "wallet" | "cart") => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({
  activeTab = "home",
  onNavigate = () => {},
}) => {
  const tabs = [
    { id: "home", label: "الرئيسية", icon: <Home className="h-5 w-5" /> },
    { id: "store", label: "المتجر", icon: <ShoppingBag className="h-5 w-5" /> },
    {
      id: "loyalty",
      label: "برنامج الولاء",
      icon: <Gift className="h-5 w-5" />,
    },
    { id: "wallet", label: "المحفظة", icon: <Wallet className="h-5 w-5" /> },
    { id: "cart", label: "السلة", icon: <ShoppingCart className="h-5 w-5" /> },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg md:hidden z-10">
      <div className="flex justify-around items-center h-16">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`flex flex-col items-center justify-center w-full h-full ${activeTab === tab.id ? "text-green-600" : "text-gray-500"}`}
            onClick={() => onNavigate(tab.id as any)}
          >
            {tab.icon}
            <span className="text-xs mt-1">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileNavigation;
