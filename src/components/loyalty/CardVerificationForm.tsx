import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface CardVerificationFormProps {
  onVerify?: (cardNumber: string) => void;
  onError?: (error: string) => void;
}

const CardVerificationForm = ({
  onVerify = () => {},
  onError = () => {},
}: CardVerificationFormProps) => {
  const [cardNumber, setCardNumber] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const validateCardNumber = (number: string): boolean => {
    // Basic validation - check if it's a 16-digit number
    const regex = /^\d{16}$/;
    return regex.test(number.replace(/\s/g, ""));
  };

  const handleVerify = () => {
    // Clear previous errors
    setError(null);

    // Format the card number (remove spaces)
    const formattedNumber = cardNumber.replace(/\s/g, "");

    if (!validateCardNumber(formattedNumber)) {
      const errorMessage = "Please enter a valid 16-digit card number";
      setError(errorMessage);
      onError(errorMessage);
      return;
    }

    // Simulate verification process
    setIsVerifying(true);

    // Mock API call with timeout
    setTimeout(() => {
      setIsVerifying(false);

      // For demo purposes, we'll verify all cards that pass validation
      toast({
        title: "Card Verified",
        description: "Your card has been successfully verified.",
        variant: "default",
      });

      onVerify(formattedNumber);
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Format the card number with spaces every 4 digits
    const formatted = value
      .replace(/\s/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();

    setCardNumber(formatted);

    // Clear error when user starts typing again
    if (error) setError(null);
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-sm">
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="cardNumber" className="block text-sm font-medium">
            Card Number
          </label>
          <div className="relative">
            <Input
              id="cardNumber"
              type="text"
              placeholder="XXXX XXXX XXXX XXXX"
              value={cardNumber}
              onChange={handleInputChange}
              maxLength={19} // 16 digits + 3 spaces
              className={`pr-10 ${error ? "border-red-300 focus:ring-red-500" : ""}`}
              disabled={isVerifying}
            />
          </div>
          {error && (
            <p className="text-sm text-red-600 flex items-center mt-1">
              <AlertCircle className="h-4 w-4 mr-1" />
              {error}
            </p>
          )}
        </div>

        <Button
          onClick={handleVerify}
          className="w-full bg-green-600 hover:bg-green-700"
          disabled={isVerifying || cardNumber.replace(/\s/g, "").length !== 16}
        >
          {isVerifying ? (
            <>
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Verifying...
            </>
          ) : (
            <>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Verify Card
            </>
          )}
        </Button>

        <div className="text-xs text-gray-500 mt-2">
          <p>
            For demo purposes, enter any 16-digit number to verify a card.
            Examples:
          </p>
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>4111 2222 3333 4444 (Rewards Card)</li>
            <li>5111 2222 3333 4444 (Gift Card)</li>
            <li>6111 2222 3333 4444 (Coins Card)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CardVerificationForm;
