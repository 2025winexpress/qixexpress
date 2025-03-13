import React from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Coins, Gift, Award, Plus } from "lucide-react";

type CardType = "rewards" | "gift" | "coins";

interface CardDetailsProps {
  cardNumber?: string;
  cardType?: CardType;
  balance?: number;
  expiryDate?: string;
  isVerified?: boolean;
  onAddToAccount?: () => void;
}

const CardDetails = ({
  cardNumber = "1234 5678 9012 3456",
  cardType = "rewards",
  balance = 0,
  expiryDate = "12/2025",
  isVerified = true,
  onAddToAccount = () => console.log("Add to account clicked"),
}: CardDetailsProps) => {
  // Determine card icon and color based on type
  const getCardIcon = () => {
    switch (cardType) {
      case "rewards":
        return <Award className="h-8 w-8 text-green-600" />;
      case "gift":
        return <Gift className="h-8 w-8 text-purple-600" />;
      case "coins":
        return <Coins className="h-8 w-8 text-amber-500" />;
      default:
        return <Award className="h-8 w-8 text-green-600" />;
    }
  };

  const getCardBadgeColor = () => {
    switch (cardType) {
      case "rewards":
        return "bg-green-100 text-green-800";
      case "gift":
        return "bg-purple-100 text-purple-800";
      case "coins":
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-green-100 text-green-800";
    }
  };

  const getCardTitle = () => {
    switch (cardType) {
      case "rewards":
        return "Rewards Card";
      case "gift":
        return "Gift Card";
      case "coins":
        return "Coins Card";
      default:
        return "Rewards Card";
    }
  };

  const formatCardNumber = (number: string) => {
    // Format the card number with spaces every 4 digits
    return number
      .replace(/\s/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-xl font-bold">{getCardTitle()}</CardTitle>
          <CardDescription className="text-sm text-gray-500">
            Card #{formatCardNumber(cardNumber)}
          </CardDescription>
        </div>
        <Badge className={getCardBadgeColor()}>
          {cardType.charAt(0).toUpperCase() + cardType.slice(1)}
        </Badge>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            {getCardIcon()}
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Balance</p>
              {cardType === "coins" ? (
                <p className="text-2xl font-bold text-amber-500">
                  {balance} Coins
                </p>
              ) : cardType === "gift" ? (
                <p className="text-2xl font-bold text-purple-600">
                  ${balance.toFixed(2)}
                </p>
              ) : (
                <div className="w-full mt-2">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      {balance}/10 Stamps
                    </span>
                  </div>
                  <Progress value={balance * 10} className="h-2 bg-gray-200" />
                </div>
              )}
            </div>
          </div>
        </div>

        {cardType === "gift" && (
          <div className="mt-4 p-3 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-600">Valid until: {expiryDate}</p>
          </div>
        )}

        {cardType === "rewards" && (
          <div className="mt-4 p-3 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-600">
              {10 - balance} more stamps until your next free reward!
            </p>
          </div>
        )}

        {cardType === "coins" && (
          <div className="mt-4 p-3 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-600">
              Coins can be used for exclusive merchandise and special offers.
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={onAddToAccount}
          className="w-full flex items-center justify-center"
          variant={
            cardType === "rewards"
              ? "default"
              : cardType === "gift"
                ? "outline"
                : "secondary"
          }
        >
          <Plus className="mr-2 h-4 w-4" />
          Add to My Account
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CardDetails;
