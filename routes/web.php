<?php

use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Interac\JwksController;
use App\Http\Controllers\LegalController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('home', []);
})->name('home');


Route::get('/pricing', function () {
    return Inertia::render('pricing', []);
})->name('pricing');

Route::get('/legal/privacy-policy', [LegalController::class, 'privacyPolicy'])->name('legal.privacy-policy');
Route::get('/legal/terms-of-service', [LegalController::class, 'termsOfService'])->name('legal.terms-of-service');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', DashboardController::class)->name('dashboard');
    Route::get('/checkout/{plan}', CheckoutController::class)->name('checkout');
});

require __DIR__.'/settings.php';
require __DIR__.'/leases.php';
require __DIR__.'/reports.php';
require __DIR__.'/verification.php';
require __DIR__.'/auth.php';
