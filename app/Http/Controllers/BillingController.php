<?php

namespace App\Http\Controllers;

use App\Data\Subscription\PaymentMethodData;
use App\Data\Subscription\PaymentMethodFormData;
use App\Services\InvoiceService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Stripe\Stripe;
use Stripe\Invoice;

class BillingController extends Controller
{
    public function __construct(private InvoiceService $invoiceService)
    {
    }

    public function index(Request $request): Response
    {
        Stripe::setApiKey(env('STRIPE_SECRET'));

        $user = $request->user();
        $payment_method = $user->defaultPaymentMethod()?->card;
        $invoices = $this->invoiceService->getRecentInvoices($user->stripe_id);

        return Inertia::render('settings/billing', [
            'payment_method' => PaymentMethodData::optional($payment_method?->toArray()),
            'invoices' => $invoices
        ]);
    }

    public function store(PaymentMethodFormData $data): RedirectResponse
    {
        $user = auth()->user();
        $user->updateDefaultPaymentMethod($data->payment_method_id);

        return to_route('billing')->with('success', 'Payment method has been updated.');
    }
}
