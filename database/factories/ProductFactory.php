<?php

namespace Database\Factories;

use App\Models\Seller;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = ['Electronics', 'Apparel', 'Home Goods', 'Accessories'];
        $name = fake()->words(2, true);
        $category = $categories[array_rand($categories)];
        $price = fake()->numberBetween(10000, 3000000);
        
        return [
            'seller_id' => Seller::factory(),
            'name' => ucfirst($name),
            'slug' => Str::slug($name),
            'description' => fake()->paragraphs(3, true),
            'price' => $price,
            'image' => 'https://picsum.photos/seed/' . Str::slug($name) . '/800/800',
            'category' => $category,
            'rating' => fake()->randomFloat(1, 3.0, 5.0),
            'sold_count' => fake()->numberBetween(0, 500),
            'specifications' => json_encode([
                'brand' => fake()->company(),
                'model' => Str::slug($name) . '-' . fake()->randomNumber(3),
                'warranty' => fake()->randomElement(['1 Year', '2 Years', '6 Months']),
                'material' => fake()->word(),
            ]),
            'options' => $this->getOptionsForCategory($category),
            'is_active' => true,
        ];
    }
    
    /**
     * Generate appropriate options based on product category
     */
    private function getOptionsForCategory(string $category): ?string
    {
        $options = [];
        
        if ($category === 'Apparel') {
            $options = [
                [
                    'name' => 'Size',
                    'values' => ['S', 'M', 'L', 'XL', 'XXL'],
                ],
                [
                    'name' => 'Color',
                    'values' => ['Black', 'White', 'Blue', 'Red', 'Green'],
                ],
            ];
        } elseif ($category === 'Electronics') {
            $options = [
                [
                    'name' => 'Color',
                    'values' => ['Black', 'White', 'Silver'],
                ],
            ];
        } elseif ($category === 'Accessories') {
            $options = [
                [
                    'name' => 'Color',
                    'values' => ['Gold', 'Silver', 'Black', 'Brown'],
                ],
                [
                    'name' => 'Material',
                    'values' => ['Leather', 'Metal', 'Plastic', 'Fabric'],
                ],
            ];
        }
        
        return !empty($options) ? json_encode($options) : null;
    }
}
