import { type SharedData } from '@/types';
import { Head, usePage, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { MainLayout } from '@/layouts/site/main-layout';
import { Button } from "@/components/ui/button";
import { ProductImageGallery } from '@/components/products/product-image-gallery';
import { ProductInfo } from '@/components/products/product-info';
import { ProductTabs } from '@/components/products/product-tabs';
import { RelatedProducts } from '@/components/products/related-products';
import { toast } from "sonner";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { type Product } from '@/components/products/product-card';

const SITE_NAME = import.meta.env.SITE_NAME || 'NEXU';

interface ProductExtended extends Product {
  description: string;
  specifications: Record<string, string>;
  options?: Array<{
    name: string;
    values: string[];
  }>;
  seller?: {
    id: number;
    name: string;
    slug: string;
  };
  sellerName?: string;
  sellerSlug?: string;
}

interface ProductDetailProps {
  product: ProductExtended;
  relatedProducts: Product[];
  debug?: any;
}

export default function ProductDetail() {
  const { product, relatedProducts, debug } = usePage().props as unknown as ProductDetailProps;

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [pendingCartItem, setPendingCartItem] = useState<{
    quantity: number;
    options?: Record<string, string>;
  } | null>(null);

  useEffect(() => {
    if (product && product.options && !Array.isArray(product.options)) {
      console.warn('Product options is not an array:', product.options);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-4xl font-bold">Product Not Found</div>
          <p className="mb-8 text-lg text-muted-foreground">The product you're looking for doesn't exist or has been removed.</p>
          <Link href={route('home')}>
            <Button>Return to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const productImages = [
    `${product.image}?w=600&h=600&fit=crop`,
    `${product.image}?w=600&h=600&fit=crop&sat=-100`,
    `${product.image}?w=600&h=600&fit=crop&flip=h`, // Flipped version
    `${product.image}?w=600&h=600&fit=crop&blur=100`, // Blurred version
  ];

  const confirmAddToCart = (quantity: number, selectedOptions?: Record<string, string>) => {
    setPendingCartItem({ quantity, options: selectedOptions });
    setIsAlertOpen(true);
  };

  const proceedAddToCart = () => {
    if (!pendingCartItem || !product) return;

    const { quantity, options } = pendingCartItem;

    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');

    const cartItem = {
      id: Date.now(),
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
      options: options || {},
      sellerName: product.sellerName || (product.seller ? product.seller.name : ''),
      sellerSlug: product.sellerSlug || (product.seller ? product.seller.slug : ''),
    };

    cartItems.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(cartItems));

    window.dispatchEvent(new Event('cartUpdated'));

    toast.success("Added to cart", {
      description: `${quantity} × ${product.name} added to your cart.`
    });

    setPendingCartItem(null);
    setIsAlertOpen(false);
  };

  if (!product.sellerName && product.seller) {
    product.sellerName = product.seller.name;
  }

  if (!product.sellerSlug && product.seller) {
    product.sellerSlug = product.seller.slug;
  }

  return (
    <MainLayout title={`${product.name} - ${SITE_NAME}`}>

      {/* Breadcrumbs */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link href={route('home')} className="hover:text-foreground">Home</Link>
            <span>/</span>
            <Link href={route('products.index', { category: product.category })} className="hover:text-foreground">{product.category}</Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Detail */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Product Images */}
          <ProductImageGallery images={productImages} productName={product.name} />

          {/* Product Info */}
          <ProductInfo
            product={{
              ...product,
              sellerName: product.sellerName || ''
            }}
            onAddToCart={confirmAddToCart}
          />
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12">
          <ProductTabs product={product} />
        </div>

        {/* Related Products */}
        <RelatedProducts
          currentProductId={product.id}
          categoryProducts={relatedProducts}
        />
      </main>

      {/* Confirmation Dialog for Cart Addition */}
      <ConfirmationDialog
        open={isAlertOpen}
        onOpenChange={setIsAlertOpen}
        onConfirm={proceedAddToCart}
        title="Add to Cart"
        description={pendingCartItem ?
          `Are you sure you want to add ${pendingCartItem.quantity} × ${product?.name} to your cart?` :
          'Add this item to your cart?'
        }
        cancelText="Cancel"
        confirmText="Add to Cart"
      />
    </MainLayout>
  );
}
