<?php

namespace App\Data\Subscription;

use App\Enums\SubscriptionType;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class SubscriptionFormData
{
    public function __construct(
        public SubscriptionType $type,
        public string $payment_method_id
    ) {
    }
}
