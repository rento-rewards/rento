<?php

namespace App\Data\Subscription;

use App\Casts\MoneyCast;
use App\Enums\PaymentStatus;
use Carbon\Carbon;
use Carbon\CarbonImmutable;
use Spatie\LaravelData\Attributes\Validation\StartsWith;
use Spatie\LaravelData\Attributes\WithCast;
use Spatie\LaravelData\Casts\DateTimeInterfaceCast;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class InvoiceTableData extends Data
{
    public function __construct(
        #[StartsWith('in_')]
        public string $id,

        public Carbon $date,

        #[WithCast(MoneyCast::class)]
        public string $total,

        public PaymentStatus $status,
    )
    {
    }
}
