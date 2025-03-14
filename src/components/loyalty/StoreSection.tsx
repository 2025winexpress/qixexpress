import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { ShoppingBag, Coins, CreditCard } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  coinPrice: number;
  imageUrl: string;
}

interface StoreSectionProps {
  products?: Product[];
  coinBalance?: number;
}

const StoreSection: React.FC<StoreSectionProps> = ({
  products = [
    {
      id: "prod1",
      name: "Premium Coffee Mug",
      description: "Ceramic mug with our signature logo",
      price: 120,
      coinPrice: 500,
      imageUrl:
        "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&q=80",
    },
    {
      id: "prod2",
      name: "Branded T-Shirt",
      description: "100% cotton t-shirt with embroidered logo",
      price: 180,
      coinPrice: 750,
      imageUrl:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80",
    },
    {
      id: "prod3",
      name: "Reusable Coffee Tumbler",
      description: "Stainless steel tumbler that keeps drinks hot for 6 hours",
      price: 150,
      coinPrice: 600,
      imageUrl:
        "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=400&q=80",
    },
    {
      id: "prod4",
      name: "Coffee Beans (250g)",
      description: "Premium arabica coffee beans",
      price: 90,
      coinPrice: 350,
      imageUrl:
        "https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=400&q=80",
    },
  ],
  coinBalance = 1250,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "coins">("cash");
  const { toast } = useToast();

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  const handlePurchase = () => {
    if (!selectedProduct) return;

    const successMessage =
      paymentMethod === "cash"
        ? `You have purchased ${selectedProduct.name} for ${selectedProduct.price} MAD.`
        : `You have purchased ${selectedProduct.name} using ${selectedProduct.coinPrice} coins.`;

    toast({
      title: "Purchase Successful",
      description: successMessage,
      variant: "default",
    });

    setIsDialogOpen(false);
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
          <ShoppingBag className="mr-2 text-green-600" />
          المنتجات المميزة
        </h2>
        <p className="text-gray-600">
          تصفح منتجاتنا المميزة واستبدلها بالنقود أو نقاط الولاء.
        </p>
        <div className="mt-2 bg-yellow-50 p-2 rounded-md inline-block">
          <p className="text-sm flex items-center">
            <Coins className="h-4 w-4 mr-1 text-yellow-600" />
            <span className="font-medium text-yellow-800">
              {coinBalance} coins available
            </span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card
            key={product.id}
            className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleProductSelect(product)}
          >
            <div className="h-48 overflow-hidden">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{product.name}</CardTitle>
              <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-bold">{product.price} MAD</p>
                  <p className="text-sm text-yellow-600 flex items-center">
                    <Coins className="h-3 w-3 mr-1" />
                    {product.coinPrice} coins
                  </p>
                </div>
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  إضافة
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedProduct && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Purchase {selectedProduct.name}</DialogTitle>
              <DialogDescription>
                Choose your payment method below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex items-center justify-center">
                <img
                  src={selectedProduct.imageUrl}
                  alt={selectedProduct.name}
                  className="w-32 h-32 object-cover rounded-md"
                />
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">{selectedProduct.name}</h3>
                <p className="text-sm text-gray-500">
                  {selectedProduct.description}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div
                  className={`p-4 border rounded-md cursor-pointer ${paymentMethod === "cash" ? "border-green-500 bg-green-50" : "border-gray-200"}`}
                  onClick={() => setPaymentMethod("cash")}
                >
                  <div className="flex flex-col items-center text-center">
                    <CreditCard
                      className={`h-6 w-6 mb-2 ${paymentMethod === "cash" ? "text-green-600" : "text-gray-400"}`}
                    />
                    <p className="font-medium">Cash</p>
                    <p className="text-sm text-gray-500">
                      {selectedProduct.price} MAD
                    </p>
                  </div>
                </div>
                <div
                  className={`p-4 border rounded-md cursor-pointer ${paymentMethod === "coins" ? "border-yellow-500 bg-yellow-50" : "border-gray-200"} ${selectedProduct.coinPrice > coinBalance ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={() =>
                    selectedProduct.coinPrice <= coinBalance &&
                    setPaymentMethod("coins")
                  }
                >
                  <div className="flex flex-col items-center text-center">
                    <Coins
                      className={`h-6 w-6 mb-2 ${paymentMethod === "coins" ? "text-yellow-600" : "text-gray-400"}`}
                    />
                    <p className="font-medium">Coins</p>
                    <p className="text-sm text-gray-500">
                      {selectedProduct.coinPrice} coins
                    </p>
                    {selectedProduct.coinPrice > coinBalance && (
                      <p className="text-xs text-red-500 mt-1">
                        Insufficient coins
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handlePurchase}
                disabled={
                  paymentMethod === "coins" &&
                  selectedProduct.coinPrice > coinBalance
                }
                className={
                  paymentMethod === "cash"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-yellow-500 hover:bg-yellow-600"
                }
              >
                Complete Purchase
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default StoreSection;
