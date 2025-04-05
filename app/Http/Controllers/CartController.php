<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    /**
     * Display the shopping cart page.
     */
    public function index()
    {
        $suggestedProducts = Product::where('is_active', true)
            ->inRandomOrder()
            ->take(6)
            ->get();
            
        foreach ($suggestedProducts as $product) {
            $product->rating = (float) $product->rating;
            $product->sold_count = (int) $product->sold_count;
            $product->price = (float) $product->price;
            
            if (!isset($product->sellerName) && $product->seller) {
                $product->sellerName = $product->seller->name;
            }
        }
        
        return Inertia::render('shopping-cart', [
            'suggestedProducts' => $suggestedProducts,
        ]);
    }
    
    /**
     * Display the checkout page.
     */
    public function checkout()
    {
        return Inertia::render('checkout');
    }
} 