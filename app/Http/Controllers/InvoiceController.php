<?php

namespace App\Http\Controllers;

use App\Data\Subscription\InvoiceTableData;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;
use Stripe\StripeClient;

class InvoiceController extends Controller
{
    public function __construct(protected StripeClient $stripeClient)
    {
    }

    public function index(Request $request): Response
    {
        $customer_id = $request->user()->stripe_id;
        if (!$customer_id) {
            return Inertia::render('settings/billing/invoices', [
                'invoices' => InvoiceTableData::collect([]),
                'has_more' => false,
            ]);
        }

        $params = [
            'customer' => $customer_id,
        ];

        $last_invoice = $request->query('last_invoice');
        if ($last_invoice) {
            $params['starting_after'] = $last_invoice;
        }

        $invoices = $this->stripeClient->invoices->all($params);

        $data = collect($invoices)->map(function ($invoice) {
            return [
                'id' => $invoice->id,
                'date' => Carbon::createFromTimestamp($invoice->created),
                'total' => $invoice->total,
                'status' => $invoice->status,
            ];
        });

        Log::info("Invoices data: " . $data);
        Log::info("Has more: " . ($invoices->has_more ? 'true' : 'false'));

        return Inertia::render('settings/billing/invoices', [
            'invoices' => Inertia::merge(InvoiceTableData::collect($data)),
            'has_more' => $invoices->has_more,
        ]);
    }
}
