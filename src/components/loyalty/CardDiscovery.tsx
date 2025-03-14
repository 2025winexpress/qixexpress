import React, { useState } from "react";
import CardVerificationForm from "./CardVerificationForm";
import CardDetails from "./CardDetails";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Award,
  Gift,
  Coins,
  CreditCard,
  QrCode,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type CardType = "rewards" | "gift" | "coins";

interface CardDiscoveryProps {
  onCardAdded?: (cardNumber: string, cardType: CardType) => void;
  onBack?: () => void;
}

const CardDiscovery = ({
  onCardAdded = () => {},
  onBack = () => {},
}: CardDiscoveryProps) => {
  const [verifiedCard, setVerifiedCard] = useState<string | null>(null);
  const [cardType, setCardType] = useState<CardType>("rewards");
  const [cardBalance, setCardBalance] = useState<number>(0);
  const { toast } = useToast();

  // Mock function to determine card type and balance based on card number
  const determineCardTypeAndBalance = (cardNumber: string) => {
    // For demo purposes, we'll use the first digit to determine card type
    // In a real app, this would be determined by the API response
    const firstDigit = cardNumber.charAt(0);

    let type: CardType = "rewards";
    let balance = 0;

    if (firstDigit === "4") {
      type = "rewards";
      balance = Math.floor(Math.random() * 10); // Random number of stamps (0-9)
    } else if (firstDigit === "5") {
      type = "gift";
      balance = Math.floor(Math.random() * 100) + 10; // Random gift card balance ($10-$109)
    } else if (firstDigit === "6") {
      type = "coins";
      balance = Math.floor(Math.random() * 1000) + 100; // Random coin balance (100-1099)
    }

    return { type, balance };
  };

  const handleVerify = (cardNumber: string) => {
    const { type, balance } = determineCardTypeAndBalance(cardNumber);
    setVerifiedCard(cardNumber);
    setCardType(type);
    setCardBalance(balance);
  };

  const handleError = (error: string) => {
    toast({
      title: "خطأ في التحقق",
      description: error,
      variant: "destructive",
    });
  };

  const handleAddToAccount = () => {
    if (verifiedCard) {
      onCardAdded(verifiedCard, cardType);
      toast({
        title: "تمت إضافة البطاقة",
        description: getCardAddedMessage(cardType),
        variant: "default",
      });

      // Reset the form after adding to account
      setVerifiedCard(null);
    }
  };

  const getCardAddedMessage = (type: CardType) => {
    switch (type) {
      case "rewards":
        return "تمت إضافة بطاقة المكافآت إلى حسابك بنجاح.";
      case "gift":
        return "تمت إضافة بطاقة الهدية إلى حسابك بنجاح.";
      case "coins":
        return "تمت إضافة بطاقة الكوينز إلى حسابك بنجاح.";
      default:
        return "تمت إضافة البطاقة إلى حسابك بنجاح.";
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4 md:mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">
          اكتشاف البطاقات
        </h1>
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="flex items-center"
        >
          <ArrowLeft className="h-3 w-3 md:h-4 md:w-4 ml-1 md:ml-2" />
          <span className="text-xs md:text-sm">العودة</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        <div>
          <h2 className="text-base md:text-lg font-semibold text-gray-700 mb-3 md:mb-4 text-right">
            تفاصيل البطاقة
          </h2>
          {verifiedCard ? (
            <CardDetails
              cardNumber={verifiedCard}
              cardType={cardType}
              balance={cardBalance}
              expiryDate="12/2025"
              isVerified={true}
              onAddToAccount={handleAddToAccount}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-48 md:h-64 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <div className="text-center p-4 md:p-6">
                <div className="flex justify-center mb-3 md:mb-4">
                  <CreditCard className="h-10 w-10 md:h-12 md:w-12 text-gray-400" />
                </div>
                <p className="text-sm md:text-base text-gray-500 font-medium">
                  تحقق من بطاقة لرؤية التفاصيل
                </p>
                <p className="text-xs md:text-sm text-gray-400 mt-1 md:mt-2">
                  أدخل رقم البطاقة أو امسح رمز QR للتحقق من بطاقتك
                </p>
                <div className="mt-3 md:mt-4 flex justify-center">
                  <div className="flex items-center text-xs md:text-sm text-blue-600 cursor-pointer">
                    <QrCode className="h-3 w-3 md:h-4 md:w-4 ml-1" />
                    <span>مسح رمز QR</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!verifiedCard && (
            <div className="mt-4 md:mt-6 p-3 md:p-4 bg-green-50 rounded-lg border border-green-100">
              <h3 className="text-xs md:text-sm font-medium text-green-800 mb-1 md:mb-2 flex items-center justify-end">
                كيفية العثور على رقم البطاقة
                <CreditCard className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
              </h3>
              <p className="text-xs text-green-700 mb-1 md:mb-2 text-right">
                رقم البطاقة هو رقم مكون من 16 رقمًا مطبوع على الجانب الأمامي أو
                الخلفي من بطاقتك الفعلية. بالنسبة للبطاقات الرقمية، يمكنك العثور
                عليها في تأكيد البريد الإلكتروني أو في التطبيق.
              </p>
              <p className="text-xs text-green-700 text-right">
                لأسباب أمنية، لا تشارك رقم بطاقتك مع أي شخص آخر.
              </p>
            </div>
          )}
        </div>

        <div>
          <h2 className="text-base md:text-lg font-semibold text-gray-700 mb-3 md:mb-4 text-right">
            تحقق من بطاقتك
          </h2>
          <CardVerificationForm onVerify={handleVerify} onError={handleError} />

          <div className="mt-6 md:mt-8">
            <h3 className="text-sm md:text-md font-medium text-gray-600 mb-2 md:mb-3 text-right">
              أنواع البطاقات
            </h3>
            <Tabs defaultValue="rewards" className="w-full">
              <TabsList className="grid grid-cols-3 mb-3 md:mb-4">
                <TabsTrigger
                  value="rewards"
                  className="flex items-center text-xs md:text-sm"
                >
                  <Award className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4 text-green-600" />
                  المكافآت
                </TabsTrigger>
                <TabsTrigger
                  value="gift"
                  className="flex items-center text-xs md:text-sm"
                >
                  <Gift className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4 text-purple-600" />
                  بطاقات الهدايا
                </TabsTrigger>
                <TabsTrigger
                  value="coins"
                  className="flex items-center text-xs md:text-sm"
                >
                  <Coins className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4 text-amber-500" />
                  الكوينز
                </TabsTrigger>
              </TabsList>

              <TabsContent value="rewards">
                <Card>
                  <CardContent className="p-3 md:p-4">
                    <div className="flex items-start space-x-reverse space-x-2 md:space-x-4">
                      <div>
                        <h4 className="text-sm md:text-base font-medium mb-1 text-right">
                          بطاقة المكافآت
                        </h4>
                        <p className="text-xs md:text-sm text-gray-600 mb-1 md:mb-2 text-right">
                          اجمع الطوابع مع كل عملية شراء واحصل على مكافآت مجانية.
                        </p>
                        <ul className="text-xs text-gray-500 list-disc list-inside space-y-0.5 md:space-y-1 text-right">
                          <li>اكسب طوابع مع كل عملية شراء</li>
                          <li>استبدل الطوابع بمنتجات مجانية</li>
                          <li>تتبع تقدمك نحو المكافآت</li>
                        </ul>
                      </div>
                      <div className="bg-green-100 p-2 md:p-3 rounded-full">
                        <Award className="h-5 w-5 md:h-6 md:w-6 text-green-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="gift">
                <Card>
                  <CardContent className="p-3 md:p-4">
                    <div className="flex items-start space-x-reverse space-x-2 md:space-x-4">
                      <div>
                        <h4 className="text-sm md:text-base font-medium mb-1 text-right">
                          بطاقات الهدايا
                        </h4>
                        <p className="text-xs md:text-sm text-gray-600 mb-1 md:mb-2 text-right">
                          يمكن استبدال بطاقات الهدايا للمشتريات في المتجر أو عبر
                          الإنترنت.
                        </p>
                        <ul className="text-xs text-gray-500 list-disc list-inside space-y-0.5 md:space-y-1 text-right">
                          <li>استخدمها للمشتريات في المتجر أو عبر الإنترنت</li>
                          <li>تحقق من الرصيد في أي وقت</li>
                          <li>لا تاريخ انتهاء صلاحية على معظم البطاقات</li>
                        </ul>
                      </div>
                      <div className="bg-purple-100 p-2 md:p-3 rounded-full">
                        <Gift className="h-5 w-5 md:h-6 md:w-6 text-purple-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="coins">
                <Card>
                  <CardContent className="p-3 md:p-4">
                    <div className="flex items-start space-x-reverse space-x-2 md:space-x-4">
                      <div>
                        <h4 className="text-sm md:text-base font-medium mb-1 text-right">
                          بطاقة الكوينز
                        </h4>
                        <p className="text-xs md:text-sm text-gray-600 mb-1 md:mb-2 text-right">
                          اكسب وأنفق الكوينز على البضائع الحصرية و العروض
                          الخاصة.
                        </p>
                        <ul className="text-xs text-gray-500 list-disc list-inside space-y-0.5 md:space-y-1 text-right">
                          <li>حول الكوينز إلى رصيد في المتجر</li>
                          <li>استخدمها للبضائع الحصرية</li>
                          <li>حول الكوينز بين الحسابات</li>
                        </ul>
                      </div>
                      <div className="bg-yellow-100 p-2 md:p-3 rounded-full">
                        <Coins className="h-5 w-5 md:h-6 md:w-6 text-yellow-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDiscovery;
