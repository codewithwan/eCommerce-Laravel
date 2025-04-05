import { useState } from 'react';
import { formatCurrency } from '@/lib/utils';
import { Button } from "@/components/ui/button";
import { ImageOff, Trash2, Plus, Minus, Store } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface CartItemProps {
  id: number;
  productId: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  options?: Record<string, string>;
  sellerName?: string;
  sellerSlug?: string;
  onUpdateQuantity: (id: number, newQuantity: number) => void;
  onRemove: (id: number) => void;
  checked?: boolean;
  onToggleSelect?: (id: number) => void;
}

export function CartItem({
  id,
  productId,
  name,
  price,
  image,
  quantity,
  options = {},
  sellerName,
  sellerSlug,
  onUpdateQuantity,
  onRemove,
  checked,
  onToggleSelect
}: CartItemProps) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const increaseQuantity = () => {
    onUpdateQuantity(id, quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      onUpdateQuantity(id, quantity - 1);
    }
  };

  const formattedOptions = Object.entries(options || {}).map(([key, value]) => (
    <span key={key} className="text-xs text-muted-foreground">
      {key}: {value}
    </span>
  ));

  return (
    <div className="relative flex items-start gap-4 border-b py-6">
      {/* Checkbox if select functionality is provided */}
      {onToggleSelect && (
        <div className="pt-1">
          <input
            type="checkbox"
            checked={checked}
            onChange={() => onToggleSelect(id)}
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
        </div>
      )}

      {/* Product Image */}
      <Link
        href={route('products.show', { id: productId })}
        className="flex-shrink-0 overflow-hidden rounded-md"
      >
        <div className="h-20 w-20 overflow-hidden rounded-md bg-muted">
          {!imageError ? (
            <img
              src={`${image}?w=80&h=80&fit=crop`}
              alt={name}
              className="h-full w-full object-cover"
              onError={handleImageError}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <ImageOff className="h-8 w-8 text-muted-foreground" />
            </div>
          )}
        </div>
      </Link>

      {/* Product Details */}
      <div className="flex-1 space-y-1">
        <Link href={route('products.show', { id: productId })} className="hover:text-primary">
          <h3 className="font-medium">{name}</h3>
        </Link>

        {/* Seller Information */}
        {sellerName && (
          <div className="flex items-center text-sm text-muted-foreground">
            <Store className="mr-1 h-3 w-3" />
            {sellerSlug ? (
              <Link
                href={route('sellers.show', { slug: sellerSlug })}
                className="hover:text-primary hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                {sellerName}
              </Link>
            ) : (
              <span>{sellerName}</span>
            )}
          </div>
        )}

        {/* Product Options */}
        {formattedOptions.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {formattedOptions}
          </div>
        )}

        {/* Price */}
        <div className="font-medium text-primary">{formatCurrency(price)}</div>

        {/* Quantity Controls */}
        <div className="flex items-center space-x-2 pt-2">
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7 rounded-md"
            onClick={decreaseQuantity}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="w-8 text-center">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7 rounded-md"
            onClick={increaseQuantity}
          >
            <Plus className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="ml-2 h-7 w-7 rounded-md text-muted-foreground hover:text-destructive"
            onClick={() => onRemove(id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Total Price */}
      <div className="text-right font-medium">
        {formatCurrency(price * quantity)}
      </div>
    </div>
  );
}
