import { Head, usePage, Link } from '@inertiajs/react';
import { MainLayout } from '@/layouts/site/main-layout';
import { ProductGrid } from '@/components/products/product-grid';
import { PromotionalSlider } from '@/components/ui/promotional-slider';
import { TrustIndicators } from '@/components/ui/trust-indicator';
import { type Product } from '@/components/products/product-card';
import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, Star, ShoppingBag, TrendingUp } from 'lucide-react';

interface PromotionalSlide {
    id: number;
    title: string;
    description: string;
    buttonText: string;
    image: string;
    color: string;
}

interface TrustIndicator {
    id: string;
    text: string;
    icon: React.ReactNode;
}

interface Seller {
    id: number;
    name: string;
    description: string;
    logo: string;
    banner: string;
    slug: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    product_count: number;
    total_sales: number;
    average_rating: number;
}

interface Props {
    products: Product[];
    promotionalSlides?: PromotionalSlide[];
    trustIndicators?: TrustIndicator[];
    categories?: string[];
    topStores?: Seller[];
}

const defaultPromotionalSlides: PromotionalSlide[] = [
    {
        id: 1,
        title: "Summer Sale",
        description: "Get up to 50% off on selected summer items",
        buttonText: "Shop Now",
        image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=1600&auto=format&fit=crop",
        color: "from-blue-500/20 to-purple-500/20"
    },
    {
        id: 2,
        title: "New Arrivals",
        description: "Check out our latest collection of minimal designs",
        buttonText: "Explore",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format&fit=crop",
        color: "from-orange-500/20 to-amber-500/20"
    },
    {
        id: 3,
        title: "Free Shipping",
        description: "Free worldwide shipping on all orders over $100",
        buttonText: "Learn More",
        image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1600&auto=format&fit=crop",
        color: "from-green-500/20 to-emerald-500/20"
    },
];

const defaultTrustIndicators: TrustIndicator[] = [
    {
        id: "free-shipping",
        text: "Free Shipping",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-primary">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
        )
    },
    {
        id: "secure-payments",
        text: "Secure Payments",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-primary">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
        )
    },
    {
        id: "30-day-returns",
        text: "30-Day Returns",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-primary">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
        )
    },
    {
        id: "premium-quality",
        text: "Premium Quality",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-primary">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
        )
    },
];

export default function Welcome() {
    const { products = [], promotionalSlides, trustIndicators, categories = [], topStores = [] } =
        usePage().props as unknown as Props;

    const slides = promotionalSlides || defaultPromotionalSlides;
    const indicators = trustIndicators || defaultTrustIndicators;
    const safeTopStores = Array.isArray(topStores) ? topStores : [];

    // Use useMemo to prevent recreating this array on every render
    const safeProducts = useMemo(() => {
        return Array.isArray(products) ? products : [];
    }, [products]);
    
    const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);

    useEffect(() => {
        if (categories && categories.length > 0) {
            setUniqueCategories(['All', ...categories]);
        } else {
            const extractedCategories = Array.from(
                new Set(safeProducts.map(product => product.category))
            );
            setUniqueCategories(['All', ...extractedCategories]);
        }
    }, [safeProducts, categories]);

    return (
        <MainLayout>
            <Head title="NEXU - Minimal e-Commerce" />

            <PromotionalSlider slides={slides} />

            <TrustIndicators indicators={indicators} />

            <div className="container mx-auto px-4 py-12">
                {/* Top Stores Section */}
                {safeTopStores.length > 0 && (
                    <div className="mb-12">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">Top Stores</h2>
                            <Link href={route('sellers.index')} className="text-primary hover:underline">
                                View All Stores
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {safeTopStores.map((store, index) => (
                                <Card key={store.id} className="overflow-hidden h-full">
                                    <div className="relative">
                                        <div className="h-32 w-full overflow-hidden bg-muted">
                                            {store.banner ? (
                                                <img
                                                    src={store.banner}
                                                    alt={store.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <div className="h-full w-full bg-gradient-to-r from-primary/10 to-secondary/10"></div>
                                            )}
                                        </div>
                                        <div className="absolute -bottom-6 left-4 z-10">
                                            <div className="relative">
                                                <Avatar className="h-16 w-16 border-4 border-background shadow">
                                                    <AvatarImage src={store.logo} alt={store.name} />
                                                    <AvatarFallback>{store.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                                </Avatar>
                                                <Badge
                                                    variant="default"
                                                    className="absolute -top-2 -right-2 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow overflow-hidden"
                                                >
                                                    {index + 1}
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>

                                    <CardContent className="pt-8 pb-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-semibold truncate">{store.name}</h3>
                                            <div className="flex items-center space-x-1 text-amber-500">
                                                <Star className="h-4 w-4 fill-current" />
                                                <span>{store.average_rating.toFixed(1)}</span>
                                            </div>
                                        </div>

                                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{store.description}</p>

                                        <div className="flex justify-between items-center mt-auto">
                                            <div className="flex gap-3">
                                                <div className="flex items-center text-xs text-muted-foreground">
                                                    <ShoppingBag className="h-3.5 w-3.5 mr-1" />
                                                    <span>{store.product_count}</span>
                                                </div>
                                                <div className="flex items-center text-xs text-muted-foreground">
                                                    <TrendingUp className="h-3.5 w-3.5 mr-1" />
                                                    <span>{store.total_sales}</span>
                                                </div>
                                            </div>

                                            <Button size="sm" variant="outline" asChild className="ml-auto">
                                                <Link href={route('sellers.show', { slug: store.slug })}>
                                                    Visit Store
                                                </Link>
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}

                {/* Category filters */}
                <div className="mb-8">
                    <h2 className="mb-4 text-2xl font-bold">Categories</h2>
                    <div className="flex flex-wrap gap-2">
                        {uniqueCategories.map((category) => (
                            <Link
                                key={category}
                                href={category === 'All'
                                    ? route('products.index')
                                    : route('products.index', { category })
                                }
                                className="inline-flex items-center"
                            >
                                <Button
                                    variant="outline"
                                    className="rounded-full"
                                >
                                    {category}
                                    <ChevronRight className="ml-1 h-4 w-4" />
                                </Button>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Featured Products</h2>
                    <Link href={route('products.index')} className="text-primary hover:underline">
                        View All
                    </Link>
                </div>

                <ProductGrid
                    products={safeProducts}
                    initialVisibleCount={12}
                    showInfiniteScroll={true}
                />
            </div>
        </MainLayout>
    );
}
