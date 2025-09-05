<?php

namespace App\Enums;

use Spatie\TypeScriptTransformer\Attributes\TypeScript;

enum SubscriptionType: string
{
    case MONTHLY = 'monthly';
    case YEARLY = 'yearly';

    public function getId(): string {
        return match ($this) {
            self::MONTHLY => env('STRIPE_MONTHLY_PRICE_ID'),
            self::YEARLY => env('STRIPE_YEARLY_PRICE_ID'),
        };
    }

    public static function fromId(?string $id): ?self {
        return match ($id) {
            env('STRIPE_MONTHLY_PRICE_ID') => self::MONTHLY,
            env('STRIPE_YEARLY_PRICE_ID') => self::YEARLY,
            default => null,
        };
    }
}
