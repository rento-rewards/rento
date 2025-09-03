<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Cashier\Exceptions\IncompletePayment;

class SubscriptionController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('settings/subscription', []);
    }

    public function subscribe(Request $request): RedirectResponse
    {
        $subscription_id = env('STRIPE_SUBSCRIPTION_ID');
        $plan = $request->get('plan');
        $payment_method = $request->get('payment_method');
        $user = $request->user();

        $user->updateDefaultPaymentMethod($payment_method);

        try {
            $trial_until = $user->created_at->addDays(7);

            $subscription = $user->newSubscription($subscription_id, $plan);

            if ($trial_until->isFuture()) {
                $subscription->trialUntil($trial_until);
            }

            $subscription->create($payment_method, [
                'email' => $user->email,
                'name' => $user->name,
            ]);

            return to_route('subscription')->with(['success' => 'Subscription successful!']);
        } catch (IncompletePayment) {
            return to_route('subscription')->with(['error' => 'Incomplete Payment!']);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return to_route('subscription')->with(['error' => 'An error occurred while processing your subscription. Please try again.']);
        }
    }
}
