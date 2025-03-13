import React from "react";
import {
  Coffee,
  Gift,
  Coins,
  User,
  Bell,
  LogOut,
  Home,
  ShoppingBag,
  Wallet,
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

interface HeaderProps {
  activeTab?: "discovery" | "dashboard" | "home";
  onTabChange?: (tab: "discovery" | "dashboard") => void;
  onNavigate?: (
    view: "discovery" | "dashboard" | "wallet" | "store" | "home",
  ) => void;
  userName?: string;
  userAvatar?: string;
  notificationCount?: number;
}

const Header = ({
  activeTab = "home",
  onTabChange = () => {},
  onNavigate = () => {},
  userName = "جون دو",
  userAvatar = "",
  notificationCount = 2,
}: HeaderProps) => {
  return (
    <header className="w-full h-20 bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center">
        <div
          className="flex items-center mr-8 cursor-pointer"
          onClick={() => onNavigate("home")}
        >
          <Coffee className="h-8 w-8 text-green-600" />
          <span className="ml-2 text-xl font-bold">برنامج الولاء</span>
        </div>

        <nav className="flex space-x-2 rtl:space-x-reverse">
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
            <ShoppingBag className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
            المتجر
          </Button>
        </nav>
      </div>

      <div className="flex items-center space-x-4 rtl:space-x-reverse">
        <Button variant="ghost" className="relative">
          <Bell className="h-5 w-5" />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 rtl:-left-1 rtl:right-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {notificationCount}
            </span>
          )}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center space-x-2 rtl:space-x-reverse p-1"
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
            <DropdownMenuItem>
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
            <DropdownMenuItem>
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
