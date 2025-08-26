<?php

namespace App\Data\Leases;

use DateTime;
use Spatie\LaravelData\Attributes\WithCast;
use Spatie\LaravelData\Attributes\WithTransformer;
use Spatie\LaravelData\Casts\DateTimeInterfaceCast;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Transformers\DateTimeInterfaceTransformer;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class LeaseDetailData extends Data
{
    public function __construct(
        public int $id,
        public string $address_line_1,
        public ?string $address_line_2,
        public string $city,
        public string $province,
        public string $postal_code,
        public string $country,
        public float $rent_amount,

        #[WithCast(DateTimeInterfaceCast::class, format: 'Y-m-d')]
        #[WithTransformer(DateTimeInterfaceTransformer::class, format: 'Y-m-d')]
        public DateTime $lease_start_date,

        public int $monthly_due_date,
        public string $landlord_name,
        public string $landlord_email,
        public string $landlord_phone,
    )
    {
    }
}
