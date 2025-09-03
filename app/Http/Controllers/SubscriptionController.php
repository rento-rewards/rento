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
    protected string $subscription_id;
    protected string $monthly_price_id;
    protected string $annually_price_id;

    public function __construct()
    {
        $this->subscription_id = env('STRIPE_SUBSCRIPTION_ID');
        $this->monthly_price_id = env('STRIPE_MONTHLY_PRICE_ID');
        $this->annually_price_id = env('STRIPE_ANNUAL_PRICE_ID');
    }

    public function index(Request $request): Response
    {
        $user = $request->user();
        $plan = $user->subscription($this->subscription_id)?->stripe_price;
        $payment_method = $user->defaultPaymentMethod()?->card;
        return Inertia::render('settings/subscription', [
            'currentPlan' => $plan == $this->monthly_price_id ? 'monthly' : ($plan == $this->annually_price_id ? 'yearly' : null),
            'paymentMethod' => $payment_method ? [
                'brand' => $payment_method->brand,
                'last4' => $payment_method->last4,
                'exp_month' => $payment_method->exp_month,
                'exp_year' => $payment_method->exp_year,
            ] : null,
        ]);
    }

    public function subscribe(Request $request): RedirectResponse
    {
        $plan = $request->get('plan');
        $payment_method = $request->get('payment_method');
        $user = $request->user();

        $user->updateDefaultPaymentMethod($payment_method);

        try {
            $trial_until = $user->created_at->addDays(7);

            $subscription = $user->newSubscription($this->subscription_id, $plan);

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
