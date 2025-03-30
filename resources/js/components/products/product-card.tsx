import { Link } from "@inertiajs/react";

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
    return (
        <Link 
            href={route('product.detail', { id: product.id })}
            className="group overflow-hidden rounded-lg border bg-background p-3 transition-all hover:shadow-md"
        >
            <div className="aspect-square overflow-hidden rounded-md bg-muted">
                <img 
                    src={`${product.image}?w=300&h=300&fit=crop`} 
                    alt={product.name} 
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" 
                />
            </div>
            <div className="mt-3 space-y-1">
                <h3 className="font-medium">{product.name}</h3>
                <div className="text-sm text-muted-foreground">{product.category}</div>
                <div className="flex items-center justify-between">
                    <span className="font-semibold text-primary">${product.price.toFixed(2)}</span>
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
