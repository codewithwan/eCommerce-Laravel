import { Button } from "@/components/ui/button";
import { ProductCard, type Product } from "./product-card";

interface ProductGridProps {
    products: Product[];
    visibleCount: number;
    onLoadMore?: () => void;
}

export function ProductGrid({ products, visibleCount, onLoadMore }: ProductGridProps) {
    const displayedProducts = products.slice(0, visibleCount);
    
    return (
        <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                {displayedProducts.map((product) => (
                    <ProductCard 
                        key={product.id} 
                        product={product}
                    />
                ))}
            </div>
            
            {/* Load More Button */}
            {visibleCount < products.length && (
                <div className="mt-10 flex justify-center">
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={onLoadMore}
                        className="px-8"
                    >
                        Load More Products
                    </Button>
                </div>
            )}
        </>
    );
}
