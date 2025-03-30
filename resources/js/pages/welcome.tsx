import { useState } from 'react';
import { MainLayout } from '@/layouts/site/main-layout';
import { PromotionalSlider } from '@/components/ui/promotional-slider';
import { TrustIndicators } from '@/components/ui/trust-indicator';
import { ProductGrid } from '@/components/products/product-grid';
import { CategoryGrid } from '@/components/categories/category-grid';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockProducts, categories, promotionalSlides, trustIndicators } from '@/data/mock-data';

const SITE_NAME = import.meta.env.SITE_NAME || 'NEXU';

export default function Welcome() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [visibleProducts, setVisibleProducts] = useState(6);
    
    // Filter products based on category and search query
    const filteredProducts = mockProducts.filter(product => {
        const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });
    
    // Load more products handler
    const handleLoadMore = () => {
        setVisibleProducts(prev => Math.min(prev + 6, filteredProducts.length));
    };
    
    // Handle category click
    const handleCategoryClick = (category: string) => {
        setActiveCategory(category);
        // You could add scroll to products section or other behavior
    };
    
    // Handle promotional slide button click
    const handlePromotionalAction = (slide: typeof promotionalSlides[0]) => {
        console.log('Promotion clicked:', slide);
        // Handle promotional action (e.g., navigate to sale page)
    };
    
    return (
        <MainLayout 
            title={`${SITE_NAME} Shop`}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
        >
            {/* Promotional Slider */}
            <section className="relative overflow-hidden">
                <PromotionalSlider 
                    slides={promotionalSlides}
                    autoplayInterval={5000}
                    onButtonClick={handlePromotionalAction}
                />
            </section>
            
            {/* Trust Indicators */}
            <section className="border-b py-3">
                <TrustIndicators indicators={trustIndicators} />
            </section>
            
            <main className="container mx-auto px-4 py-6">
                {/* Category Tabs */}
                <Tabs defaultValue="All" className="mb-8 w-full" onValueChange={setActiveCategory} value={activeCategory}>
                    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                        <h1 className="text-2xl font-semibold">Products</h1>
                        <TabsList className="overflow-x-auto">
                            {categories.map((category) => (
                                <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
                            ))}
                        </TabsList>
                    </div>
                    
                    {/* Tab Contents */}
                    {categories.map((category) => (
                        <TabsContent key={category} value={category} className="mt-6">
                            {filteredProducts.length === 0 ? (
                                <div className="py-12 text-center">
                                    <h3 className="text-lg font-medium">No products found</h3>
                                    <p className="mt-2 text-muted-foreground">Try adjusting your search or filter to find what you're looking for.</p>
                                </div>
                            ) : (
                                <ProductGrid
                                    products={filteredProducts}
                                    visibleCount={visibleProducts}
                                    onLoadMore={handleLoadMore}
                                />
                            )}
                        </TabsContent>
                    ))}
                </Tabs>
            </main>
            
            {/* Featured Categories Section */}
            <section className="bg-muted py-10">
                <div className="container mx-auto px-4">
                    <h2 className="mb-6 text-2xl font-semibold">Browse Categories</h2>
                    <CategoryGrid 
                        categories={['Electronics', 'Apparel', 'Home Goods', 'Accessories']}
                        onCategoryClick={handleCategoryClick}
                    />
                </div>
            </section>
        </MainLayout>
    );
}
