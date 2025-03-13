import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coins, Star } from "lucide-react";
import ProductDetailsDialog from "./ProductDetailsDialog";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  coinPrice: number;
  imageUrl: string;
  rating: number;
  reviewCount: number;
}

interface BestSellersProps {
  products?: Product[];
}

const BestSellers: React.FC<BestSellersProps> = ({
  products = [
    {
      id: "best1",
      name: "قهوة تركية",
      description: "قهوة تركية أصلية محضرة على الرمل",
      price: 25,
      coinPrice: 100,
      imageUrl:
        "https://images.unsplash.com/photo-1578374173705-969cbe6f2d6b?w=400&q=80",
      rating: 4.8,
      reviewCount: 120,
    },
    {
      id: "best2",
      name: "كروسان بالشوكولاتة",
      description: "كروسان طازج محشو بالشوكولاتة البلجيكية",
      price: 35,
      coinPrice: 150,
      imageUrl:
        "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80",
      rating: 4.6,
      reviewCount: 85,
    },
    {
      id: "best3",
      name: "لاتيه بالكراميل",
      description: "قهوة لاتيه مع شراب الكراميل والكريمة",
      price: 30,
      coinPrice: 120,
      imageUrl:
        "https://images.unsplash.com/photo-1572286258217-215f6d8bb578?w=400&q=80",
      rating: 4.7,
      reviewCount: 95,
    },
    {
      id: "best4",
      name: "شاي أخضر بالنعناع",
      description: "شاي أخضر منعش مع أوراق النعناع الطازجة",
      price: 20,
      coinPrice: 80,
      imageUrl:
        "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&q=80",
      rating: 4.5,
      reviewCount: 75,
    },
  ],
}) => {
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(
    null,
  );
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
          <Star className="mr-2 text-yellow-500" />
          الأكثر مبيعاً
        </h2>
        <Button variant="link" className="text-green-600">
          عرض الكل
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
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
              <div className="absolute bottom-0 left-0 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-tr-md flex items-center">
                <Star className="h-3 w-3 mr-1 text-yellow-400 fill-yellow-400" />
                {product.rating} ({product.reviewCount})
              </div>
            </div>
            <CardContent className="p-3">
              <h3 className="font-medium text-right">{product.name}</h3>
              <div className="flex justify-between items-center mt-1">
                <div className="flex items-center text-xs text-yellow-600">
                  <Coins className="h-3 w-3 mr-1" />
                  {product.coinPrice}
                </div>
                <p className="font-bold text-green-600 text-right">
                  {product.price} درهم
                </p>
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
        ))}
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

export default BestSellers;
