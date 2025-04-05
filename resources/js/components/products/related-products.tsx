import { ProductGrid } from '@/components/products/product-grid';
import { type Product } from '@/components/products/product-card';

interface RelatedProductsProps {
  currentProductId: number;
  categoryProducts: Product[];
  maxCount?: number;
}

export function RelatedProducts({
  currentProductId,
  categoryProducts,
  maxCount = 6
}: RelatedProductsProps) {
  const relatedProducts = categoryProducts
    .filter(product => product.id !== currentProductId)
    .slice(0, maxCount);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <h2 className="mb-6 text-2xl font-semibold">Related Products</h2>
      <ProductGrid
        products={relatedProducts}
        initialVisibleCount={relatedProducts.length}
        showInfiniteScroll={false}
      />
    </div>
  );
}
