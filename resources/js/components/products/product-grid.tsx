import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProductCard, type Product } from "./product-card";

interface ProductGridProps {
    products: Product[];
    initialVisibleCount?: number;
    showInfiniteScroll?: boolean;
}

export function ProductGrid({ 
    products, 
    initialVisibleCount = 6, 
    showInfiniteScroll = true
}: ProductGridProps) {
    const [visibleCount, setVisibleCount] = useState(initialVisibleCount);
    
    const displayedProducts = products.slice(0, visibleCount);
    
    const handleLoadMore = () => {
        setVisibleCount(prev => prev + 12);
    };
    
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                {displayedProducts.map((product) => (
                    <ProductCard 
                        key={product.id} 
                        product={product}
                    />
                ))}
            </div>
            
            {showInfiniteScroll && visibleCount < products.length && (
                <div className="mt-10 flex justify-center">
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={handleLoadMore}
                        className="px-8"
                    >
                        Show More Products ({visibleCount} of {products.length})
                    </Button>
                </div>
            )}
        </div>
    );
}
