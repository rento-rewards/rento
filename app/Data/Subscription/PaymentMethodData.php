<?php

namespace App\Data\Subscription;

use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class PaymentMethodData extends Data
{
    public function __construct(
        public string $id,
        public string $brand,
        public string $last4,
        public int    $exp_month,
        public int    $exp_year,
    )
    {
    }
}
