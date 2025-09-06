<?php

namespace App\Services;

use Carbon\Carbon;
use Stripe\Invoice;
use Stripe\Stripe;
use App\Data\Subscription\InvoiceTableData;

class InvoiceService
{
    public function __construct()
    {
        Stripe::setApiKey(env('STRIPE_SECRET'));
    }

    public function getRecentInvoices(string $customerId, int $limit = 5, $startingAfter = null)
    {
        $params = [
            'customer' => $customerId,
            'limit' => $limit,
        ];

        if ($startingAfter) {
            $params['starting_after'] = $startingAfter;
        }

        $invoices = Invoice::all($params);

        $data = collect($invoices)->map(function ($invoice) {
            return [
                'id' => $invoice->id,
                'date' => Carbon::createFromTimestamp($invoice->created),
                'total' => $invoice->total,
                'status' => $invoice->status,
            ];
        });

        return [
            'data' => InvoiceTableData::collect($data),
            'has_more' => $invoices->has_more,
            'last_invoice' => $invoices->has_more ? end($invoices->data)->id : null,
        ];
    }
}
