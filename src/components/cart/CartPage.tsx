import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../loyalty/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/toaster";
import {
  Trash2,
  Plus,
  Minus,
  Coins,
  Gift,
  ArrowRight,
  ShoppingCart,
  Clock,
  Calendar,
  CheckCircle,
  CreditCard,
  Award,
} from "lucide-react";
import MobileNavigation from "../layout/MobileNavigation";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";

interface CartItem {
  id: string;
  name: string;
  price: number;
  coinPrice: number;
  quantity: number;
  imageUrl: string;
  options?: string[];
  extras?: string[];
}

interface LoyaltyCard {
  id: string;
  type: "rewards" | "gift" | "coins";
  name: string;
  value: number;
  maxValue?: number;
  expiryDate?: string;
}

interface DeliveryTimeSlot {
  id: string;
  time: string;
  available: boolean;
}

const CartPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  // User information (mock data)
  const userData = {
    name: "جين سميث",
    level: "عضو ذهبي",
    points: 1250,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
    notificationCount: 3,
    phone: "0612345678",
    address: "شارع الحسن الثاني، رقم 123، الدار البيضاء",
  };

  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "item1",
      name: "قهوة تركية",
      price: 25,
      coinPrice: 100,
      quantity: 2,
      imageUrl:
        "https://images.unsplash.com/photo-1578374173705-969cbe6f2d6b?w=400&q=80",
      options: ["بدون سكر", "مع هيل"],
      extras: ["كريمة إضافية"],
    },
    {
      id: "item2",
      name: "كروسان بالشوكولاتة",
      price: 35,
      coinPrice: 150,
      quantity: 1,
      imageUrl:
        "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80",
    },
  ]);

  const [rewardsCards, setRewardsCards] = useState<LoyaltyCard[]>([
    {
      id: "reward1",
      type: "rewards",
      name: "بطاقة المكافآت الذهبية",
      value: 7,
      maxValue: 10,
    },
    {
      id: "reward2",
      type: "rewards",
      name: "بطاقة المكافآت الفضية",
      value: 4,
      maxValue: 8,
    },
  ]);

  const [giftCards, setGiftCards] = useState<LoyaltyCard[]>([
    {
      id: "gift1",
      type: "gift",
      name: "بطاقة هدية قهوة مجانية",
      value: 25,
      expiryDate: "2023-12-31",
    },
    {
      id: "gift2",
      type: "gift",
      name: "بطاقة هدية خصم 50%",
      value: 50,
      expiryDate: "2023-12-15",
    },
  ]);

  const [selectedRewardCard, setSelectedRewardCard] = useState<string>("none");
  const [selectedGiftCard, setSelectedGiftCard] = useState<string>("none");
  const [coinsToUse, setCoinsToUse] = useState<number>(0);
  const [isCheckoutDialogOpen, setIsCheckoutDialogOpen] = useState(false);
  const [checkoutInfo, setCheckoutInfo] = useState({
    name: "",
    phone: "",
    address: "",
  });

  // Update checkout info with user data once it's available
  useEffect(() => {
    setCheckoutInfo({
      name: userData.name || "",
      phone: userData.phone || "",
      address: userData.address || "",
    });
  }, [userData]);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [isLoyaltyConfirmed, setIsLoyaltyConfirmed] = useState(false);
  const [selectedDeliveryDate, setSelectedDeliveryDate] = useState<string>(
    new Date().toISOString().split("T")[0],
  );
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");

  // Delivery time slots
  const timeSlots: DeliveryTimeSlot[] = [
    { id: "slot1", time: "9:00 - 10:00", available: true },
    { id: "slot2", time: "10:00 - 11:00", available: true },
    { id: "slot3", time: "11:00 - 12:00", available: true },
    { id: "slot4", time: "12:00 - 13:00", available: false },
    { id: "slot5", time: "13:00 - 14:00", available: true },
    { id: "slot6", time: "14:00 - 15:00", available: true },
    { id: "slot7", time: "15:00 - 16:00", available: true },
    { id: "slot8", time: "16:00 - 17:00", available: true },
  ];

  // Set default delivery time to 30 minutes from now
  useEffect(() => {
    // Find the next available time slot that's at least 30 minutes from now
    const now = new Date();
    const thirtyMinutesLater = new Date(now.getTime() + 30 * 60000);
    const hour = thirtyMinutesLater.getHours();
    const minutes = thirtyMinutesLater.getMinutes();

    // Find the closest available time slot
    const availableSlots = timeSlots.filter((slot) => slot.available);
    if (availableSlots.length > 0) {
      setSelectedTimeSlot(availableSlots[0].id);
    }
  }, []);

  const [paymentMethod, setPaymentMethod] = useState<"cash" | "coins">("cash");
  const [requestStamp, setRequestStamp] = useState(false);
  const [requestReward, setRequestReward] = useState(false);

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
      case "profile":
        navigate("/profile", { replace: true });
        break;
      default:
        navigate("/", { replace: true });
    }
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
    toast({
      title: "تمت إزالة المنتج",
      description: "تم إزالة المنتج من سلة التسوق",
    });
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const calculateCoinPrice = () => {
    return cartItems.reduce(
      (sum, item) => sum + item.coinPrice * item.quantity,
      0,
    );
  };

  const calculateDiscount = () => {
    let discount = 0;

    // Gift card discount
    if (selectedGiftCard && selectedGiftCard !== "none" && isLoyaltyConfirmed) {
      const giftCard = giftCards.find((card) => card.id === selectedGiftCard);
      if (giftCard) {
        discount += giftCard.value;
      }
    }

    // Coins discount (assuming 1 coin = 0.1 MAD)
    if (isLoyaltyConfirmed) {
      discount += coinsToUse * 0.1;
    }

    return Math.min(discount, calculateSubtotal());
  };

  const calculateTotal = () => {
    return Math.max(calculateSubtotal() - calculateDiscount(), 0);
  };

  const handleCheckout = () => {
    setIsCheckoutDialogOpen(true);
  };

  const handleConfirmCheckout = () => {
    // Validate checkout info
    if (!checkoutInfo.name || !checkoutInfo.phone || !checkoutInfo.address) {
      toast({
        title: "معلومات ناقصة",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    if (!selectedTimeSlot) {
      toast({
        title: "وقت التوصيل",
        description: "يرجى اختيار وقت التوصيل",
        variant: "destructive",
      });
      return;
    }

    // Process checkout
    setIsCheckoutDialogOpen(false);
    setIsSuccessDialogOpen(true);
  };

  const handleConfirmLoyalty = () => {
    setIsLoyaltyConfirmed(true);
    toast({
      title: "تم تأكيد برنامج الولاء",
      description: "تم تطبيق خصومات برنامج الولاء على طلبك",
      variant: "default",
    });
  };

  const handleWhatsAppConfirmation = () => {
    // Create order details for WhatsApp message
    const orderDetails = cartItems
      .map(
        (item) =>
          `${item.name} (${item.quantity}) - ${item.price * item.quantity} درهم`,
      )
      .join("\n");

    const loyaltyDetails = [];
    if (
      selectedRewardCard &&
      selectedRewardCard !== "none" &&
      isLoyaltyConfirmed
    ) {
      const rewardCard = rewardsCards.find(
        (card) => card.id === selectedRewardCard,
      );
      if (rewardCard) {
        loyaltyDetails.push(`بطاقة المكافآت: ${rewardCard.name}`);
        if (requestStamp) {
          loyaltyDetails.push(`طلب طابع جديد`);
        }
        if (requestReward) {
          loyaltyDetails.push(`طلب مكافأة`);
        }
      }
    }

    if (selectedGiftCard && selectedGiftCard !== "none" && isLoyaltyConfirmed) {
      const giftCard = giftCards.find((card) => card.id === selectedGiftCard);
      if (giftCard) {
        loyaltyDetails.push(`بطاقة الهدية: ${giftCard.name}`);
      }
    }

    if (coinsToUse > 0 && isLoyaltyConfirmed) {
      loyaltyDetails.push(`الكوينز المستخدمة: ${coinsToUse}`);
    }

    const loyaltyDetailsText = loyaltyDetails.length
      ? "\n\nتفاصيل برنامج الولاء:\n" + loyaltyDetails.join("\n")
      : "";

    const deliverySlot = timeSlots.find((slot) => slot.id === selectedTimeSlot);
    const deliveryInfo = `\n\nموعد التوصيل: ${selectedDeliveryDate} ${deliverySlot ? deliverySlot.time : ""}`;

    const paymentInfo = `\n\nطريقة الدفع: ${paymentMethod === "cash" ? "نقداً" : "كوينز"}`;

    const message = `طلب جديد:\n\nالاسم: ${checkoutInfo.name}\nالهاتف: ${checkoutInfo.phone}\nالعنوان: ${checkoutInfo.address}${deliveryInfo}\n\nالمنتجات:\n${orderDetails}\n\nالمجموع الفرعي: ${calculateSubtotal()} درهم\nالخصم: ${calculateDiscount()} درهم\nالإجمالي: ${calculateTotal()} درهم${loyaltyDetailsText}${paymentInfo}`;

    // Encode the message for WhatsApp
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/212660094154?text=${encodedMessage}`, "_blank");
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
          سلة التسوق
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-10">
            <ShoppingCart className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">سلة التسوق فارغة</p>
            <Button
              className="mt-4 bg-green-600 hover:bg-green-700"
              onClick={() => handleNavigate("store")}
            >
              تصفح المنتجات
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <h2 className="text-lg font-semibold mb-4 text-right">
                  المنتجات
                </h2>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex-shrink-0">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-grow mx-4 text-right">
                        <h3 className="font-medium">{item.name}</h3>
                        {item.options && item.options.length > 0 && (
                          <p className="text-xs text-gray-500">
                            {item.options.join(" • ")}
                          </p>
                        )}
                        {item.extras && item.extras.length > 0 && (
                          <p className="text-xs text-gray-500">
                            إضافات: {item.extras.join(" • ")}
                          </p>
                        )}
                        <div className="flex items-center justify-end mt-1">
                          <span className="text-sm text-yellow-600 flex items-center">
                            <Coins className="h-3 w-3 ml-1" />
                            {item.coinPrice * item.quantity}
                          </span>
                          <span className="mx-2 text-gray-300">|</span>
                          <span className="font-semibold text-green-600">
                            {item.price * item.quantity} درهم
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="mx-2 w-6 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500 ml-2"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Options */}
              <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <h2 className="text-lg font-semibold mb-4 text-right">
                  <Clock className="inline-block ml-2 text-gray-600" />
                  خيارات التوصيل
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-right mb-2">
                      تاريخ التوصيل
                    </label>
                    <div className="flex justify-end">
                      <Input
                        type="date"
                        value={selectedDeliveryDate}
                        onChange={(e) =>
                          setSelectedDeliveryDate(e.target.value)
                        }
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full text-right"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-right mb-2">
                      وقت التوصيل
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {timeSlots.map((slot) => (
                        <div key={slot.id} className="text-right">
                          <Button
                            type="button"
                            variant={
                              selectedTimeSlot === slot.id
                                ? "default"
                                : "outline"
                            }
                            className={`w-full ${!slot.available ? "opacity-50 cursor-not-allowed" : ""} ${selectedTimeSlot === slot.id ? "bg-green-600 hover:bg-green-700" : ""}`}
                            disabled={!slot.available}
                            onClick={() => setSelectedTimeSlot(slot.id)}
                          >
                            {slot.time}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Loyalty Program */}
              <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <Button
                    variant={isLoyaltyConfirmed ? "default" : "outline"}
                    className={`${isLoyaltyConfirmed ? "bg-green-600 hover:bg-green-700" : "border-green-600 text-green-600"}`}
                    onClick={handleConfirmLoyalty}
                    disabled={isLoyaltyConfirmed}
                  >
                    {isLoyaltyConfirmed ? (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        تم تأكيد برنامج الولاء
                      </>
                    ) : (
                      "تأكيد استخدام برنامج الولاء"
                    )}
                  </Button>
                  <h2 className="text-lg font-semibold text-right">
                    <Gift className="inline-block ml-2 text-green-600" />
                    برنامج الولاء
                  </h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-right mb-2">
                      بطاقة المكافآت
                    </label>
                    <Select
                      value={selectedRewardCard}
                      onValueChange={setSelectedRewardCard}
                      disabled={isLoyaltyConfirmed}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="اختر بطاقة المكافآت" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">لا شيء</SelectItem>
                        {rewardsCards.map((card) => (
                          <SelectItem key={card.id} value={card.id}>
                            {card.name} - {card.id} ({card.value}/
                            {card.maxValue} طوابع)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {selectedRewardCard && selectedRewardCard !== "none" && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-md">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            {rewardsCards.find(
                              (card) => card.id === selectedRewardCard,
                            )?.value || 0}
                            /
                            {rewardsCards.find(
                              (card) => card.id === selectedRewardCard,
                            )?.maxValue || 10}{" "}
                            طوابع
                          </span>
                          <h3 className="font-medium text-gray-700 text-right">
                            <Award className="inline-block ml-1 h-4 w-4 text-green-600" />
                            تفاصيل البطاقة
                          </h3>
                        </div>

                        <Progress
                          value={
                            ((rewardsCards.find(
                              (card) => card.id === selectedRewardCard,
                            )?.value || 0) /
                              (rewardsCards.find(
                                (card) => card.id === selectedRewardCard,
                              )?.maxValue || 10)) *
                            100
                          }
                          className="h-2 mb-3"
                        />

                        <div className="space-y-2">
                          <div className="flex items-center justify-end space-x-2 rtl:space-x-reverse">
                            <Label htmlFor="request-stamp" className="text-sm">
                              طلب طابع جديد مع هذا الطلب
                            </Label>
                            <Checkbox
                              id="request-stamp"
                              checked={requestStamp}
                              onCheckedChange={(checked) =>
                                setRequestStamp(checked === true)
                              }
                              disabled={isLoyaltyConfirmed}
                            />
                          </div>

                          <div className="flex items-center justify-end space-x-2 rtl:space-x-reverse">
                            <Label htmlFor="request-reward" className="text-sm">
                              طلب مكافأة (إذا كان عدد الطوابع كافياً)
                            </Label>
                            <Checkbox
                              id="request-reward"
                              checked={requestReward}
                              onCheckedChange={(checked) =>
                                setRequestReward(checked === true)
                              }
                              disabled={isLoyaltyConfirmed}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-right mb-2">
                      بطاقة الهدية
                    </label>
                    <Select
                      value={selectedGiftCard}
                      onValueChange={setSelectedGiftCard}
                      disabled={isLoyaltyConfirmed}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="اختر بطاقة الهدية" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">لا شيء</SelectItem>
                        {giftCards.map((card) => (
                          <SelectItem key={card.id} value={card.id}>
                            {card.name} - {card.id} ({card.value} درهم)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {selectedGiftCard && selectedGiftCard !== "none" && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-md">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                            {giftCards.find(
                              (card) => card.id === selectedGiftCard,
                            )?.value || 0}{" "}
                            درهم
                          </span>
                          <h3 className="font-medium text-gray-700 text-right">
                            <Gift className="inline-block ml-1 h-4 w-4 text-purple-600" />
                            تفاصيل البطاقة
                          </h3>
                        </div>
                        <div className="mt-2 flex items-center justify-end text-sm text-gray-600">
                          <Calendar className="h-3 w-3 ml-1" />
                          صالحة حتى:{" "}
                          {
                            giftCards.find(
                              (card) => card.id === selectedGiftCard,
                            )?.expiryDate
                          }
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-right mb-2">
                      استخدام الكوينز (الرصيد: {userData.points})
                    </label>
                    <div className="flex items-center">
                      <Input
                        type="number"
                        value={coinsToUse}
                        onChange={(e) =>
                          setCoinsToUse(parseInt(e.target.value) || 0)
                        }
                        min="0"
                        max={userData.points}
                        className="w-full"
                        disabled={isLoyaltyConfirmed}
                      />
                      <div className="ml-2 flex items-center text-yellow-600">
                        <Coins className="h-4 w-4 ml-1" />
                      </div>
                    </div>
                    {coinsToUse > 0 && (
                      <p className="text-xs text-gray-500 mt-1 text-right">
                        قيمة الكوينز: {(coinsToUse * 0.1).toFixed(2)} درهم (1
                        كوين = 0.1 درهم)
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <h2 className="text-lg font-semibold mb-4 text-right">
                  <CreditCard className="inline-block ml-2 text-gray-600" />
                  طريقة الدفع
                </h2>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={(value) =>
                    setPaymentMethod(value as "cash" | "coins")
                  }
                  className="space-y-3"
                >
                  <div className="flex items-center justify-end space-x-2 rtl:space-x-reverse">
                    <Label htmlFor="payment-cash" className="text-right">
                      الدفع نقداً عند الاستلام
                    </Label>
                    <RadioGroupItem value="cash" id="payment-cash" />
                  </div>
                  <div className="flex items-center justify-end space-x-2 rtl:space-x-reverse">
                    <Label htmlFor="payment-coins" className="text-right">
                      الدفع باستخدام الكوينز ({calculateTotal() * 10} كوين)
                    </Label>
                    <RadioGroupItem
                      value="coins"
                      id="payment-coins"
                      disabled={userData.points < calculateTotal() * 10}
                    />
                  </div>
                </RadioGroup>
                {paymentMethod === "coins" && (
                  <p className="text-sm text-yellow-600 mt-2 text-right">
                    <Coins className="inline-block ml-1 h-3 w-3" />
                    سيتم خصم {calculateTotal() * 10} كوين من رصيدك
                  </p>
                )}
              </div>
            </div>

            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-4 sticky top-20">
                <h2 className="text-lg font-semibold mb-4 text-right">
                  ملخص الطلب
                </h2>
                <div className="space-y-2 text-right">
                  <div className="flex justify-between">
                    <span>{calculateSubtotal()} درهم</span>
                    <span>المجموع الفرعي</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>- {calculateDiscount()} درهم</span>
                    <span>الخصم</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t">
                    <span>{calculateTotal()} درهم</span>
                    <span>الإجمالي</span>
                  </div>
                  <div className="flex justify-end items-center text-yellow-600 text-sm">
                    <Coins className="h-3 w-3 ml-1" />
                    <span>{calculateCoinPrice()} كوينز</span>
                  </div>
                </div>

                {selectedTimeSlot && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center justify-end text-sm">
                      <span>
                        {
                          timeSlots.find((slot) => slot.id === selectedTimeSlot)
                            ?.time
                        }
                      </span>
                      <Clock className="ml-1 h-4 w-4 text-gray-600" />
                    </div>
                    <div className="flex items-center justify-end text-sm mt-1">
                      <span>{selectedDeliveryDate}</span>
                      <Calendar className="ml-1 h-4 w-4 text-gray-600" />
                    </div>
                  </div>
                )}

                <Button
                  className="w-full mt-4 bg-green-600 hover:bg-green-700"
                  onClick={handleCheckout}
                >
                  إتمام الطلب
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>

      <MobileNavigation activeTab="cart" />

      <Dialog
        open={isCheckoutDialogOpen}
        onOpenChange={setIsCheckoutDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-right">إتمام الطلب</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-right block">
                الاسم الكامل
              </label>
              <Input
                value={checkoutInfo.name}
                onChange={(e) =>
                  setCheckoutInfo({ ...checkoutInfo, name: e.target.value })
                }
                placeholder="أدخل الاسم الكامل"
                className="text-right"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-right block">
                رقم الهاتف
              </label>
              <Input
                value={checkoutInfo.phone}
                onChange={(e) =>
                  setCheckoutInfo({ ...checkoutInfo, phone: e.target.value })
                }
                placeholder="أدخل رقم الهاتف"
                className="text-right"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-right block">
                العنوان
              </label>
              <Input
                value={checkoutInfo.address}
                onChange={(e) =>
                  setCheckoutInfo({ ...checkoutInfo, address: e.target.value })
                }
                placeholder="أدخل العنوان"
                className="text-right"
              />
            </div>

            <div className="bg-gray-50 p-3 rounded-md">
              <h3 className="font-medium text-right mb-2">ملخص الطلب</h3>
              <div className="space-y-1 text-sm text-right">
                <div className="flex justify-between">
                  <span>{calculateSubtotal()} درهم</span>
                  <span>المجموع الفرعي</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>- {calculateDiscount()} درهم</span>
                  <span>الخصم</span>
                </div>
                <div className="flex justify-between font-bold pt-1 border-t">
                  <span>{calculateTotal()} درهم</span>
                  <span>الإجمالي</span>
                </div>
                <div className="mt-2 pt-1 border-t">
                  <div className="flex justify-between">
                    <span>{selectedDeliveryDate}</span>
                    <span>تاريخ التوصيل</span>
                  </div>
                  <div className="flex justify-between">
                    <span>
                      {timeSlots.find((slot) => slot.id === selectedTimeSlot)
                        ?.time || "لم يتم التحديد"}
                    </span>
                    <span>وقت التوصيل</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCheckoutDialogOpen(false)}
            >
              إلغاء
            </Button>
            <Button
              onClick={handleConfirmCheckout}
              className="bg-green-600 hover:bg-green-700"
            >
              تأكيد الطلب
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center text-green-600">
              تم تأكيد طلبك بنجاح!
            </DialogTitle>
          </DialogHeader>
          <div className="py-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gift className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-gray-600 mb-4">
              شكراً لك على طلبك! تم تأكيد طلبك بنجاح وسيتم التواصل معك قريباً.
            </p>
            <div className="bg-gray-50 p-4 rounded-md text-right mb-4">
              <h3 className="font-medium mb-2">تفاصيل الطلب</h3>
              <p className="text-sm">الاسم: {checkoutInfo.name}</p>
              <p className="text-sm">الهاتف: {checkoutInfo.phone}</p>
              <p className="text-sm">العنوان: {checkoutInfo.address}</p>
              <p className="text-sm">التاريخ: {selectedDeliveryDate}</p>
              <p className="text-sm">
                الوقت:{" "}
                {timeSlots.find((slot) => slot.id === selectedTimeSlot)?.time}
              </p>
              <p className="text-sm font-medium mt-2">
                الإجمالي: {calculateTotal()} درهم
              </p>
              <p className="text-sm">
                طريقة الدفع:{" "}
                {paymentMethod === "cash" ? "نقداً عند الاستلام" : "كوينز"}
              </p>

              {isLoyaltyConfirmed && (
                <div className="mt-2 pt-2 border-t">
                  <p className="text-sm font-medium">تفاصيل برنامج الولاء:</p>
                  {selectedRewardCard && selectedRewardCard !== "none" && (
                    <>
                      <p className="text-xs">
                        بطاقة المكافآت:{" "}
                        {
                          rewardsCards.find(
                            (card) => card.id === selectedRewardCard,
                          )?.name
                        }{" "}
                        (رقم البطاقة: {selectedRewardCard})
                      </p>
                      {requestStamp && <p className="text-xs">طلب طابع جديد</p>}
                      {requestReward && <p className="text-xs">طلب مكافأة</p>}
                    </>
                  )}
                  {selectedGiftCard && selectedGiftCard !== "none" && (
                    <p className="text-xs">
                      بطاقة الهدية:{" "}
                      {
                        giftCards.find((card) => card.id === selectedGiftCard)
                          ?.name
                      }{" "}
                      (رقم البطاقة: {selectedGiftCard})
                    </p>
                  )}
                  {coinsToUse > 0 && (
                    <p className="text-xs">الكوينز المستخدمة: {coinsToUse}</p>
                  )}
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              className="w-full bg-green-600 hover:bg-green-700 flex items-center justify-center"
              onClick={handleWhatsAppConfirmation}
            >
              تأكيد عبر الواتساب
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Toaster />
    </div>
  );
};

export default CartPage;
