import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Clock,
  CheckCircle,
  XCircle,
  Phone,
  MapPin,
  User,
  ShoppingBag,
  Truck,
  AlertTriangle,
} from "lucide-react";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  options?: string[];
  extras?: string[];
}

interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  address: string;
  items: OrderItem[];
  total: number;
  status: "new" | "processing" | "preparing" | "delivering" | "completed" | "rejected";
  createdAt: Date;
  statusUpdatedAt: Date;
}

interface DeliveryPerson {
  id: string;
  name: string;
  phone: string;
}

const OrderManagement = () => {
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDeliveryDialogOpen, setIsDeliveryDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [newDeliveryPersonPhone, setNewDeliveryPersonPhone] = useState("");
  const [playSound, setPlaySound] = useState(false);

  const deliveryPersons: DeliveryPerson[] = [
    { id: "d1", name: "أحمد محمد", phone: "0612345678" },
    { id: "d2", name: "سمير علي", phone: "0698765432" },
    { id: "d3", name: "كريم حسن", phone: "0654321987" },
  ];

  // Mock data for orders
  useEffect(() => {
    const mockOrders: Order[] = [
      {
        id: "ORD-001",
        customerName: "محمد أحمد",
        customerPhone: "0611223344",
        address: "شارع الحسن الثاني، رقم 123، الدار البيضاء",
        items: [
          {
            id: "item1",
            name: "قهوة تركية",
            quantity: 2,
            price: 50,
            options: ["بدون سكر"],
          },
          {
            id: "item2",
            name: "كروسان بالشوكولاتة",
            quantity: 1,
            price: 35,
          },
        ],
        total: 85,
        status: "new",
        createdAt: new Date(),
        statusUpdatedAt: new Date(),
      },
      {
        id: "ORD-002",
        customerName: "فاطمة علي",
        customerPhone: "0622334455",
        address: "شارع محمد الخامس، رقم 45، الرباط",
        items: [
          {
            id: "item3",
            name: "لاتيه بالكراميل",
            quantity: 1,
            price: 30,
            extras: ["كريمة إضافية"],
          },
          {
            id: "item4",
            name: "كيك الشوكولاتة",
            quantity: 1,
            price: 45,
          },
        ],
        total: 75,
        status: "processing",
        createdAt: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
        statusUpdatedAt: new Date(Date.now() - 1000 * 60 * 10), // 10 minutes ago
      },
      {
        id: "ORD-003",
        customerName: "كريم حسن",
        customerPhone: "0633445566",
        address: "شارع المسيرة، رقم 78، مراكش",
        items: [
          {
            id: "item5",
            name: "شاي أخضر بالنعناع",
            quantity: 3,
            price: 60,
          },
          {
            id: "item6",
            name: "كعك اللوز",
            quantity: 2,
            price: 70,
          },
        ],
        total: 130,
        status: "preparing",
        createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        statusUpdatedAt: new Date(Date.now() - 1000 * 60 * 20), // 20 minutes ago
      },
      {
        id: "ORD-004",
        customerName: "سمير عمر",
        customerPhone: "0644556677",
        address: "شارع الزرقطوني، رقم 56، الدار البيضاء",
        items: [
          {
            id: "item7",
            name: "قهوة أمريكية",
            quantity: 2,
            price: 40,
          },
          {
            id: "item8",
            name: "سندويش دجاج",
            quantity: 1,
            price: 55,
          },
        ],
        total: 95,
        status: "delivering",
        createdAt: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
        statusUpdatedAt: new Date(Date.now() - 1000 * 60 * 25), // 25 minutes ago
      },
    ];

    setOrders(mockOrders);

    // Check if there are new orders to play sound
    const hasNewOrders = mockOrders.some((order) => order.status === "new");
    setPlaySound(hasNewOrders);
  }, []);

  // Play sound for new orders
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (playSound) {
      interval = setInterval(() => {
        const audio = new Audio(
          "https://assets.mixkit.co/active_storage/sfx/922/922-preview.mp3"
        );
        audio.play();
      }, 10000); // Play every 10 seconds
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [playSound]);

  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "new":
        return (
          <Badge className="bg-blue-500">
            <Clock className="mr-1 h-3 w-3" /> جديد
          </Badge>
        );
      case "processing":
        return (
          <Badge className="bg-yellow-500">
            <Clock className="mr-1 h-3 w-3" /> قيد المعالجة
          </Badge>
        );
      case "preparing":
        return (
          <Badge className="bg-orange-500">
            <ShoppingBag className="mr-1 h-3 w-3" /> قيد الإعداد
          </Badge>
        );
      case "delivering":
        return (
          <Badge className="bg-purple-500">
            <Truck className="mr-1 h-3 w-3" /> جاري التوصيل
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-green-500">
            <CheckCircle className="mr-1 h-3 w-3" /> مكتمل
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-500">
            <XCircle className="mr-1 h-3 w-3" /> مرفوض
          </Badge>
        );
      default:
        return <Badge>غير معروف</Badge>;
    }
  };

  const getOrderTimeElapsed = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 60) {
      return `${diffMins} دقيقة`;
    } else {
      const hours = Math.floor(diffMins / 60);
      const mins = diffMins % 60;
      return `${hours} ساعة ${mins} دقيقة`;
    }
  };

  const handleStatusChange = (orderId: string, newStatus: Order["status"]) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId
          ? { ...order, status: newStatus, statusUpdatedAt: new Date() }
          : order
      )
    );

    toast({
      title: "تم تحديث حالة الطلب",
      description: `تم تغيير حالة الطلب ${orderId} إلى ${getStatusLabel(newStatus)}`,
    });

    // If we're changing status of a new order, check if we still need to play sound
    if (newStatus !== "new") {
      const stillHasNewOrders = orders.some(
        (order) => order.status === "new" && order.id !== orderId
      );
      setPlaySound(stillHasNewOrders);
    }
  };

  const getStatusLabel = (status: Order["status"]) => {
    switch (status) {
      case "new":
        return "جديد";
      case "processing":
        return "قيد المعالجة";
      case "preparing":
        return "قيد الإعداد";
      case "delivering":
        return "جاري التوصيل";
      case "completed":
        return "مكتمل";
      case "rejected":
        return "مرفوض";
      default:
        return "غير معروف";
    }
  };

  const handleDeliveryPersonSelect = (order: Order) => {
    setSelectedOrder(order);
    setIsDeliveryDialogOpen(true);
  };

  const handleRejectOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsRejectDialogOpen(true);
  };

  const confirmRejectOrder = () => {
    if (selectedOrder) {
      handleStatusChange(selectedOrder.id, "rejected");
      setIsRejectDialogOpen(false);
    }
  };

  const sendWhatsAppToDeliveryPerson = (phone: string) => {
    if (!selectedOrder) return;

    const orderItems = selectedOrder.items
      .map((item) => `${item.name} (${item.quantity})`)
      .join("\n");

    const message = `طلب جديد للتوصيل:\n\nرقم الطلب: ${selectedOrder.id}\n\nالعميل: ${selectedOrder.customerName}\nالهاتف: ${selectedOrder.customerPhone}\nالعنوان: ${selectedOrder.address}\n\nالمنتجات:\n${orderItems}\n\nالإجمالي: ${selectedOrder.total} درهم`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phone.replace(/^0/, "212")}?text=${encodedMessage}`, "_blank");

    // Update order status
    handleStatusChange(selectedOrder.id, "delivering");
    setIsDeliveryDialogOpen(false);

    toast({
      title: "تم إرسال تفاصيل الطلب",
      description: "تم إرسال تفاصيل الطلب إلى عامل التوصيل عبر واتساب",
    });
  };

  const sendWhatsAppToCustomer = (order: Order, messageType: "accept" | "reject" | "ready") => {
    let message = "";

    switch (messageType) {
      case "accept":
        message = `مرحباً ${order.customerName}،\n\nتم قبول طلبك رقم ${order.id} وهو قيد التحضير الآن.\n\nشكراً لاختيارك خدماتنا!`;
        break;
      case "reject":
        message = `مرحباً ${order.customerName}،\n\nنعتذر، لم نتمكن من قبول طلبك رقم ${order.id} في الوقت الحالي.\n\nيرجى التواصل معنا للمزيد من المعلومات.`;
        break;
      case "ready":
        message = `مرحباً ${order.customerName}،\n\nطلبك رقم ${order.id} جاهز الآن وسيتم توصيله قريباً.\n\nشكراً لاختيارك خدماتنا!`;
        break;
    }

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${order.customerPhone.replace(/^0/, "212")}?text=${encodedMessage}`, "_blank");

    toast({
      title: "تم إرسال الرسالة",
      description: "تم إرسال رسالة واتساب إلى العميل",
    });
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-6 text-right">إدارة الطلبات</h1>

      {/* New Orders */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-right flex items-center justify-end">
          <Clock className="ml-2 text-blue-500" />
          الطلبات الجديدة
          {orders.filter((order) => order.status === "new").length > 0 && (
            <Badge className="mr-2 bg-blue-500">
              {orders.filter((order) => order.status === "new").length}
            </Badge>
          )}
          {playSound && (
            <Button
              variant="outline"
              size="sm"
              className="mr-2"
              onClick={() => setPlaySound(false)}
            >
              <AlertTriangle className="mr-1 h-4 w-4 text-red-500" />
              إيقاف التنبيه
            </Button>
          )}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {orders
            .filter((order) => order.status === "new")
            .map((order) => (
              <Card
                key={order.id}
                className="border-2 border-blue-200 hover:border-blue-400 transition-colors"
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="text-right">
                      <CardTitle className="text-lg">{order.id}</CardTitle>
                      <p className="text-sm text-gray-500">
                        {order.createdAt.toLocaleTimeString()}
                      </p>
                    </div>
                    {getStatusBadge(order.status)}
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-2 text-right">
                    <div className="flex items-center justify-end">
                      <p className="font-medium">{order.customerName}</p>
                      <User className="ml-2 h-4 w-4 text-gray-500" />
                    </div>
                    <div className="flex items-center justify-end">
                      <p>{order.customerPhone}</p>
                      <Phone className="ml-2 h-4 w-4 text-gray-500" />
                    </div>
                    <div className="flex items-center justify-end">
                      <p className="text-sm">{order.address}</p>
                      <MapPin className="ml-2 h-4 w-4 text-gray-500" />
                    </div>
                    <div className="border-t pt-2">
                      <p className="font-medium">المنتجات:</p>
                      <ul className="text-sm space-y-1">
                        {order.items.map((item) => (
                          <li key={item.id} className="flex justify-between">
                            <span>{item.price * item.quantity} درهم</span>
                            <span>
                              {item.name} x{item.quantity}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex justify-between font-bold mt-2 pt-2 border-t">
                        <span>{order.total} درهم</span>
                        <span>الإجمالي</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-0">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRejectOrder(order)}
                  >
                    <XCircle className="mr-1 h-4 w-4" />
                    رفض
                  </Button>
                  <div className="space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => sendWhatsAppToCustomer(order, "accept")}
                    >
                      واتساب
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
