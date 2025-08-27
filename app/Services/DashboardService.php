<?php

namespace App\Services;

use App\Data\Reports\ReportTableData;
use App\Models\User;
use Illuminate\Support\Collection;

class DashboardService
{
    public function forUser(User $user): array {
        return [
            'recent_reports' => ReportTableData::collect($this->getRecentReports($user)),
            'report_counts' => [
                'all_time' => $user->status_counts(),
                'this_year' => $user->status_counts(scope: 'this_year'),
            ],
            'has_id_verification' => $user->interac()->exists(),
            'next_due' => $this->getLeaseWithNexitDue($user),
        ];
    }

    public function getRecentReports(User $user) {
        return $user->reports()->latest()->take(5)->get();
    }

    public function getLeaseWithNexitDue(User $user): Collection
    {
        return $user->leases()->get()->sortBy(fn ($lease) => $lease->next_due_date)->values();
    }
}
