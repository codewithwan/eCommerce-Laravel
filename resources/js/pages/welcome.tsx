import { Head, usePage, Link } from '@inertiajs/react';
import { MainLayout } from '@/layouts/site/main-layout';
import { ProductGrid } from '@/components/products/product-grid';
import { PromotionalSlider } from '@/components/ui/promotional-slider';
import { TrustIndicators } from '@/components/ui/trust-indicator';
import { type Product } from '@/components/products/product-card';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

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

interface Props {
    products: Product[];
    promotionalSlides?: PromotionalSlide[];
    trustIndicators?: TrustIndicator[];
    categories?: string[];
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
    const { products = [], promotionalSlides, trustIndicators, categories = [] } =
        usePage().props as unknown as Props;

    const safeProducts = Array.isArray(products) ? products : [];
    const slides = promotionalSlides || defaultPromotionalSlides;
    const indicators = trustIndicators || defaultTrustIndicators;
    
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
