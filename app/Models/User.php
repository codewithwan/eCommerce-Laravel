<?php

namespace App\Models;

use App\Enums\UserRole;
// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'role' => UserRole::class,
        ];
    }
    
    /**
     * Check if the user is an admin
     */
    public function isAdmin(): bool
    {
        return $this->role === UserRole::ADMIN;
    }
    
    /**
     * Check if the user is a seller
     */
    public function isSeller(): bool
    {
        return $this->role === UserRole::SELLER;
    }
    
    /**
     * Check if the user is a regular user
     */
    public function isUser(): bool
    {
        return $this->role === UserRole::USER;
    }

    /**
     * Get the seller associated with the user.
     */
    public function seller(): HasOne
    {
        return $this->hasOne(Seller::class);
    }
}
