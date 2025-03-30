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
import { mockProducts, type ProductExtended } from '@/data/mock-data';
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";

const SITE_NAME = import.meta.env.SITE_NAME || 'NEXU';

interface ProductDetailProps {
  productId: number;
}

export default function ProductDetail({ productId }: ProductDetailProps) {
  const [product, setProduct] = useState<ProductExtended | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [pendingCartItem, setPendingCartItem] = useState<{
    quantity: number;
    options?: Record<string, string>;
  } | null>(null);
  
  // Find product by ID from mock data
  useEffect(() => {
    const foundProduct = mockProducts.find(p => p.id === productId);
    setProduct(foundProduct || null);
    setLoading(false);
  }, [productId]);
  
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
          <Link href={route('home')}>
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
  
  // Function to open the confirmation dialog
  const confirmAddToCart = (quantity: number, selectedOptions?: Record<string, string>) => {
    setPendingCartItem({ quantity, options: selectedOptions });
    setIsAlertOpen(true);
  };
  
  // Function to handle the actual cart addition after confirmation
  const proceedAddToCart = () => {
    if (!pendingCartItem || !product) return;
    
    const { quantity, options } = pendingCartItem;
    
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
      options: options || {},
    };
    
    // Add to cart
    cartItems.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    
    // Dispatch custom event to notify about cart update
    window.dispatchEvent(new Event('cartUpdated'));
    
    // Show toast notification using sonner
    toast.success("Added to cart", {
      description: `${quantity} × ${product.name} added to your cart.`
    });
    
    if (options) {
      console.log('Selected options:', options);
    }
    
    // Reset pending cart item
    setPendingCartItem(null);
  };
  
  return (
    <MainLayout title={`${product.name} - ${SITE_NAME}`}>
      {/* Breadcrumbs */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link href={route('home')} className="hover:text-foreground">Home</Link>
            <span>/</span>
            <Link href={route('home', { category: product.category })} className="hover:text-foreground">{product.category}</Link>
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
          <ProductInfo product={product} onAddToCart={confirmAddToCart} />
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
