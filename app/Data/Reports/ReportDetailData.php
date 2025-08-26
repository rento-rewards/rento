<?php

namespace App\Data\Reports;

use App\Data\Leases\LeaseDetailData;
use App\Enums\ReportStatus;
use Carbon\CarbonImmutable;
use Spatie\LaravelData\Attributes\AutoInertiaLazy;
use Spatie\LaravelData\Attributes\Validation\RequiredIf;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Lazy;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class ReportDetailData extends Data
{
    public function __construct(
        public int             $id,
        public float           $payment_amount,

        public CarbonImmutable $payment_date,

        public int             $due_month,
        public int             $due_year,

        public ReportStatus    $status,

        public CarbonImmutable $created_at,

        #[RequiredIf("status", ReportStatus::VERIFIED)]
        public ?CarbonImmutable $verified_at,

        #[RequiredIf("status", ReportStatus::REPORTED)]
        public ?CarbonImmutable $report_date,
    )
    {
    }
}
