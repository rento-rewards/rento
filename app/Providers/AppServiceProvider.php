<?php

namespace App\Providers;

use App\Gateways\InertiaHttpGateway;
use App\Socialite\InteracProvider;
use Illuminate\Contracts\Container\BindingResolutionException;
use Illuminate\Support\ServiceProvider;
use Inertia\Ssr\HttpGateway;
use Stripe\StripeClient;
use Laravel\Socialite\Contracts\Factory;

class AppServiceProvider extends ServiceProvider
{
    public $bindings = [
        HttpGateway::class => InertiaHttpGateway::class,
    ];
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(StripeClient::class, function ($app) {
            return new StripeClient(env('STRIPE_SECRET'));
        });
    }

    /**
     * Bootstrap any application services.
     * @throws BindingResolutionException
     */
    public function boot(): void
    {
        $socialite = $this->app->make(Factory::class);
        $socialite->extend('interac', function () use ($socialite) {
            $config = config('services.interac');
            return $socialite->buildProvider(InteracProvider::class, $config);
        });
    }
}
