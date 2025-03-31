import { type Product } from '@/components/products/product-card';
import { type PromotionalSlide } from '@/components/ui/promotional-slider';
import { type TrustIndicator } from '@/components/ui/trust-indicator';

// Product option types
export interface ProductOption {
    name: string;
    values: string[];
}

// Extended Product interface with additional fields
export interface ProductExtended extends Product {
    description: string;
    specifications: {
        brand: string;
        model: string;
        warranty: string;
        [key: string]: string;
    };
    options?: ProductOption[];
}

// Mock product data with extended information
export const mockProducts: ProductExtended[] = [
    {
        id: 1,
        name: 'Minimalist Watch',
        price: 1949850,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
        category: 'Accessories',
        sellerName: 'Elegant Accessories',
        rating: 4.5,
        soldCount: 142,
        description: "This minimalist watch features a clean design with premium materials. The sleek face and comfortable strap make it perfect for daily wear. Water-resistant up to 30 meters and comes with a scratch-resistant mineral glass face.",
        specifications: {
            brand: "Elegant Accessories",
            model: "minimalist-watch-1",
            category: "Accessories",
            warranty: "1 Year Limited Warranty",
            material: "Stainless Steel",
            waterResistant: "30m",
            batteryLife: "3 Years"
        },
        options: [
            {
                name: "Color",
                values: ["Silver", "Gold", "Black"]
            },
            {
                name: "Strap Material",
                values: ["Leather", "Metal", "Silicone"]
            }
        ]
    },
    {
        id: 2,
        name: 'Modern Backpack',
        price: 1349850,
        image: 'https://images.unsplash.com/photo-1491637639811-60e2756cc1c7',
        category: 'Accessories',
        sellerName: 'Urban Bags',
        rating: 4.3,
        soldCount: 98,
        description: "This modern backpack combines style with functionality. Features multiple compartments including a padded laptop sleeve for devices up to 15 inches. Made from water-resistant materials with reinforced stitching for durability.",
        specifications: {
            brand: "Urban Bags",
            model: "modern-backpack-2",
            category: "Accessories",
            warranty: "2 Year Limited Warranty",
            material: "Polyester, Water-resistant coating",
            capacity: "25L",
            laptopCompartment: "Up to 15 inches"
        }
    },
    {
        id: 3,
        name: 'Wireless Earbuds',
        price: 1199850,
        image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb',
        category: 'Electronics',
        sellerName: 'Tech Gadgets',
        rating: 4.7,
        soldCount: 256,
        description: "Experience premium sound quality with these wireless earbuds. Features active noise cancellation, touch controls, and up to 8 hours of battery life on a single charge. The charging case provides an additional 24 hours of power on the go.",
        specifications: {
            brand: "Tech Gadgets",
            model: "wireless-earbuds-3",
            category: "Electronics",
            warranty: "1 Year Limited Warranty",
            batteryLife: "8 hours (32 hours with case)",
            connectivity: "Bluetooth 5.0",
            noiseReduction: "Active Noise Cancellation"
        }
    },
    {
        id: 4,
        name: 'Ceramic Mug',
        price: 374850,
        image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d',
        category: 'Home Goods',
        sellerName: 'HomeStyle',
        rating: 4.8,
        soldCount: 75,
        description: "This handcrafted ceramic mug brings style to your morning coffee routine. The double-walled design keeps your beverages hot longer while staying cool to the touch. Dishwasher and microwave safe.",
        specifications: {
            brand: "HomeStyle",
            model: "ceramic-mug-4",
            category: "Home Goods",
            warranty: "30-Day Quality Guarantee",
            material: "Premium Ceramic",
            capacity: "350ml",
            dishwasherSafe: "Yes"
        }
    },
    {
        id: 5,
        name: 'Leather Wallet',
        price: 749850,
        image: 'https://images.unsplash.com/photo-1517254797898-ee1bd2748ce5',
        category: 'Accessories',
        sellerName: 'Leather Luxe',
        rating: 4.6,
        soldCount: 183,
        description: "Crafted from genuine leather, this wallet features a slim profile that fits comfortably in your pocket. Includes 6 card slots, a billfold compartment, and RFID-blocking technology to protect your personal information.",
        specifications: {
            brand: "Leather Luxe",
            model: "leather-wallet-5",
            category: "Accessories",
            warranty: "1 Year Limited Warranty",
            material: "Genuine Leather",
            cardSlots: "6",
            rfidProtection: "Yes"
        }
    },
    {
        id: 6,
        name: 'Desk Lamp',
        price: 899850,
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c',
        category: 'Home Goods',
        sellerName: 'Bright Lights',
        rating: 4.2,
        soldCount: 67,
        description: "This adjustable desk lamp provides perfect lighting for work or reading. Features three brightness levels and color temperature modes. The energy-efficient LED bulbs last up to 50,000 hours and use minimal electricity.",
        specifications: {
            brand: "Bright Lights",
            model: "desk-lamp-6",
            category: "Home Goods",
            warranty: "2 Year Limited Warranty",
            bulbType: "LED",
            powerConsumption: "7W",
            lightModes: "3 brightness levels, 3 color temperatures"
        }
    },
    {
        id: 7,
        name: 'Minimalist Chair',
        price: 2999850,
        image: 'https://images.unsplash.com/photo-1503602642458-232111445657',
        category: 'Home Goods',
        sellerName: 'Modern Furniture',
        rating: 4.9,
        soldCount: 42,
        description: "This minimalist chair combines form and function with its clean lines and ergonomic design. The molded seat and sturdy construction provide comfort and stability, while the simple aesthetic complements any modern space.",
        specifications: {
            brand: "Modern Furniture",
            model: "minimalist-chair-7",
            category: "Home Goods",
            warranty: "5 Year Limited Warranty",
            material: "Molded Plastic, Wooden Legs",
            dimensions: "52cm x 46cm x 82cm",
            weightCapacity: "150kg"
        }
    },
    {
        id: 8,
        name: 'Smart Speaker',
        price: 2249850,
        image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12',
        category: 'Electronics',
        sellerName: 'Smart Home',
        rating: 4.4,
        soldCount: 213,
        description: "Transform your home with this intelligent smart speaker. Control your smart home devices, play music, check the weather, and more using simple voice commands. Features premium 360° sound and far-field voice recognition technology.",
        specifications: {
            brand: "Smart Home",
            model: "smart-speaker-8",
            category: "Electronics",
            warranty: "1 Year Limited Warranty",
            connectivity: "Wi-Fi, Bluetooth 5.0",
            powerOutput: "20W",
            assistantCompatibility: "Google Assistant, Amazon Alexa"
        }
    },
    {
        id: 9,
        name: 'Cotton T-Shirt',
        price: 524850,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
        category: 'Apparel',
        sellerName: 'Casual Wear',
        rating: 4.3,
        soldCount: 325,
        description: "This premium cotton t-shirt offers exceptional comfort and durability. Made from 100% organic cotton with a medium weight that's perfect for year-round wear. The classic fit and clean design make it a versatile addition to any wardrobe.",
        specifications: {
            brand: "Casual Wear",
            model: "cotton-tshirt-9",
            category: "Apparel",
            warranty: "30-Day Return Policy",
            material: "100% Organic Cotton",
            care: "Machine washable, tumble dry low",
            sizes: "S, M, L, XL, XXL"
        },
        options: [
            {
                name: "Size",
                values: ["S", "M", "L", "XL", "XXL"]
            },
            {
                name: "Color",
                values: ["White", "Black", "Navy", "Gray", "Red"]
            }
        ]
    },
    {
        id: 10,
        name: 'Slim Fit Jeans',
        price: 1049850,
        image: 'https://images.unsplash.com/photo-1542272604-787c3835535d',
        category: 'Apparel',
        sellerName: 'Denim Co.',
        rating: 4.5,
        soldCount: 188,
        description: "These slim fit jeans combine style and comfort with premium denim fabric that includes a touch of stretch for ease of movement. The classic five-pocket design and versatile wash make them easy to dress up or down for any occasion.",
        specifications: {
            brand: "Denim Co.",
            model: "slim-fit-jeans-10",
            category: "Apparel",
            warranty: "30-Day Return Policy",
            material: "98% Cotton, 2% Elastane",
            rise: "Mid-rise",
            inseam: "32 inches"
        },
        options: [
            {
                name: "Size",
                values: ["30x30", "30x32", "32x30", "32x32", "34x30", "34x32", "36x32"]
            },
            {
                name: "Wash",
                values: ["Dark Blue", "Medium Blue", "Light Blue", "Black"]
            }
        ]
    },
    {
        id: 11,
        name: 'Bluetooth Headphones',
        price: 1949850,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
        category: 'Electronics',
        sellerName: 'Audio Tech',
        rating: 4.7,
        soldCount: 292,
        description: "Experience premium audio with these wireless Bluetooth headphones. The over-ear design provides comfort for extended listening sessions, while the active noise cancellation lets you immerse yourself in your music. Enjoy up to 30 hours of battery life on a single charge.",
        specifications: {
            brand: "Audio Tech",
            model: "bluetooth-headphones-11",
            category: "Electronics",
            warranty: "2 Year Limited Warranty",
            batteryLife: "Up to 30 hours",
            connectivity: "Bluetooth 5.0, 3.5mm jack",
            features: "Active Noise Cancellation, Foldable Design"
        },
        options: [
            {
                name: "Color",
                values: ["Black", "White", "Blue", "Red"]
            }
        ]
    },
    {
        id: 12,
        name: 'Minimal Vase',
        price: 599850,
        image: 'https://images.unsplash.com/photo-1612196808214-5ab53696a6e7',
        category: 'Home Goods',
        sellerName: 'Home Decor Plus',
        rating: 4.4,
        soldCount: 86,
        description: "Add a touch of elegance to any space with this minimalist ceramic vase. The clean lines and neutral finish complement any decor style, making it perfect for displaying fresh or dried flowers. Each piece is handcrafted with attention to detail.",
        specifications: {
            brand: "Home Decor Plus",
            model: "minimal-vase-12",
            category: "Home Goods",
            warranty: "30-Day Quality Guarantee",
            material: "Ceramic",
            dimensions: "15cm x 15cm x 25cm",
            careInstructions: "Hand wash only"
        }
    },
];

