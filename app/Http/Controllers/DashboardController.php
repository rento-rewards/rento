<?php

namespace App\Http\Controllers;

use App\Data\Reports\ReportTableData;
use App\Services\DashboardService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __invoke(DashboardService $dashboardService, Request $request) {
        $recent_reports = $dashboardService->getRecentReports($request->user());
        return Inertia::render('dashboard', [
            'dashboard' => $dashboardService->forUser($request->user()),
        ]);
    }
}
