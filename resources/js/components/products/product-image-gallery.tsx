import { useState } from 'react';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <div className="space-y-4">
      <div className="aspect-square overflow-hidden rounded-lg border">
        <img 
          src={images[selectedImageIndex]} 
          alt={productName} 
          className="h-full w-full object-cover"
        />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            className={`aspect-square overflow-hidden rounded-md border ${selectedImageIndex === index ? 'ring-2 ring-primary' : ''}`}
            onClick={() => setSelectedImageIndex(index)}
          >
            <img src={image} alt={`${productName} thumbnail ${index + 1}`} className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
