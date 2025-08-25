<?php

namespace App\Data\Reports;

use DateTime;
use Illuminate\Http\UploadedFile;
use Spatie\LaravelData\Attributes\Validation\GreaterThan;
use Spatie\LaravelData\Attributes\Validation\GreaterThanOrEqualTo;
use Spatie\LaravelData\Attributes\Validation\LessThanOrEqualTo;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\Validation\MimeTypes;
use Spatie\LaravelData\Attributes\Validation\RequiredIf;
use Spatie\LaravelData\Attributes\WithCast;
use Spatie\LaravelData\Attributes\WithTransformer;
use Spatie\LaravelData\Casts\DateTimeInterfaceCast;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Transformers\DateTimeInterfaceTransformer;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;
use Symfony\Contracts\Service\Attribute\Required;

#[TypeScript]
class ReportData extends Data
{
    public function __construct(
        #[Required, GreaterThan(0)]
        public float        $payment_amount,

        #[WithCast(DateTimeInterfaceCast::class, format: 'Y-m-d')]
        #[WithTransformer(DateTimeInterfaceTransformer::class, format: 'Y-m-d')]
        public DateTime                      $payment_date,

        #[Required, GreaterThanOrEqualTo(1), LessThanOrEqualTo(12)]
        public int                           $due_month,

        #[Required, GreaterThanOrEqualTo(2000), LessThanOrEqualTo(2100)]
        public int                           $due_year,

        public bool $need_upload = true,

        #[RequiredIf('need_upload', '1'), Max(2048), MimeTypes(['image/*', 'application/pdf'])]
        public ?UploadedFile $proof_of_payment,
    )
    {
    }
}
