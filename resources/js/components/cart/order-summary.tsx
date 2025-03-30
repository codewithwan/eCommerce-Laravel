import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  total: number;
  onCheckout: () => void;
  isEmpty: boolean;
  selectedItemCount?: number;
  totalItemCount?: number;
}

export function OrderSummary({
  subtotal,
  shipping,
  total,
  onCheckout,
  isEmpty,
  selectedItemCount,
  totalItemCount,
}: OrderSummaryProps) {
  const formattedSubtotal = formatCurrency(subtotal);
  const formattedTotal = formatCurrency(total);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent>
        {selectedItemCount !== undefined && totalItemCount !== undefined && (
          <p className="text-sm text-muted-foreground mb-4">
            {selectedItemCount} of {totalItemCount} items selected for checkout
          </p>
        )}
        <div className="space-y-1.5">
          <div className="flex justify-between">
            <span className="font-medium">Subtotal</span>
            <span>{formattedSubtotal}</span>
          </div>
          <div className="border-t my-2 pt-2 flex justify-between font-bold">
            <span>Total</span>
            <span>{formattedTotal}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          size="lg" 
          onClick={onCheckout} 
          disabled={isEmpty}
        >
          Proceed to Checkout
        </Button>
      </CardFooter>
    </Card>
  );
}
