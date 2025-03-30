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
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'role' => UserRole::ADMIN,
        ]);

        // Create 3 Seller users
        User::factory()->count(3)->create([
            'role' => UserRole::SELLER,
        ]);

        // Create 10 regular users
        User::factory()->count(10)->create([
            'role' => UserRole::USER,
        ]);
    }
}
