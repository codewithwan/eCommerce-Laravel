<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SellerController;
use App\Http\Controllers\AdminController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Enums\UserRole;

/*
|--------------------------------------------------------------------------
| Public Routes - Accessible to all
|--------------------------------------------------------------------------
*/
Route::get('/', [HomeController::class, 'index'])->name('home');

// Product routes (public)
Route::prefix('products')->name('products.')->group(function () {
    Route::get('/', [ProductController::class, 'index'])->name('index');
    Route::get('/{id}', [ProductController::class, 'show'])->name('show');
});

// Seller routes (public)
Route::prefix('sellers')->name('sellers.')->group(function () {
    Route::get('/', [SellerController::class, 'index'])->name('index');
    Route::get('/{slug}', [SellerController::class, 'show'])->name('show');
    Route::get('/{id}/products', [ProductController::class, 'sellerProducts'])->name('products');
});

// Cart route (public)
Route::get('/shopping-cart', [CartController::class, 'index'])->name('shopping-cart');

/*
|--------------------------------------------------------------------------
| Authenticated User Routes
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified'])->group(function () {
    // Order history route
    Route::get('/order-history', [OrderController::class, 'history'])->name('order-history');

    // Checkout route
    Route::get('/checkout', [CartController::class, 'checkout'])->name('checkout');
    
    // Seller registration routes
    Route::prefix('become-seller')->group(function () {
        Route::get('/', [SellerController::class, 'showRegistrationForm'])->name('seller.register');
        Route::post('/', [SellerController::class, 'register'])->name('seller.register.store');
    });
    
    // Dashboard redirect
    Route::get('/dashboard', function() {
        if (Auth::user()->role === UserRole::ADMIN) {
            return redirect()->route('admin.dashboard');
        }
        return redirect()->route('seller.dashboard');
    })->name('dashboard');
});

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');
    
    // Tambahkan route admin lainnya di sini
    // Route::resource('users', UserController::class);
    // Route::resource('settings', SettingController::class);
});

/*
|--------------------------------------------------------------------------
| Seller Routes
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified', 'role:seller'])->prefix('seller')->name('seller.')->group(function () {
    // Seller dashboard
    Route::get('/dashboard', [SellerController::class, 'dashboard'])->name('dashboard');
    
    // Seller store page
    Route::get('/store', [SellerController::class, 'store'])->name('store');
    
    // Seller product management
    Route::prefix('products')->name('products.')->group(function () {
        Route::get('/', [ProductController::class, 'sellerProducts'])->name('index');
        Route::get('/create', [ProductController::class, 'create'])->name('create');
        Route::post('/', [ProductController::class, 'store'])->name('store');
        Route::get('/{id}/edit', [ProductController::class, 'edit'])->name('edit');
        Route::put('/{id}', [ProductController::class, 'update'])->name('update');
    });
});

// Products edit route (for compatibility)
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/products/{id}/edit', [ProductController::class, 'edit'])->name('products.edit');
});

// Include auth routes and settings
require __DIR__.'/auth.php';
require __DIR__.'/settings.php';
