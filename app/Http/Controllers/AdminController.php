<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Seller;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Enums\UserRole;

class AdminController extends Controller
{
    /**
     * Display admin dashboard with site-wide statistics.
     */
    public function dashboard()
    {
        $user = Auth::user();
        
        if (!$user || $user->role !== UserRole::ADMIN) {
            return redirect()->route('home');
        }
        
        $stats = [
            'totalUsers' => User::count(),
            'totalSellers' => Seller::count(),
            'totalOrders' => 0,
            'totalRevenue' => 0,
        ];
        
        return Inertia::render('admin/dashboard', [
            'stats' => $stats,
        ]);
    }
} 