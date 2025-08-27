<?php

namespace App\Services;

use App\Data\Reports\ReportTableData;
use App\Models\User;

class DashboardService
{
    public function forUser(User $user): array {
        return [
            'recent_reports' => ReportTableData::collect($this->getRecentReports($user)),
            'report_counts' => [
                'all_time' => $user->status_counts(),
                'this_year' => $user->status_counts(scope: 'this_year'),
            ]
        ];
    }

    public function getRecentReports(User $user) {
        return $user->reports()->latest()->take(5)->get();
    }
}
