<?php

namespace App\Console\Commands;

use App\Enums\UserRole;
use App\Models\Seller;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class FixSellerRoles extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:fix-seller-roles';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fix seller roles in the database';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Fixing user roles for sellers...');
        
        $sellers = Seller::all();
        $count = 0;
        
        foreach ($sellers as $seller) {
            $user = User::find($seller->user_id);
            
            if ($user && $user->role !== UserRole::SELLER && $user->role !== UserRole::ADMIN) {
                $this->line("Updating user {$user->name} (ID: {$user->id}) to role SELLER");
                $user->role = UserRole::SELLER;
                $user->save();
                $count++;
            }
        }
        
        $this->info("Updated $count users to SELLER role.");
    }
} 