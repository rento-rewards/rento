<?php

namespace App\Http\Controllers;

use App\Data\Subscription\PaymentMethodData;
use App\Data\Subscription\PaymentMethodFormData;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BillingController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();
        $props = [];

        $payment_method = $user->defaultPaymentMethod();
        if ($payment_method) {
            $props['payment_method'] = PaymentMethodData::from([
                'id' => $user->defaultPaymentMethod()->id,
                'brand' => $payment_method->card->brand,
                'last4' => $payment_method->card->last4,
                'exp_month' => $payment_method->card->exp_month,
                'exp_year' => $payment_method->card->exp_year,
            ]);
        }

        return Inertia::render('settings/billing', $props);
    }

    public function store(PaymentMethodFormData $data): RedirectResponse
    {
        $user = auth()->user();
        $user->updateDefaultPaymentMethod($data->payment_method_id);

        return to_route('billing')->with('success', 'Payment method has been updated.');
    }
}
