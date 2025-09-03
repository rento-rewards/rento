<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CheckoutController extends Controller
{
    public function __invoke(Request $request, string $plan) {
        $subscription_id = env('STRIPE_SUBSCRIPTION_ID');
        $user = $request->user();
        $trail_until = $user->created_at->addDays(7);
        return $user->newSubscription($subscription_id, $plan)
            ->trialUntil($trail_until)
            ->checkout([
                'success_url' => route('subscription'),
                'cancel_url' => route('subscription'),
            ]);
    }
}
