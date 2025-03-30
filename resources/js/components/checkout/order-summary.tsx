import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ShippingCourier } from '@/data/shipping-options';

export interface CartItem {
    id: number;
    productId: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
    options: Record<string, string>;
    category?: string;
}

export interface AddressForm {
    fullName: string;
    phoneNumber: string;
    village: string;
    district: string;
    city: string;
    province: string;
    postalCode: string;
    notes: string;
}

interface PriceBreakdownProps {
    subtotal: number;
    shippingCost: number;
    total: number;
    selectedShipping: string;
    discount?: number;
    tax?: number;
    customFields?: Array<{ label: string; value: number; isBold?: boolean }>;
}

interface OrderSummaryProps {
    cartItems: CartItem[];
    priceBreakdown: PriceBreakdownProps;
    address?: AddressForm;
    isAddressComplete?: boolean;
    activeStep: string;
    selectedCourier?: string;
    shippingOptions?: ShippingCourier[];
    onEditAddress?: () => void;
    onEditShipping?: () => void;
    title?: string;
    description?: string;
    showDetailedItems?: boolean;
}

// Price breakdown component that can be reused
function PriceBreakdown({
    subtotal,
    shippingCost,
    total,
    selectedShipping,
    discount = 0,
    tax = 0,
    customFields = []
}: PriceBreakdownProps) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>Rp {subtotal.toLocaleString()}</span>
            </div>

            {discount > 0 && (
                <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-Rp {discount.toLocaleString()}</span>
                </div>
            )}

            <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                {selectedShipping ? (
                    <span>Rp {shippingCost.toLocaleString()}</span>
                ) : (
                    <span className="text-muted-foreground italic">Select shipping method</span>
                )}
            </div>

            {tax > 0 && (
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>Rp {tax.toLocaleString()}</span>
                </div>
            )}

            {customFields.map((field, index) => (
                <div key={index} className={`flex justify-between ${field.isBold ? 'font-medium' : ''}`}>
                    <span className={!field.isBold ? "text-muted-foreground" : ""}>{field.label}</span>
                    <span>Rp {field.value.toLocaleString()}</span>
                </div>
            ))}

            <Separator />
            <div className="flex justify-between font-medium text-lg">
                <span>Total</span>
                <span>Rp {total.toLocaleString()}</span>
            </div>
        </div>
    );
}

export function OrderSummary({
    cartItems,
    priceBreakdown,
    address,
    isAddressComplete = false,
    activeStep,
    selectedCourier,
    shippingOptions,
    onEditAddress,
    onEditShipping,
    title = "Order Summary",
    description,
    showDetailedItems = true
}: OrderSummaryProps) {
    const defaultDescription = `${cartItems.length} item${cartItems.length !== 1 ? 's' : ''} in your cart`;

    return (
        <div className="sticky top-4">
            <Card>
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>
                        {description || defaultDescription}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Cart Items - can be hidden if not needed */}
                    {showDetailedItems && cartItems.length > 0 && (
                        <div className="space-y-3">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex gap-3">
                                    <div className="h-16 w-16 flex-shrink-0 rounded-md border overflow-hidden">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium truncate">{item.name}</p>
                                        <div className="text-sm text-muted-foreground space-y-1">
                                            <p>Qty: {item.quantity}</p>
                                            {Object.entries(item.options || {}).map(([key, value]) => (
                                                <p key={key}>{key}: {value}</p>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium">Rp {(item.price * item.quantity).toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {showDetailedItems && cartItems.length > 0 && <Separator />}

                    {/* Price Breakdown */}
                    <PriceBreakdown {...priceBreakdown} />
                </CardContent>
            </Card>

            {/* Shipping Address Summary */}
            {isAddressComplete && address && activeStep !== 'address' && activeStep !== 'complete' && (
                <Card className="mt-4">
                    <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                            <CardTitle className="text-sm font-medium">Shipping Address</CardTitle>
                            {onEditAddress && (
                                <Button
                                    variant="link"
                                    className="p-0 h-auto"
                                    onClick={onEditAddress}
                                >
                                    Edit
                                </Button>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent className="text-sm space-y-1">
                        <p className="font-medium">{address.fullName}</p>
                        <p>{address.phoneNumber}</p>
                        <p>
                            {address.village && `${address.village}, `}
                            {address.district && `${address.district}, `}
                            {address.city}, {address.province}, {address.postalCode}
                        </p>
                        {address.notes && <p className="text-muted-foreground italic">{address.notes}</p>}
                    </CardContent>
                </Card>
            )}

            {/* Shipping Method Summary */}
            {priceBreakdown.selectedShipping && activeStep === 'payment' && shippingOptions && (
                <Card className="mt-4">
                    <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                            <CardTitle className="text-sm font-medium">Shipping Method</CardTitle>
                            {onEditShipping && (
                                <Button
                                    variant="link"
                                    className="p-0 h-auto"
                                    onClick={onEditShipping}
                                >
                                    Edit
                                </Button>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent className="text-sm">
                        {(() => {
                            const courier = shippingOptions.find(c => c.id === selectedCourier);
                            const option = courier?.options.find(o => o.id === priceBreakdown.selectedShipping);
                            return courier && option ? (
                                <div className="flex justify-between">
                                    <p>{courier.name} - {option.name}</p>
                                    <p className="font-medium">Rp {option.price.toLocaleString()}</p>
                                </div>
                            ) : null;
                        })()}
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
