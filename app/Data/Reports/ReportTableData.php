<?php

namespace App\Data\Reports;

use App\Enums\ReportStatus;
use Carbon\CarbonImmutable;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class ReportTableData extends Data
{
    public function __construct(
        public int $id,

        public CarbonImmutable $created_at,

        public float $payment_amount,

        public CarbonImmutable $payment_date,

        public ReportStatus $status,
    ) {

    }
}
