import { Link } from '@inertiajs/react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShoppingBag, MessageCircle, ClipboardList, Bell } from "lucide-react";

interface SiteHeaderProps {
    siteName: string;
    isAuthenticated: boolean;
    dashboardRoute?: string;
    loginRoute?: string;
    registerRoute?: string;
    onSearchChange?: (query: string) => void;
    searchQuery?: string;
    cartItemCount?: number;
}

export function SiteHeader({ 
    siteName, 
    isAuthenticated, 
    dashboardRoute = '/dashboard',
    loginRoute = '/login',
    registerRoute = '/register',
    onSearchChange,
    searchQuery = '',
    cartItemCount = 0
}: SiteHeaderProps) {
    return (
        <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="text-xl font-semibold">{siteName}</Link>
                
                <div className="flex w-full max-w-sm items-center space-x-2 px-4 md:max-w-md">
                    <Input
                        type="search"
                        placeholder="Search products..."
                        className="h-9"
                        value={searchQuery}
                        onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                    />
                </div>
                
                <div className="flex items-center gap-4">
                    <Link href="/shopping-cart">
                        <Button variant="ghost" size="icon" aria-label="Shopping cart" className="relative">
                            <ShoppingBag className="h-5 w-5" />
                            {cartItemCount > 0 && (
                                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                                    {cartItemCount}
                                </span>
                            )}
                        </Button>
                    </Link>
                    
                    <Link href="/chat">
                        <Button variant="ghost" size="icon" aria-label="Chat" className="relative">
                            <MessageCircle className="h-5 w-5" />
                        </Button>
                    </Link>
                    
                    <Link href="/order-history">
                        <Button variant="ghost" size="icon" aria-label="Order History" className="relative">
                            <ClipboardList className="h-5 w-5" />
                        </Button>
                    </Link>
                    
                    <Link href="/notifications">
                        <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
                            <Bell className="h-5 w-5" />
                        </Button>
                    </Link>
                    
                    {isAuthenticated ? (
                        <Link href={dashboardRoute}>
                            <Button variant="default" size="sm">Dashboard</Button>
                        </Link>
                    ) : (
                        <div className="flex gap-2">
                            <Link href={loginRoute}>
                                <Button variant="ghost" size="sm">Log in</Button>
                            </Link>
                            <Link href={registerRoute}>
                                <Button variant="default" size="sm">Register</Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
