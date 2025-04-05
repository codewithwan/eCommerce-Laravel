<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Enums\UserRole;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Admin user
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('password'),
            'role' => UserRole::ADMIN,
        ]);

        // Create a basic Seller user
        User::factory()->create([
            'name' => 'Seller User',
            'email' => 'seller@gmail.com',
            'password' => Hash::make('password'),
            'role' => UserRole::SELLER,
        ]);
        
        // Create a basic regular user
        User::factory()->create([
            'name' => 'Regular User',
            'email' => 'user@gmail.com',
            'password' => Hash::make('password'),
            'role' => UserRole::USER,
        ]);

        // Create additional regular users (not sellers)
        User::factory()->count(10)->create([
            'role' => UserRole::USER,
            'password' => Hash::make('password'),
        ]);
    }
}
