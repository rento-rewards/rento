<?php

namespace App\Data\Subscription;

use App\Enums\SubscriptionType;
use Spatie\LaravelData\Data;

class SubscriptionUpdateData extends Data
{
    public function __construct(
        public SubscriptionType $type
    ) {
    }
}
