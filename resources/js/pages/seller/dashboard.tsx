import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import { Plus, Pencil, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { StatsCard } from '@/components/ui/stats-card';
import { Package, ShoppingBag, CheckCircle, Star } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

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
}

interface Props {
    seller: Seller | null;
    products: Product[];
    stats?: {
        totalProducts: number;
        totalSales: number;
        activeProducts: number;
        averageRating: number;
    };
}

export default function Dashboard() {
    const { seller, products = [], stats } = usePage().props as unknown as Props;

    // Ensure products is always an array
    const safeProducts = Array.isArray(products) ? products : [];

    // Calculate summary statistics with safe handling of undefined values
    const totalProducts = safeProducts.length;

    const totalSales = safeProducts.reduce((sum, product) => {
        const soldCount = typeof product.sold_count === 'number'
            ? product.sold_count
            : parseInt(String(product.sold_count || '0'));
        return sum + soldCount;
    }, 0);

    let averageRating = 0;
    if (totalProducts > 0) {
        const totalRating = safeProducts.reduce((sum, product) => {
            const rating = typeof product.rating === 'number'
                ? product.rating
                : parseFloat(String(product.rating || '0'));
            return sum + rating;
        }, 0);
        averageRating = totalRating / totalProducts;
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Seller Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* Seller Profile Card */}
                <div className="border-sidebar-border/70 dark:border-sidebar-border overflow-hidden rounded-xl border bg-background">
                    <div className="h-32 w-full overflow-hidden">
                        {seller?.banner ? (
                            <img src={seller.banner} alt="Banner" className="h-full w-full object-cover" />
                        ) : (
                            <div className="h-full w-full bg-primary/10">
                                <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col md:flex-row p-6 gap-6">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-background -mt-12 bg-white">
                            {seller?.logo ? (
                                <img src={seller.logo} alt={seller.name} className="size-full object-cover" />
                            ) : (
                                <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                            )}
                        </div>
                        <div className="flex-1">
                            <h1 className="text-2xl font-bold">{seller?.name || 'Your Store'}</h1>
                            <p className="text-muted-foreground">{seller?.description || 'No description available'}</p>
                        </div>
                        <div className="flex items-center">
                            <Button variant="outline">Edit Profile</Button>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-4 mb-8">
                    <StatsCard
                        title="Total Products"
                        value={stats?.totalProducts || totalProducts}
                        icon={<Package className="h-5 w-5" />}
                        description="All products in your store"
                    />
                    <StatsCard
                        title="Total Sales"
                        value={stats?.totalSales || totalSales}
                        icon={<ShoppingBag className="h-5 w-5" />}
                        description="Products sold in total"
                    />
                    <StatsCard
                        title="Active Products"
                        value={stats?.activeProducts || safeProducts.filter(p => p.is_active).length}
                        icon={<CheckCircle className="h-5 w-5" />}
                        description="Currently active for sale"
                    />
                    <StatsCard
                        title="Average Rating"
                        value={(stats?.averageRating || averageRating).toFixed(1)}
                        icon={<Star className="h-5 w-5" />}
                        description="Based on customer reviews"
                        valueStyle="text-amber-500"
                    />
                </div>

                {/* Products Table */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold">Manage Products</h2>
                        <Link href={route('seller.products.create')}>
                            <Button size="sm">
                                <Plus className="mr-1 h-4 w-4" />
                                Add New Product
                            </Button>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {safeProducts.slice(0, 8).map((product) => (
                            <div key={product.id} className="relative overflow-hidden rounded-lg border bg-background shadow-sm">
                                <div className="absolute top-2 right-2 z-10">
                                    <Badge variant={product.is_active ? "default" : "secondary"}>
                                        {product.is_active ? "Active" : "Inactive"}
                                    </Badge>
                                </div>
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
                                <div className="p-4">
                                    <h3 className="font-semibold line-clamp-1">{product.name}</h3>
                                    <div className="mt-1 flex items-center justify-between">
                                        <span className="font-bold text-primary">{formatCurrency(product.price)}</span>
                                        <span className="text-sm text-muted-foreground">{product.sold_count} sold</span>
                                    </div>
                                    <div className="mt-4 flex gap-2">
                                        <Button size="sm" variant="outline" asChild className="flex-1">
                                            {(() => {
                                                try {
                                                    return (
                                                        <Link href={route('products.edit', { id: product.id })}>
                                                            <Pencil className="mr-1 h-3.5 w-3.5" />
                                                            Edit
                                                        </Link>
                                                    );
                                                } catch {
                                                    return (
                                                        <Link href={route('seller.products.edit', { id: product.id })}>
                                                            <Pencil className="mr-1 h-3.5 w-3.5" />
                                                            Edit
                                                        </Link>
                                                    );
                                                }
                                            })()}
                                        </Button>
                                        <Button size="sm" variant="default" asChild className="flex-1">
                                            <Link href={route('products.show', { id: product.id })}>
                                                <Eye className="mr-1 h-3.5 w-3.5" />
                                                View
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {safeProducts.length > 8 && (
                        <div className="mt-4 text-center">
                            {(() => {
                                try {
                                    return (
                                        <Link href={route('seller.products.index')}>
                                            <Button variant="outline">
                                                View All Products ({safeProducts.length})
                                            </Button>
                                        </Link>
                                    );
                                } catch {
                                    // Fallback if the route is not available
                                    return (
                                        <Button variant="outline">
                                            View All Products ({safeProducts.length})
                                        </Button>
                                    );
                                }
                            })()}
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
