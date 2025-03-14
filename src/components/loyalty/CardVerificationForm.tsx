import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { AlertCircle, CheckCircle2, CreditCard } from "lucide-react";

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
      const errorMessage = "الرجاء إدخال رقم بطاقة صالح مكون من 16 رقمًا";
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
        title: "تم التحقق من البطاقة",
        description: "تم التحقق من بطاقتك بنجاح.",
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
    <div className="w-full bg-white p-4 md:p-6 rounded-lg shadow-sm">
      <div className="space-y-3 md:space-y-4">
        <div className="space-y-1 md:space-y-2">
          <label
            htmlFor="cardNumber"
            className="block text-xs md:text-sm font-medium text-right"
          >
            رقم البطاقة
          </label>
          <div className="relative">
            <Input
              id="cardNumber"
              type="text"
              placeholder="XXXX XXXX XXXX XXXX"
              value={cardNumber}
              onChange={handleInputChange}
              maxLength={19} // 16 digits + 3 spaces
              className={`text-right text-sm md:text-base pl-10 ${error ? "border-red-300 focus:ring-red-500" : ""}`}
              disabled={isVerifying}
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <CreditCard className="h-3 w-3 md:h-4 md:w-4" />
            </div>
          </div>
          {error && (
            <p className="text-xs md:text-sm text-red-600 flex items-center justify-end mt-1">
              {error}
              <AlertCircle className="h-3 w-3 md:h-4 md:w-4 mr-1" />
            </p>
          )}
        </div>

        <Button
          onClick={handleVerify}
          size="sm"
          className="w-full bg-green-600 hover:bg-green-700 text-xs md:text-sm md:h-10"
          disabled={isVerifying || cardNumber.replace(/\s/g, "").length !== 16}
        >
          {isVerifying ? (
            <>
              <div className="h-3 w-3 md:h-4 md:w-4 border-2 border-white border-t-transparent rounded-full animate-spin ml-1 md:ml-2"></div>
              جاري التحقق...
            </>
          ) : (
            <>
              <CheckCircle2 className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4" />
              تحقق من البطاقة
            </>
          )}
        </Button>

        <div className="text-xs text-gray-500 mt-2 text-right">
          <p>
            لأغراض العرض التوضيحي، أدخل أي رقم مكون من 16 رقمًا للتحقق من
            البطاقة. أمثلة:
          </p>
          <ul className="list-disc list-inside mt-1 space-y-0.5 md:space-y-1 text-right">
            <li>4111 2222 3333 4444 (بطاقة المكافآت)</li>
            <li>5111 2222 3333 4444 (بطاقة الهدايا)</li>
            <li>6111 2222 3333 4444 (بطاقة الكوينز)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CardVerificationForm;
