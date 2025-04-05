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
    sellerName?: string;
    sellerSlug?: string;
    rating: number;
    soldCount: number;
}

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const [imageError, setImageError] = useState(false);
    
    const handleImageError = () => {
        setImageError(true);
    };
    
    return (
        <Link 
            href={route('products.show', { id: product.id })}
            className="group flex h-full flex-col overflow-hidden rounded-lg border bg-background p-2 transition-all hover:shadow-md"
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
                            <ImageOff size={36} strokeWidth={1.5} />
                            <span className="mt-1 text-xs">No image</span>
                        </div>
                    </div>
                )}
            </div>
            <div className="mt-2 flex-grow space-y-1">
                <h3 className="line-clamp-1 text-sm font-medium">{product.name}</h3>
                <div className="line-clamp-1 text-xs text-muted-foreground">{product.category}</div>
                
                <div className="font-semibold text-primary">{formatCurrency(product.price)}</div>
                
                <div className="flex items-center justify-between">
                    <div 
                        className="line-clamp-1 text-xs text-muted-foreground max-w-[35%] hover:text-primary transition-colors"
                        onClick={(e) => {
                            if (product.sellerSlug) {
                                e.preventDefault();
                                e.stopPropagation();
                                window.location.href = route('sellers.show', { slug: product.sellerSlug });
                            }
                        }}
                    >
                        {product.sellerName || 'Shop'}
                    </div>
                    <div className="flex items-center text-amber-500">
                        <span className="text-xs">★</span>
                        <span className="ml-0.5 text-xs">
                            {typeof product.rating === 'number' 
                                ? product.rating.toFixed(1) 
                                : parseFloat(String(product.rating || 0)).toFixed(1)}
                        </span>
                        <span className="mx-1 text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{product.soldCount} sold</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
