<?php

use App\Models\Product;
use App\Models\User;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test('guests can view shopping cart', function () {
    $response = $this->get(route('shopping-cart'));
    
    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page->component('shopping-cart'));
});

test('guests cannot access checkout', function () {
    $response = $this->get(route('checkout'));
    
    $response->assertRedirect('/login');
});

test('authenticated users can access checkout', function () {
    $user = User::factory()->create();
    
    $this->actingAs($user);
    
    $response = $this->get(route('checkout'));
    
    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page->component('checkout'));
});

test('cart session data persists between requests', function () {
    $product = Product::factory()->create();
    
    $cartItem = [
        'id' => $product->id,
        'name' => $product->name,
        'price' => $product->price,
        'quantity' => 2,
        'image' => $product->image
    ];
    
    $this->withSession(['cart' => [$cartItem]]);
    
    $response = $this->get(route('shopping-cart'));
    
    $response->assertSessionHas('cart', [$cartItem]);
});

test('users can view order history', function () {
    $user = User::factory()->create();
    
    $this->actingAs($user);
    
    $response = $this->get(route('order-history'));
    
    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page->component('order-history'));
}); 