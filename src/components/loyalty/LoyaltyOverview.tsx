import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Coffee, Gift, Coins, ArrowRight } from "lucide-react";

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
    <div className="w-full bg-white p-6 rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 md:mb-0">
          نظرة عامة على برنامج الولاء
        </h2>
        <div className="flex space-x-3 rtl:space-x-reverse">
          <Button
            variant="outline"
            className="border-green-600 text-green-600 hover:bg-green-50"
            onClick={onDiscoverCards}
          >
            <Gift className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
            اكتشاف البطاقات
          </Button>
          <Button
            className="bg-green-600 hover:bg-green-700"
            onClick={onViewDashboard}
          >
            <ArrowRight className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
            عرض لوحة التحكم
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Stamps Card */}
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-green-800 flex items-center">
                <Coffee className="mr-2 h-5 w-5 text-green-600 rtl:ml-2 rtl:mr-0" />
                طوابع المكافآت
              </h3>
              <span className="text-sm font-medium bg-green-100 text-green-800 px-2 py-1 rounded-full">
                {stamps}/{totalStamps}
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2 mb-2" />
            <p className="text-sm text-green-700">
              {totalStamps - stamps} طوابع أخرى حتى مكافأتك المجانية التالية!
            </p>
            <div className="flex justify-between mt-3">
              {Array.from({ length: totalStamps }).map((_, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-center w-6 h-6 rounded-full ${index < stamps ? "bg-green-600 text-white" : "bg-gray-200 text-gray-400"}`}
                >
                  <Coffee size={12} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Coins Card */}
        <Card className="bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-yellow-800 flex items-center">
                <Coins className="mr-2 h-5 w-5 text-yellow-600 rtl:ml-2 rtl:mr-0" />
                كوينز الولاء
              </h3>
              <span className="text-sm font-medium bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                متاح
              </span>
            </div>
            <div className="flex items-center justify-center py-2">
              <p className="text-3xl font-bold text-yellow-600">
                {coinBalance}
              </p>
            </div>
            <p className="text-sm text-yellow-700 text-center">
              استخدم الكوينز للحصول على منتجات حصرية وخصومات!
            </p>
          </CardContent>
        </Card>

        {/* Gift Cards */}
        <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-purple-800 flex items-center">
                <Gift className="mr-2 h-5 w-5 text-purple-600 rtl:ml-2 rtl:mr-0" />
                بطاقات الهدايا
              </h3>
              <span className="text-sm font-medium bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                {giftCards} نشطة
              </span>
            </div>
            <div className="flex items-center justify-center py-2">
              <div className="relative">
                {Array.from({ length: Math.min(giftCards, 3) }).map(
                  (_, index) => (
                    <div
                      key={index}
                      className="absolute w-12 h-8 bg-white border border-purple-200 rounded-md shadow-sm"
                      style={{
                        left: `${index * 8}px`,
                        top: `${index * -4}px`,
                        zIndex: 3 - index,
                        transform: `rotate(${index * 5 - 5}deg)`,
                      }}
                    />
                  ),
                )}
                <Gift className="relative z-10 h-10 w-10 text-purple-500" />
              </div>
            </div>
            <p className="text-sm text-purple-700 text-center mt-4">
              لديك {giftCards} بطاقات هدايا جاهزة للاستخدام!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoyaltyOverview;
