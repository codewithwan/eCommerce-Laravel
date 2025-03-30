import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CreditCard } from 'lucide-react';

interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  total: number;
  onCheckout: () => void;
  isEmpty: boolean;
}

export function OrderSummary({ subtotal, shipping, total, onCheckout, isEmpty }: OrderSummaryProps) {
  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
        <CardDescription>Review your order details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>Rp {subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Shipping</span>
            <span>Rp {shipping.toLocaleString()}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-medium text-lg">
            <span>Total</span>
            <span>Rp {total.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full flex items-center gap-2" 
          onClick={onCheckout}
          disabled={isEmpty}
        >
          <CreditCard className="h-4 w-4" />
          Proceed to Checkout
        </Button>
      </CardFooter>
    </Card>
  );
}
