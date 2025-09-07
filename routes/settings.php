<?php

use App\Http\Controllers\BillingController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\SubscriptionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::prefix('settings')->middleware('auth')->group(function () {
    Route::redirect('/', '/settings/profile');

    Route::get('profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('password', [PasswordController::class, 'edit'])->name('password.edit');
    Route::put('password', [PasswordController::class, 'update'])
        ->middleware('throttle:6,1')
        ->name('password.update');

    Route::get('appearance', function () {
        return Inertia::render('settings/appearance', []);
    })->name('appearance');

    Route::get('subscription', [SubscriptionController::class, 'index'])->name('subscription');
    Route::post('subscription', [SubscriptionController::class, 'subscribe'])->name('subscription.subscribe');
    Route::post('subscription/cancel', [SubscriptionController::class, 'cancel'])->name('subscription.cancel');
    Route::post('subscription/resume', [SubscriptionController::class, 'resume'])->name('subscription.resume');
    Route::patch('subscription', [SubscriptionController::class, 'update'])->name('subscription.update');

    Route::get('billing', [BillingController::class, 'index'])->name('billing');
    Route::post('billing', [BillingController::class, 'store'])->name('billing.store');
    Route::get('billing/invoices', [InvoiceController::class, 'index'])->name('billing.invoices');
});
