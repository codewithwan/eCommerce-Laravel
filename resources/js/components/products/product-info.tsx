import { useState, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type ProductExtended } from '@/data/mock-data';

interface ProductInfoProps {
  product: ProductExtended;
  onAddToCart: (quantity: number, selectedOptions?: Record<string, string>) => void;
}

export function ProductInfo({ product, onAddToCart }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  useEffect(() => {
    if (product.options) {
      const initialOptions: Record<string, string> = {};
      product.options.forEach(option => {
        if (option.values.length > 0) {
          initialOptions[option.name] = option.values[0];
        }
      });
      setSelectedOptions(initialOptions);
    }
  }, [product.options]);

  // Increase quantity
  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  // Decrease quantity
  const decreaseQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };
  
  // Handle option change
  const handleOptionChange = (optionName: string, value: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [optionName]: value
    }));
  };
  
  // Handle add to cart
  const handleAddToCart = () => {
    onAddToCart(quantity, selectedOptions);
  };

  return (
    <div className="flex flex-col space-y-4">
      <Badge variant="outline" className="w-fit">
        {product.category}
      </Badge>
      
      <h1 className="text-3xl font-bold">{product.name}</h1>
      
      <div className="flex items-center space-x-2">
        <div className="flex items-center text-amber-500">
          <span className="text-lg">★</span>
          <span className="ml-1 text-base">{product.rating.toFixed(1)}</span>
        </div>
        <div className="text-sm text-muted-foreground">
          ({product.soldCount} sold)
        </div>
      </div>
      
      <div className="text-xl font-bold text-primary">${product.price.toFixed(2)}</div>
      
      <div className="pt-4">
        <p className="text-sm text-muted-foreground">Seller</p>
        <div className="flex items-center space-x-2 pt-1">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            {product.sellerName.charAt(0)}
          </div>
          <div>
            <p className="font-medium">{product.sellerName}</p>
            <p className="text-xs text-muted-foreground">Verified Seller</p>
          </div>
        </div>
      </div>
      
      {/* Product Options */}
      {product.options && product.options.length > 0 && (
        <div className="space-y-4 pt-4">
          {product.options.map((option) => (
            <div key={option.name}>
              <h3 className="mb-2 text-sm font-medium">{option.name}</h3>
              <div className="flex flex-wrap gap-2">
                {option.name.toLowerCase() === 'color' ? (
                  // Color option with visual swatches
                  <div className="flex flex-wrap gap-2">
                    {option.values.map((value) => {
                      const isSelected = selectedOptions[option.name] === value;
                      return (
                        <button
                          key={value}
                          className={`h-8 w-8 rounded-full border-2 ${isSelected ? 'border-primary' : 'border-transparent'}`}
                          style={{ 
                            backgroundColor: value.toLowerCase(),
                            outline: 'none',
                            boxShadow: isSelected ? '0 0 0 2px rgba(0,0,0,0.1)' : 'none',
                          }}
                          onClick={() => handleOptionChange(option.name, value)}
                          aria-label={value}
                        >
                          {isSelected && (
                            <span className="flex h-full w-full items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white" style={{ filter: 'drop-shadow(0px 0px 1px rgba(0,0,0,0.5))' }}>
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  // Other options with button selection
                  <div className="flex flex-wrap gap-2">
                    {option.values.map((value) => (
                      <button
                        key={value}
                        className={`rounded-md border px-3 py-1 text-sm ${
                          selectedOptions[option.name] === value
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-muted bg-background'
                        }`}
                        onClick={() => handleOptionChange(option.name, value)}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Quantity Selector */}
      <div className="flex items-center space-x-4 pt-4">
        <span className="text-sm font-medium">Quantity:</span>
        <div className="flex items-center">
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8 rounded-r-none"
            onClick={decreaseQuantity}
          >
            <span className="text-lg">-</span>
          </Button>
          <div className="flex h-8 w-12 items-center justify-center border-y">
            {quantity}
          </div>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8 rounded-l-none"
            onClick={increaseQuantity}
          >
            <span className="text-lg">+</span>
          </Button>
        </div>
      </div>
      
      {/* Add to Cart Button */}
      <div className="flex space-x-4 pt-4">
        <Button 
          className="flex-1" 
          variant="default"
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
        <Button variant="outline" className="flex-1">
          Buy Now
        </Button>
      </div>
    </div>
  );
}
