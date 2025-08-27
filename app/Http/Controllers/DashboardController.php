<?php

namespace App\Http\Controllers;

use App\Services\DashboardService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __invoke(DashboardService $dashboardService, Request $request) {
        return Inertia::render('dashboard', [
            'dashboard' => $dashboardService->forUser($request->user()),
        ]);
    }
}
