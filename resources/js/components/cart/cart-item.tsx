import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

interface CartItemProps {
  id: number;
  productId: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  options?: Record<string, string>;
  isSelected: boolean;
  onToggleSelect: () => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

export function CartItem({
  id,
  name,
  price,
  image,
  quantity,
  options,
  isSelected,
  onToggleSelect,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) {
  const formattedPrice = formatCurrency(price);
  const subtotal = price * quantity;
  const formattedSubtotal = formatCurrency(subtotal);

  return (
    <TableRow className={!isSelected ? "opacity-70" : ""}>
      <TableCell>
        <Checkbox
          checked={isSelected}
          onCheckedChange={onToggleSelect}
        />
      </TableCell>
      <TableCell>
        <div className="w-20 h-20 relative">
          <img
            src={image}
            alt={name}
            className="object-cover w-full h-full rounded-md"
          />
        </div>
      </TableCell>
      <TableCell>
        <div>
          <h3 className="font-medium">{name}</h3>
          {options && Object.keys(options).length > 0 && (
            <div className="mt-1 text-sm text-muted-foreground">
              {Object.entries(options).map(([key, value]) => (
                <div key={key}>
                  <span className="font-medium">{key}:</span> {value}
                </div>
              ))}
            </div>
          )}
        </div>
      </TableCell>
      <TableCell>{formattedPrice}</TableCell>
      <TableCell>
        <div className="flex items-center space-x-1">
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={() => onUpdateQuantity(id, quantity - 1)}
            disabled={quantity <= 1}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="w-8 text-center">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={() => onUpdateQuantity(id, quantity + 1)}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </TableCell>
      <TableCell className="text-right">{formattedSubtotal}</TableCell>
      <TableCell>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-destructive"
          onClick={() => onRemove(id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
