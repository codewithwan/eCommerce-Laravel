import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Plus, Minus } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface CartItemProps {
  id: number;
  productId: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  options: Record<string, string>;
  onUpdateQuantity: (itemId: number, newQuantity: number) => void;
  onRemove: (itemId: number) => void;
}

export function CartItem({
  id,
  name,
  price,
  image,
  quantity,
  options,
  onUpdateQuantity,
  onRemove
}: CartItemProps) {
  return (
    <TableRow>
      <TableCell>
        <div className="h-16 w-16 rounded overflow-hidden">
          <img 
            src={`${image}?w=100&h=100&fit=crop`} 
            alt={name} 
            className="h-full w-full object-cover"
          />
        </div>
      </TableCell>
      <TableCell>
        <div>
          <div className="font-medium">{name}</div>
          {Object.entries(options).length > 0 && (
            <div className="text-sm text-muted-foreground mt-1">
              {Object.entries(options).map(([key, value]) => (
                <div key={key}>{key}: {value}</div>
              ))}
            </div>
          )}
        </div>
      </TableCell>
      <TableCell>{formatCurrency(price)}</TableCell>
      <TableCell>
        <div className="flex items-center space-x-1">
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8" 
            onClick={() => onUpdateQuantity(id, quantity - 1)}
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => onUpdateQuantity(id, parseInt(e.target.value) || 1)}
            className="w-14 h-8 text-center"
          />
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8" 
            onClick={() => onUpdateQuantity(id, quantity + 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
      <TableCell className="text-right font-medium">
        {formatCurrency(price * quantity)}
      </TableCell>
      <TableCell>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 text-destructive"
          onClick={() => onRemove(id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
