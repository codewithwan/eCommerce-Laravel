import { Link } from "@inertiajs/react";
import { useState } from "react";
import { ImageOff } from "lucide-react";
import { formatCurrency } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Product } from './product-card';

interface ProductListItemProps {
    product: Product & {
        description?: string;
    };
}

export function ProductListItem({ product }: ProductListItemProps) {
    const [imageError, setImageError] = useState(false);
    
    const handleImageError = () => {
        setImageError(true);
    };
    
    return (
        <Card className="overflow-hidden">
            <div className="flex flex-col sm:flex-row">
                <div className="aspect-square w-full sm:w-48 overflow-hidden">
                    {!imageError ? (
                        <img
                            src={`${product.image}?w=300&h=300&fit=crop`}
                            alt={product.name}
                            className="h-full w-full object-cover"
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
                <CardContent className="flex-1 p-4">
                    <div className="flex flex-col h-full justify-between gap-2">
                        <div>
                            <h3 className="font-medium">{product.name}</h3>
                            <div className="mt-1 flex items-center gap-2">
                                <span className="text-amber-500">
                                    {typeof product.rating === 'number' 
                                        ? product.rating.toFixed(1) 
                                        : parseFloat(String(product.rating || 0)).toFixed(1)} ★
                                </span>
                                <span className="text-sm text-muted-foreground">({product.soldCount} sold)</span>
                                {product.category && (
                                    <>
                                        <span className="text-sm text-muted-foreground">•</span>
                                        <span className="text-sm text-muted-foreground">{product.category}</span>
                                    </>
                                )}
                            </div>
                            {product.description && (
                                <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                                    {product.description}
                                </p>
                            )}
                            {!product.description && (
                                <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                                    No description available.
                                </p>
                            )}
                        </div>
                        <div className="mt-auto flex flex-wrap items-end justify-between gap-4">
                            <div className="flex flex-col">
                                <span className="text-xl font-bold text-primary">{formatCurrency(product.price)}</span>
                                
                                {product.sellerName && (
                                    <Link
                                        href={route('sellers.show', { slug: product.sellerSlug })}
                                        className="text-xs text-muted-foreground hover:text-primary"
                                    >
                                        {product.sellerName}
                                    </Link>
                                )}
                            </div>
                            <Button size="sm" asChild>
                                <Link href={route('products.show', { id: product.id })}>
                                    See Product
                                </Link>
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </div>
        </Card>
    );
} 