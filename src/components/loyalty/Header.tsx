import React, { useState, useEffect } from "react";
import {
  Coffee,
  Gift,
  Coins,
  User,
  Bell,
  LogOut,
  Home,
  Utensils,
  Wallet,
  Menu,
  Plus,
  ShoppingCart,
} from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

// Cart badge component that updates when cart is updated
const CartBadge = () => {
  const [cartCount, setCartCount] = useState(() => {
    return parseInt(localStorage.getItem("cartCount") || "0");
  });

  useEffect(() => {
    const handleCartUpdated = (e: CustomEvent) => {
      setCartCount(e.detail.count);
    };

    window.addEventListener("cartUpdated", handleCartUpdated as EventListener);

    return () => {
      window.removeEventListener(
        "cartUpdated",
        handleCartUpdated as EventListener,
      );
    };
  }, []);

  return cartCount > 0 ? (
    <span className="absolute -top-1 -right-1 rtl:-left-1 rtl:right-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
      {cartCount}
    </span>
  ) : null;
};

interface HeaderProps {
  activeTab?:
    | "discovery"
    | "dashboard"
    | "home"
    | "store"
    | "wallet"
    | "profile";
  onTabChange?: (tab: "discovery" | "dashboard") => void;
  onNavigate?: (
    view: "discovery" | "dashboard" | "wallet" | "store" | "home" | "profile",
  ) => void;
  userName?: string;
  userAvatar?: string;
  notificationCount?: number;
  onLogout?: () => void;
}

const Header = ({
  activeTab = "home",
  onTabChange = () => {},
  onNavigate = (view) => {
    // Handle navigation based on view
    switch (view) {
      case "home":
        window.location.href = "/";
        break;
      case "discovery":
        window.location.href = "/";
        break;
      case "dashboard":
        window.location.href = "/";
        break;
      case "wallet":
        window.location.href = "/";
        break;
      case "store":
        window.location.href = "/store";
        break;
      case "profile":
        window.location.href = "/profile";
        break;
      default:
        window.location.href = "/";
    }
  },
  userName = "جون دو",
  userAvatar = "",
  notificationCount = 2,
  onLogout = () => {},
}: HeaderProps) => {
  return (
    <header className="w-full h-16 md:h-20 bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-4 md:px-6 sticky top-0 z-10">
      {/* Logo and App Name */}
      <div className="flex items-center">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => onNavigate("home")}
        >
          <Coffee className="h-8 w-8 text-green-600" />
          <span className="ml-2 text-xl font-bold">برنامج الولاء</span>
        </div>
      </div>

      {/* Desktop Navigation - Hidden on Mobile */}
      <nav className="hidden md:flex space-x-2 rtl:space-x-reverse">
        <Button
          variant={activeTab === "home" ? "default" : "ghost"}
          className={`flex items-center ${activeTab === "home" ? "bg-green-600 hover:bg-green-700" : "text-gray-600 hover:text-gray-900"}`}
          onClick={() => onNavigate("home")}
        >
          <Home className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
          الرئيسية
        </Button>

        <Button
          variant={activeTab === "discovery" ? "default" : "ghost"}
          className={`flex items-center ${activeTab === "discovery" ? "bg-green-600 hover:bg-green-700" : "text-gray-600 hover:text-gray-900"}`}
          onClick={() => onNavigate("discovery")}
        >
          <Gift className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
          اكتشاف البطاقات
        </Button>

        <Button
          variant={activeTab === "dashboard" ? "default" : "ghost"}
          className={`flex items-center ${activeTab === "dashboard" ? "bg-green-600 hover:bg-green-700" : "text-gray-600 hover:text-gray-900"}`}
          onClick={() => onNavigate("dashboard")}
        >
          <Coins className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
          لوحة برنامج الولاء
        </Button>

        <Button
          variant="ghost"
          className="flex items-center text-gray-600 hover:text-gray-900"
          onClick={() => onNavigate("wallet")}
        >
          <Wallet className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
          المحفظة
        </Button>

        <Button
          variant="ghost"
          className="flex items-center text-gray-600 hover:text-gray-900"
          onClick={() => onNavigate("store")}
        >
          <Utensils className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
          الطعام
        </Button>
      </nav>

      {/* Mobile Action Buttons */}
      <div className="flex items-center space-x-3 rtl:space-x-reverse">
        {/* Add Card Button - Mobile Only */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden relative"
          onClick={() => onNavigate("discovery")}
        >
          <Plus className="h-5 w-5 text-green-600" />
          <Gift className="h-3 w-3 absolute bottom-1 right-1 text-green-600" />
        </Button>

        {/* Notification Button */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 rtl:-left-1 rtl:right-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {notificationCount}
            </span>
          )}
        </Button>

        {/* Cart Button */}
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          onClick={() => (window.location.href = "/cart")}
        >
          <ShoppingCart className="h-5 w-5" />
          <CartBadge />
        </Button>

        {/* User Profile Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>حسابي</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => (window.location.href = "/profile")}
            >
              <User className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
              الملف الشخصي
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onNavigate("dashboard")}>
              <Gift className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
              بطاقاتي
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onNavigate("wallet")}>
              <Coins className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
              الكوينز الخاصة بي
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogout}>
              <LogOut className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
              تسجيل الخروج
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Desktop User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="hidden md:flex items-center space-x-2 rtl:space-x-reverse p-1"
            >
              <Avatar>
                <AvatarImage src={userAvatar} alt={userName} />
                <AvatarFallback className="bg-green-100 text-green-800">
                  {userName
                    .split(" ")
                    .map((name) => name[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <span className="font-medium">{userName}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>حسابي</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => (window.location.href = "/profile")}
            >
              <User className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
              الملف الشخصي
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onNavigate("dashboard")}>
              <Gift className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
              بطاقاتي
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onNavigate("wallet")}>
              <Coins className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
              الكوينز الخاصة بي
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogout}>
              <LogOut className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
              تسجيل الخروج
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
