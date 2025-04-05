<?php

namespace App\Http\Controllers;

use App\Enums\UserRole;
use App\Models\Seller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use App\Models\Product;

class SellerController extends Controller
{
    /**
     * Display a dashboard for the seller.
     */
    public function dashboard()
    {
        $user = Auth::user();
        
        if (!$user) {
            return redirect()->route('login');
        }
        
        $seller = Seller::where('user_id', $user->id)->first();
        
        if (!$seller) {
            if ($user->role === UserRole::SELLER) {
                $slug = Str::slug($user->name);
                
                if (Seller::where('slug', $slug)->exists()) {
                    $slug = $slug . '-' . Str::random(5);
                }
                
                $seller = Seller::create([
                    'user_id' => $user->id,
                    'name' => $user->name . "'s Shop",
                    'slug' => $slug,
                    'description' => 'Shop by ' . $user->name,
                    'logo' => 'https://picsum.photos/seed/' . $slug . '/200/200',
                    'banner' => 'https://picsum.photos/seed/' . $slug . '-banner/1200/400',
                    'is_active' => true,
                ]);
            } else {
                return redirect()->route('seller.register')
                    ->with('message', 'Anda perlu membuat akun seller untuk mengakses dashboard');
            }
        }
        
        $products = $seller->products()->latest()->get();
        
        $totalProducts = $products->count();
        $totalSales = $products->sum('sold_count');
        $activeProducts = $products->where('is_active', true)->count();
        $averageRating = $products->count() > 0 ? $products->avg('rating') : 0;
        
        foreach ($products as $product) {
            $product->rating = (float) $product->rating;
            $product->sold_count = (int) $product->sold_count;
            $product->price = (float) $product->price;
            
            if (!empty($product->options)) {
                if (is_string($product->options)) {
                    $product->options = json_decode($product->options, true);
                }
                if (!is_array($product->options)) {
                    $product->options = [];
                }
            } else {
                $product->options = [];
            }
            
            if (!empty($product->specifications)) {
                if (is_string($product->specifications)) {
                    $product->specifications = json_decode($product->specifications, true);
                }
                if (!is_array($product->specifications)) {
                    $product->specifications = [];
                }
            } else {
                $product->specifications = [];
            }
        }
        
        $formattedSeller = [
            'id' => $seller->id,
            'name' => $seller->name,
            'description' => $seller->description,
            'logo' => $seller->logo,
            'banner' => $seller->banner,
            'slug' => $seller->slug,
            'is_active' => (bool) $seller->is_active,
            'created_at' => $seller->created_at,
            'updated_at' => $seller->updated_at,
        ];
        
        return Inertia::render('seller/dashboard', [
            'seller' => $formattedSeller,
            'products' => $products,
            'stats' => [
                'totalProducts' => $totalProducts,
                'totalSales' => $totalSales,
                'activeProducts' => $activeProducts,
                'averageRating' => round($averageRating, 1),
            ],
        ]);
    }
    
    /**
     * Display all sellers for the marketplace.
     */
    public function index()
    {
        $sellers = Seller::where('is_active', true)->get();
        
        return Inertia::render('sellers', [
            'sellers' => $sellers,
        ]);
    }
    
    /**
     * Display the specified seller profile.
     */
    public function show($slug)
    {
        $seller = Seller::where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();
            
        $products = Product::where('seller_id', $seller->id)
            ->where('is_active', true)
            ->latest()
            ->get();
            
        foreach ($products as $product) {
            $product->rating = (float) $product->rating;
            $product->sold_count = (int) $product->sold_count;
            $product->price = (float) $product->price;
            
            if (!empty($product->options)) {
                if (is_string($product->options)) {
                    $product->options = json_decode($product->options, true);
                }
                if (!is_array($product->options)) {
                    $product->options = [];
                }
            } else {
                $product->options = [];
            }
            
            if (!empty($product->specifications)) {
                if (is_string($product->specifications)) {
                    $product->specifications = json_decode($product->specifications, true);
                }
                if (!is_array($product->specifications)) {
                    $product->specifications = [];
                }
            } else {
                $product->specifications = [];
            }
        }
        
        return Inertia::render('seller-profile', [
            'seller' => $seller,
            'products' => $products,
        ]);
    }

    /**
     * Display the seller's store page.
     */
    public function store()
    {
        $user = Auth::user();
        
        if (!$user) {
            return redirect()->route('login');
        }
        
        $seller = Seller::where('user_id', $user->id)->first();
        
        if (!$seller) {
            return redirect()->route('seller.register')
                ->with('message', 'Anda perlu membuat akun seller untuk mengakses toko Anda');
        }
        
        $products = Product::where('seller_id', $seller->id)
            ->orderBy('created_at', 'desc')
            ->get();
        
        $categories = $products->pluck('category')->unique()->filter()->values()->all();
        
        $averageRating = $products->avg('rating') ?: 0;
        
        $seller->product_count = $products->count();
        $seller->average_rating = $averageRating;
        
        return Inertia::render('seller/store', [
            'seller' => $seller,
            'products' => $products,
            'categories' => $categories,
        ]);
    }
}
