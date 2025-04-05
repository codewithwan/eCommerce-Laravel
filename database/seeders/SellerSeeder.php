<?php

namespace Database\Seeders;

use App\Models\Seller;
use App\Models\User;
use App\Enums\UserRole;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Faker\Factory as FakerFactory;

class SellerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = FakerFactory::create();

        // Create some predefined sellers
        $sellerNames = [
            'Elegant Accessories',
            'Urban Bags',
            'Tech Gadgets',
            'HomeStyle',
            'Leather Luxe',
        ];
        
        // Create sellers from seller users
        for ($i = 0; $i < 10; $i++) {
            $sellerName = $sellerNames[$i];
            $slug = Str::slug($sellerName);
            $description = $faker->paragraph();
            
            // Update: Ensure user has seller role before creating a seller account
            $user = \App\Models\User::where('email', Str::slug($sellerName) . '@example.com')->first();
            if (!$user) {
                // Create a user for this seller if not exists
                $user = \App\Models\User::create([
                    'name' => $sellerName . ' Admin',
                    'email' => Str::slug($sellerName) . '@example.com',
                    'password' => Hash::make('password'),
                    'role' => \App\Enums\UserRole::SELLER, // Set as seller immediately
                    'email_verified_at' => now(),
                    'remember_token' => Str::random(10),
                ]);
            } else {
                // Ensure existing user has seller role
                $user->role = \App\Enums\UserRole::SELLER;
                $user->save();
            }
            
            Seller::create([
                'user_id' => $user->id,
                'name' => $sellerName,
                'slug' => $slug,
                'description' => $description,
                'logo' => 'https://picsum.photos/seed/' . $slug . '/200/200',
                'banner' => 'https://picsum.photos/seed/' . $slug . '-banner/1200/400',
                'is_active' => true,
            ]);
        }
        
        // Create some random sellers with users that have SELLER role
        User::factory(5)->create([
            'role' => UserRole::SELLER,
            'password' => Hash::make('password'), // Set a default password
        ])->each(function ($user) {
            Seller::factory()->create([
                'user_id' => $user->id
            ]);
        });
    }
}
