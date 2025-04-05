<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display the home page with featured products
     */
    public function index()
    {
        $products = Product::with('seller')
            ->where('is_active', true)
            ->latest()
            ->get();
            
        foreach ($products as $product) {
            $product->rating = (float) $product->rating;
            $product->sold_count = (int) $product->sold_count;
            $product->soldCount = (int) $product->sold_count;
            $product->price = (float) $product->price;
            
            if ($product->seller) {
                $product->sellerName = $product->seller->name;
                $product->sellerSlug = $product->seller->slug;
            } else {
                $product->sellerName = 'Shop';
            }
        }
        
        $categories = Product::where('is_active', true)
            ->distinct()
            ->pluck('category')
            ->toArray();
        
        return Inertia::render('welcome', [
            'products' => $products,
            'categories' => $categories,
        ]);
    }
} 