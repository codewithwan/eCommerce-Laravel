import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

interface ProductExtended {
  id: number;
  name: string;
  description: string;
  specifications: Record<string, string>;
  rating: number;
  soldCount: number;
}

interface ProductTabsProps {
  product: ProductExtended;
}

export function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState('description');

  const specifications = product.specifications && typeof product.specifications === 'object'
    ? product.specifications
    : {};

  const description = product.description || 'No description available';

  const rating = typeof product.rating === 'number'
    ? product.rating
    : parseFloat(String(product.rating || 0));

  const soldCount = typeof product.soldCount === 'number'
    ? product.soldCount
    : parseInt(String(product.soldCount || 0), 10);

  return (
    <Tabs defaultValue="description" onValueChange={setActiveTab} value={activeTab}>
      <TabsList className="w-full justify-start">
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="specifications">Specifications</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
      </TabsList>

      <TabsContent value="description" className="mt-6">
        <div className="prose max-w-none">
          <p>{description}</p>
        </div>
      </TabsContent>

      <TabsContent value="specifications" className="mt-6">
        <div className="overflow-hidden rounded-md border">
          {Object.keys(specifications).length > 0 ? (
            Object.entries(specifications).map(([key, value], index) => (
              <div key={key} className={`grid grid-cols-2 border-b ${index % 2 === 1 ? 'bg-muted' : ''} ${index === Object.entries(specifications).length - 1 ? 'border-b-0' : ''}`}>
                <div className="border-r p-3 font-medium">
                  {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                </div>
                <div className="p-3">{value}</div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-muted-foreground">
              No specifications available
            </div>
          )}
        </div>
      </TabsContent>

      <TabsContent value="reviews" className="mt-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Customer Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center text-amber-500">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-lg">
                      {star <= Math.round(rating) ? '★' : '☆'}
                    </span>
                  ))}
                </div>
                <span className="ml-2 text-sm text-muted-foreground">
                  Based on {Math.round(soldCount * 0.6)} reviews
                </span>
              </div>
            </div>
            <Button variant="outline">Write a Review</Button>
          </div>

          <div className="divide-y">
            {/* Sample reviews - later can be replaced with real data */}
            {[...Array(3)].map((_, index) => (
              <div key={index} className="py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <div>
                      <p className="font-medium">Customer {index + 1}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(Date.now() - (index + 1) * 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, starIndex) => (
                      <span key={starIndex}>
                        {starIndex < 5 - index * 0.5 ? '★' : '☆'}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="mt-2 text-sm">
                  {index === 0 && "This product exceeded my expectations! The quality is outstanding and it arrived sooner than expected."}
                  {index === 1 && "Very good product for the price. I've been using it for a few weeks now and am quite satisfied."}
                  {index === 2 && "Decent product but took a while to arrive. The quality is good but there are a few minor issues."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
