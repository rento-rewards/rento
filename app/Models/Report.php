<?php

namespace App\Models;

use App\Casts\MoneyCast;
use App\Enums\ReportStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Report extends Model
{
    protected $fillable = [
        'payment_date',
        'payment_amount',
        'due_month',
        'due_year',
        'verified_at',
        'report_date',
        'proof_of_payment',
    ];

    protected $casts = [
        'payment_date' => 'date',
        'verified_at' => 'datetime',
        'report_date' => 'date',
        'payment_amount' => MoneyCast::class,
        'status' => ReportStatus::class,
    ];

    public function lease(): BelongsTo
    {
        return $this->belongsTo(Lease::class, 'lease_id');
    }
}