// Categories for filtering
export const categories = ['All', 'Electronics', 'Apparel', 'Home Goods', 'Accessories'];

// Mock promotional slides
export const promotionalSlides: PromotionalSlide[] = [
    {
        id: 1,
        title: "Summer Sale",
        description: "Get up to 50% off on selected summer items",
        buttonText: "Shop Now",
        image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=1600&auto=format&fit=crop",
        color: "from-blue-500/20 to-purple-500/20"
    },
    {
        id: 2,
        title: "New Arrivals",
        description: "Check out our latest collection of minimal designs",
        buttonText: "Explore",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format&fit=crop",
        color: "from-orange-500/20 to-amber-500/20"
    },
    {
        id: 3,
        title: "Free Shipping",
        description: "Free worldwide shipping on all orders over $100",
        buttonText: "Learn More",
        image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1600&auto=format&fit=crop",
        color: "from-green-500/20 to-emerald-500/20"
    },
];

// Trust indicators
export const trustIndicators: TrustIndicator[] = [
    {
        id: "free-shipping",
        text: "Free Shipping",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-primary">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
        )
    },
    {
        id: "secure-payments",
        text: "Secure Payments",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-primary">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
        )
    },
    {
        id: "30-day-returns",
        text: "30-Day Returns",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-primary">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
        )
    },
    {
        id: "premium-quality",
        text: "Premium Quality",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-primary">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
        )
    },
];

