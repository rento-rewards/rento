<?php

namespace App\Data\Subscription;

use App\Enums\SubscriptionType;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class SubscriptionFormData extends Data
{
    public function __construct(
        public SubscriptionType $type,
        public string $payment_method_id
    ) {
    }
}
