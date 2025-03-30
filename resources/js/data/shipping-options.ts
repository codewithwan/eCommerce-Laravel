export interface ShippingOption {
  id: string;
  name: string;
  price: number;
}

export interface ShippingCourier {
  id: string;
  name: string;
  logo: string;
  options: ShippingOption[];
}

// Indonesian shipping options
export const shippingOptions: ShippingCourier[] = [
  { id: 'jne', name: 'JNE', logo: '📦', options: [
    { id: 'jne-reg', name: 'REG (2-3 days)', price: 22000 },
    { id: 'jne-yes', name: 'YES (1-2 days)', price: 38000 },
  ]},
  { id: 'j&t', name: 'J&T Express', logo: '🚚', options: [
    { id: 'jt-reg', name: 'Regular (2-3 days)', price: 20000 },
    { id: 'jt-fast', name: 'Fast (1-2 days)', price: 35000 },
  ]},
  { id: 'sicepat', name: 'SiCepat', logo: '⚡', options: [
    { id: 'sicepat-reg', name: 'REG (2-3 days)', price: 21000 },
    { id: 'sicepat-best', name: 'BEST (1 day)', price: 40000 },
  ]},
  { id: 'pos', name: 'POS Indonesia', logo: '📮', options: [
    { id: 'pos-biasa', name: 'Biasa (3-5 days)', price: 18000 },
    { id: 'pos-kilat', name: 'Kilat (2-3 days)', price: 25000 },
  ]},
];
