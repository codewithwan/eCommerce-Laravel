import { ShoppingBag } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from '@inertiajs/react';

interface EmptyCartProps {
  continuePath: string;
}

export function EmptyCart({ continuePath }: EmptyCartProps) {
  return (
    <div className="text-center py-12 border rounded-lg bg-muted/20">
      <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
      <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
      <p className="text-muted-foreground mb-6">Looks like you haven't added any products to your cart yet.</p>
      <Link href={continuePath}>
        <Button>Continue Shopping</Button>
      </Link>
    </div>
  );
}
