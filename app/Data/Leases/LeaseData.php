<?php

namespace App\Data\Leases;

use DateTime;
use Illuminate\Http\UploadedFile;
use Spatie\LaravelData\Attributes\Validation\Email;
use Spatie\LaravelData\Attributes\Validation\GreaterThan;
use Spatie\LaravelData\Attributes\Validation\GreaterThanOrEqualTo;
use Spatie\LaravelData\Attributes\Validation\LessThanOrEqualTo;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\Validation\MimeTypes;
use Spatie\LaravelData\Attributes\Validation\Regex;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Attributes\WithCast;
use Spatie\LaravelData\Attributes\WithTransformer;
use Spatie\LaravelData\Casts\DateTimeInterfaceCast;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Transformers\DateTimeInterfaceTransformer;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class LeaseData extends Data
{
    public function __construct(
        #[Required]
        public string $address_line_1,
        public ?string $address_line_2,
        #[Required]
        public string $city,
        #[Required]
        public string $province,
        #[Required]
        public string $postal_code,
        #[Required]
        public string $country,

        #[Required, GreaterThan(0)]
        public float $rent_amount,

        #[WithCast(DateTimeInterfaceCast::class, format: 'Y-m-d')]
        #[WithTransformer(DateTimeInterfaceTransformer::class, format: 'Y-m-d')]
        public DateTime $lease_start_date,

        #[Required, GreaterThanOrEqualTo(1), LessThanOrEqualTo(31)]
        public int $monthly_due_date,

        #[Required]
        public string $landlord_name,
        #[Required, Email]
        public string $landlord_email,
        #[Required, Regex('/^\+?\d{10,15}$/')]
        public string $landlord_phone,

        #[Required, MimeTypes(['image/*', 'application/pdf']), Max(2048)]
        public UploadedFile $document,
    ) {
    }

    public static function messages(...$args): array
    {
        return [
            'landlord_phone.regex' => 'Invalid phone number format',
        ];
    }

    public static function rulesMetadata(): array
    {
        return [
            'mime_types' => ['image/*', 'application/pdf'],
            'max_size' => 2048,
        ];
    }
}
