import { type SharedData } from '@/types';
import { Head, usePage, Link, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { SiteHeader } from '@/layouts/site/site-header';
import { SiteFooter } from '@/layouts/site/site-footer';
import { Button } from "@/components/ui/button";
import { ProductImageGallery } from '@/components/products/product-image-gallery';
import { ProductInfo } from '@/components/products/product-info';
import { ProductTabs } from '@/components/products/product-tabs';
import { RelatedProducts } from '@/components/products/related-products';
import { toast } from "sonner";
import { mockProducts, type ProductExtended } from '@/data/mock-data';

const SITE_NAME = import.meta.env.SITE_NAME || 'NEXU';

interface ProductDetailProps {
  productId: number;
}

export default function ProductDetail({ productId }: ProductDetailProps) {
  const { auth } = usePage<SharedData>().props;
  const [product, setProduct] = useState<ProductExtended | null>(null);
  const [loading, setLoading] = useState(true);
  const [cartItemCount, setCartItemCount] = useState(0);
  
  // Find product by ID from mock data
  useEffect(() => {
    const foundProduct = mockProducts.find(p => p.id === productId);
    setProduct(foundProduct || null);
    setLoading(false);
    
    // Get initial cart count
    getCartItemCount();
  }, [productId]);
  
  // Get cart item count from localStorage
  const getCartItemCount = () => {
    try {
      const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartItemCount(cartItems.length);
    } catch (error) {
      console.error('Error reading cart data:', error);
      setCartItemCount(0);
    }
  };
  
  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-4xl font-bold">Loading...</div>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-4xl font-bold">Product Not Found</div>
          <p className="mb-8 text-lg text-muted-foreground">The product you're looking for doesn't exist or has been removed.</p>
          <Link href={route('welcome')}>
            <Button>Return to Home</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  // For demo purposes, we'll use the main image and generate additional images
  const productImages = [
    `${product.image}?w=600&h=600&fit=crop`,
    `${product.image}?w=600&h=600&fit=crop&sat=-100`, // Desaturated version
    `${product.image}?w=600&h=600&fit=crop&flip=h`, // Flipped version
    `${product.image}?w=600&h=600&fit=crop&blur=100`, // Blurred version
  ];
  
  // Add to cart handler
  const handleAddToCart = (quantity: number, selectedOptions?: Record<string, string>) => {
    // Get existing cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Create cart item
    const cartItem = {
      id: Date.now(), // unique ID for cart item
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
      options: selectedOptions || {},
    };
    
    // Add to cart
    cartItems.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    
    // Update cart count
    setCartItemCount(cartItems.length);
    
    // Show toast notification using sonner
    toast.success("Added to cart", {
      description: `${quantity} × ${product.name} added to your cart.`
    });
    
    if (selectedOptions) {
      console.log('Selected options:', selectedOptions);
    }
  };
  
  return (
    <>
      <Head title={`${product.name} - ${SITE_NAME}`}>
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
      </Head>
      
      <div className="min-h-screen bg-background text-foreground">
        {/* Header */}
        <SiteHeader 
          siteName={SITE_NAME}
          isAuthenticated={!!auth.user}
          dashboardRoute={route('dashboard')}
          loginRoute={route('login')}
          registerRoute={route('register')}
          searchQuery=""
          onSearchChange={() => {}}
          cartItemCount={cartItemCount}
        />
        
        {/* Breadcrumbs */}
        <div className="border-b">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Link href={route('welcome')} className="hover:text-foreground">Home</Link>
              <span>/</span>
              <Link href={route('welcome', { category: product.category })} className="hover:text-foreground">{product.category}</Link>
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
            <ProductInfo product={product} onAddToCart={handleAddToCart} />
          </div>
          
          {/* Product Details Tabs */}
          <div className="mt-12">
            <ProductTabs product={product} />
          </div>
          
          {/* Related Products */}
          <RelatedProducts 
            currentProductId={product.id} 
            categoryProducts={mockProducts.filter(p => p.category === product.category)} 
          />
        </main>
        
        {/* Footer */}
        <SiteFooter siteName={SITE_NAME} />
      </div>
    </>
  );
}
