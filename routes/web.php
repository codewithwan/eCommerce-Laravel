<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('welcome');  // Changed from 'home' to 'welcome'

// Product detail route
Route::get('/products/{id}', function ($id) {
    // In a real app, you would fetch the product from a database
    // For demo, we'll use mock data from the frontend
    return Inertia::render('product-detail', [
        'productId' => (int) $id,
    ]);
})->name('product.detail');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
