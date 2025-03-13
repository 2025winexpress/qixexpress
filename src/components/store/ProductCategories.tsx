import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Coffee, Pizza, Cake, Utensils, IceCream } from "lucide-react";

interface ProductCategoriesProps {
  activeCategory?: string;
  onCategoryChange?: (category: string) => void;
}

const ProductCategories: React.FC<ProductCategoriesProps> = ({
  activeCategory = "all",
  onCategoryChange = () => {},
}) => {
  const categories = [
    { id: "all", name: "الكل", icon: <Utensils className="h-5 w-5" /> },
    { id: "food", name: "الطعام", icon: <Pizza className="h-5 w-5" /> },
    { id: "drinks", name: "المشروبات", icon: <Coffee className="h-5 w-5" /> },
    { id: "desserts", name: "الحلويات", icon: <Cake className="h-5 w-5" /> },
    {
      id: "icecream",
      name: "المثلجات",
      icon: <IceCream className="h-5 w-5" />,
    },
  ];

  return (
    <div className="w-full bg-white p-2 rounded-lg shadow-sm mb-6 overflow-x-auto">
      <Tabs
        defaultValue={activeCategory}
        onValueChange={onCategoryChange}
        className="w-full"
      >
        <TabsList className="w-full flex justify-between bg-gray-100">
          {categories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="flex-1 py-3 flex flex-col items-center gap-1 data-[state=active]:bg-green-600 data-[state=active]:text-white"
            >
              {category.icon}
              <span className="text-sm">{category.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default ProductCategories;
