import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import {
  Coins,
  ArrowRight,
  Send,
  CreditCard,
  ShoppingBag,
  Plus,
} from "lucide-react";

interface CoinTransaction {
  id: string;
  date: string;
  type: "earned" | "spent" | "transferred" | "received";
  amount: number;
  description: string;
}

interface CoinsSectionProps {
  coinBalance?: number;
  transactions?: CoinTransaction[];
  onBack?: () => void;
}

const CoinsSection: React.FC<CoinsSectionProps> = ({
  onBack = () => {},
  coinBalance = 1250,
  transactions = [
    {
      id: "tx1",
      date: "2023-06-15",
      type: "earned",
      amount: 250,
      description: "مكافأة شراء",
    },
    {
      id: "tx2",
      date: "2023-06-10",
      type: "transferred",
      amount: 500,
      description: "تحويل إلى أحمد",
    },
    {
      id: "tx3",
      date: "2023-06-05",
      type: "spent",
      amount: 300,
      description: "استبدال مقابل خصم",
    },
    {
      id: "tx4",
      date: "2023-06-01",
      type: "received",
      amount: 750,
      description: "استلام من فاطمة",
    },
  ],
}) => {
  const [isTransferDialogOpen, setIsTransferDialogOpen] = useState(false);
  const [isRedeemDialogOpen, setIsRedeemDialogOpen] = useState(false);
  const [recipientUsername, setRecipientUsername] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [redeemAmount, setRedeemAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleTransfer = () => {
    if (!recipientUsername || !transferAmount) return;

    const amount = parseInt(transferAmount);
    if (isNaN(amount) || amount <= 0 || amount > coinBalance) return;

    setIsProcessing(true);

    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setIsTransferDialogOpen(false);

      toast({
        title: "تم التحويل بنجاح",
        description: `تم تحويل ${amount} كوينز إلى ${recipientUsername}`,
        variant: "default",
      });

      setRecipientUsername("");
      setTransferAmount("");
    }, 1500);
  };

  const handleRedeem = () => {
    if (!redeemAmount) return;

    const amount = parseInt(redeemAmount);
    if (isNaN(amount) || amount <= 0 || amount > coinBalance) return;

    setIsProcessing(true);

    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setIsRedeemDialogOpen(false);

      toast({
        title: "تم الاستبدال بنجاح",
        description: `تم استبدال ${amount} كوينز بقيمة ${(amount * 0.1).toFixed(2)} درهم`,
        variant: "default",
      });

      setRedeemAmount("");
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
          <Coins className="mr-2 text-yellow-600" />
          كوينز الولاء
        </h2>
      </div>

      <Card className="border-2 border-yellow-100 bg-gradient-to-r from-yellow-50 to-amber-50">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="font-semibold text-yellow-800 flex items-center mb-2">
                <Coins className="mr-2 h-5 w-5 text-yellow-600" />
                رصيد الكوينز
              </h3>
              <div className="text-5xl font-bold text-yellow-600">
                {coinBalance}
              </div>
              <p className="text-sm text-yellow-700 mt-2">
                استخدم الكوينز للحصول على منتجات حصرية وخصومات!
              </p>
            </div>
            <div className="flex flex-col space-y-2">
              <Button
                className="bg-yellow-500 hover:bg-yellow-600 text-white"
                onClick={() => setIsTransferDialogOpen(true)}
              >
                <Send className="mr-2 h-4 w-4" />
                تحويل الكوينز
              </Button>
              <Button
                variant="outline"
                className="border-yellow-500 text-yellow-600 hover:bg-yellow-50"
                onClick={onBack}
              >
                <Plus className="mr-2 h-4 w-4" />
                إضافة بطاقة كوينز
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
          <ShoppingBag className="mr-2 h-4 w-4 text-gray-600" />
          سجل المعاملات
        </h3>
        <Card>
          <CardContent className="p-4">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-right py-2 px-4 font-medium text-gray-600">
                      التاريخ
                    </th>
                    <th className="text-right py-2 px-4 font-medium text-gray-600">
                      الوصف
                    </th>
                    <th className="text-right py-2 px-4 font-medium text-gray-600">
                      النوع
                    </th>
                    <th className="text-right py-2 px-4 font-medium text-gray-600">
                      المبلغ
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr
                      key={transaction.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-3 px-4 text-sm">
                        {formatDate(transaction.date)}
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {transaction.description}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                            transaction.type === "earned"
                              ? "bg-green-100 text-green-800"
                              : transaction.type === "spent"
                                ? "bg-red-100 text-red-800"
                                : transaction.type === "transferred"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-purple-100 text-purple-800"
                          }`}
                        >
                          {transaction.type === "earned"
                            ? "مكتسب"
                            : transaction.type === "spent"
                              ? "مستخدم"
                              : transaction.type === "transferred"
                                ? "محول"
                                : "مستلم"}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-medium">
                        <span
                          className={
                            transaction.type === "earned" ||
                            transaction.type === "received"
                              ? "text-green-600"
                              : "text-red-600"
                          }
                        >
                          {transaction.type === "earned" ||
                          transaction.type === "received"
                            ? "+"
                            : "-"}
                          {transaction.amount}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transfer Dialog */}
      <Dialog
        open={isTransferDialogOpen}
        onOpenChange={setIsTransferDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-right">تحويل كوينز</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label
                htmlFor="recipient"
                className="block text-sm font-medium text-right"
              >
                اسم المستخدم المستلم
              </label>
              <Input
                id="recipient"
                placeholder="أدخل اسم المستخدم"
                value={recipientUsername}
                onChange={(e) => setRecipientUsername(e.target.value)}
                className="text-right"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-right"
              >
                المبلغ
              </label>
              <Input
                id="amount"
                type="number"
                placeholder="أدخل المبلغ"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
                min="1"
                max={coinBalance.toString()}
                className="text-right"
              />
              <p className="text-xs text-gray-500 text-right">
                الرصيد المتاح: {coinBalance} كوينز
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsTransferDialogOpen(false)}
              disabled={isProcessing}
            >
              إلغاء
            </Button>
            <Button
              onClick={handleTransfer}
              disabled={
                !recipientUsername ||
                !transferAmount ||
                parseInt(transferAmount) <= 0 ||
                parseInt(transferAmount) > coinBalance ||
                isProcessing
              }
              className="bg-yellow-500 hover:bg-yellow-600 text-white"
            >
              {isProcessing ? (
                <>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  جاري التنفيذ...
                </>
              ) : (
                "تحويل"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Redeem Dialog */}
      <Dialog open={isRedeemDialogOpen} onOpenChange={setIsRedeemDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-right">استبدال كوينز</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-sm text-gray-600 text-right">
              يمكنك استبدال الكوينز بقيمة نقدية (كل 10 كوينز = 1 درهم)
            </p>
            <div className="space-y-2">
              <label
                htmlFor="redeemAmount"
                className="block text-sm font-medium text-right"
              >
                المبلغ
              </label>
              <Input
                id="redeemAmount"
                type="number"
                placeholder="أدخل المبلغ"
                value={redeemAmount}
                onChange={(e) => setRedeemAmount(e.target.value)}
                min="10"
                max={coinBalance.toString()}
                step="10"
                className="text-right"
              />
              <p className="text-xs text-gray-500 text-right">
                الرصيد المتاح: {coinBalance} كوينز
              </p>
            </div>
            {redeemAmount &&
              !isNaN(parseInt(redeemAmount)) &&
              parseInt(redeemAmount) > 0 && (
                <div className="p-3 bg-yellow-50 rounded-md">
                  <p className="text-sm text-right">
                    ستحصل على{" "}
                    <span className="font-bold text-yellow-600">
                      {(parseInt(redeemAmount) * 0.1).toFixed(2)} درهم
                    </span>{" "}
                    مقابل{" "}
                    <span className="font-bold text-yellow-600">
                      {redeemAmount} كوينز
                    </span>
                  </p>
                </div>
              )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsRedeemDialogOpen(false)}
              disabled={isProcessing}
            >
              إلغاء
            </Button>
            <Button
              onClick={handleRedeem}
              disabled={
                !redeemAmount ||
                parseInt(redeemAmount) <= 0 ||
                parseInt(redeemAmount) > coinBalance ||
                isProcessing
              }
              className="bg-yellow-500 hover:bg-yellow-600 text-white"
            >
              {isProcessing ? (
                <>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  جاري التنفيذ...
                </>
              ) : (
                "استبدال"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CoinsSection;
