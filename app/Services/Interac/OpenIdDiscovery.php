<?php

namespace App\Services\Interac;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class OpenIdDiscovery
{
    public static function config(): array
    {
        return Cache::remember('interac.oidc', 3600, function () {
            // e.g. https://gateway-portal.hub-verify.innovation.interac.ca/.well-known/openid-configuration (sandbox)
            $url = config('services.interac.discovery');
            return Http::timeout(10)->get($url)->throw()->json();
        });
    }

}
