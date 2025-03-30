export interface PaymentOption {
  id: string;
  name: string;
  logo: string;
  accountNumber?: string;
  accountName?: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  options: PaymentOption[];
}

// Indonesian payment methods
export const paymentMethods: PaymentMethod[] = [
  { 
    id: 'bank-transfer',
    name: 'Bank Transfer', 
    description: 'Manual verification (1x24 hours)',
    options: [
      { id: 'bca', name: 'BCA', logo: '🏦', accountNumber: '0123456789', accountName: 'PT NEXU INDONESIA' },
      { id: 'mandiri', name: 'Mandiri', logo: '🏦', accountNumber: '9876543210', accountName: 'PT NEXU INDONESIA' },
      { id: 'bni', name: 'BNI', logo: '🏦', accountNumber: '0987654321', accountName: 'PT NEXU INDONESIA' },
    ]
  },
  { 
    id: 'e-wallet',
    name: 'E-Wallet', 
    description: 'Instant verification',
    options: [
      { id: 'gopay', name: 'GoPay', logo: '💳' },
      { id: 'ovo', name: 'OVO', logo: '💰' },
      { id: 'dana', name: 'DANA', logo: '💲' },
      { id: 'linkaja', name: 'LinkAja', logo: '💸' },
    ]
  },
  { 
    id: 'virtual-account',
    name: 'Virtual Account', 
    description: 'Automatic verification',
    options: [
      { id: 'va-bca', name: 'BCA Virtual Account', logo: '🔢' },
      { id: 'va-mandiri', name: 'Mandiri Virtual Account', logo: '🔢' },
      { id: 'va-bni', name: 'BNI Virtual Account', logo: '🔢' },
    ]
  },
  { 
    id: 'paylater',
    name: 'Pay Later', 
    description: 'Pay with credit',
    options: [
      { id: 'kredivo', name: 'Kredivo', logo: '⏱️' },
      { id: 'akulaku', name: 'Akulaku', logo: '⏱️' },
    ]
  },
];
