<?php

use App\Models\User;
use App\Enums\UserRole;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test('user role middleware restricts access properly', function () {
    // Create users with different roles
    $adminUser = User::factory()->create(['role' => UserRole::ADMIN]);
    $sellerUser = User::factory()->create(['role' => UserRole::SELLER]);
    $regularUser = User::factory()->create(['role' => UserRole::USER]);
    
    // Test admin routes
    $this->actingAs($adminUser)
         ->get(route('admin.dashboard'))
         ->assertStatus(200);
         
    $this->actingAs($sellerUser)
         ->get(route('admin.dashboard'))
         ->assertStatus(302);
         
    $this->actingAs($regularUser)
         ->get(route('admin.dashboard'))
         ->assertStatus(302);
    
    // Test seller routes
    $this->actingAs($sellerUser)
         ->get(route('seller.dashboard'))
         ->assertStatus(200);
         
    $this->actingAs($regularUser)
         ->get(route('seller.dashboard'))
         ->assertStatus(302);
});

test('unauthenticated users are redirected to login', function () {
    $this->get(route('seller.dashboard'))->assertRedirect('/login');
    $this->get(route('admin.dashboard'))->assertRedirect('/login');
    $this->get(route('checkout'))->assertRedirect('/login');
});

test('dashboard redirects users based on role', function () {
    $adminUser = User::factory()->create(['role' => UserRole::ADMIN]);
    $sellerUser = User::factory()->create(['role' => UserRole::SELLER]);
    $regularUser = User::factory()->create(['role' => UserRole::USER]);
    
    // Admin should be redirected to admin dashboard
    $this->actingAs($adminUser)
         ->get('/dashboard')
         ->assertRedirect(route('admin.dashboard'));
    
    // Seller should be redirected to seller dashboard
    $this->actingAs($sellerUser)
         ->get('/dashboard')
         ->assertRedirect(route('seller.dashboard'));
    
    // Regular user should be redirected somewhere else or see a generic dashboard
    $this->actingAs($regularUser)
         ->get('/dashboard')
         ->assertRedirect();
}); 