import { Truck } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShippingCourier } from '@/data/shipping-options';

interface ShippingMethodSelectorProps {
  shippingOptions: ShippingCourier[];
  selectedCourier: string;
  selectedShipping: string;
  onShippingSelection: (courierId: string, optionId: string) => void;
  onBack: () => void;
  onContinue: () => void;
  title?: string;
  description?: string;
  continueButtonText?: string;
  backButtonText?: string;
}

export function ShippingMethodSelector({
  shippingOptions,
  selectedCourier,
  selectedShipping,
  onShippingSelection,
  onBack,
  onContinue,
  title = "Shipping Method",
  description = "Select a shipping courier and delivery method",
  continueButtonText = "Continue to Payment",
  backButtonText = "Back to Address"
}: ShippingMethodSelectorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Truck className="h-5 w-5" />
          {title}
        </CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {shippingOptions.map((courier) => (
            <div key={courier.id} className="border rounded-md p-4">
              <div className="flex items-center mb-4 gap-2">
                <span className="text-xl">{courier.logo}</span>
                <h3 className="font-medium">{courier.name}</h3>
              </div>
              
              <RadioGroup 
                value={selectedShipping}
                onValueChange={(value) => onShippingSelection(courier.id, value)}
              >
                {courier.options.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value={option.id} id={option.id} />
                    <Label
                      htmlFor={option.id}
                      className="flex justify-between w-full cursor-pointer"
                    >
                      <span>{option.name}</span>
                      <span>Rp {option.price.toLocaleString()}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          {backButtonText}
        </Button>
        <Button 
          onClick={onContinue} 
          disabled={!selectedShipping}
        >
          {continueButtonText}
        </Button>
      </CardFooter>
    </Card>
  );
}
