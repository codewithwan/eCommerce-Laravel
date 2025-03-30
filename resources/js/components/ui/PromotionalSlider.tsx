import { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";

export interface PromotionalSlide {
    id: number;
    title: string;
    description: string;
    buttonText: string;
    image: string;
    color: string;
}

interface PromotionalSliderProps {
    slides: PromotionalSlide[];
    autoplayInterval?: number;
    onButtonClick?: (slide: PromotionalSlide) => void;
}

export function PromotionalSlider({ 
    slides, 
    autoplayInterval = 5000,
    onButtonClick 
}: PromotionalSliderProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    
    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, [slides.length]);
    
    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };
    
    useEffect(() => {
        const slideInterval = setInterval(() => {
            nextSlide();
        }, autoplayInterval);
        
        return () => clearInterval(slideInterval);
    }, [nextSlide, autoplayInterval]);
    
    if (slides.length === 0) return null;
    
    return (
        <div className="relative h-64 w-full overflow-hidden md:h-80">
            {/* Slides */}
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 flex h-full w-full items-center transition-opacity duration-1000 ${
                        index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                >
                    {/* Slide Background */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${slide.image})` }}
                    >
                        <div className={`absolute inset-0 bg-gradient-to-r ${slide.color} opacity-90`}></div>
                    </div>
                    
                    {/* Slide Content */}
                    <div className="container relative mx-auto flex flex-col items-center px-4 text-center md:items-start md:text-left">
                        <h2 className="mb-2 text-2xl font-bold md:text-4xl">{slide.title}</h2>
                        <p className="mb-4 max-w-md text-sm md:text-base">{slide.description}</p>
                        <Button 
                            variant="default"
                            onClick={() => onButtonClick && onButtonClick(slide)}
                        >
                            {slide.buttonText}
                        </Button>
                    </div>
                </div>
            ))}
            
            {/* Navigation Buttons */}
            <Button
                variant="outline"
                size="icon"
                className="absolute left-4 top-1/2 z-10 h-8 w-8 -translate-y-1/2 transform rounded-full bg-background/80 opacity-70 hover:opacity-100"
                onClick={prevSlide}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
            </Button>
            <Button
                variant="outline"
                size="icon"
                className="absolute right-4 top-1/2 z-10 h-8 w-8 -translate-y-1/2 transform rounded-full bg-background/80 opacity-70 hover:opacity-100"
                onClick={nextSlide}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
            </Button>
            
            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-2 w-2 rounded-full transition-all ${
                            index === currentSlide ? 'bg-foreground w-4' : 'bg-foreground/40'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
