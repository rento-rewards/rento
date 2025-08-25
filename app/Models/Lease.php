<?php

namespace App\Models;

use App\Casts\MoneyCast;
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
}
