<?php

namespace App\Http\Controllers;

use App\Data\Subscription\PaymentMethodData;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BillingController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();
        $payment_method = $user->defaultPaymentMethod()?->card;

        return Inertia::render('settings/billing', [
            'payment_method' => PaymentMethodData::optional($payment_method?->toArray()),
        ]);
    }
}
