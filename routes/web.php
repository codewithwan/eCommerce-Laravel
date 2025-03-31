<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

// Public routes - accessible to all
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

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

// Authenticated user routes
Route::middleware(['auth', 'verified'])->group(function () {
    // Order history route
    Route::get('/order-history', function () {
        return Inertia::render('order-history');
    })->name('order-history');

    // Checkout route
    Route::get('/checkout', function () {
        return Inertia::render('checkout');
    })->name('checkout');
});

// Dashboard route - restricted to admin and seller only
Route::middleware(['auth', 'verified', 'role:admin,seller'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('seller/dashboard');
    })->name('dashboard');
});

// Include auth routes and settings
require __DIR__.'/auth.php';
require __DIR__.'/settings.php';
