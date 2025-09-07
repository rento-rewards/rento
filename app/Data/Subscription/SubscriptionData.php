<?php

namespace App\Data\Subscription;

use App\Enums\SubscriptionType;
use Carbon\Carbon;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class SubscriptionData extends Data
{
    public function __construct(
        public SubscriptionType $type,
        public PaymentMethodData $payment_method,
        public Carbon $next_billing_date,
        public bool $on_grace_period,
    ) {
    }
}

