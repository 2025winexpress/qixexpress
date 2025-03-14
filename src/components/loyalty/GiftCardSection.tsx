import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Gift, Plus, ArrowRight, Calendar } from "lucide-react";

interface GiftCard {
  id: string;
  name: string;
  description: string;
  value: number;
  expiryDate: string;
  imageUrl?: string;
  isRedeemed: boolean;
}

interface GiftCardSectionProps {
  giftCards?: GiftCard[];
  onBack?: () => void;
}

const GiftCardSection: React.FC<GiftCardSectionProps> = ({
  onBack = () => {},
  giftCards = [
    {
      id: "gift1",
      name: "بطاقة هدية قهوة مجانية",
      description: "احصل على قهوة مجانية من اختيارك",
      value: 25,
      expiryDate: "2023-12-31",
      imageUrl:
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=80",
      isRedeemed: false,
    },
    {
      id: "gift2",
      name: "بطاقة هدية خصم 50%",
      description: "احصل على خصم 50% على طلبك التالي",
      value: 50,
      expiryDate: "2023-12-15",
      imageUrl:
        "https://images.unsplash.com/photo-1572286258217-215f6d8bb578?w=400&q=80",
      isRedeemed: false,
    },
  ],
}) => {
  const [isRedeemDialogOpen, setIsRedeemDialogOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<GiftCard | null>(null);
  const [isRedeeming, setIsRedeeming] = useState(false);
  const { toast } = useToast();

  const handleRedeemCard = (card: GiftCard) => {
    setSelectedCard(card);
    setIsRedeemDialogOpen(true);
  };

  const handleRedeemSubmit = () => {
    if (!selectedCard) return;

    setIsRedeeming(true);

    // Simulate API call to redeem gift card
    setTimeout(() => {
      setIsRedeeming(false);
      setIsRedeemDialogOpen(false);

      toast({
        title: "تم استخدام البطاقة بنجاح",
        description: `تم استخدام بطاقة الهدية: ${selectedCard.name}`,
        variant: "default",
      });

      // In a real app, we would update the card data from the API response
    }, 1500);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const isExpired = (dateString: string) => {
    const expiryDate = new Date(dateString);
    const today = new Date();
    return expiryDate < today;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
          <Gift className="mr-2 text-purple-600" />
          بطاقات الهدايا
        </h2>
        <Button className="bg-purple-600 hover:bg-purple-700" onClick={onBack}>
          <Plus className="mr-2 h-4 w-4" />
          إضافة بطاقة هدية
        </Button>
      </div>

      {giftCards.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <Gift className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">لا توجد بطاقات هدايا حالياً</p>
          <Button className="mt-4 bg-purple-600 hover:bg-purple-700">
            إضافة بطاقة هدية
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {giftCards.map((card) => {
            const expired = isExpired(card.expiryDate);

            return (
              <Card
                key={card.id}
                className={`border-2 ${card.isRedeemed ? "border-gray-200 opacity-70" : expired ? "border-red-100" : "border-purple-100"}`}
              >
                <CardContent className="p-4">
                  <div className="flex">
                    {card.imageUrl && (
                      <div className="w-24 h-24 rounded-md overflow-hidden mr-4">
                        <img
                          src={card.imageUrl}
                          alt={card.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-purple-800 flex items-center">
                          <Gift className="mr-2 h-5 w-5 text-purple-600" />
                          {card.id} - {card.name}
                        </h3>
                        <span
                          className={`text-sm font-medium px-2 py-1 rounded-full ${card.isRedeemed ? "bg-gray-100 text-gray-800" : expired ? "bg-red-100 text-red-800" : "bg-purple-100 text-purple-800"}`}
                        >
                          {card.isRedeemed
                            ? "تم الاستخدام"
                            : expired
                              ? "منتهية الصلاحية"
                              : `${card.value} درهم`}
                        </span>
                      </div>

                      <p className="text-sm text-gray-600 mb-2">
                        {card.description}
                      </p>

                      <div className="flex items-center text-xs text-gray-500 mb-4">
                        <Calendar className="h-3 w-3 mr-1" />
                        صالحة حتى: {formatDate(card.expiryDate)}
                        {expired && (
                          <span className="text-red-500 mr-2">
                            منتهية الصلاحية
                          </span>
                        )}
                      </div>

                      <div className="flex justify-end">
                        <div className="flex space-x-2 rtl:space-x-reverse">
                          <Button
                            onClick={() => {
                              toast({
                                title: "كيفية استخدام البطاقة",
                                description:
                                  "المرحلة الأولى: قم بالطلب عبر التطبيق. المرحلة الثانية: قم بتحديد الهدية في قسم برنامج الولاء في السلة. المرحلة الثالثة: سيتم إرسال الهدية مع الطلب.",
                                variant: "default",
                              });
                            }}
                            variant="outline"
                            className="text-purple-600 border-purple-600"
                            size="sm"
                          >
                            كيفية الاستخدام
                          </Button>
                          <Button
                            onClick={() => handleRedeemCard(card)}
                            className={`${card.isRedeemed || expired ? "bg-gray-400 hover:bg-gray-500 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"}`}
                            disabled={card.isRedeemed || expired}
                            size="sm"
                          >
                            {card.isRedeemed
                              ? "تم الاستخدام"
                              : "استخدام البطاقة"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <Dialog open={isRedeemDialogOpen} onOpenChange={setIsRedeemDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-right">
              استخدام بطاقة الهدية
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-sm text-gray-600 text-right">
              هل أنت متأكد من رغبتك في استخدام بطاقة الهدية التالية؟
            </p>

            {selectedCard && (
              <div className="p-4 bg-gray-50 rounded-md">
                <h3 className="font-medium text-right mb-1">
                  {selectedCard.name}
                </h3>
                <p className="text-sm text-gray-600 text-right">
                  {selectedCard.description}
                </p>
                <div className="flex justify-between mt-2">
                  <span className="text-sm font-medium text-purple-600">
                    {selectedCard.value} درهم
                  </span>
                  <span className="text-sm text-gray-500">
                    صالحة حتى: {formatDate(selectedCard.expiryDate)}
                  </span>
                </div>
              </div>
            )}

            <p className="text-xs text-gray-500 text-right">
              ملاحظة: لا يمكن التراجع عن هذه العملية بعد تأكيدها.
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsRedeemDialogOpen(false)}
              disabled={isRedeeming}
            >
              إلغاء
            </Button>
            <Button
              onClick={handleRedeemSubmit}
              className="bg-purple-600 hover:bg-purple-700"
              disabled={isRedeeming}
            >
              {isRedeeming ? (
                <>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  جاري التنفيذ...
                </>
              ) : (
                <>
                  <ArrowRight className="mr-2 h-4 w-4" />
                  تأكيد الاستخدام
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GiftCardSection;
