<?php

namespace App\Providers;

use App\Socialite\InteracProvider;
use Illuminate\Contracts\Container\BindingResolutionException;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;
use Stripe\StripeClient;
use Laravel\Socialite\Contracts\Factory;

class AppServiceProvider extends ServiceProvider
{
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
        // Force HTTPS when not in local/development environment (behind proxy like Render)
        if (!in_array(config('app.env'), ['local', 'development'])) {
            URL::forceScheme('https');
        }

        $socialite = $this->app->make(Factory::class);
        $socialite->extend('interac', function () use ($socialite) {
            $config = config('services.interac');
            return $socialite->buildProvider(InteracProvider::class, $config);
        });
    }
}
