import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Coins, ShoppingCart, Plus, Minus } from "lucide-react";

interface ProductOption {
  id: string;
  name: string;
  price?: number;
  default?: boolean;
}

interface ProductExtra {
  id: string;
  name: string;
  price: number;
  default?: boolean;
}

interface Product {
  id: string;
  name: string;
  description?: string;
  price?: number;
  discountPrice?: number;
  originalPrice?: number;
  coinPrice?: number;
  imageUrl: string;
  options?: ProductOption[];
  extras?: ProductExtra[];
}

interface ProductDetailsDialogProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetailsDialog: React.FC<ProductDetailsDialogProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  // Initialize selected options with default options
  const defaultOptions = product.options
    ? product.options
        .filter((option) => option.default)
        .map((option) => option.id)
    : [];

  // Initialize selected extras with default extras
  const defaultExtras = product.extras
    ? product.extras.filter((extra) => extra.default).map((extra) => extra.id)
    : [];

  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] =
    useState<string[]>(defaultOptions);
  const [selectedExtras, setSelectedExtras] = useState<string[]>(defaultExtras);
  const { toast } = useToast();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleOptionToggle = (optionId: string) => {
    setSelectedOptions((prev) =>
      prev.includes(optionId)
        ? prev.filter((id) => id !== optionId)
        : [...prev, optionId],
    );
  };

  const handleExtraToggle = (extraId: string) => {
    setSelectedExtras((prev) =>
      prev.includes(extraId)
        ? prev.filter((id) => id !== extraId)
        : [...prev, extraId],
    );
  };

  const calculateTotalPrice = () => {
    let basePrice = product.price || product.discountPrice || 0;
    let totalExtrasPrice = 0;

    if (product.extras) {
      totalExtrasPrice = product.extras
        .filter((extra) => selectedExtras.includes(extra.id))
        .reduce((sum, extra) => sum + extra.price, 0);
    }

    return (basePrice + totalExtrasPrice) * quantity;
  };

  const handleAddToCart = () => {
    // Get selected option names
    const selectedOptionNames = product.options
      ? product.options
          .filter((option) => selectedOptions.includes(option.id))
          .map((option) => option.name)
      : [];

    // Get selected extra names
    const selectedExtraNames = product.extras
      ? product.extras
          .filter((extra) => selectedExtras.includes(extra.id))
          .map((extra) => extra.name)
      : [];

    // Create cart item
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price || product.discountPrice || 0,
      coinPrice: product.coinPrice || 0,
      quantity: quantity,
      imageUrl: product.imageUrl,
      options: selectedOptionNames,
      extras: selectedExtraNames,
    };

    // In a real app, this would add the product to the cart with the selected options and extras
    toast({
      title: "تمت الإضافة إلى السلة",
      description: `تمت إضافة ${quantity} ${product.name} إلى سلة التسوق`,
      variant: "default",
    });

    // Update cart count in localStorage
    const currentCount = parseInt(localStorage.getItem("cartCount") || "0");
    localStorage.setItem("cartCount", (currentCount + quantity).toString());

    // Store cart items in localStorage
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    cartItems.push(cartItem);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    // Update notification badge
    const event = new CustomEvent("cartUpdated", {
      detail: { count: currentCount + quantity },
    });
    window.dispatchEvent(event);

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-right">{product.name}</DialogTitle>
          <DialogDescription className="text-right">
            {product.description}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-center">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-48 object-cover rounded-md"
            />
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => handleQuantityChange(quantity - 1)}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="mx-2 w-6 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => handleQuantityChange(quantity + 1)}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            <div className="text-right">
              {product.originalPrice && (
                <span className="text-gray-400 line-through text-sm ml-2">
                  {product.originalPrice} درهم
                </span>
              )}
              <span className="font-bold text-green-600">
                {product.price || product.discountPrice} درهم
              </span>
              {product.coinPrice && (
                <div className="text-xs text-yellow-600 flex items-center justify-end mt-1">
                  <Coins className="h-3 w-3 ml-1" />
                  {product.coinPrice} كوينز
                </div>
              )}
            </div>
          </div>

          {product.options && product.options.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-medium text-right">المكونات</h3>
              <div className="space-y-1">
                {product.options.map((option) => (
                  <div
                    key={option.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      {option.price && (
                        <span className="text-sm text-gray-500">
                          +{option.price} درهم
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Label
                        htmlFor={`option-${option.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {option.name}
                      </Label>
                      <Checkbox
                        id={`option-${option.id}`}
                        checked={selectedOptions.includes(option.id)}
                        onCheckedChange={() => handleOptionToggle(option.id)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {product.extras && product.extras.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-medium text-right">إضافات</h3>
              <div className="space-y-1">
                {product.extras.map((extra) => (
                  <div
                    key={extra.id}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm text-gray-500">
                      +{extra.price} درهم
                    </span>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Label
                        htmlFor={`extra-${extra.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {extra.name}
                      </Label>
                      <Checkbox
                        id={`extra-${extra.id}`}
                        checked={selectedExtras.includes(extra.id)}
                        onCheckedChange={() => handleExtraToggle(extra.id)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
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
