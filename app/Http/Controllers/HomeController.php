<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Seller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display the home page with featured products
     */
    public function index()
    {
        // Get all active products with their sellers
        $products = Product::with('seller')
            ->where('is_active', true)
            ->latest()
            ->get();
            
        // Ensure proper numeric types for all products
        foreach ($products as $product) {
            $product->rating = (float) $product->rating;
            $product->sold_count = (int) $product->sold_count;
            $product->soldCount = (int) $product->sold_count;
            $product->price = (float) $product->price;
            
            // Add seller name to product
            if ($product->seller) {
                $product->sellerName = $product->seller->name;
                $product->sellerSlug = $product->seller->slug;
            } else {
                $product->sellerName = 'Shop';
            }
        }
        
        // Get unique categories
        $categories = Product::where('is_active', true)
            ->distinct()
            ->pluck('category')
            ->toArray();
            
        // Get top 3 stores by average rating
        $topStores = Seller::where('is_active', true)
            ->get()
            ->map(function ($seller) {
                // Calculate average rating for seller's products
                $avgRating = Product::where('seller_id', $seller->id)
                    ->where('is_active', true)
                    ->avg('rating') ?: 0;
                    
                // Get product count
                $productCount = Product::where('seller_id', $seller->id)
                    ->where('is_active', true)
                    ->count();
                    
                // Get total sales
                $totalSales = Product::where('seller_id', $seller->id)
                    ->sum('sold_count');
                
                // Add these properties to the seller
                $seller->average_rating = (float) $avgRating;
                $seller->product_count = (int) $productCount;
                $seller->total_sales = (int) $totalSales;
                
                return $seller;
            })
            ->sortByDesc('average_rating')
            ->take(3)
            ->values()
            ->all();
        
        return Inertia::render('welcome', [
            'products' => $products,
            'categories' => $categories,
            'topStores' => $topStores,
        ]);
    }
} 