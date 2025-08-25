<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Collection;
use Laravel\Cashier\Billable;

class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, Billable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'date_of_birth',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function getNameAttribute(): string
    {
        return "{$this->first_name} {$this->last_name}";
    }

    public function leases(): HasMany
    {
        return $this->hasMany(Lease::class, 'tenant_id');
    }

    public function interac(): HasOne {
        return $this->hasOne(Interac::class);
    }

    public function reports(): HasManyThrough
    {
        return $this->hasManyThrough(
            related: Report::class,
            through: Lease::class,
            firstKey: 'tenant_id',
            secondKey: 'lease_id'
        );
    }

    public function next_rent_due_date(): ?Carbon {
        if ($this->leases->isEmpty()) {
            return null;
        }

        return $this->leases
            ->map(fn ($lease) => $lease->next_due_date) // uses Lease accessor with "end of month" rule
            ->sort()
            ->first();
    }

    public function status_counts(string $scope = 'all'): Collection
    {
        $query = $this->reports();
        if ($scope === 'this_year') {
            $query->whereYear('reports.created_at', Carbon::now()->year);
        }
        return $query->selectRaw('status, COUNT(*) as count')
            ->groupBy('status')
            ->pluck('count', 'status');
    }
}
