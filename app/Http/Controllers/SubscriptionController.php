<?php

namespace App\Http\Controllers;

use App\Data\Subscription\PaymentMethodData;
use App\Data\Subscription\SubscriptionData;
use App\Data\Subscription\SubscriptionFormData;
use App\Data\Subscription\SubscriptionUpdateData;
use App\Enums\SubscriptionType;
use Carbon\Carbon;
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

    public function __construct()
    {
        $this->subscription_id = env('STRIPE_SUBSCRIPTION_ID');
    }

    public function index(Request $request): Response
    {
        $user = $request->user();
        $payment_method = $user->defaultPaymentMethod();

        $props = [];

        if ($payment_method) {
            $props['payment_method'] = PaymentMethodData::from([
                'id' => $payment_method->id,
                'brand' => $payment_method->card->brand,
                'last4' => $payment_method->card->last4,
                'exp_month' => $payment_method->card->exp_month,
                'exp_year' => $payment_method->card->exp_year,
            ]);
        }

        $subscription = $user->subscription($this->subscription_id);
        if ($subscription) {
            $price_id = $subscription->stripe_price;
            $next_billing_date = $subscription->asStripeSubscription()->current_period_end;
            $plan = SubscriptionData::optional([
                'type' => SubscriptionType::fromId($price_id),
                'payment_method' => $payment_method?->toArray(),
                'next_billing_date' => $next_billing_date ? Carbon::createFromTimestamp($next_billing_date) : null,
                'on_grace_period' => $subscription?->onGracePeriod() ?? false,
            ]);

            $props['current_plan'] = $plan;
        }

        return Inertia::render('settings/subscription', $props);
    }

    public function subscribe(SubscriptionFormData $data): RedirectResponse
    {
        $user = auth()->user();
        $user->updateDefaultPaymentMethod($data->payment_method_id);

        try {
            $user
                ->newSubscription($this->subscription_id, $data->type->getId())
                ->trialDays(14)
                ->create($data->payment_method_id, [
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

    public function cancel(Request $request): RedirectResponse
    {
        $user = $request->user();
        $subscription = $user->subscription($this->subscription_id);

        if (!$subscription || $subscription->ended()) {
            return to_route('subscription')->with(['error' => 'No active subscription found to cancel.']);
        }
        $subscription->cancel();
        return to_route('subscription')->with(['success' => 'Subscription cancelled successfully. You will retain access until the end of the billing period.']);
    }

    public function resume(Request $request): RedirectResponse
    {
        $user = $request->user();
        $subscription = $user->subscription($this->subscription_id);

        if (!$subscription || !$subscription->onGracePeriod()) {
            return to_route('subscription')->with(['error' => 'No cancelled subscription found to resume.']);
        }

        $subscription->resume();
        return to_route('subscription')->with(['success' => 'Subscription resumed successfully.']);
    }

    public function update(SubscriptionUpdateData $data): RedirectResponse
    {
        $user = auth()->user();
        $subscription = $user->subscription($this->subscription_id);

        if (!$subscription || $subscription->ended()) {
            return to_route('subscription')->with(['error' => 'No active subscription found to update.']);
        }

        try {
            $subscription->swap($data->type->getId());
            return to_route('subscription')->with(['success' => 'Subscription updated successfully.']);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return to_route('subscription')->with(['error' => 'An error occurred while updating your subscription. Please try again.']);
        }
    }
}
