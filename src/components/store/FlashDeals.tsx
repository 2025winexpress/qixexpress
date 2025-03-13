import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coins, Clock } from "lucide-react";
import ProductDetailsDialog from "./ProductDetailsDialog";

interface Product {
  id: string;
  name: string;
  description: string;
  originalPrice: number;
  discountPrice: number;
  coinPrice: number;
  imageUrl: string;
  endTime: string;
}

interface FlashDealsProps {
  products?: Product[];
}

const FlashDeals: React.FC<FlashDealsProps> = ({
  products = [
    {
      id: "flash1",
      name: "قهوة بريميوم",
      description: "قهوة عربية فاخرة مع هيل",
      originalPrice: 45,
      discountPrice: 35,
      coinPrice: 150,
      imageUrl:
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=80",
      endTime: "2023-12-31T23:59:59",
    },
    {
      id: "flash2",
      name: "كيك الشوكولاتة",
      description: "كيك شوكولاتة بلجيكية فاخرة",
      originalPrice: 60,
      discountPrice: 45,
      coinPrice: 200,
      imageUrl:
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80",
      endTime: "2023-12-25T23:59:59",
    },
    {
      id: "flash3",
      name: "عصير برتقال طازج",
      description: "عصير برتقال طبيعي 100%",
      originalPrice: 30,
      discountPrice: 20,
      coinPrice: 100,
      imageUrl:
        "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=80",
      endTime: "2023-12-20T23:59:59",
    },
  ],
}) => {
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(
    null,
  );
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const calculateTimeLeft = (endTime: string) => {
    const difference = new Date(endTime).getTime() - new Date().getTime();
    if (difference <= 0) return { days: 0, hours: 0, minutes: 0 };

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
    };
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
          <Clock className="mr-2 text-red-500" />
          عروض محدودة
        </h2>
        <Button variant="link" className="text-green-600">
          عرض الكل
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => {
          const timeLeft = calculateTimeLeft(product.endTime);
          return (
            <Card
              key={product.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-32 object-cover"
                />
                <div className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-bl-md">
                  خصم{" "}
                  {Math.round(
                    ((product.originalPrice - product.discountPrice) /
                      product.originalPrice) *
                      100,
                  )}
                  %
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-xs p-1 flex justify-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {timeLeft.days}د {timeLeft.hours}س {timeLeft.minutes}د
                </div>
              </div>
              <CardContent className="p-3">
                <h3 className="font-medium text-right">{product.name}</h3>
                <div className="flex justify-between items-center mt-1">
                  <div className="flex items-center text-xs text-yellow-600">
                    <Coins className="h-3 w-3 mr-1" />
                    {product.coinPrice}
                  </div>
                  <div className="text-right">
                    <span className="text-gray-400 line-through text-xs">
                      {product.originalPrice} درهم
                    </span>
                    <p className="font-bold text-green-600">
                      {product.discountPrice} درهم
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-3 pt-0">
                <Button
                  onClick={() => handleProductSelect(product)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white text-sm"
                >
                  إضافة
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {selectedProduct && (
        <ProductDetailsDialog
          product={selectedProduct}
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        />
      )}
    </div>
  );
};

export default FlashDeals;
