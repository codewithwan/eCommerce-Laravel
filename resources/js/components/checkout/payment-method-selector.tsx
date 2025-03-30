import { CreditCard } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PaymentMethod, PaymentOption } from '@/data/payment-methods';

interface PaymentMethodSelectorProps {
  paymentMethods: PaymentMethod[];
  selectedPaymentMethod: string;
  selectedPaymentOption: string;
  onPaymentSelection: (methodId: string, optionId: string) => void;
  onBack: () => void;
  onComplete: () => void;
  total?: number; // Add total parameter for bank transfer instructions
  buttonText?: string; // Customizable button text
  backButtonText?: string; // Customizable back button text
}

export function PaymentMethodSelector({
  paymentMethods,
  selectedPaymentMethod,
  selectedPaymentOption,
  onPaymentSelection,
  onBack,
  onComplete,
  total = 0,
  buttonText = "Place Order",
  backButtonText = "Back to Shipping"
}: PaymentMethodSelectorProps) {
  
  // Generate bank transfer instructions
  const getBankTransferInstructions = () => {
    if (selectedPaymentMethod !== 'bank-transfer') return null;
    
    const selectedBank = paymentMethods
      .find(m => m.id === 'bank-transfer')
      ?.options.find(o => o.id === selectedPaymentOption) as PaymentOption & { 
        accountNumber: string; 
        accountName: string;
      };
    
    if (!selectedBank || !selectedBank.accountNumber) return null;
    
    return (
      <div className="mt-4 p-4 bg-muted rounded-md">
        <h4 className="font-medium mb-2">Transfer Instructions:</h4>
        <p className="text-sm mb-2">Please transfer exactly Rp {total.toLocaleString()} to:</p>
        <div className="space-y-1 text-sm">
          <p><span className="font-medium">Bank:</span> {selectedBank.name}</p>
          <p><span className="font-medium">Account Number:</span> {selectedBank.accountNumber}</p>
          <p><span className="font-medium">Account Name:</span> {selectedBank.accountName}</p>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Please complete the payment within 24 hours. After transferring, you can upload your proof of payment 
          from your order history.
        </p>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Payment Method
        </CardTitle>
        <CardDescription>
          Select how you want to pay for your order
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {paymentMethods.map((method) => (
            <div key={method.id} className="border rounded-md p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">{method.name}</h3>
                <span className="text-sm text-muted-foreground">{method.description}</span>
              </div>
              
              <RadioGroup 
                value={selectedPaymentOption}
                onValueChange={(value) => onPaymentSelection(method.id, value)}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {method.options.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2 p-2 border rounded-md">
                      <RadioGroupItem value={option.id} id={option.id} />
                      <Label htmlFor={option.id} className="flex items-center gap-2 cursor-pointer">
                        <span>{option.logo}</span>
                        <span>{option.name}</span>
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          ))}
        </div>
        
        {getBankTransferInstructions()}
        
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          {backButtonText}
        </Button>
        <Button 
          onClick={onComplete} 
          disabled={!selectedPaymentOption}
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
}
