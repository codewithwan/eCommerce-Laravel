import { Link, usePage } from '@inertiajs/react';
import { MainLayout } from '@/layouts/site/main-layout';
import { ProductGrid } from '@/components/products/product-grid';
import { type Product } from '@/components/products/product-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { CategoryFilter } from '@/components/ui/category-filter';

const SITE_NAME = import.meta.env.SITE_NAME || 'NEXU';

interface Props {
  products: {
    data: Product[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    path: string;
    from: number;
    to: number;
  };
  filters: {
    category: string;
    search: string;
  };
  categories: string[];
}

export default function Products() {
  const { products, filters, categories = [] } = usePage().props as unknown as Props;
  const [searchQuery, setSearchQuery] = useState(filters.search || '');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = route('products.index', {
      category: filters.category !== 'All' ? filters.category : undefined,
      search: searchQuery
    });
  };

  const safeProducts = Array.isArray(products.data) ? products.data : [];
  const safeCategoryName = filters.category || 'All Products';

  return (
    <MainLayout title={`${safeCategoryName} - ${SITE_NAME}`}>

      {/* Breadcrumbs */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link href={route('home')} className="hover:text-foreground">Home</Link>
            <span>/</span>
            <span className="text-foreground">{safeCategoryName}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 grid gap-8 md:grid-cols-[250px_1fr]">
          {/* Sidebar with filters */}
          <div className="space-y-6">
            {/* Category filter */}
            <CategoryFilter
              categories={categories}
              currentCategory={filters.category}
              baseRoute="products.index"
            />
          </div>

          <div>
            {/* Search Bar */}
            <div className="mb-6">
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pr-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                  type="submit"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </form>
            </div>

            {/* Products */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h1 className="text-2xl font-bold">{safeCategoryName}</h1>
                <span className="text-sm text-muted-foreground">{products.total} products</span>
              </div>

              {safeProducts.length === 0 ? (
                <div className="flex h-32 items-center justify-center rounded-lg border border-dashed py-8 text-center">
                  <div>
                    <p className="font-medium">No products found</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Try adjusting your search or filter to find what you're looking for.
                    </p>
                  </div>
                </div>
              ) : (
                <ProductGrid products={safeProducts} />
              )}

              {/* Pagination */}
              {products.last_page > 1 && (
                <div className="mt-8 flex justify-center">
                  <div className="flex space-x-2">
                    {products.current_page > 1 && (
                      <Link
                        href={route('products.index', {
                          category: filters.category !== 'All' ? filters.category : undefined,
                          search: filters.search || undefined,
                          page: products.current_page - 1,
                        })}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-md border"
                      >
                        &larr;
                      </Link>
                    )}

                    {Array.from({ length: products.last_page }, (_, i) => i + 1).map((page) => (
                      <Link
                        key={page}
                        href={route('products.index', {
                          category: filters.category !== 'All' ? filters.category : undefined,
                          search: filters.search || undefined,
                          page,
                        })}
                        className={`inline-flex h-10 w-10 items-center justify-center rounded-md ${page === products.current_page
                            ? "bg-primary text-primary-foreground"
                            : "border"
                          }`}
                      >
                        {page}
                      </Link>
                    ))}

                    {products.current_page < products.last_page && (
                      <Link
                        href={route('products.index', {
                          category: filters.category !== 'All' ? filters.category : undefined,
                          search: filters.search || undefined,
                          page: products.current_page + 1,
                        })}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-md border"
                      >
                        &rarr;
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 