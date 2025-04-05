<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Seller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    /**
     * Display a listing of the products.
     */
    public function index(Request $request)
    {
        $query = Product::query()->where('is_active', true);
        
        if ($request->has('category') && $request->category !== 'All') {
            $query->where('category', $request->category);
        }

        
        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }
        
        $products = $query->latest()->paginate(12);
        
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
        
        return Inertia::render('products', [
            'products' => $products,
            'filters' => [
                'category' => $request->category ?? 'All',
                'search' => $request->search ?? '',
            ],
            'categories' => $categories,
        ]);
    }
    
    /**
     * Display the specified product.
     */
    public function show($id)
    {
        $product = Product::with('seller')->findOrFail($id);
        
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
        
        $product->rating = (float) $product->rating;
        $product->sold_count = (int) $product->sold_count;
        $product->soldCount = (int) $product->sold_count;
        $product->price = (float) $product->price;
        
        if ($product->seller) {
            $product->sellerName = $product->seller->name;
            $product->sellerSlug = $product->seller->slug;
        }
        
        $relatedProducts = Product::with('seller')
            ->where('category', $product->category)
            ->where('id', '!=', $product->id)
            ->where('is_active', true)
            ->take(4)
            ->get();
            
        foreach ($relatedProducts as $relatedProduct) {
            $relatedProduct->rating = (float) $relatedProduct->rating;
            $relatedProduct->sold_count = (int) $relatedProduct->sold_count;
            $relatedProduct->soldCount = (int) $relatedProduct->sold_count;
            $relatedProduct->price = (float) $relatedProduct->price;
            
            if (!empty($relatedProduct->options)) {
                if (is_string($relatedProduct->options)) {
                    $relatedProduct->options = json_decode($relatedProduct->options, true);
                }
                if (!is_array($relatedProduct->options)) {
                    $relatedProduct->options = [];
                }
            } else {
                $relatedProduct->options = [];
            }
            
            if ($relatedProduct->seller) {
                $relatedProduct->sellerName = $relatedProduct->seller->name;
                $relatedProduct->sellerSlug = $relatedProduct->seller->slug;
            }
        }
        
        return Inertia::render('product-detail', [
            'product' => $product,
            'relatedProducts' => $relatedProducts,
        ]);
    }
    
    /**
     * Display products by a specific seller.
     */
    public function sellerProducts($sellerId)
    {
        $seller = Seller::findOrFail($sellerId);
        
        $products = $seller->products()
            ->where('is_active', true)
            ->latest()
            ->get();
            
        return Inertia::render('products', [
            'seller' => $seller,
            'products' => [
                'data' => $products,
                'current_page' => 1,
                'last_page' => 1,
                'per_page' => count($products),
                'total' => count($products),
                'path' => route('sellers.products', ['id' => $sellerId]),
                'from' => 1,
                'to' => count($products),
            ],
            'filters' => [
                'category' => 'All',
                'search' => '',
            ],
            'categories' => $products->pluck('category')->unique()->toArray(),
        ]);
    }

    /**
     * Show the form for creating a new product.
     */
    public function create()
    {
        $user = Auth::user();
        
        if (!$user) {
            return redirect()->route('login');
        }
        
        $seller = Seller::where('user_id', $user->id)->first();
        
        if (!$seller) {
            return redirect()->route('seller.dashboard')
                ->with('error', 'You need a seller account to create products');
        }
        
        $categories = Product::distinct()->pluck('category')->toArray();
        
        return Inertia::render('seller/product-form', [
            'seller' => $seller,
            'categories' => $categories,
            'action' => 'create'
        ]);
    }

    /**
     * Store a newly created product in storage.
     */
    public function store(Request $request)
    {
        $user = Auth::user();
        
        if (!$user) {
            return redirect()->route('login');
        }
        
        $seller = Seller::where('user_id', $user->id)->first();
        
        if (!$seller) {
            return redirect()->route('seller.dashboard')
                ->with('error', 'You need a seller account to create products');
        }
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string|max:100',
            'price' => 'required|numeric|min:0',
            'image' => 'required|string',
            'specifications' => 'nullable|string',
            'options' => 'nullable|string',
            'is_active' => 'boolean',
        ]);
        
        $validated['seller_id'] = $seller->id;
        $validated['slug'] = Str::slug($validated['name']);
        
        $validated['rating'] = 0;
        $validated['sold_count'] = 0;
        
        $product = Product::create($validated);
        
        return redirect()->route('seller.dashboard')
            ->with('success', 'Product created successfully');
    }

    /**
     * Show the form for editing the specified product.
     */
    public function edit($id)
    {
        $user = Auth::user();
        
        if (!$user) {
            return redirect()->route('login');
        }
        
        $seller = Seller::where('user_id', $user->id)->first();
        
        if (!$seller) {
            return redirect()->route('seller.dashboard')
                ->with('error', 'You need a seller account to edit products');
        }
        
        $product = Product::where('id', $id)
            ->where('seller_id', $seller->id)
            ->firstOrFail();
        
        if (!empty($product->options)) {
            if (is_string($product->options)) {
                $product->options = json_decode($product->options, true);
            }
        }
        
        if (!empty($product->specifications)) {
            if (is_string($product->specifications)) {
                $product->specifications = json_decode($product->specifications, true);
            }
        }
        
        $categories = Product::distinct()->pluck('category')->toArray();
        
        return Inertia::render('seller/product-form', [
            'seller' => $seller,
            'product' => $product,
            'categories' => $categories,
            'action' => 'edit'
        ]);
    }

    /**
     * Update the specified product in storage.
     */
    public function update(Request $request, $id)
    {
        $user = Auth::user();
        
        if (!$user) {
            return redirect()->route('login');
        }
        
        $seller = Seller::where('user_id', $user->id)->first();
        
        if (!$seller) {
            return redirect()->route('seller.dashboard')
                ->with('error', 'You need a seller account to update products');
        }
        
        $product = Product::where('id', $id)
            ->where('seller_id', $seller->id)
            ->firstOrFail();
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string|max:100',
            'price' => 'required|numeric|min:0',
            'image' => 'required|string',
            'specifications' => 'nullable|string',
            'options' => 'nullable|string',
            'is_active' => 'boolean',
        ]);
        
        if ($product->name !== $validated['name']) {
            $validated['slug'] = Str::slug($validated['name']);
        }
        
        $product->update($validated);
        
        return redirect()->route('seller.dashboard')
            ->with('success', 'Product updated successfully');
    }
}
