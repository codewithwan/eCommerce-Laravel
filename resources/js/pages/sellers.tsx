import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { MainLayout } from '@/layouts/site/main-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Star, ShoppingBag, TrendingUp, Users } from 'lucide-react';
import { Link } from '@inertiajs/react';

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
    product_count?: number;
    total_sales?: number;
    average_rating?: number;
}

interface Props {
    sellers: Seller[];
}

export default function Sellers({ sellers }: Props) {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<'rating' | 'products' | 'sales' | 'newest'>('rating');

    const safeSellers = Array.isArray(sellers) ? sellers : [];

    const enhancedSellers = safeSellers.map(seller => ({
        ...seller,
        product_count: seller.product_count || Math.floor(Math.random() * 50),
        total_sales: seller.total_sales || Math.floor(Math.random() * 500),
        average_rating: seller.average_rating || (Math.random() * 4 + 1).toFixed(1)
    }));

    const filteredSellers = enhancedSellers.filter(seller =>
        seller.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        seller.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedSellers = [...filteredSellers].sort((a, b) => {
        switch (sortBy) {
            case 'rating':
                return parseFloat(String(b.average_rating)) - parseFloat(String(a.average_rating));
            case 'products':
                return (b.product_count || 0) - (a.product_count || 0);
            case 'sales':
                return (b.total_sales || 0) - (a.total_sales || 0);
            case 'newest':
                return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            default:
                return 0;
        }
    });

    return (
        <MainLayout title="Sellers Leaderboard">
            <Head title="Sellers Leaderboard" />

            <div className="container mx-auto py-8 px-4">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold mb-2">Store Leaderboard</h1>
                    <div className="text-muted-foreground max-w-2xl mx-auto">
                        Discover the best sellers on our platform, ranked by ratings, products, and sales.
                    </div>
                </div>

                {/* Search and filter */}
                <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full sm:w-auto">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search stores..."
                            className="pl-10 w-full sm:w-80"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Tabs defaultValue="rating" className="w-full sm:w-auto" onValueChange={(value) => setSortBy(value as 'rating' | 'products' | 'sales' | 'newest')}>
                        <TabsList className="grid w-full sm:w-auto grid-cols-4">
                            <TabsTrigger value="rating" className="flex items-center gap-2">
                                <Star className="h-4 w-4" />
                                <span className="hidden sm:inline">Rating</span>
                            </TabsTrigger>
                            <TabsTrigger value="products" className="flex items-center gap-2">
                                <ShoppingBag className="h-4 w-4" />
                                <span className="hidden sm:inline">Products</span>
                            </TabsTrigger>
                            <TabsTrigger value="sales" className="flex items-center gap-2">
                                <TrendingUp className="h-4 w-4" />
                                <span className="hidden sm:inline">Sales</span>
                            </TabsTrigger>
                            <TabsTrigger value="newest" className="flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                <span className="hidden sm:inline">Newest</span>
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>

                {/* Leaderboard */}
                <div className="space-y-4">
                    {sortedSellers.length === 0 ? (
                        <Card>
                            <CardContent className="p-8 text-center">
                                <p className="text-muted-foreground">No sellers found matching your search criteria.</p>
                            </CardContent>
                        </Card>
                    ) : (
                        sortedSellers.map((seller, index) => (
                            <Card key={seller.id} className="overflow-hidden">
                                <div className="flex items-center p-4 sm:p-6">
                                    <div className="flex-shrink-0 mr-4">
                                        <div className="relative">
                                            <Avatar className="h-16 w-16 border-4 border-background">
                                                <AvatarImage src={seller.logo} alt={seller.name} />
                                                <AvatarFallback>{seller.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                            </Avatar>
                                            {index < 3 && (
                                                <div className="absolute -top-3 -left-3">
                                                    <Badge variant={index === 0 ? "default" : index === 1 ? "secondary" : "outline"} className="rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">
                                                        {index + 1}
                                                    </Badge>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex-grow min-w-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <h3 className="text-lg font-semibold truncate">{seller.name}</h3>
                                            <div className="flex items-center space-x-1 text-amber-500">
                                                <Star className="h-4 w-4 fill-current" />
                                                <span>{parseFloat(String(seller.average_rating)).toFixed(1)}</span>
                                            </div>
                                        </div>

                                        <p className="text-sm text-muted-foreground line-clamp-1">{seller.description}</p>

                                        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2">
                                            <div className="flex items-center text-xs text-muted-foreground">
                                                <ShoppingBag className="h-3.5 w-3.5 mr-1" />
                                                <span>{seller.product_count} Products</span>
                                            </div>
                                            <div className="flex items-center text-xs text-muted-foreground">
                                                <TrendingUp className="h-3.5 w-3.5 mr-1" />
                                                <span>{seller.total_sales} Sales</span>
                                            </div>
                                            <div className="flex items-center text-xs text-muted-foreground">
                                                <span>Joined {new Date(seller.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long' })}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex-shrink-0 ml-4">
                                        <Button asChild>
                                            <Link href={route('sellers.show', { slug: seller.slug })}>
                                                Visit Store
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </MainLayout>
    );
} 