// Order status type
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

// Order item interface
export interface OrderItem {
    id: number;
    productId: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
    options?: Record<string, string>;
}

// Order interface
export interface Order {
    id: number;
    orderNumber: string;
    date: string;
    status: OrderStatus;
    total: number;
    items: OrderItem[];
    shippingAddress: {
        name: string;
        address: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
    };
    trackingNumber?: string;
}

// Mock order history data
export const mockOrders: Order[] = [
    {
        id: 1,
        orderNumber: "ORD-2023-0001",
        date: "2023-12-15T10:30:00",
        status: "delivered",
        total: 2474700,
        items: [
            {
                id: 1,
                productId: 1,
                name: "Minimalist Watch",
                price: 1949850,
                image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
                quantity: 1,
                options: {
                    Color: "Silver",
                    "Strap Material": "Leather"
                }
            },
            {
                id: 2,
                productId: 4,
                name: "Ceramic Mug",
                price: 374850,
                image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d",
                quantity: 1
            }
        ],
        shippingAddress: {
            name: "John Doe",
            address: "123 Main St",
            city: "New York",
            state: "NY",
            postalCode: "10001",
            country: "United States"
        },
        trackingNumber: "TRK123456789"
    },
    {
        id: 2,
        orderNumber: "ORD-2023-0042",
        date: "2023-11-28T14:15:00",
        status: "shipped",
        total: 3299700,
        items: [
            {
                id: 3,
                productId: 3,
                name: "Wireless Earbuds",
                price: 1199850,
                image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb",
                quantity: 1
            },
            {
                id: 4,
                productId: 10,
                name: "Slim Fit Jeans",
                price: 1049850,
                image: "https://images.unsplash.com/photo-1542272604-787c3835535d",
                quantity: 2,
                options: {
                    Size: "32x32",
                    Wash: "Dark Blue"
                }
            }
        ],
        shippingAddress: {
            name: "John Doe",
            address: "123 Main St",
            city: "New York",
            state: "NY",
            postalCode: "10001",
            country: "United States"
        },
        trackingNumber: "TRK987654321"
    },
    {
        id: 3,
        orderNumber: "ORD-2023-0078",
        date: "2023-10-05T09:45:00",
        status: "cancelled",
        total: 1049850,
        items: [
            {
                id: 5,
                productId: 8,
                name: "Smart Speaker",
                price: 2249850,
                image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12",
                quantity: 1
            }
        ],
        shippingAddress: {
            name: "John Doe",
            address: "123 Main St",
            city: "New York",
            state: "NY",
            postalCode: "10001",
            country: "United States"
        }
    },
    {
        id: 4,
        orderNumber: "ORD-2024-0013",
        date: "2024-01-10T16:20:00",
        status: "processing",
        total: 2499700,
        items: [
            {
                id: 6,
                productId: 6,
                name: "Desk Lamp",
                price: 899850,
                image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c",
                quantity: 1
            },
            {
                id: 7,
                productId: 12,
                name: "Minimal Vase",
                price: 599850,
                image: "https://images.unsplash.com/photo-1612196808214-5ab53696a6e7",
                quantity: 1
            },
            {
                id: 8,
                productId: 9,
                name: "Cotton T-Shirt",
                price: 524850,
                image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
                quantity: 2,
                options: {
                    Size: "L",
                    Color: "White"
                }
            }
        ],
        shippingAddress: {
            name: "John Doe",
            address: "123 Main St",
            city: "New York",
            state: "NY",
            postalCode: "10001",
            country: "United States"
        }
    },
    {
        id: 5,
        orderNumber: "ORD-2024-0027",
        date: "2024-02-18T11:05:00",
        status: "pending",
        total: 1949850,
        items: [
            {
                id: 9,
                productId: 11,
                name: "Bluetooth Headphones",
                price: 1949850,
                image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
                quantity: 1,
                options: {
                    Color: "Black"
                }
            }
        ],
        shippingAddress: {
            name: "John Doe",
            address: "123 Main St",
            city: "New York",
            state: "NY",
            postalCode: "10001",
            country: "United States"
        }
    }
];
