<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LeaseController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/leases', [LeaseController::class, 'index'])->name('leases');
    Route::get('/leases/create', [LeaseController::class, 'create'])->name('leases.create');
    Route::post('/leases', [LeaseController::class, 'store'])->name('leases.store');
});
