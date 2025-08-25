<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\InteracController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/interac/start', [InteracController::class, 'index'])->name('interac.start');
    Route::post('/interac/callback', [InteracController::class, 'send'])->name('interac.callback');
});
