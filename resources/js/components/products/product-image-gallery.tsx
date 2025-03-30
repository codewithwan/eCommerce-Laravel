import { useState } from 'react';
import { ImageOff } from "lucide-react";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  
  // Handle image load error
  const handleImageError = (index: number) => {
    setImageErrors(prev => ({
      ...prev,
      [index]: true
    }));
  };

  return (
    <div className="space-y-4">
      <div className="aspect-square overflow-hidden rounded-lg border">
        {!imageErrors[selectedImageIndex] ? (
          <img 
            src={images[selectedImageIndex]} 
            alt={productName} 
            className="h-full w-full object-cover"
            onError={() => handleImageError(selectedImageIndex)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <div className="flex flex-col items-center justify-center text-muted-foreground">
              <ImageOff size={72} strokeWidth={1.5} />
              <span className="mt-3 text-sm">Product image unavailable</span>
            </div>
          </div>
        )}
      </div>
      <div className="grid grid-cols-4 gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            className={`aspect-square overflow-hidden rounded-md border ${selectedImageIndex === index ? 'ring-2 ring-primary' : ''}`}
            onClick={() => setSelectedImageIndex(index)}
          >
            {!imageErrors[index] ? (
              <img 
                src={image} 
                alt={`${productName} thumbnail ${index + 1}`} 
                className="h-full w-full object-cover" 
                onError={() => handleImageError(index)}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-muted">
                <ImageOff size={24} strokeWidth={1.5} className="text-muted-foreground" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
