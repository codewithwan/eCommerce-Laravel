import { useState, useEffect } from 'react';
import { Link, router } from '@inertiajs/react';
import { MainLayout } from '@/layouts/site/main-layout';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingBag, CreditCard, Truck, MapPin } from 'lucide-react';
import { toast } from "sonner";
import { AddressForm } from '@/components/checkout/address-form';
import { ShippingMethodSelector } from '@/components/checkout/shipping-method-selector';
import { PaymentMethodSelector } from '@/components/checkout/payment-method-selector';
import { OrderSummary } from '@/components/checkout/order-summary';
import { OrderCompletion } from '@/components/checkout/order-completion';
import { paymentMethods } from '@/data/payment-methods';
import { shippingOptions } from '@/data/shipping-options';

const SITE_NAME = import.meta.env.SITE_NAME || 'NEXU';

// Define types for Indonesian regional data
interface Province {
    id: string;
    name: string;
}

interface Regency {
    id: string;
    province_id: string;
    name: string;
}

interface District {
    id: string;
    regency_id: string;
    name: string;
}

interface Village {
    id: string;
    district_id: string;
    name: string;
}

// Import types from the components
import type { CartItem, AddressForm as AddressFormType } from '@/components/checkout/order-summary';

// Extended AddressFormType with ID fields
interface ExtendedAddressForm extends AddressFormType {
    provinceId: string;
    regencyId: string;
    districtId: string;
    villageId: string;
}

