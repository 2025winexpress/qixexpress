import React from "react";
import { CheckCircle, AlertCircle, Info, XCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

type NotificationType = "success" | "error" | "info" | "warning";

interface NotificationToastProps {
  type?: NotificationType;
  title?: string;
  message?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  duration?: number;
}

const NotificationToast = ({
  type = "success",
  title = "Success",
  message = "Operation completed successfully",
  action,
  duration = 5000,
}: NotificationToastProps) => {
  const { toast } = useToast();

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "error":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />;
      default:
        return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
  };

  const getVariant = () => {
    switch (type) {
      case "error":
        return "destructive";
      default:
        return "default";
    }
  };

  const showToast = () => {
    toast({
      variant: getVariant(),
      title: (
        <div className="flex items-center gap-2">
          {getIcon()}
          <span>{title}</span>
        </div>
      ),
      description: message,
      action: action ? (
        <ToastAction altText={action.label} onClick={action.onClick}>
          {action.label}
        </ToastAction>
      ) : undefined,
      duration: duration,
    });
  };

  // Component for demonstration purposes - in real usage, you would call showToast() from other components
  React.useEffect(() => {
    // Auto-show toast when component mounts (for demo purposes)
    showToast();
  }, []);

  // This component doesn't render anything directly
  // It's a utility component that shows toasts
  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h3 className="text-lg font-medium mb-2">Notification Toast Demo</h3>
      <p className="text-gray-600 mb-4">
        This component triggers toast notifications.
      </p>
      <button
        onClick={showToast}
        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
      >
        Show {type} Toast
      </button>
    </div>
  );
};

export default NotificationToast;
