<?php

namespace App\Models;

use App\Casts\MoneyCast;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Lease extends Model
{
    protected $fillable = [
        "address_line_1",
        "address_line_2",
        "city",
        "province",
        "postal_code",
        "country",
        "rent_amount",
        "lease_start_date",
        "monthly_due_date",
        "landlord_name",
        "landlord_email",
        "landlord_phone",
        "document",
    ];

    protected $appends = [
        'next_due_date'
    ];

    protected function casts(): array
    {
        return [
            'rent_amount' => MoneyCast::class
        ];
    }

    public function tenant(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function reports(): HasMany
    {
        return $this->hasMany(Report::class);
    }

    public function getNextDueDateAttribute(): Carbon {
        $today = now();
        $year  = $today->year;
        $month = $today->month;

        // if today already passed this month's due date → move to next month
        if ($today->day > $this->monthly_due_date) {
            $month++;
            if ($month > 12) {
                $month = 1;
                $year++;
            }
        }

        // Handle "last day of month" rule
        $day = min($this->monthly_due_date, Carbon::create($year, $month, 1)->endOfMonth()->day);

        return Carbon::create($year, $month, $day);
    }
}
