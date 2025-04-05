<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Seller;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get our sellers
        $sellers = Seller::all();
        
        // Create products from our mock data
        $mockProducts = [
            [
                'name' => 'Minimalist Watch jir',
                'price' => 1949850,
                'image' => 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
                'category' => 'Accessories',
                'rating' => 4.5,
                'sold_count' => 142,
                'description' => "This minimalist watch features a clean design with premium materials. The sleek face and comfortable strap make it perfect for daily wear. Water-resistant up to 30 meters and comes with a scratch-resistant mineral glass face.",
                'specifications' => [
                    'brand' => "Elegant Accessories",
                    'model' => "minimalist-watch-1",
                    'warranty' => "1 Year Limited Warranty",
                    'material' => "Stainless Steel",
                    'waterResistant' => "30m",
                    'batteryLife' => "3 Years"
                ],
                'options' => [
                    [
                        'name' => "Color",
                        'values' => ["Silver", "Gold", "Black"]
                    ],
                    [
                        'name' => "Strap Material",
                        'values' => ["Leather", "Metal", "Silicone"]
                    ]
                ],
                'seller' => 'Elegant Accessories'
            ],
            [
                'name' => 'Modern Backpack',
                'price' => 1349850,
                'image' => 'https://images.unsplash.com/photo-1491637639811-60e2756cc1c7',
                'category' => 'Accessories',
                'rating' => 4.3,
                'sold_count' => 98,
                'description' => "This modern backpack combines style with functionality. Features multiple compartments including a padded laptop sleeve for devices up to 15 inches. Made from water-resistant materials with reinforced stitching for durability.",
                'specifications' => [
                    'brand' => "Urban Bags",
                    'model' => "modern-backpack-2",
                    'warranty' => "2 Year Limited Warranty",
                    'material' => "Polyester, Water-resistant coating",
                    'capacity' => "25L",
                    'laptopCompartment' => "Up to 15 inches"
                ],
                'seller' => 'Urban Bags'
            ],
            [
                'name' => 'Wireless Earbuds',
                'price' => 1199850,
                'image' => 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb',
                'category' => 'Electronics',
                'rating' => 4.7,
                'sold_count' => 256,
                'description' => "Experience premium sound quality with these wireless earbuds. Features active noise cancellation, touch controls, and up to 8 hours of battery life on a single charge. The charging case provides an additional 24 hours of power on the go.",
                'specifications' => [
                    'brand' => "Tech Gadgets",
                    'model' => "wireless-earbuds-3",
                    'warranty' => "1 Year Limited Warranty",
                    'batteryLife' => "8 hours (32 hours with case)",
                    'connectivity' => "Bluetooth 5.0",
                    'noiseReduction' => "Active Noise Cancellation"
                ],
                'seller' => 'Tech Gadgets'
            ],
            [
                'name' => 'Ceramic Mug',
                'price' => 374850,
                'image' => 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d',
                'category' => 'Home Goods',
                'rating' => 4.8,
                'sold_count' => 75,
                'description' => "This handcrafted ceramic mug brings style to your morning coffee routine. The double-walled design keeps your beverages hot longer while staying cool to the touch. Dishwasher and microwave safe.",
                'specifications' => [
                    'brand' => "HomeStyle",
                    'model' => "ceramic-mug-4",
                    'warranty' => "30-Day Quality Guarantee",
                    'material' => "Premium Ceramic",
                    'capacity' => "350ml",
                    'dishwasherSafe' => "Yes"
                ],
                'seller' => 'HomeStyle'
            ],
            [
                'name' => 'Leather Wallet',
                'price' => 749850,
                'image' => 'https://images.unsplash.com/photo-1517254797898-ee1bd2748ce5',
                'category' => 'Accessories',
                'rating' => 4.6,
                'sold_count' => 183,
                'description' => "Crafted from genuine leather, this wallet features a slim profile that fits comfortably in your pocket. Includes 6 card slots, a billfold compartment, and RFID-blocking technology to protect your personal information.",
                'specifications' => [
                    'brand' => "Leather Luxe",
                    'model' => "leather-wallet-5",
                    'warranty' => "1 Year Limited Warranty",
                    'material' => "Genuine Leather",
                    'cardSlots' => "6",
                    'rfidProtection' => "Yes"
                ],
                'seller' => 'Leather Luxe'
            ],
            [
                'name' => 'Desk Lamp',
                'price' => 899850,
                'image' => 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c',
                'category' => 'Home Goods',
                'rating' => 4.2,
                'sold_count' => 67,
                'description' => "This adjustable desk lamp provides perfect lighting for work or reading. Features three brightness levels and color temperature modes. The energy-efficient LED bulbs last up to 50,000 hours and use minimal electricity.",
                'specifications' => [
                    'brand' => "Bright Lights",
                    'model' => "desk-lamp-6",
                    'category' => "Home Goods",
                    'warranty' => "2 Year Limited Warranty",
                    'bulbType' => "LED",
                    'powerConsumption' => "7W",
                    'lightModes' => "3 brightness levels, 3 color temperatures"
                ],
                'seller' => 'HomeStyle'
            ],
        ];
        
        foreach ($mockProducts as $mockProduct) {
            $seller = $sellers->where('name', $mockProduct['seller'])->first();
            
            if ($seller) {
                Product::create([
                    'seller_id' => $seller->id,
                    'name' => $mockProduct['name'],
                    'slug' => Str::slug($mockProduct['name']),
                    'description' => $mockProduct['description'],
                    'price' => $mockProduct['price'],
                    'image' => $mockProduct['image'],
                    'category' => $mockProduct['category'],
                    'rating' => $mockProduct['rating'],
                    'sold_count' => $mockProduct['sold_count'],
                    'specifications' => json_encode($mockProduct['specifications']),
                    'options' => isset($mockProduct['options']) ? json_encode($mockProduct['options']) : null,
                    'is_active' => true,
                ]);
            }
        }
        
        // Create some additional random products for each seller
        foreach ($sellers as $seller) {
            Product::factory(5)->create([
                'seller_id' => $seller->id
            ]);
        }
    }
}