export default function Checkout() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeStep, setActiveStep] = useState('address');
    const [selectedCourier, setSelectedCourier] = useState('');
    const [selectedShipping, setSelectedShipping] = useState('');
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    const [selectedPaymentOption, setSelectedPaymentOption] = useState('');
    const [orderComplete, setOrderComplete] = useState(false);
    const [orderNumber, setOrderNumber] = useState('');

    // Indonesian regional data states
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [regencies, setRegencies] = useState<Regency[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [villages, setVillages] = useState<Village[]>([]);
    const [loadingRegencies, setLoadingRegencies] = useState(false);
    const [loadingDistricts, setLoadingDistricts] = useState(false);
    const [loadingVillages, setLoadingVillages] = useState(false);

    // Address form state with added ID fields
    const [address, setAddress] = useState<ExtendedAddressForm>({
        fullName: '',
        phoneNumber: '',
        village: '',
        district: '',
        city: '',
        province: '',
        postalCode: '',
        notes: '',
        provinceId: '',
        regencyId: '',
        districtId: '',
        villageId: '',
    });

    // Check if address is complete
    const isAddressComplete =
        Boolean(address.fullName) &&
        Boolean(address.phoneNumber) &&
        Boolean(address.village) &&
        Boolean(address.district) &&
        Boolean(address.city) &&
        Boolean(address.province) &&
        Boolean(address.postalCode);

    // Fetch provinces on component mount
    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const response = await fetch('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json');
                if (!response.ok) throw new Error('Failed to fetch provinces');
                const data = await response.json();
                setProvinces(data);
            } catch (error) {
                console.error('Error fetching provinces:', error);
                toast.error('Failed to load provinces data');
            }
        };

        fetchProvinces();

        // Load cart items from localStorage
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }

        // Load saved address if available
        const savedAddress = localStorage.getItem('userAddress');
        if (savedAddress) {
            const parsedAddress = JSON.parse(savedAddress);
            setAddress(parsedAddress);

            // If province ID exists, fetch the regencies
            if (parsedAddress.provinceId) {
                fetchRegencies(parsedAddress.provinceId);

                // If regency ID exists, fetch the districts
                if (parsedAddress.regencyId) {
                    fetchDistricts(parsedAddress.regencyId);

                    // If district ID exists, fetch the villages
                    if (parsedAddress.districtId) {
                        fetchVillages(parsedAddress.districtId);
                    }
                }
            }
        }

        setLoading(false);
    }, []);

    // Fetch regencies when province is selected
    const fetchRegencies = async (provinceId: string) => {
        if (!provinceId) return;

        setLoadingRegencies(true);
        try {
            const response = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinceId}.json`);
            if (!response.ok) throw new Error('Failed to fetch regencies');
            const data = await response.json();
            setRegencies(data);
        } catch (error) {
            console.error('Error fetching regencies:', error);
            toast.error('Failed to load cities data');
        } finally {
            setLoadingRegencies(false);
        }
    };

    // Fetch districts when regency is selected
    const fetchDistricts = async (regencyId: string) => {
        if (!regencyId) return;

        setLoadingDistricts(true);
        try {
            const response = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${regencyId}.json`);
            if (!response.ok) throw new Error('Failed to fetch districts');
            const data = await response.json();
            setDistricts(data);
        } catch (error) {
            console.error('Error fetching districts:', error);
            toast.error('Failed to load districts data');
        } finally {
            setLoadingDistricts(false);
        }
    };

    // Fetch villages when district is selected
    const fetchVillages = async (districtId: string) => {
        if (!districtId) return;

        setLoadingVillages(true);
        try {
            const response = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${districtId}.json`);
            if (!response.ok) throw new Error('Failed to fetch villages');
            const data = await response.json();
            setVillages(data);
        } catch (error) {
            console.error('Error fetching villages:', error);
            toast.error('Failed to load villages data');
        } finally {
            setLoadingVillages(false);
        }
    };

    // Calculate subtotal, shipping cost and total
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const getSelectedShippingCost = () => {
        if (!selectedShipping) return 0;

        const courier = shippingOptions.find(c => c.id === selectedCourier);
        if (!courier) return 0;

        const shippingOption = courier.options.find(o => o.id === selectedShipping);
        return shippingOption ? shippingOption.price : 0;
    };

    const shippingCost = getSelectedShippingCost();
    const total = subtotal + shippingCost;

    // Handle address form changes with extended behavior for regional selections
    const handleAddressChange = (field: keyof ExtendedAddressForm, value: string) => {
        setAddress(prev => ({ ...prev, [field]: value }));

        // Handle province selection
        if (field === 'provinceId') {
            const selectedProvince = provinces.find(p => p.id === value);
            setAddress(prev => ({
                ...prev,
                provinceId: value,
                province: selectedProvince ? selectedProvince.name : '',
                regencyId: '',
                city: '',
                districtId: '',
                district: '',
                villageId: '',
                village: ''
            }));
            fetchRegencies(value);
            setDistricts([]);
            setVillages([]);
        }

        // Handle regency selection
        if (field === 'regencyId') {
            const selectedRegency = regencies.find(r => r.id === value);
            setAddress(prev => ({
                ...prev,
                regencyId: value,
                city: selectedRegency ? selectedRegency.name : '',
                districtId: '',
                district: '',
                villageId: '',
                village: ''
            }));
            fetchDistricts(value);
            setVillages([]);
        }

        // Handle district selection
        if (field === 'districtId') {
            const selectedDistrict = districts.find(d => d.id === value);
            setAddress(prev => ({
                ...prev,
                districtId: value,
                district: selectedDistrict ? selectedDistrict.name : '',
                villageId: '',
                village: ''
            }));
            fetchVillages(value);
        }

        // Handle village selection
        if (field === 'villageId') {
            const selectedVillage = villages.find(v => v.id === value);
            setAddress(prev => ({
                ...prev,
                villageId: value,
                village: selectedVillage ? selectedVillage.name : ''
            }));
        }
    };

    // Save address
    const saveAddress = () => {
        localStorage.setItem('userAddress', JSON.stringify(address));
        toast.success("Address saved", {
            description: "Your shipping address has been saved."
        });

        setActiveStep('shipping');
    };

    // Handle shipping selection
    const handleShippingSelection = (courierId: string, optionId: string) => {
        setSelectedCourier(courierId);
        setSelectedShipping(optionId);
    };

    // Handle payment method selection
    const handlePaymentSelection = (methodId: string, optionId: string) => {
        setSelectedPaymentMethod(methodId);
        setSelectedPaymentOption(optionId);
    };

    // Process to next step
    const proceedToPayment = () => {
        if (!selectedShipping) {
            toast.error("Please select a shipping method", {
                description: "You need to select a shipping method to continue."
            });
            return;
        }

        setActiveStep('payment');
    };

    // Complete order
    const completeOrder = () => {
        if (!selectedPaymentOption) {
            toast.error("Please select a payment method", {
                description: "You need to select a payment method to complete your order."
            });
            return;
        }

        // Generate random order number
        const randomOrderNum = 'ORD' + Math.floor(100000000 + Math.random() * 900000000);
        setOrderNumber(randomOrderNum);

        // Clear cart after successful checkout
        localStorage.removeItem('cart');
        setCartItems([]);
        
        // Dispatch custom event to notify about cart update
        window.dispatchEvent(new Event('cartUpdated'));

        setOrderComplete(true);
        setActiveStep('complete');

        toast.success("Order placed successfully!", {
            description: `Your order #${randomOrderNum} has been placed.`
        });
    };

    // Continue shopping after order completion
    const continueShopping = () => {
        router.visit(route('home'));
    };

    // Prepare price breakdown for OrderSummary component
    const priceBreakdown = {
        subtotal,
        shippingCost,
        total,
        selectedShipping
    };

    return (
        <MainLayout title={`Checkout - ${SITE_NAME}`}>
          {/* Breadcrumbs */}
          <div className="border-b">
              <div className="container mx-auto px-4 py-3">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Link href={route('home')} className="hover:text-foreground">Home</Link>
                      <span>/</span>
                      <Link href={route('shopping-cart')} className="hover:text-foreground">Cart</Link>
                      <span>/</span>
                      <span className="text-foreground">Checkout</span>
                  </div>
              </div>
          </div>

          <main className="container mx-auto px-4 py-8 flex-grow">
              <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
                  <CreditCard className="h-8 w-8" />
                  Checkout
              </h1>

              {loading ? (
                  <div className="text-center py-8">
                      <div className="mb-4 text-xl">Loading your checkout information...</div>
                  </div>
              ) : cartItems.length === 0 && !orderComplete ? (
                  <Card>
                      <CardContent className="pt-6 pb-8 text-center">
                          <div className="mb-4">
                              <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
                          </div>
                          <h3 className="text-xl font-medium mb-2">Your cart is empty</h3>
                          <p className="text-muted-foreground mb-6">
                              You don't have any items in your cart to checkout.
                          </p>
                          <Button onClick={() => router.visit(route('home'))}>
                              Continue Shopping
                          </Button>
                      </CardContent>
                  </Card>
              ) : (
                  <div className={`grid grid-cols-1 ${activeStep === 'complete' ? '' : 'lg:grid-cols-3'} gap-8`}>
                      <div className={activeStep === 'complete' ? 'mx-auto max-w-xl w-full' : 'lg:col-span-2'}>
                          <Tabs value={activeStep} className="mb-8">
                              {activeStep !== 'complete' && (
                                  <div>
                                      <TabsList className="w-full grid grid-cols-3">
                                          <TabsTrigger value="address" disabled={activeStep !== 'address' && activeStep !== 'complete'}>
                                              <div className="flex items-center gap-2">
                                                  <MapPin className="h-4 w-4" />
                                                  <span className="hidden sm:inline">Address</span>
                                              </div>
                                          </TabsTrigger>
                                          <TabsTrigger value="shipping" disabled={activeStep !== 'shipping' && activeStep !== 'complete'}>
                                              <div className="flex items-center gap-2">
                                                  <Truck className="h-4 w-4" />
                                                  <span className="hidden sm:inline">Shipping</span>
                                              </div>
                                          </TabsTrigger>
                                          <TabsTrigger value="payment" disabled={activeStep !== 'payment' && activeStep !== 'complete'}>
                                              <div className="flex items-center gap-2">
                                                  <CreditCard className="h-4 w-4" />
                                                  <span className="hidden sm:inline">Payment</span>
                                              </div>
                                          </TabsTrigger>
                                      </TabsList>
                                  </div>
                              )}

                              {/* ADDRESS CONTENT */}
                              <TabsContent value="address" className="pt-6">
                                  <AddressForm
                                      address={address}
                                      provinces={provinces}
                                      regencies={regencies}
                                      districts={districts}
                                      villages={villages}
                                      loadingRegencies={loadingRegencies}
                                      loadingDistricts={loadingDistricts}
                                      loadingVillages={loadingVillages}
                                      isComplete={isAddressComplete}
                                      onChange={handleAddressChange}
                                      onBack={() => router.visit(route('shopping-cart'))}
                                      onContinue={saveAddress}
                                  />
                              </TabsContent>

                              {/* SHIPPING CONTENT */}
                              <TabsContent value="shipping" className="pt-6">
                                  <ShippingMethodSelector
                                      shippingOptions={shippingOptions}
                                      selectedCourier={selectedCourier}
                                      selectedShipping={selectedShipping}
                                      onShippingSelection={handleShippingSelection}
                                      onBack={() => setActiveStep('address')}
                                      onContinue={proceedToPayment}
                                  />
                              </TabsContent>

                              {/* PAYMENT CONTENT */}
                              <TabsContent value="payment" className="pt-6">
                                  <PaymentMethodSelector
                                      paymentMethods={paymentMethods}
                                      selectedPaymentMethod={selectedPaymentMethod}
                                      selectedPaymentOption={selectedPaymentOption}
                                      onPaymentSelection={handlePaymentSelection}
                                      onBack={() => setActiveStep('shipping')}
                                      onComplete={completeOrder}
                                      total={total}
                                  />
                              </TabsContent>

                              {/* ORDER COMPLETE CONTENT */}
                              <TabsContent value="complete" className="pt-6">
                                  <OrderCompletion
                                      orderNumber={orderNumber}
                                      onContinueShopping={continueShopping}
                                  />
                              </TabsContent>
                          </Tabs>
                      </div>

                      {/* Order Summary - Only show when not in complete state */}
                      {activeStep !== 'complete' && (
                          <div>
                              <OrderSummary
                                  cartItems={cartItems}
                                  priceBreakdown={priceBreakdown}
                                  address={address}
                                  isAddressComplete={isAddressComplete}
                                  activeStep={activeStep}
                                  selectedCourier={selectedCourier}
                                  shippingOptions={shippingOptions}
                                  onEditAddress={() => setActiveStep('address')}
                                  onEditShipping={() => setActiveStep('shipping')}
                              />
                          </div>
                      )}
                  </div>
              )}
          </main>
        </MainLayout>
    );
}
