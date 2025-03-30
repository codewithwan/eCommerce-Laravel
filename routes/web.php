<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('welcome');  // Changed from 'home' to 'welcome'

// Product detail route
Route::get('/products/{id}', function ($id) {
    return Inertia::render('product-detail', [
        'productId' => (int) $id,
    ]);
})->name('product.detail');

// Cart route
Route::get('/shopping-cart', function () {
    return Inertia::render('shopping-cart');
})->name('shopping-cart');

// Order history route
Route::get('/order-history', function () {
    return Inertia::render('order-history');
})->name('order-history');

// Checkout route
Route::get('/checkout', function () {
    return Inertia::render('checkout');
})->name('checkout');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
