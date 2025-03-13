import React, { useState } from "react";
import CardVerificationForm from "./CardVerificationForm";
import CardDetails from "./CardDetails";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, Gift, Coins, CreditCard, QrCode } from "lucide-react";

type CardType = "rewards" | "gift" | "coins";

interface CardDiscoveryProps {
  onCardAdded?: (cardNumber: string, cardType: CardType) => void;
}

const CardDiscovery = ({ onCardAdded = () => {} }: CardDiscoveryProps) => {
  const [verifiedCard, setVerifiedCard] = useState<string | null>(null);
  const [cardType, setCardType] = useState<CardType>("rewards");
  const [cardBalance, setCardBalance] = useState<number>(0);
  const { toast } = useToast();

  // Mock function to determine card type and balance based on card number
  const determineCardTypeAndBalance = (cardNumber: string) => {
    // For demo purposes, we'll use the first digit to determine card type
    // In a real app, this would be determined by the API response
    const firstDigit = cardNumber.charAt(0);

    let type: CardType = "rewards";
    let balance = 0;

    if (firstDigit === "4") {
      type = "rewards";
      balance = Math.floor(Math.random() * 10); // Random number of stamps (0-9)
    } else if (firstDigit === "5") {
      type = "gift";
      balance = Math.floor(Math.random() * 100) + 10; // Random gift card balance ($10-$109)
    } else if (firstDigit === "6") {
      type = "coins";
      balance = Math.floor(Math.random() * 1000) + 100; // Random coin balance (100-1099)
    }

    return { type, balance };
  };

  const handleVerify = (cardNumber: string) => {
    const { type, balance } = determineCardTypeAndBalance(cardNumber);
    setVerifiedCard(cardNumber);
    setCardType(type);
    setCardBalance(balance);
  };

  const handleError = (error: string) => {
    toast({
      title: "Verification Error",
      description: error,
      variant: "destructive",
    });
  };

  const handleAddToAccount = () => {
    if (verifiedCard) {
      onCardAdded(verifiedCard, cardType);
      toast({
        title: "Card Added",
        description: `Your ${cardType} card has been added to your account.`,
        variant: "default",
      });

      // Reset the form after adding to account
      setVerifiedCard(null);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Card Discovery</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Card Details
          </h2>
          {verifiedCard ? (
            <CardDetails
              cardNumber={verifiedCard}
              cardType={cardType}
              balance={cardBalance}
              expiryDate="12/2025"
              isVerified={true}
              onAddToAccount={handleAddToAccount}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <div className="text-center p-6">
                <div className="flex justify-center mb-4">
                  <CreditCard className="h-12 w-12 text-gray-400" />
                </div>
                <p className="text-gray-500 font-medium">
                  Verify a card to see details
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Enter a card number or scan a QR code to verify your card
                </p>
                <div className="mt-4 flex justify-center">
                  <div className="flex items-center text-sm text-blue-600">
                    <QrCode className="h-4 w-4 mr-1" />
                    <span>Scan QR Code</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!verifiedCard && (
            <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-100">
              <h3 className="text-sm font-medium text-green-800 mb-2 flex items-center">
                <CreditCard className="h-4 w-4 mr-2" />
                How to Find Your Card Number
              </h3>
              <p className="text-xs text-green-700 mb-2">
                Your card number is a 16-digit number printed on the front or
                back of your physical card. For digital cards, you can find it
                in your email confirmation or in the app.
              </p>
              <p className="text-xs text-green-700">
                For security reasons, never share your card number with anyone
                else.
              </p>
            </div>
          )}
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Verify Your Card
          </h2>
          <CardVerificationForm onVerify={handleVerify} onError={handleError} />

          <div className="mt-8">
            <h3 className="text-md font-medium text-gray-600 mb-3">
              Card Types
            </h3>
            <Tabs defaultValue="rewards" className="w-full">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="rewards" className="flex items-center">
                  <Award className="mr-2 h-4 w-4 text-green-600" />
                  Rewards
                </TabsTrigger>
                <TabsTrigger value="gift" className="flex items-center">
                  <Gift className="mr-2 h-4 w-4 text-purple-600" />
                  Gift Cards
                </TabsTrigger>
                <TabsTrigger value="coins" className="flex items-center">
                  <Coins className="mr-2 h-4 w-4 text-amber-500" />
                  Coins
                </TabsTrigger>
              </TabsList>

              <TabsContent value="rewards">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className="bg-green-100 p-3 rounded-full">
                        <Award className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Rewards Card</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          Collect stamps with every purchase and earn free
                          rewards.
                        </p>
                        <ul className="text-xs text-gray-500 list-disc list-inside space-y-1">
                          <li>Earn stamps with each purchase</li>
                          <li>Redeem stamps for free products</li>
                          <li>Track your progress toward rewards</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="gift">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className="bg-purple-100 p-3 rounded-full">
                        <Gift className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Gift Cards</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          Gift cards can be redeemed for purchases in-store or
                          online.
                        </p>
                        <ul className="text-xs text-gray-500 list-disc list-inside space-y-1">
                          <li>Use for in-store or online purchases</li>
                          <li>Check balance anytime</li>
                          <li>No expiration date on most cards</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="coins">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className="bg-yellow-100 p-3 rounded-full">
                        <Coins className="h-6 w-6 text-yellow-600" />
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Coins Card</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          Earn and spend coins on exclusive merchandise and
                          special offers.
                        </p>
                        <ul className="text-xs text-gray-500 list-disc list-inside space-y-1">
                          <li>Convert coins to store credit</li>
                          <li>Use for exclusive merchandise</li>
                          <li>Transfer coins between accounts</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDiscovery;
