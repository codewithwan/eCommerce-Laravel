import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { MainLayout } from '@/layouts/site/main-layout';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Grid, List, Filter, SlidersHorizontal } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { ProductCard } from '@/components/products/product-card';
import { ProductListItem } from '@/components/products/product-list-item';

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
    rating: number;
    sold_count: number;
    slug: string;
    is_active?: boolean;
    description?: string;
}

interface Seller {
    id: number;
    name: string;
    description: string;
    logo: string;
    banner: string;
    slug: string;
    is_active?: boolean;
    created_at?: string;
    updated_at?: string;
}

interface Props {
    seller: Seller;
    products: Product[];
}

export default function SellerProfile({ seller, products }: Props) {
    const safeProducts = Array.isArray(products) ? products : [];

    const categories = safeProducts.map(p => p.category).filter((c, i, arr) =>
        c && arr.indexOf(c) === i
    );

    const totalProducts = safeProducts.length;
    const averageRating = safeProducts.length > 0
        ? safeProducts.reduce((sum, p) => sum + (parseFloat(String(p.rating || 0))), 0) / totalProducts
        : 0;

    const mappedProducts = safeProducts.map(product => ({
        ...product,
        soldCount: product.sold_count,
        sellerName: seller.name,
        sellerSlug: seller.slug
    }));

    return (
        <MainLayout title={`${seller.name} - Store`}>
            <Head title={`${seller.name} - Store`} />

            <div className="container mx-auto py-8 px-4">
                <div className="mb-4">
                    <nav className="flex" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1 md:space-x-3">
                            <li className="inline-flex items-center">
                                <a href="/" className="text-sm text-muted-foreground hover:text-primary">Home</a>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <span className="mx-2 text-muted-foreground">/</span>
                                    <a href={route('sellers.index')} className="text-sm text-muted-foreground hover:text-primary">Store</a>
                                </div>
                            </li>
                            <li aria-current="page">
                                <div className="flex items-center">
                                    <span className="mx-2 text-muted-foreground">/</span>
                                    <span className="text-sm text-primary font-medium">{seller.name}</span>
                                </div>
                            </li>
                        </ol>
                    </nav>
                </div>

                <div className="flex h-full flex-1 flex-col gap-4 rounded-xl">
                    {/* Seller Header/Banner */}
                    <div className="border-sidebar-border/70 dark:border-sidebar-border overflow-hidden rounded-xl border bg-background">
                        <div className="relative h-48 w-full overflow-hidden">
                            {seller?.banner ? (
                                <img src={seller.banner} alt="Banner" className="h-full w-full object-cover" />
                            ) : (
                                <div className="h-full w-full bg-primary/10">
                                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                                </div>
                            )}

                            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-6 text-white">
                                <h1 className="text-3xl font-bold">{seller.name}</h1>
                                <p className="mt-2 max-w-3xl opacity-90">{seller.description}</p>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-between border-t border-border bg-muted/20 p-4">
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-muted-foreground">Product:</span>
                                    <span className="font-semibold">{totalProducts}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-muted-foreground">Rating:</span>
                                    <span className="font-semibold text-amber-500">{averageRating.toFixed(1) || "N/A"} ★</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-muted-foreground">Joined:</span>
                                    <span className="font-semibold">{new Date(seller.created_at || Date.now()).toLocaleDateString('id-ID', { year: 'numeric', month: 'long' })}</span>
                                </div>
                            </div>

                            <div className="mt-4 flex gap-2 sm:mt-0">
                                <Button variant="outline" size="sm">
                                    Chat with Seller
                                </Button>
                                <Button size="sm">
                                    Follow Store
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Products Section */}
                    <div className="space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <h2 className="text-2xl font-bold">Store Products</h2>

                            <div className="flex items-center gap-2">
                                <Tabs defaultValue="grid">
                                    <TabsList className="grid grid-cols-2 h-9 w-[120px]">
                                        <TabsTrigger value="grid" className="flex items-center gap-1">
                                            <Grid className="h-4 w-4" />
                                            <span className="sr-only">Grid</span>
                                        </TabsTrigger>
                                        <TabsTrigger value="list" className="flex items-center gap-1">
                                            <List className="h-4 w-4" />
                                            <span className="sr-only">List</span>
                                        </TabsTrigger>
                                    </TabsList>
                                </Tabs>

                                <Button variant="outline" size="sm" className="flex items-center gap-1">
                                    <Filter className="h-4 w-4" />
                                    <span>Filter</span>
                                </Button>

                                <Button variant="outline" size="sm" className="flex items-center gap-1">
                                    <SlidersHorizontal className="h-4 w-4" />
                                    <span>Sort</span>
                                </Button>
                            </div>
                        </div>

                        {categories.length > 0 && (
                            <div className="flex gap-2 overflow-x-auto pb-2">
                                <Button variant="secondary" size="sm" className="flex-shrink-0">
                                    All Categories
                                </Button>
                                {categories.map((category, index) => (
                                    <Button key={index} variant="outline" size="sm" className="flex-shrink-0">
                                        {category}
                                    </Button>
                                ))}
                            </div>
                        )}

                        <Separator />

                        {safeProducts.length === 0 ? (
                            <div className="rounded-lg border border-dashed p-8 text-center">
                                <h3 className="text-lg font-medium">No products</h3>
                                <p className="mt-1 text-muted-foreground">This store has no products to display.</p>
                            </div>
                        ) : (
                            <Tabs defaultValue="grid" className="w-full">
                                <TabsContent value="grid" className="mt-0">
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                                        {mappedProducts.map((product) => (
                                            <ProductCard key={product.id} product={product} />
                                        ))}
                                    </div>
                                </TabsContent>

                                <TabsContent value="list" className="mt-0">
                                    <div className="space-y-4">
                                        {mappedProducts.map((product) => (
                                            <ProductListItem key={product.id} product={product} />
                                        ))}
                                    </div>
                                </TabsContent>
                            </Tabs>
                        )}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
} 