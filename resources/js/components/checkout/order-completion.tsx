import { CheckCircle } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface OrderCompletionProps {
  orderNumber: string;
  onContinueShopping: () => void;
  title?: string; 
  subtitle?: string;
  message?: string;
  buttonText?: string;
}

export function OrderCompletion({
  orderNumber,
  onContinueShopping,
  title = "Order Placed Successfully!",
  subtitle = "Thank you for your purchase.",
  message = "An email with your order details has been sent to your email address. You can also view your order status in your account dashboard.",
  buttonText = "Continue Shopping"
}: OrderCompletionProps) {
  return (
    <Card>
      <CardContent className="pt-6 text-center">
        <div className="mb-4">
          <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
        </div>
        <h3 className="text-2xl font-medium mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">
          {subtitle}
        </p>
        <div className="bg-muted p-4 rounded-md mb-6 inline-block mx-auto">
          <p className="font-medium">Order Number: <span className="text-primary">{orderNumber}</span></p>
        </div>
        <p className="text-sm text-muted-foreground mb-6">
          {message}
        </p>
        <Button onClick={onContinueShopping} className="w-full sm:w-auto">
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
}
