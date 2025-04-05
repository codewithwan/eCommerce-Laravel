import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Grid, List, Filter, SlidersHorizontal } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { formatCurrency } from '@/lib/utils';

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
    is_active?: boolean;
    created_at?: string;
    updated_at?: string;
    product_count?: number;
    average_rating?: number;
}

interface Props {
    seller: Seller;
    products: Product[];
    categories?: string[];
}

export default function SellerStore({ seller, products, categories = [] }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Toko',
            href: '/seller/store',
        },
    ];
    
    const safeProducts = Array.isArray(products) ? products : [];
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${seller.name} - Toko`} />
            
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
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
                                <span className="text-sm font-medium text-muted-foreground">Produk:</span>
                                <span className="font-semibold">{seller.product_count || safeProducts.length}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-muted-foreground">Rating:</span>
                                <span className="font-semibold text-amber-500">{seller.average_rating?.toFixed(1) || "N/A"} ★</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-muted-foreground">Bergabung:</span>
                                <span className="font-semibold">{new Date(seller.created_at || Date.now()).toLocaleDateString('id-ID', { year: 'numeric', month: 'long' })}</span>
                            </div>
                        </div>
                        
                        <div className="mt-4 flex gap-2 sm:mt-0">
                            <Button variant="outline" size="sm">
                                Chat dengan Penjual
                            </Button>
                            <Button size="sm">
                                Ikuti Toko
                            </Button>
                        </div>
                    </div>
                </div>
                
                {/* Products Section */}
                <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <h2 className="text-2xl font-bold">Produk Toko</h2>
                        
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
                                Semua Kategori
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
                            <h3 className="text-lg font-medium">Tidak ada produk</h3>
                            <p className="mt-1 text-muted-foreground">Toko ini belum memiliki produk yang ditampilkan.</p>
                        </div>
                    ) : (
                        <Tabs defaultValue="grid" className="w-full">
                            <TabsContent value="grid" className="mt-0">
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                                    {safeProducts.map((product) => (
                                        <Card key={product.id} className="overflow-hidden">
                                            <div className="aspect-square w-full overflow-hidden">
                                                <img
                                                    src={product.image || "/placeholder.png"}
                                                    alt={product.name}
                                                    className="h-full w-full object-cover transition-all hover:scale-105"
                                                    onError={(e) => {
                                                        const target = e.target as HTMLImageElement;
                                                        target.src = "/placeholder.png";
                                                    }}
                                                />
                                            </div>
                                            <CardContent className="p-4">
                                                <h3 className="line-clamp-2 font-medium">{product.name}</h3>
                                                <div className="mt-2 flex items-center justify-between">
                                                    <span className="font-bold text-primary">{formatCurrency(product.price)}</span>
                                                    <span className="text-sm text-muted-foreground">{product.sold_count} terjual</span>
                                                </div>
                                                <div className="mt-1 flex items-center gap-1">
                                                    <span className="text-amber-500">{product.rating?.toFixed(1) || "0"}</span>
                                                    <span className="text-amber-500">★</span>
                                                </div>
                                                <div className="mt-4">
                                                    <Button size="sm" className="w-full" asChild>
                                                        <Link href={route('products.show', { id: product.id })}>
                                                            Lihat Detail
                                                        </Link>
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </TabsContent>
                            
                            <TabsContent value="list" className="mt-0">
                                <div className="space-y-4">
                                    {safeProducts.map((product) => (
                                        <Card key={product.id} className="overflow-hidden">
                                            <div className="flex flex-col sm:flex-row">
                                                <div className="aspect-square w-full sm:w-48 overflow-hidden">
                                                    <img
                                                        src={product.image || "/placeholder.png"}
                                                        alt={product.name}
                                                        className="h-full w-full object-cover"
                                                        onError={(e) => {
                                                            const target = e.target as HTMLImageElement;
                                                            target.src = "/placeholder.png";
                                                        }}
                                                    />
                                                </div>
                                                <CardContent className="flex-1 p-4">
                                                    <div className="flex flex-col h-full justify-between gap-2">
                                                        <div>
                                                            <h3 className="font-medium">{product.name}</h3>
                                                            <div className="mt-1 flex items-center gap-2">
                                                                <span className="text-amber-500">{product.rating?.toFixed(1) || "0"} ★</span>
                                                                <span className="text-sm text-muted-foreground">({product.sold_count} terjual)</span>
                                                            </div>
                                                            <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                                                                {product.description || "Tidak ada deskripsi produk."}
                                                            </p>
                                                        </div>
                                                        <div className="mt-auto flex flex-wrap items-end justify-between gap-4">
                                                            <span className="text-xl font-bold text-primary">{formatCurrency(product.price)}</span>
                                                            <Button size="sm" asChild>
                                                                <Link href={route('products.show', { id: product.id })}>
                                                                    Lihat Detail
                                                                </Link>
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </TabsContent>
                        </Tabs>
                    )}
                </div>
            </div>
        </AppLayout>
    );
} 