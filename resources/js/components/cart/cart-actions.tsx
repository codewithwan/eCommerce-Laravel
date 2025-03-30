import { Button } from "@/components/ui/button";
import { Trash2 } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface CartActionsProps {
  onClearCart: () => void;
  continuePath: string;
}

export function CartActions({ onClearCart, continuePath }: CartActionsProps) {
  return (
    <div className="flex justify-between items-center mt-4">
      <Button variant="outline" onClick={onClearCart} className="gap-2">
        <Trash2 className="h-4 w-4" />
        Clear Cart
      </Button>
      <Link href={continuePath}>
        <Button variant="outline" className="gap-2">
          Continue Shopping
        </Button>
      </Link>
    </div>
  );
}
