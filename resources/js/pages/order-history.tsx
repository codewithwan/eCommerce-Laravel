import { type SharedData } from '@/types';
import { Head, usePage, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { SiteHeader } from '@/layouts/site/site-header';
import { SiteFooter } from '@/layouts/site/site-footer';
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockOrders, type Order, type OrderStatus } from '@/data/mock-data';
import { Package, Truck, CheckCircle, Clock, XCircle } from "lucide-react";
import { formatCurrency } from '@/lib/utils';

const SITE_NAME = import.meta.env.SITE_NAME || 'NEXU';

// Helper function to format date
const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

// Function to get status icon
const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
        case 'pending':
            return <Clock className="mr-2 h-4 w-4" />;
        case 'processing':
            return <Package className="mr-2 h-4 w-4" />;
        case 'shipped':
            return <Truck className="mr-2 h-4 w-4" />;
        case 'delivered':
            return <CheckCircle className="mr-2 h-4 w-4" />;
        case 'cancelled':
            return <XCircle className="mr-2 h-4 w-4" />;
        default:
            return null;
    }
};

// Function to get status badge variant
const getStatusVariant = (status: OrderStatus): "outline" | "secondary" | "destructive" | "default" => {
    switch (status) {
        case 'pending':
            return "outline";
        case 'processing':
            return "secondary";
        case 'shipped':
            return "default";
        case 'delivered':
            return "default";
        case 'cancelled':
            return "destructive";
        default:
            return "outline";
    }
};

export default function OrderHistory() {
    const { auth } = usePage<SharedData>().props;
    const [orders, setOrders] = useState<Order[]>([]);
    const [activeTab, setActiveTab] = useState<string>("all");
    const [cartItemCount, setCartItemCount] = useState(0);

    useEffect(() => {
        // In a real app, we would fetch orders from an API
        // For this demo, we'll use our mock data
        setOrders(mockOrders);

        // Get cart count from localStorage
        try {
            const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
            setCartItemCount(cartItems.length);
        } catch (error) {
            console.error('Error reading cart data:', error);
            setCartItemCount(0);
        }
    }, []);

    // Filter orders based on active tab
    const filteredOrders = activeTab === "all"
        ? orders
        : orders.filter(order => order.status === activeTab);

    return (
        <>
            <Head title={`Order History - ${SITE_NAME}`}>
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
                    onSearchChange={() => { }}
                    cartItemCount={cartItemCount}
                />

                {/* Main Content */}
                <main className="container mx-auto px-4 py-8">
                    <div className="mb-8 space-y-2">
                        <h1 className="text-3xl font-bold">Order History</h1>
                        <p className="text-muted-foreground">View and track your orders</p>
                    </div>

                    <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
                        <TabsList className="mb-4">
                            <TabsTrigger value="all">All Orders</TabsTrigger>
                            <TabsTrigger value="pending">Pending</TabsTrigger>
                            <TabsTrigger value="processing">Processing</TabsTrigger>
                            <TabsTrigger value="shipped">Shipped</TabsTrigger>
                            <TabsTrigger value="delivered">Delivered</TabsTrigger>
                            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                        </TabsList>

                        <TabsContent value={activeTab}>
                            {filteredOrders.length === 0 ? (
                                <div className="flex h-40 items-center justify-center rounded-lg border border-dashed p-8 text-center">
                                    <div>
                                        <p className="font-medium">No orders found</p>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            {activeTab === "all"
                                                ? "You haven't placed any orders yet."
                                                : `You don't have any ${activeTab} orders.`}
                                        </p>
                                        {activeTab === "all" && (
                                            <Button className="mt-4" asChild>
                                                <Link href={route('welcome')}>Shop Now</Link>
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {filteredOrders.map((order) => (
                                        <Card key={order.id} className="overflow-hidden">
                                            <CardHeader className="border-b bg-muted/40 pb-3">
                                                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                                                    <div>
                                                        <CardTitle className="text-lg">Order #{order.orderNumber}</CardTitle>
                                                        <CardDescription>{formatDate(order.date)}</CardDescription>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <Badge variant={getStatusVariant(order.status)} className="flex items-center">
                                                            {getStatusIcon(order.status)}
                                                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                        </Badge>
                                                        {order.trackingNumber && order.status !== 'cancelled' && (
                                                            <Button variant="outline" size="sm" asChild>
                                                                <Link href={`#tracking-${order.trackingNumber}`} className="text-xs">
                                                                    Track Order
                                                                </Link>
                                                            </Button>
                                                        )}
                                                    </div>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="p-0">
                                                <div className="divide-y">
                                                    {order.items.map((item) => (
                                                        <div key={item.id} className="flex items-start gap-4 p-4">
                                                            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                                                                <img
                                                                    src={item.image}
                                                                    alt={item.name}
                                                                    className="h-full w-full object-cover object-center"
                                                                />
                                                            </div>
                                                            <div className="flex flex-1 flex-col">
                                                                <div className="flex justify-between">
                                                                    <div>
                                                                        <h3 className="text-sm font-medium">{item.name}</h3>
                                                                        <p className="mt-1 text-xs text-muted-foreground">
                                                                            Qty: {item.quantity}
                                                                        </p>
                                                                        {item.options && Object.keys(item.options).length > 0 && (
                                                                            <div className="mt-1 text-xs text-muted-foreground">
                                                                                {Object.entries(item.options).map(([key, value]) => (
                                                                                    <span key={key}>{key}: {value} </span>
                                                                                ))}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    <p className="text-sm font-medium">
                                                                        {formatCurrency(item.price * item.quantity)}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </CardContent>
                                            <CardFooter className="flex justify-between border-t bg-muted/40 py-3">
                                                <div className="font-medium">
                                                    Shipping Address
                                                    <p className="mt-1 text-xs text-muted-foreground">
                                                        {order.shippingAddress.name}, {order.shippingAddress.address},<br />
                                                        {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode},<br />
                                                        {order.shippingAddress.country}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-sm text-muted-foreground">Total</span>
                                                    <p className="text-lg font-medium">{formatCurrency(order.total)}</p>
                                                </div>
                                            </CardFooter>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </TabsContent>
                    </Tabs>
                </main>

                {/* Footer */}
                <SiteFooter siteName={SITE_NAME} />
            </div>
        </>
    );
}
