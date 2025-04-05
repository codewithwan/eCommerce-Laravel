<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    /**
     * Display order history for the authenticated user
     */
    public function history()
    {
        $user = Auth::user();
        
        if (!$user) {
            return redirect()->route('login');
        }
        
        $orders = [];
        
        return Inertia::render('order-history', [
            'orders' => $orders,
        ]);
    }
} 