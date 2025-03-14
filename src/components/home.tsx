import React, { useState, useEffect } from "react";
import Header from "./loyalty/Header";
import CardDiscovery from "./loyalty/CardDiscovery";
import LoyaltyDashboard from "./loyalty/LoyaltyDashboard";
import LoyaltyWallet from "./loyalty/LoyaltyWallet";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Coins } from "lucide-react";
import LoyaltyOverview from "./loyalty/LoyaltyOverview";
import { Toaster } from "../components/ui/toaster";
import MobileNavigation from "./layout/MobileNavigation";
import StorePage from "./store/StorePage";
import { useToast } from "@/components/ui/use-toast";

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
  const { toast } = useToast();

  // User information (mock data)
  const userData = {
    name: "جين سميث",
    level: "عضو ذهبي",
    points: 1250,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
    notificationCount: 3,
  };

  // Show welcome notification on first load and redirect to login if not logged in
  useEffect(() => {
    // Check if user is logged in (for demo purposes, we'll assume they are)
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      // For demo purposes, we'll set this to true to avoid constant redirects
      localStorage.setItem("isLoggedIn", "true");
      // In a real app, you would redirect to login here
      // window.location.href = '/login';
    }

    toast({
      title: "مرحباً بك في برنامج الولاء",
      description: "استكشف المكافآت والهدايا والكوينز في حسابك",
      variant: "default",
    });
  }, []);

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

    // Show success notification
    const cardTypeText =
      cardType === "rewards"
        ? "المكافآت"
        : cardType === "gift"
          ? "الهدية"
          : "الكوينز";

    toast({
      title: "تمت إضافة البطاقة بنجاح",
      description: `تمت إضافة بطاقة ${cardTypeText} إلى حسابك`,
      variant: "default",
    });
  };

  const handleNavigate = (view: ActiveView) => {
    if (view === "store") {
      window.location.href = "/store";
      return;
    } else if (view === "cart") {
      window.location.href = "/cart";
      return;
    } else if (view === "profile") {
      window.location.href = "/profile";
      return;
    }
    setActiveView(view);
  };

  const handleLogout = () => {
    toast({
      title: "تم تسجيل الخروج",
      description: "تم تسجيل خروجك بنجاح",
      variant: "default",
    });
    // في تطبيق حقيقي، هنا سيتم تنفيذ عملية تسجيل الخروج
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
              <div className="w-full bg-white p-6 rounded-lg shadow-md">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
                    <ShoppingBag className="mr-2 text-green-600" />
                    منتجات مميزة
                  </h2>
                  <p className="text-gray-600">
                    تصفح مجموعة من منتجاتنا المميزة واستمتع بتجربة تسوق فريدة.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      id: "prod1",
                      name: "قهوة عربية فاخرة",
                      description: "قهوة عربية أصلية مع هيل",
                      price: 35,
                      coinPrice: 150,
                      imageUrl:
                        "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&q=80",
                    },
                    {
                      id: "prod2",
                      name: "كيك الشوكولاتة",
                      description: "كيك شوكولاتة بلجيكية فاخرة",
                      price: 45,
                      coinPrice: 180,
                      imageUrl:
                        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80",
                    },
                    {
                      id: "prod3",
                      name: "شاي أخضر بالنعناع",
                      description: "شاي أخضر طازج مع نعناع طبيعي",
                      price: 25,
                      coinPrice: 100,
                      imageUrl:
                        "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400&q=80",
                    },
                    {
                      id: "prod4",
                      name: "كروسان بالجبن",
                      description: "كروسان طازج محشو بالجبن",
                      price: 30,
                      coinPrice: 120,
                      imageUrl:
                        "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80",
                    },
                  ].map((product) => (
                    <Card
                      key={product.id}
                      className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => (window.location.href = "/store")}
                    >
                      <div className="h-48 overflow-hidden">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-3">
                        <h3 className="font-medium text-right">
                          {product.name}
                        </h3>
                        <p className="text-xs text-gray-500 text-right">
                          {product.description}
                        </p>
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center text-xs text-yellow-600">
                            <Coins className="h-3 w-3 mr-1" />
                            {product.coinPrice}
                          </div>
                          <p className="font-bold text-green-600 text-right">
                            {product.price} درهم
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Button
                    onClick={() => (window.location.href = "/store")}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    عرض جميع المنتجات
                  </Button>
                </div>
              </div>
            </div>
          </>
        );
      case "discovery":
        return (
          <CardDiscovery
            onCardAdded={handleCardAdded}
            onBack={() => setActiveView("home")}
          />
        );
      case "dashboard":
        return <LoyaltyDashboard coinBalance={userData.points} />;
      case "wallet":
        return <LoyaltyWallet coinBalance={userData.points} />;
      case "store":
        return <StorePage />;
      default:
        return (
          <CardDiscovery
            onCardAdded={handleCardAdded}
            onBack={() => setActiveView("home")}
          />
        );
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
        onLogout={handleLogout}
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
                : activeView === "discovery"
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
