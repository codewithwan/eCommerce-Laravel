import { useState, useEffect } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import { MainLayout } from '@/layouts/site/main-layout';
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ShoppingBag } from 'lucide-react';
import { toast } from "sonner";
import { CartItem } from '@/components/cart/cart-item';
import { EmptyCart } from '@/components/cart/empty-cart';
import { OrderSummary } from '@/components/cart/order-summary';
import { CartActions } from '@/components/cart/cart-actions';
import { RelatedProducts } from '@/components/products/related-products';
import { Checkbox } from "@/components/ui/checkbox";
import { type Product } from '@/components/products/product-card';

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
  sellerName?: string;
  sellerSlug?: string;
}

interface Props {
  suggestedProducts?: Product[];
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const { suggestedProducts = [] } = usePage().props as unknown as Props;

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const items = JSON.parse(savedCart);
      setCartItems(items);
      setSelectedItems(items.map((item: CartItem) => item.id));
    }
    setLoading(false);
  }, []);

  const subtotal = cartItems
    .filter(item => selectedItems.includes(item.id))
    .reduce((total, item) => total + (item.price * item.quantity), 0);
  const total = subtotal;

  const toggleItemSelection = (itemId: number) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const selectAllItems = () => {
    setSelectedItems(cartItems.map(item => item.id));
  };

  const deselectAllItems = () => {
    setSelectedItems([]);
  };

  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    const updatedItems = cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );

    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
    
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const removeItem = (itemId: number) => {
    const updatedItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
    
    window.dispatchEvent(new Event('cartUpdated'));

    toast.info("Item removed", {
      description: "The item has been removed from your cart."
    });
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
    
    window.dispatchEvent(new Event('cartUpdated'));

    toast.info("Cart cleared", {
      description: "All items have been removed from your cart."
    });
  };

  const handleCheckout = () => {
    const itemsToCheckout = cartItems.filter(item => selectedItems.includes(item.id));
    
    if (itemsToCheckout.length === 0) {
      toast.error("No items selected", {
        description: "Please select items to checkout."
      });
      return;
    }
    
    localStorage.setItem('checkoutItems', JSON.stringify(itemsToCheckout));
    router.visit(route('checkout'));
  };

  const relatedProducts = Array.isArray(suggestedProducts) ? suggestedProducts : [];

  return (
    <MainLayout title={`Shopping Cart - ${SITE_NAME}`}>
      <div className="border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link href={route('home')} className="hover:text-foreground">Home</Link>
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
          <EmptyCart continuePath={route('home')} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-0">
                  <div className="px-4 pt-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Checkbox 
                        id="select-all"
                        checked={selectedItems.length === cartItems.length}
                        onCheckedChange={() => {
                          if (selectedItems.length === cartItems.length) {
                            deselectAllItems();
                          } else {
                            selectAllItems();
                          }
                        }}
                      />
                      <label htmlFor="select-all" className="text-sm font-medium cursor-pointer">
                        Select All Items
                      </label>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {selectedItems.length} of {cartItems.length} items selected
                    </div>
                  </div>
                  <Table>
                    <TableCaption>Your current shopping cart items.</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]"></TableHead>
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
                          id={item.id}
                          productId={item.productId}
                          name={item.name}
                          price={item.price}
                          image={item.image}
                          quantity={item.quantity}
                          options={item.options}
                          sellerName={item.sellerName}
                          sellerSlug={item.sellerSlug}
                          onUpdateQuantity={updateQuantity}
                          onRemove={removeItem}
                          checked={selectedItems.includes(item.id)}
                          onToggleSelect={toggleItemSelection}
                        />
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <CartActions
                onClearCart={clearCart}
                continuePath={route('home')}
              />
            </div>

            <div>
              <OrderSummary
                subtotal={subtotal}
                shipping={0}
                total={total}
                onCheckout={handleCheckout}
                isEmpty={selectedItems.length === 0}
                selectedItemCount={selectedItems.length}
                totalItemCount={cartItems.length}
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
    </MainLayout>
  );
}
