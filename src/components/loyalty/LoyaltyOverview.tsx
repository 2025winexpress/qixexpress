import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Coffee,
  Gift,
  Coins,
  ArrowRight,
  Star,
  ShoppingBag,
  Award,
} from "lucide-react";

interface LoyaltyOverviewProps {
  stamps?: number;
  totalStamps?: number;
  coinBalance?: number;
  giftCards?: number;
  onDiscoverCards?: () => void;
  onViewDashboard?: () => void;
}

const LoyaltyOverview: React.FC<LoyaltyOverviewProps> = ({
  stamps = 7,
  totalStamps = 10,
  coinBalance = 1250,
  giftCards = 3,
  onDiscoverCards = () => {},
  onViewDashboard = () => {},
}) => {
  const progressPercentage = (stamps / totalStamps) * 100;

  return (
    <div className="w-full bg-white p-4 md:p-6 rounded-lg shadow-md" dir="rtl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 md:mb-0">
          نظرة عامة على برنامج الولاء
        </h2>
        <div className="flex space-x-2 md:space-x-3 rtl:space-x-reverse">
          <Button
            variant="outline"
            size="sm"
            className="border-green-600 text-green-600 hover:bg-green-50 md:size-default"
            onClick={onDiscoverCards}
          >
            <Gift className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4 rtl:ml-1 rtl:md:ml-2 rtl:mr-0" />
            <span className="text-xs md:text-sm">اكتشاف البطاقات</span>
          </Button>
          <Button
            size="sm"
            className="bg-green-600 hover:bg-green-700 md:size-default"
            onClick={onViewDashboard}
          >
            <ArrowRight className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4 rtl:ml-1 rtl:md:ml-2 rtl:mr-0" />
            <span className="text-xs md:text-sm">عرض لوحة التحكم</span>
          </Button>
        </div>
      </div>

      {/* Status Banner */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-3 md:p-4 rounded-lg border border-green-100 mb-4 md:mb-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-3 md:mb-0">
            <Star className="h-6 md:h-8 w-6 md:w-8 text-green-600 mr-2 md:mr-3" />
            <div>
              <h3 className="font-bold text-base md:text-lg text-gray-800">
                حالة برنامج الولاء
              </h3>
              <p className="text-xs md:text-sm text-gray-600">
                مرحباً بك في برنامج الولاء الخاص بنا
              </p>
            </div>
          </div>
          <div className="w-full md:w-auto">
            <Button
              size="sm"
              className="w-full md:w-auto bg-green-600 hover:bg-green-700 md:size-default"
              onClick={onDiscoverCards}
            >
              <Gift className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
              <span className="text-xs md:text-sm">اكتشاف البطاقات</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
        {/* Stamps Card */}
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-100 hover:shadow-md transition-shadow">
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-sm md:text-base text-green-800 flex items-center">
                <Coffee className="mr-1 md:mr-2 h-4 md:h-5 w-4 md:w-5 text-green-600 rtl:ml-1 rtl:md:ml-2 rtl:mr-0" />
                طوابع المكافآت
              </h3>
              <span className="text-xs md:text-sm font-medium bg-green-100 text-green-800 px-2 py-1 rounded-full">
                {stamps}/{totalStamps}
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2 mb-2" />
            <p className="text-xs md:text-sm text-green-700">
              {totalStamps - stamps} طوابع أخرى حتى مكافأتك المجانية التالية!
            </p>
            <div className="flex justify-between mt-2 md:mt-3">
              {Array.from({ length: totalStamps }).map((_, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-center w-5 h-5 md:w-6 md:h-6 rounded-full ${index < stamps ? "bg-green-600 text-white" : "bg-gray-200 text-gray-400"}`}
                >
                  <Award size={10} className="md:w-3 md:h-3" />
                </div>
              ))}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="w-full mt-3 md:mt-4 text-green-700 hover:bg-green-50 border border-green-200 text-xs md:text-sm"
              onClick={onViewDashboard}
            >
              عرض التفاصيل
            </Button>
          </CardContent>
        </Card>

        {/* Coins Card */}
        <Card className="bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-100 hover:shadow-md transition-shadow">
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-sm md:text-base text-yellow-800 flex items-center">
                <Coins className="mr-1 md:mr-2 h-4 md:h-5 w-4 md:w-5 text-yellow-600 rtl:ml-1 rtl:md:ml-2 rtl:mr-0" />
                كوينز الولاء
              </h3>
              <span className="text-xs md:text-sm font-medium bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                متاح
              </span>
            </div>
            <div className="flex items-center justify-center py-1 md:py-2">
              <p className="text-2xl md:text-3xl font-bold text-yellow-600">
                {coinBalance}
              </p>
            </div>
            <p className="text-xs md:text-sm text-yellow-700 text-center">
              استخدم الكوينز للحصول على منتجات حصرية وخصومات!
            </p>
            <div className="flex justify-between mt-3 md:mt-4">
              <Button
                variant="ghost"
                size="sm"
                className="flex-1 mr-1 text-yellow-700 hover:bg-yellow-50 border border-yellow-200 text-xs md:text-sm"
                onClick={onViewDashboard}
              >
                عرض التفاصيل
              </Button>
              <Button
                size="sm"
                className="flex-1 ml-1 bg-yellow-500 hover:bg-yellow-600 text-xs md:text-sm"
              >
                <ShoppingBag className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
                استخدام
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Gift Cards */}
        <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-100 hover:shadow-md transition-shadow">
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-sm md:text-base text-purple-800 flex items-center">
                <Gift className="mr-1 md:mr-2 h-4 md:h-5 w-4 md:w-5 text-purple-600 rtl:ml-1 rtl:md:ml-2 rtl:mr-0" />
                بطاقات الهدايا
              </h3>
              <span className="text-xs md:text-sm font-medium bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                {giftCards} نشطة
              </span>
            </div>
            <div className="flex items-center justify-center py-1 md:py-2">
              <div className="relative">
                {Array.from({ length: Math.min(giftCards, 3) }).map(
                  (_, index) => (
                    <div
                      key={index}
                      className="absolute w-10 md:w-12 h-6 md:h-8 bg-white border border-purple-200 rounded-md shadow-sm"
                      style={{
                        left: `${index * 6}px`,
                        top: `${index * -3}px`,
                        zIndex: 3 - index,
                        transform: `rotate(${index * 5 - 5}deg)`,
                      }}
                    />
                  ),
                )}
                <Gift className="relative z-10 h-8 w-8 md:h-10 md:w-10 text-purple-500" />
              </div>
            </div>
            <p className="text-xs md:text-sm text-purple-700 text-center mt-3 md:mt-4">
              لديك {giftCards} بطاقات هدايا جاهزة للاستخدام!
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="w-full mt-3 md:mt-4 text-purple-700 hover:bg-purple-50 border border-purple-200 text-xs md:text-sm"
              onClick={onViewDashboard}
            >
              عرض التفاصيل
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoyaltyOverview;
