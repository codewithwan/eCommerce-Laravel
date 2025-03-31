import { Link } from '@inertiajs/react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShoppingBag, MessageCircle, ClipboardList, Bell, User, Menu, Search, X } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { router } from '@inertiajs/react';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose
} from "@/components/ui/sheet";

interface SiteHeaderProps {
    siteName: string;
    isAuthenticated: boolean;
    userRole?: string;
    userName?: string;
    userAvatar?: string;
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
    userRole = '',
    userName = '',
    userAvatar = '',
    dashboardRoute = '/dashboard',
    loginRoute = '/login',
    registerRoute = '/register',
    onSearchChange,
    searchQuery = '',
    cartItemCount = 0
}: SiteHeaderProps) {
    const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

    // Get initials for avatar fallback
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(part => part.charAt(0))
            .join('')
            .toUpperCase()
            .substring(0, 2);
    };

    const handleLogout = () => {
        router.post(route('logout'));
    };

    const MobileNavigation = () => (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-6">
                <SheetHeader >
                    <SheetTitle>{siteName}</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-4 px-2">
                    <div className="mb-4">
                        <Input
                            type="search"
                            placeholder="Search products..."
                            className="h-10 w-full"
                            value={searchQuery}
                            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                        />
                    </div>

                    <SheetClose asChild>
                        <Link href="/shopping-cart" className="flex items-center py-2">
                            <ShoppingBag className="mr-3 h-5 w-5" />
                            <span>Shopping Cart {cartItemCount > 0 && `(${cartItemCount})`}</span>
                        </Link>
                    </SheetClose>

                    <SheetClose asChild>
                        <Link href="/chat" className="flex items-center py-2">
                            <MessageCircle className="mr-3 h-5 w-5" />
                            <span>Chat</span>
                        </Link>
                    </SheetClose>

                    <SheetClose asChild>
                        <Link href="/order-history" className="flex items-center py-2">
                            <ClipboardList className="mr-3 h-5 w-5" />
                            <span>Order History</span>
                        </Link>
                    </SheetClose>

                    <SheetClose asChild>
                        <Link href="/notifications" className="flex items-center py-2">
                            <Bell className="mr-3 h-5 w-5" />
                            <span>Notifications</span>
                        </Link>
                    </SheetClose>

                    {isAuthenticated ? (
                        <>
                            <SheetClose asChild>
                                <Link href="/profile" className="flex items-center py-2">
                                    <User className="mr-3 h-5 w-5" />
                                    <span>Profile</span>
                                </Link>
                            </SheetClose>

                            <SheetClose asChild>
                                <Link href="/settings" className="flex items-center py-2">
                                    <span>Settings</span>
                                </Link>
                            </SheetClose>

                            <Button
                                variant="outline"
                                onClick={() => {
                                    setLogoutDialogOpen(true);
                                }}
                                className="mt-4"
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <div className="flex flex-col space-y-3 mt-4">
                            <SheetClose asChild>
                                <Button asChild variant="outline">
                                    <Link href={loginRoute}>Log in</Link>
                                </Button>
                            </SheetClose>
                            <SheetClose asChild>
                                <Button asChild>
                                    <Link href={registerRoute}>Register</Link>
                                </Button>
                            </SheetClose>
                        </div>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );

    return (
        <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="flex items-center">
                    <MobileNavigation />
                    <Link href="/" className="text-xl font-semibold">{siteName}</Link>
                </div>

                {/* Desktop Search */}
                <div className="hidden md:flex w-full max-w-sm items-center space-x-2 px-4 md:max-w-md">
                    <Input
                        type="search"
                        placeholder="Search products..."
                        className="h-9"
                        value={searchQuery}
                        onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                    />
                </div>

                {/* Mobile Search Toggle */}
                <div className="md:hidden flex flex-1 justify-end mr-4">
                    {mobileSearchOpen ? (
                        <div className="absolute inset-0 bg-background/95 z-20 flex items-center px-4">
                            <Input
                                type="search"
                                placeholder="Search products..."
                                className="h-9 w-full"
                                value={searchQuery}
                                autoFocus
                                onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                            />
                            <Button
                                variant="ghost"
                                size="icon"
                                className="ml-2"
                                onClick={() => setMobileSearchOpen(false)}
                            >
                                <X className="h-5 w-5" />
                            </Button>
                        </div>
                    ) : (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setMobileSearchOpen(true)}
                        >
                            <Search className="h-5 w-5" />
                        </Button>
                    )}
                </div>

                <div className="flex items-center gap-4">
                    {/* Shopping Cart - Visible on all screens */}
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

                    {/* Other icons - Hidden on mobile */}
                    <div className="hidden md:flex items-center gap-4">
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
                    </div>

                    {isAuthenticated ? (
                        userRole === 'user' ? (
                            // User profile dropdown for regular users
                            <div className="flex items-center gap-2">
                                <span className="hidden text-sm font-medium md:inline-block">
                                    {userName}
                                </span>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="rounded-full" aria-label="User menu">
                                            <Avatar>
                                                <AvatarImage src={userAvatar} alt={userName} />
                                                <AvatarFallback>{getInitials(userName)}</AvatarFallback>
                                            </Avatar>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem className="md:hidden">
                                            <span className="font-medium">{userName}</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Link href="/profile" className="w-full">Profile</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Link href="/settings" className="w-full">Settings</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onSelect={(e) => {
                                            e.preventDefault();
                                            setLogoutDialogOpen(true);
                                        }}>
                                            <span className="w-full text-left">Logout</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                <ConfirmationDialog
                                    open={logoutDialogOpen}
                                    onOpenChange={setLogoutDialogOpen}
                                    onConfirm={handleLogout}
                                    title="Logout Confirmation"
                                    description="Are you sure you want to log out of your account?"
                                    cancelText="Cancel"
                                    confirmText="Logout"
                                    variant="default"
                                />
                            </div>
                        ) : (
                            // Dashboard button for admin/seller
                            <Link href={dashboardRoute} className="hidden md:block">
                                <Button variant="default" size="sm">Dashboard</Button>
                            </Link>
                        )
                    ) : (
                        <div className="hidden md:flex gap-2">
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
