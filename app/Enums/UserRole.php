<?php

namespace App\Enums;

enum UserRole: string
{
    case ADMIN = 'admin';
    case SELLER = 'seller';
    case USER = 'user';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
