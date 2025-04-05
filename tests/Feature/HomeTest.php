<?php

use App\Models\Product;
use App\Models\Seller;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test('home page can be rendered', function () {
    $response = $this->get('/');
    
    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page->component('welcome'));
});

test('home page displays products', function () {
    $products = Product::factory(5)->create(['is_active' => true]);
    
    $response = $this->get('/');
    
    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => 
        $page->component('welcome')
            ->has('products')
    );
});

test('home page displays categories', function () {
    Product::factory()->create(['category' => 'Electronics', 'is_active' => true]);
    Product::factory()->create(['category' => 'Clothing', 'is_active' => true]);
    Product::factory()->create(['category' => 'Books', 'is_active' => true]);
    
    $response = $this->get('/');
    
    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => 
        $page->component('welcome')
            ->has('categories')
    );
});

test('home page displays top stores', function () {
    $sellers = Seller::factory(3)->create(['is_active' => true]);
    
    // Create products for each seller to generate ratings
    foreach ($sellers as $seller) {
        Product::factory(3)->create([
            'seller_id' => $seller->id,
            'is_active' => true,
            'rating' => 4.5
        ]);
    }
    
    $response = $this->get('/');
    
    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => 
        $page->component('welcome')
            ->has('topStores')
    );
}); 