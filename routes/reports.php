<?php

use App\Http\Controllers\ReportController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/reports', [ReportController::class, 'index'])->name('reports');
    Route::post('/reports', [ReportController::class, 'store'])->name('reports.store');
    Route::get('/reports/create', [ReportController::class, 'create'])->name('reports.create');
    Route::get('/reports/create/step/1', [ReportController::class, 'step1'])->name('reports.create.step1');
    Route::post('/reports/create/step/1', [ReportController::class, 'processStep1'])->name('reports.store.step1');
    Route::get('/reports/create/step/2', [ReportController::class, 'step2'])->name('reports.create.step2');
    Route::post('/reports/create/step/2', [ReportController::class, 'processStep2'])->name('reports.store.step2');
    Route::get('/reports/create/step/3', [ReportController::class, 'step3'])->name('reports.create.step3');
    Route::get('/reports/{report}', [ReportController::class, 'show'])->name('reports.show');
});
