import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../loyalty/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { User, Mail, Phone, MapPin, Camera, Save } from "lucide-react";
import MobileNavigation from "./MobileNavigation";

const ProfilePage = () => {
  const { toast } = useToast();
  const [userData, setUserData] = React.useState({
    name: "جين سميث",
    email: "jane.smith@example.com",
    phone: "0612345678",
    address: "شارع الحسن الثاني، رقم 123، الدار البيضاء",
    level: "عضو ذهبي",
    points: 1250,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
    notificationCount: 3,
  });

  const handleSaveProfile = () => {
    toast({
      title: "تم حفظ الملف الشخصي",
      description: "تم تحديث معلومات الملف الشخصي بنجاح",
      variant: "default",
    });
  };

  const navigate = useNavigate();

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
      default:
        navigate("/", { replace: true });
    }
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
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-right">
          الملف الشخصي
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardContent className="p-6 flex flex-col items-center">
                <div className="relative mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={userData.avatar} alt={userData.name} />
                    <AvatarFallback className="bg-green-100 text-green-800 text-xl">
                      {userData.name
                        .split(" ")
                        .map((name) => name[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    variant="outline"
                    className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-white"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <h2 className="text-xl font-semibold mb-1">{userData.name}</h2>
                <p className="text-sm text-gray-500 mb-3">{userData.email}</p>
                <div className="bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full mb-4">
                  {userData.level}
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5 mb-1">
                  <div
                    className="bg-green-600 h-2.5 rounded-full"
                    style={{ width: "70%" }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mb-4">
                  {userData.points} نقطة • 300 نقطة للمستوى التالي
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-right">معلومات الحساب</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-right block">
                    الاسم الكامل
                  </Label>
                  <div className="relative">
                    <Input
                      id="name"
                      value={userData.name}
                      onChange={(e) =>
                        setUserData({ ...userData, name: e.target.value })
                      }
                      className="pl-10 text-right"
                    />
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-right block">
                    البريد الإلكتروني
                  </Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      value={userData.email}
                      onChange={(e) =>
                        setUserData({ ...userData, email: e.target.value })
                      }
                      className="pl-10 text-right"
                    />
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-right block">
                    رقم الهاتف
                  </Label>
                  <div className="relative">
                    <Input
                      id="phone"
                      value={userData.phone}
                      onChange={(e) =>
                        setUserData({ ...userData, phone: e.target.value })
                      }
                      className="pl-10 text-right"
                    />
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-right block">
                    العنوان
                  </Label>
                  <div className="relative">
                    <Input
                      id="address"
                      value={userData.address}
                      onChange={(e) =>
                        setUserData({ ...userData, address: e.target.value })
                      }
                      className="pl-10 text-right"
                    />
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    onClick={handleSaveProfile}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    حفظ التغييرات
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <MobileNavigation activeTab="profile" />

      <Toaster />
    </div>
  );
};

export default ProfilePage;
