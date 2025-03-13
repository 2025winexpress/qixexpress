import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Coins, Plus, Minus, ShoppingCart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Product {
  id: string;
  name: string;
  description: string;
  originalPrice?: number;
  discountPrice?: number;
  price?: number;
  coinPrice: number;
  imageUrl: string;
  endTime?: string;
}

interface ProductDetailsDialogProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

interface Ingredient {
  id: string;
  name: string;
  included: boolean;
}

interface Extra {
  id: string;
  name: string;
  price: number;
  selected: boolean;
}

const ProductDetailsDialog: React.FC<ProductDetailsDialogProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { id: "ing1", name: "سكر", included: true },
    { id: "ing2", name: "حليب", included: true },
    { id: "ing3", name: "كريمة", included: true },
    { id: "ing4", name: "هيل", included: true },
  ]);
  const [extras, setExtras] = useState<Extra[]>([
    { id: "extra1", name: "كريمة إضافية", price: 5, selected: false },
    { id: "extra2", name: "شوكولاتة", price: 8, selected: false },
    { id: "extra3", name: "كراميل", price: 7, selected: false },
  ]);

  const handleIngredientChange = (id: string, checked: boolean) => {
    setIngredients(
      ingredients.map((ing) =>
        ing.id === id ? { ...ing, included: checked } : ing,
      ),
    );
  };

  const handleExtraChange = (id: string, checked: boolean) => {
    setExtras(
      extras.map((extra) =>
        extra.id === id ? { ...extra, selected: checked } : extra,
      ),
    );
  };

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const calculateTotalPrice = () => {
    const basePrice = product.discountPrice || product.price || 0;
    const extrasPrice = extras
      .filter((extra) => extra.selected)
      .reduce((sum, extra) => sum + extra.price, 0);
    return (basePrice + extrasPrice) * quantity;
  };

  const handleAddToCart = () => {
    // Here you would add the product to the cart with the selected options
    const selectedIngredients = ingredients
      .filter((ing) => ing.included)
      .map((ing) => ing.name);
    const selectedExtras = extras
      .filter((extra) => extra.selected)
      .map((extra) => extra.name);

    const cartItem = {
      productId: product.id,
      name: product.name,
      quantity,
      price: calculateTotalPrice(),
      coinPrice: product.coinPrice * quantity,
      ingredients: selectedIngredients,
      extras: selectedExtras,
    };

    console.log("Adding to cart:", cartItem);
    toast({
      title: "تمت الإضافة إلى السلة",
      description: `تمت إضافة ${quantity} ${product.name} إلى سلة التسوق`,
    });

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-right">{product.name}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="relative">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-48 object-cover rounded-md"
            />
            {product.discountPrice && product.originalPrice && (
              <div className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-bl-md">
                خصم{" "}
                {Math.round(
                  ((product.originalPrice - product.discountPrice) /
                    product.originalPrice) *
                    100,
                )}
                %
              </div>
            )}
          </div>

          <p className="text-sm text-gray-600 text-right">
            {product.description}
          </p>

          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={decreaseQuantity}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="h-8 w-16 text-center"
                min="1"
              />
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={increaseQuantity}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-right">
              {product.originalPrice && product.discountPrice && (
                <span className="text-gray-400 line-through text-xs block">
                  {product.originalPrice} درهم
                </span>
              )}
              <span className="font-bold text-green-600">
                {product.discountPrice || product.price} درهم
              </span>
              <div className="flex items-center justify-end text-xs text-yellow-600">
                <Coins className="h-3 w-3 ml-1" />
                {product.coinPrice} كوينز
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-right mb-2">المكونات</h3>
              <div className="grid grid-cols-2 gap-2">
                {ingredients.map((ingredient) => (
                  <div
                    key={ingredient.id}
                    className="flex items-center space-x-2 justify-end space-x-reverse"
                  >
                    <Label
                      htmlFor={ingredient.id}
                      className="text-sm text-right"
                    >
                      {ingredient.name}
                    </Label>
                    <Checkbox
                      id={ingredient.id}
                      checked={ingredient.included}
                      onCheckedChange={(checked) =>
                        handleIngredientChange(
                          ingredient.id,
                          checked as boolean,
                        )
                      }
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium text-right mb-2">إضافات</h3>
              <div className="grid grid-cols-2 gap-2">
                {extras.map((extra) => (
                  <div
                    key={extra.id}
                    className="flex items-center justify-between border rounded p-2"
                  >
                    <span className="text-xs text-green-600">
                      +{extra.price} درهم
                    </span>
                    <div className="flex items-center space-x-2 justify-end space-x-reverse">
                      <Label htmlFor={extra.id} className="text-sm text-right">
                        {extra.name}
                      </Label>
                      <Checkbox
                        id={extra.id}
                        checked={extra.selected}
                        onCheckedChange={(checked) =>
                          handleExtraChange(extra.id, checked as boolean)
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <div className="w-full flex justify-between items-center">
            <span className="font-bold">
              الإجمالي: {calculateTotalPrice()} درهم
            </span>
            <Button
              onClick={handleAddToCart}
              className="bg-green-600 hover:bg-green-700"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              إضافة إلى السلة
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsDialog;
