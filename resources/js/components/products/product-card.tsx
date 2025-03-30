import { Link } from "@inertiajs/react";
import { useState } from "react";
import { ImageOff } from "lucide-react";
import { formatCurrency } from '@/lib/utils';

export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
    sellerName: string;
    rating: number;
    soldCount: number;
}

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    // State to track if image failed to load
    const [imageError, setImageError] = useState(false);
    
    // Handle image load error
    const handleImageError = () => {
        setImageError(true);
    };
    
    return (
        <Link 
            href={route('product.detail', { id: product.id })}
            className="group overflow-hidden rounded-lg border bg-background p-3 transition-all hover:shadow-md"
        >
            <div className="aspect-square overflow-hidden rounded-md bg-muted">
                {!imageError ? (
                    <img 
                        src={`${product.image}?w=300&h=300&fit=crop`} 
                        alt={product.name} 
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={handleImageError}
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-muted">
                        <div className="flex flex-col items-center justify-center text-muted-foreground">
                            <ImageOff size={48} strokeWidth={1.5} />
                            <span className="mt-2 text-xs">Image unavailable</span>
                        </div>
                    </div>
                )}
            </div>
            <div className="mt-3 space-y-1">
                <h3 className="font-medium">{product.name}</h3>
                <div className="text-sm text-muted-foreground">{product.category}</div>
                
                {/* Using formatCurrency utility */}
                <div className="font-semibold text-primary">{formatCurrency(product.price)}</div>
                
                {/* Rating and sold count below price */}
                <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">{product.sellerName}</div>
                    <div className="flex items-center text-amber-500">
                        <span className="text-sm">★</span>
                        <span className="ml-1 text-xs">{product.rating}</span>
                        <span className="mx-1.5 text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{product.soldCount} sold</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
