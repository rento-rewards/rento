<?php

namespace App\Data\Reports;

use App\Enums\ReportStatus;
use Carbon\CarbonImmutable;
use Spatie\LaravelData\Attributes\Computed;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class ReportTableData extends Data
{
    #[Computed]
    public string $due_month_year;

    public function __construct(
        public int $id,

        public CarbonImmutable $created_at,

        public float $payment_amount,

        public CarbonImmutable $payment_date,

        public int $due_month,
        public int $due_year,

        public ReportStatus $status,
    ) {
        $this->due_month_year = CarbonImmutable::create($due_year, $due_month)->format('F Y');
    }
}
