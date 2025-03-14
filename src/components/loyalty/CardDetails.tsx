import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Award, Gift, Coins, Plus, Check, Calendar } from "lucide-react";

type CardType = "rewards" | "gift" | "coins";

interface CardDetailsProps {
  cardNumber: string;
  cardType: CardType;
  balance: number;
  expiryDate?: string;
  isVerified?: boolean;
  onAddToAccount?: () => void;
}

const CardDetails: React.FC<CardDetailsProps> = ({
  cardNumber,
  cardType,
  balance,
  expiryDate = "12/2025",
  isVerified = false,
  onAddToAccount = () => {},
}) => {
  const formatCardNumber = (number: string) => {
    // Show only last 4 digits for security
    return "**** **** **** " + (number ? number.slice(-4) : "****");
  };

  const getCardIcon = () => {
    switch (cardType) {
      case "rewards":
        return <Award className="h-8 w-8 text-green-600" />;
      case "gift":
        return <Gift className="h-8 w-8 text-purple-600" />;
      case "coins":
        return <Coins className="h-8 w-8 text-amber-500" />;
      default:
        return <Award className="h-8 w-8 text-green-600" />;
    }
  };

  const getCardTitle = () => {
    switch (cardType) {
      case "rewards":
        return "بطاقة المكافآت";
      case "gift":
        return "بطاقة الهدية";
      case "coins":
        return "بطاقة الكوينز";
      default:
        return "بطاقة";
    }
  };

  return (
    <Card className="w-full bg-white shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="text-right">
          <CardTitle className="text-xl font-bold">{getCardTitle()}</CardTitle>
          <CardDescription className="text-sm text-gray-500">
            بطاقة #{formatCardNumber(cardNumber)}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            {getCardIcon()}
            <div className="mr-4 text-right">
              <p className="text-sm font-medium text-gray-500">الرصيد</p>
              {cardType === "coins" ? (
                <p className="text-2xl font-bold text-amber-500">
                  {balance} كوينز
                </p>
              ) : cardType === "gift" ? (
                <p className="text-2xl font-bold text-purple-600">
                  {balance.toFixed(2)} درهم
                </p>
              ) : (
                <div className="w-full mt-2">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      {balance}/10 طوابع
                    </span>
                  </div>
                  <Progress value={balance * 10} className="h-2 bg-gray-200" />
                </div>
              )}
            </div>
          </div>
        </div>

        {cardType === "gift" && (
          <div className="mt-4 p-3 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-600 text-right flex items-center justify-end">
              <Calendar className="h-4 w-4 ml-2" />
              صالحة حتى: {expiryDate}
            </p>
          </div>
        )}

        {cardType === "rewards" && (
          <div className="mt-4 p-3 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-600 text-right">
              {10 - balance} طوابع أخرى حتى مكافأتك المجانية التالية!
            </p>
          </div>
        )}

        {cardType === "coins" && (
          <div className="mt-4 p-3 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-600 text-right">
              يمكن استخدام الكوينز للحصول على بضائع حصرية وعروض خاصة.
            </p>
          </div>
        )}

        {isVerified && (
          <div className="mt-4 flex items-center justify-center text-green-600">
            <Check className="h-4 w-4 mr-1" />
            <span className="text-sm">تم التحقق من البطاقة</span>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={onAddToAccount}
          className="w-full flex items-center justify-center"
          variant={
            cardType === "rewards"
              ? "default"
              : cardType === "gift"
                ? "outline"
                : "secondary"
          }
        >
          <Plus className="ml-2 h-4 w-4" />
          إضافة إلى حسابي
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CardDetails;
