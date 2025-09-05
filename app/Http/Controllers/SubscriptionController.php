<?php

namespace App\Http\Controllers;

use App\Data\Subscription\SubscriptionData;
use App\Data\Subscription\SubscriptionFormData;
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
        $subscription = $user->subscription($this->subscription_id);
        $price_id = $subscription?->stripe_price;
        $payment_method = $user->defaultPaymentMethod()?->card;
        $next_billing_date = $subscription?->asStripeSubscription()?->current_period_end;

        $plan = SubscriptionData::optional([
            'type' => SubscriptionType::fromId($price_id),
            'payment_method' => $payment_method?->toArray(),
            'next_billing_date' => $next_billing_date ? Carbon::createFromTimestamp($next_billing_date) : null,
        ]);

        return Inertia::render('settings/subscription', [
            'current_plan' => $plan->toArray(),
        ]);
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
}
