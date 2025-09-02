<?php

use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('home', []);
})->name('home');

Route::get('/legal/privacy-policy', function () {
    return Inertia::render('legal/privacy-policy', []);
})->name('legal.privacy-policy');

Route::get('/legal/terms-of-service', function () {
    return Inertia::render('legal/terms-of-service', []);
})->name('legal.terms-of-service');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', DashboardController::class)->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/leases.php';
require __DIR__.'/reports.php';
require __DIR__.'/auth.php';
