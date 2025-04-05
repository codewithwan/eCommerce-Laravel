<?php

use App\Models\User;
use App\Enums\UserRole;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test('non-admin users cannot access admin dashboard', function () {
    $user = User::factory()->create(['role' => UserRole::USER]);
    
    $this->actingAs($user);
    
    $response = $this->get(route('admin.dashboard'));
    
    $response->assertStatus(302);
});

test('sellers cannot access admin dashboard', function () {
    $user = User::factory()->create(['role' => UserRole::SELLER]);
    
    $this->actingAs($user);
    
    $response = $this->get(route('admin.dashboard'));
    
    $response->assertStatus(302);
});

test('admin users can access admin dashboard', function () {
    $user = User::factory()->create(['role' => UserRole::ADMIN]);
    
    $this->actingAs($user);
    
    $response = $this->get(route('admin.dashboard'));
    
    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page->component('admin/dashboard'));
}); 