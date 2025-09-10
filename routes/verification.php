<?php

use App\Http\Controllers\Interac\JwksController;
use App\Http\Controllers\Interac\VerificationController;
use Illuminate\Support\Facades\Route;
use Laravel\Pennant\Middleware\EnsureFeaturesAreActive;

Route::get('/.well-known/jwks.json', [JwksController::class, 'show'])->name('jwks');

Route::middleware(['auth', 'verified', EnsureFeaturesAreActive::using('id-verification')])->group(function () {
    Route::get('/verification/start', [VerificationController::class, 'start'])->name('verification.start');
    Route::get('/verification/callback', [VerificationController::class, 'callback'])->name('verification.callback');
});
