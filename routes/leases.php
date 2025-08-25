<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LeaseController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/leases', [LeaseController::class, 'index'])->name('leases');
    Route::get('/leases/create', [LeaseController::class, 'create'])->name('leases.create');
    Route::post('/leases', [LeaseController::class, 'store'])->name('leases.store');
    Route::get('/leases/{lease}', [LeaseController::class, 'show'])->name('leases.show');
    Route::get('/leases/{lease}/edit', [LeaseController::class, 'edit'])->name('leases.edit');
    Route::put('/leases/{lease}', [LeaseController::class, 'update'])->name('leases.update');
    Route::delete('/leases/{lease}', [LeaseController::class, 'destroy'])->name('leases.destroy');
    Route::post('/leases/extract', [LeaseController::class, 'extract'])->name('leases.extract');
});
