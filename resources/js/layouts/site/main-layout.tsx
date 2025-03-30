import { type SharedData } from '@/types';
import { usePage, Head } from '@inertiajs/react';
import { useState, useEffect, ReactNode } from 'react';
import { SiteHeader } from '@/layouts/site/site-header';
import { SiteFooter } from '@/layouts/site/site-footer';

const SITE_NAME = import.meta.env.SITE_NAME || 'NEXU';

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export function MainLayout({ 
  children, 
  title = SITE_NAME, 
  searchQuery = "", 
  onSearchChange 
}: MainLayoutProps) {
  const { auth } = usePage<SharedData>().props;
  const [cartItemCount, setCartItemCount] = useState(0);
  
  // Get cart item count on mount and update when cart changes
  useEffect(() => {
    const getCartItemCount = () => {
      try {
        const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartItemCount(cartItems.length);
      } catch (error) {
        console.error('Error reading cart data:', error);
        setCartItemCount(0);
      }
    };
    
    // Initial cart count
    getCartItemCount();
    
    // Listen for storage events to update cart count
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'cart') {
        getCartItemCount();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Custom event for updating cart from within the app
    const handleCartUpdate = () => getCartItemCount();
    window.addEventListener('cartUpdated', handleCartUpdate);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);
  
  return (
    <>
      <Head title={title}>
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
      </Head>
      
      <div className="min-h-screen bg-background text-foreground">
        {/* Header */}
        <SiteHeader 
          siteName={SITE_NAME}
          isAuthenticated={!!auth.user}
          userRole={auth.user?.role || ''}
          userName={auth.user?.name || ''}
          userAvatar={auth.user?.profile_photo_url || ''}
          dashboardRoute={route('dashboard')}
          loginRoute={route('login')}
          registerRoute={route('register')}
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          cartItemCount={cartItemCount}
        />
        
        {/* Main Content */}
        {children}
        
        {/* Footer */}
        <SiteFooter siteName={SITE_NAME} />
      </div>
    </>
  );
}
