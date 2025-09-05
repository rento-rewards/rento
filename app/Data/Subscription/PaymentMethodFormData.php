<?php

namespace App\Data\Subscription;

use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Attributes\Validation\StartsWith;
use Spatie\LaravelData\Data;

class PaymentMethodFormData extends Data
{
    public function __construct(
        #[Required, StartsWith("pm_")]
        public string $payment_method_id
    ) {
    }
}
