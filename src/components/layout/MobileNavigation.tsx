import React from "react";
import { Home, Utensils, Gift, Wallet, ShoppingCart, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface MobileNavigationProps {
  activeTab?: "home" | "store" | "loyalty" | "wallet" | "cart" | "profile";
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({
  activeTab = "home",
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    {
      id: "home",
      label: "الرئيسية",
      icon: <Home className="h-5 w-5" />,
      path: "/",
    },
    {
      id: "store",
      label: "الطعام",
      icon: <Utensils className="h-5 w-5" />,
      path: "/store",
    },
    {
      id: "loyalty",
      label: "المكافآت",
      icon: <Gift className="h-5 w-5" />,
      path: "/",
    },
    {
      id: "wallet",
      label: "المحفظة",
      icon: <Wallet className="h-5 w-5" />,
      path: "/",
    },
    {
      id: "cart",
      label: "السلة",
      icon: <ShoppingCart className="h-5 w-5" />,
      path: "/cart",
    },
    {
      id: "profile",
      label: "الحساب",
      icon: <User className="h-5 w-5" />,
      path: "/profile",
    },
  ];

  const handleNavigation = (tabId: string, path: string) => {
    // Prevent unnecessary navigation if already on the page
    if (
      location.pathname === path &&
      tabId !== "loyalty" &&
      tabId !== "wallet"
    ) {
      return;
    }

    // Handle special cases for tabs that need to update state in parent components
    if (tabId === "loyalty") {
      if (location.pathname !== "/") {
        navigate("/", { replace: true });
      }
      // Set the active view to dashboard in the Home component
      setTimeout(() => {
        const event = new CustomEvent("setActiveView", { detail: "dashboard" });
        window.dispatchEvent(event);
      }, 100);
    } else if (tabId === "wallet") {
      if (location.pathname !== "/") {
        navigate("/", { replace: true });
      }
      // Set the active view to wallet in the Home component
      setTimeout(() => {
        const event = new CustomEvent("setActiveView", { detail: "wallet" });
        window.dispatchEvent(event);
      }, 100);
    } else {
      // Navigate to the specified path
      navigate(path, { replace: true });
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-10">
      <div className="flex justify-around items-center h-16">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`flex flex-col items-center justify-center w-full h-full ${activeTab === tab.id ? "text-green-600" : "text-gray-500"}`}
            onClick={() => handleNavigation(tab.id, tab.path)}
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
