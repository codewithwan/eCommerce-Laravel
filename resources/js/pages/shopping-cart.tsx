import { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { SiteHeader } from '@/layouts/site/site-header';
import { SiteFooter } from '@/layouts/site/site-footer';
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ShoppingBag } from 'lucide-react';
import { toast } from "sonner";
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { CartItem } from '@/components/cart/cart-item';
import { EmptyCart } from '@/components/cart/empty-cart';
import { OrderSummary } from '@/components/cart/order-summary';
import { CartActions } from '@/components/cart/cart-actions';
import { RelatedProducts } from '@/components/products/related-products';
import { mockProducts } from '@/data/mock-data';

const SITE_NAME = import.meta.env.SITE_NAME || 'NEXU';

interface CartItem {
  id: number;
  productId: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  options: Record<string, string>;
  category?: string;
}

export default function Cart() {
  const { auth } = usePage<SharedData>().props;
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    setLoading(false);
  }, []);

  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 50000 : 0;
  const total = subtotal + shipping;

  // Update cart item quantity
  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    const updatedItems = cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );

    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  };

  // Remove item from cart
  const removeItem = (itemId: number) => {
    const updatedItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));

    toast.info("Item removed", {
      description: "The item has been removed from your cart."
    });
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');

    toast.info("Cart cleared", {
      description: "All items have been removed from your cart."
    });
  };

  // Proceed to checkout
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty", {
        description: "Add items to your cart before proceeding to checkout."
      });
      return;
    }
    
    router.visit(route('checkout'));
  };

  // Get related products based on cart categories
  const getRelatedProducts = () => {
    const cartCategories = [...new Set(cartItems.map(item => item.category).filter(Boolean))];
    const cartProductIds = cartItems.map(item => item.productId);

    if (cartCategories.length === 0) return [];

    return mockProducts.filter(product =>
      cartCategories.includes(product.category) &&
      !cartProductIds.includes(product.id)
    ).slice(0, 6);
  };

  const relatedProducts = getRelatedProducts();

  return (
    <>
      <Head title={`Shopping Cart - ${SITE_NAME}`}>
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
      </Head>

      <div className="min-h-screen bg-background text-foreground flex flex-col">
        {/* Header */}
        <SiteHeader
          siteName={SITE_NAME}
          isAuthenticated={!!auth.user}
          dashboardRoute={route('dashboard')}
          loginRoute={route('login')}
          registerRoute={route('register')}
          searchQuery=""
          onSearchChange={() => { }}
          cartItemCount={cartItems.length}
        />

        {/* Breadcrumbs */}
        <div className="border-b">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Link href={route('welcome')} className="hover:text-foreground">Home</Link>
              <span>/</span>
              <span className="text-foreground">Shopping Cart</span>
            </div>
          </div>
        </div>

        <main className="container mx-auto px-4 py-8 flex-grow">
          <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <ShoppingBag className="h-8 w-8" />
            Shopping Cart
          </h1>

          {loading ? (
            <div className="text-center py-8">
              <div className="mb-4 text-xl">Loading your cart...</div>
            </div>
          ) : cartItems.length === 0 ? (
            <EmptyCart continuePath={route('welcome')} />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableCaption>Your current shopping cart items.</TableCaption>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">Product</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Quantity</TableHead>
                          <TableHead className="text-right">Subtotal</TableHead>
                          <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {cartItems.map((item) => (
                          <CartItem
                            key={item.id}
                            {...item}
                            onUpdateQuantity={updateQuantity}
                            onRemove={removeItem}
                          />
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <CartActions
                  onClearCart={clearCart}
                  continuePath={route('welcome')}
                />
              </div>

              <div>
                <OrderSummary
                  subtotal={subtotal}
                  shipping={shipping}
                  total={total}
                  onCheckout={handleCheckout}
                  isEmpty={cartItems.length === 0}
                />
              </div>
            </div>
          )}

          {/* Related Products Section */}
          {!loading && cartItems.length > 0 && relatedProducts.length > 0 && (
            <div className="mt-16 border-t pt-8">
              <h2 className="text-2xl font-bold mb-6">You might also like</h2>
              <RelatedProducts
                currentProductId={-1}
                categoryProducts={relatedProducts}
                maxCount={6}
              />
            </div>
          )}
        </main>

        {/* Footer */}
        <SiteFooter siteName={SITE_NAME} />
      </div>
    </>
  );
}
