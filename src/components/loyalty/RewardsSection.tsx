import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Award, Coffee, Plus, CheckCircle } from "lucide-react";

interface RewardStage {
  id: string;
  name: string;
  requiredStamps: number;
  description: string;
}

interface RewardCard {
  id: string;
  name: string;
  currentStamps: number;
  maxStamps: number;
  stages: RewardStage[];
}

interface RewardsSectionProps {
  rewardCards?: RewardCard[];
  onBack?: () => void;
}

const RewardsSection: React.FC<RewardsSectionProps> = ({
  onBack = () => {},
  rewardCards = [
    {
      id: "reward1",
      name: "بطاقة المكافآت الذهبية",
      currentStamps: 7,
      maxStamps: 10,
      stages: [
        {
          id: "stage1",
          name: "خصم 10%",
          requiredStamps: 5,
          description: "احصل على خصم 10% على طلبك التالي",
        },
        {
          id: "stage2",
          name: "قهوة مجانية",
          requiredStamps: 10,
          description: "احصل على قهوة مجانية من اختيارك",
        },
      ],
    },
    {
      id: "reward2",
      name: "بطاقة المكافآت الفضية",
      currentStamps: 4,
      maxStamps: 8,
      stages: [
        {
          id: "stage1",
          name: "خصم 5%",
          requiredStamps: 4,
          description: "احصل على خصم 5% على طلبك التالي",
        },
        {
          id: "stage2",
          name: "حلوى مجانية",
          requiredStamps: 8,
          description: "احصل على حلوى مجانية من اختيارك",
        },
      ],
    },
  ],
}) => {
  const [isActivationDialogOpen, setIsActivationDialogOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<RewardCard | null>(null);
  const [activationCode, setActivationCode] = useState("");
  const [isActivating, setIsActivating] = useState(false);
  const { toast } = useToast();

  const handleActivateStamp = (card: RewardCard) => {
    setSelectedCard(card);
    setActivationCode("");
    setIsActivationDialogOpen(true);
  };

  const handleActivationSubmit = () => {
    if (!activationCode || activationCode.length < 6) {
      toast({
        title: "خطأ في التفعيل",
        description: "يرجى إدخال رمز تفعيل صالح",
        variant: "destructive",
      });
      return;
    }

    setIsActivating(true);

    // Simulate API call to validate activation code
    setTimeout(() => {
      setIsActivating(false);
      setIsActivationDialogOpen(false);

      // For demo purposes, we'll always succeed if code is 6+ digits
      toast({
        title: "تم التفعيل بنجاح",
        description: "تمت إضافة طابع جديد إلى بطاقة المكافآت الخاصة بك",
        variant: "default",
      });

      // In a real app, we would update the card data from the API response
    }, 1500);
  };

  const getNextStage = (card: RewardCard) => {
    return (
      card.stages.find((stage) => stage.requiredStamps > card.currentStamps) ||
      card.stages[card.stages.length - 1]
    );
  };

  const getCompletedStages = (card: RewardCard) => {
    return card.stages.filter(
      (stage) => stage.requiredStamps <= card.currentStamps,
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
          <Award className="mr-2 text-green-600" />
          بطاقات المكافآت
        </h2>
        <Button className="bg-green-600 hover:bg-green-700" onClick={onBack}>
          <Plus className="mr-2 h-4 w-4" />
          إضافة بطاقة جديدة
        </Button>
      </div>

      {rewardCards.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">لا توجد بطاقات مكافآت حالياً</p>
          <Button className="mt-4 bg-green-600 hover:bg-green-700">
            إضافة بطاقة مكافآت
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rewardCards.map((card) => {
            const nextStage = getNextStage(card);
            const completedStages = getCompletedStages(card);

            return (
              <Card key={card.id} className="border-2 border-green-100">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-green-800 flex items-center">
                      <Award className="mr-2 h-5 w-5 text-green-600" />
                      {card.id} - {card.name}
                    </h3>
                    <span className="text-sm font-medium bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      {card.currentStamps}/{card.maxStamps} طوابع
                    </span>
                  </div>

                  <Progress
                    value={(card.currentStamps / card.maxStamps) * 100}
                    className="h-2 mb-2"
                  />

                  {nextStage && (
                    <div className="mt-2 p-3 bg-gray-50 rounded-md">
                      <p className="text-sm font-medium text-gray-700">
                        المرحلة التالية: {nextStage.name}
                      </p>
                      <p className="text-xs text-gray-600">
                        {nextStage.description}
                      </p>
                      <p className="text-xs text-green-600 mt-1">
                        {nextStage.requiredStamps - card.currentStamps} طوابع
                        متبقية
                      </p>
                    </div>
                  )}

                  <div className="flex justify-between mt-3">
                    {Array.from({ length: card.maxStamps }).map((_, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-center w-6 h-6 rounded-full ${index < card.currentStamps ? "bg-green-600 text-white" : "bg-gray-200 text-gray-400"}`}
                      >
                        <Award size={12} />
                      </div>
                    ))}
                  </div>

                  {completedStages.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        المكافآت المكتسبة:
                      </p>
                      <div className="space-y-2">
                        {completedStages.map((stage) => (
                          <div
                            key={stage.id}
                            className="flex items-center text-sm text-green-600"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            {stage.name} - {stage.description}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-4 flex justify-between">
                    <Button
                      onClick={() => {
                        toast({
                          title: "كيفية استخدام البطاقة",
                          description:
                            "المرحلة الأولى: قم بالطلب عبر التطبيق. المرحلة الثانية: قم بتحديد البطاقة في قسم برنامج الولاء في السلة. المرحلة الثالثة: سيتم إضافة طابع مع الطلب.",
                          variant: "default",
                        });
                      }}
                      variant="outline"
                      className="text-green-600 border-green-600"
                    >
                      كيفية الاستخدام
                    </Button>
                    <Button
                      onClick={() => handleActivateStamp(card)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      تفعيل طابع
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <Dialog
        open={isActivationDialogOpen}
        onOpenChange={setIsActivationDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-right">تفعيل طابع جديد</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-sm text-gray-600 text-right">
              أدخل رمز التفعيل لإضافة طابع جديد إلى بطاقة {selectedCard?.name}
            </p>
            <Input
              value={activationCode}
              onChange={(e) => setActivationCode(e.target.value)}
              placeholder="أدخل رمز التفعيل"
              className="text-right"
            />
            <p className="text-xs text-gray-500 text-right">
              رمز التفعيل هو رمز مكون من 6 أرقام على الأقل يتم الحصول عليه عند
              الشراء
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsActivationDialogOpen(false)}
              disabled={isActivating}
            >
              إلغاء
            </Button>
            <Button
              onClick={handleActivationSubmit}
              className="bg-green-600 hover:bg-green-700"
              disabled={isActivating}
            >
              {isActivating ? (
                <>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  جاري التفعيل...
                </>
              ) : (
                "تفعيل"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RewardsSection;
