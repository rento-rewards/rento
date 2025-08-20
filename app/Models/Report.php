<?php

namespace App\Models;

use App\Casts\MoneyCast;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    protected $fillable = [
        'payment_date',
        'payment_amount',
        'due_month',
        'due_year',
        'verified_at',
        'report_date',
    ];

    protected $casts = [
        'payment_date' => 'date',
        'verified_at' => 'datetime',
        'report_date' => 'date',
        'payment_amount' => MoneyCast::class,
    ];

    public function lease()
    {
        return $this->belongsTo(Lease::class);
    }
}
