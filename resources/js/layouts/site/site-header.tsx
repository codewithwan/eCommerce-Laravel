import { Link } from '@inertiajs/react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>
                            {cartItemCount > 0 && (
                                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                                    {cartItemCount}
                                </span>
                            )}
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
