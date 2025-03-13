import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, Gift, Coins } from "lucide-react";

interface DashboardTabsProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({
  activeTab = "rewards",
  onTabChange = () => {},
}) => {
  const handleTabChange = (value: string) => {
    onTabChange(value);
  };

  return (
    <div className="w-full bg-white rounded-lg">
      <Tabs
        defaultValue={activeTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="w-full flex justify-between bg-gray-100">
          <TabsTrigger
            value="rewards"
            className="flex-1 py-3 flex items-center justify-center data-[state=active]:bg-green-600 data-[state=active]:text-white"
          >
            <Award className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
            المكافآت
          </TabsTrigger>
          <TabsTrigger
            value="giftcards"
            className="flex-1 py-3 flex items-center justify-center data-[state=active]:bg-purple-600 data-[state=active]:text-white"
          >
            <Gift className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
            بطاقات الهدايا
          </TabsTrigger>
          <TabsTrigger
            value="coins"
            className="flex-1 py-3 flex items-center justify-center data-[state=active]:bg-yellow-600 data-[state=active]:text-white"
          >
            <Coins className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
            الكوينز
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default DashboardTabs;
