<?php

namespace App\Http\Controllers;

use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class InteracController extends Controller
{
    public function redirectToInterac(Request $request)
    {
        $state = Str::random(32);
        session(['interac_state' => $state]);

        $query = http_build_query([
            'client_id'     => config('interac.client_id'),
            'response_type' => 'code',
            'scope'         => config('interac.scopes'),
            'redirect_uri'  => config('interac.redirect_uri'),
            'state'         => $state,
        ]);

        return redirect(config('interac.auth_url') . '?' . $query);
    }

    /**
     * @throws ConnectionException
     */
    public function handleCallback(Request $request)
    {
        if ($request->state !== session('interac_state')) {
            abort(403, 'Invalid state');
        }

        $response = Http::asForm()->post(config('interac.token_url'), [
            'grant_type'    => 'authorization_code',
            'client_id'     => config('interac.client_id'),
            'client_secret' => config('interac.client_secret'),
            'redirect_uri'  => config('interac.redirect_uri'),
            'code'          => $request->code,
        ]);

        if ($response->failed()) {
            return response()->json(['error' => 'Token exchange failed'], 400);
        }

        $tokens = $response->json();

        $userinfo = Http::withToken($tokens['access_token'])
            ->get(config('interac.userinfo_url'))
            ->json();
    }
}
