<?php

namespace App\Http\Controllers\Interac;

use App\Http\Controllers\Controller;
use App\Services\Interac\OpenIdDiscovery;
use Firebase\JWT\JWT;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Client\RequestException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class VerificationController extends Controller
{
    public function start(Request $request): RedirectResponse
    {
        // 1. Discover OIDC endpoints from Interac Hub
        $cfg = OpenIdDiscovery::config();

        // 2. Generate unique values for state and nonce to mitigate CSRF
        $state = Str::uuid()->toString();
        $nonce = Str::uuid()->toString();

        // 3. Generate PKCE code_verifier and transform it to code_challenge (S256)
        $codeVerifier = Str::random(64);
        $codeChallenge = rtrim(strtr(base64_encode(hash('sha256', $codeVerifier, true)), '+/', '-_'), '=');

        session([
            'interac.state' => $state,
            'interac.nonce' => $nonce,
            'interac.pkce' => $codeVerifier,
        ]);

        // 4. Build payload for the signed request object
        $now = time();
        $payload = [
            'aud' => $cfg['issuer'],
            'client_id' => config('interac.client_id'),
            'iss' => config('interac.client_id'),
            'redirect_uri' => config('interac.redirect'),
            'response_type' => 'code',
            'scope' => implode(' ', config('interac.scopes')),
            'state' => $state,
            'nonce' => $nonce,
            'code_challenge' => $codeChallenge,
            'code_challenge_method' => 'S256',
            'ui_locales' => 'en-CA',
            'exp' => $now + 300,
            'iat' => $now,
        ];

        // 5. Sign the request using RS256 (private key) with a ‘kid’ header
        $privateKey = file_get_contents(config('interac.private_key'));
        $headers = ['alg' => 'RS256', 'kid' => config('interac.kid')];
        $requestJwt = JWT::encode($payload, $privateKey, 'RS256', null, $headers);

        // 6. Build query string: include “request” JWT and also required OIDC params
        $authUrl = $cfg['authorization_endpoint'];
        $query = http_build_query([
            'request' => $requestJwt,
            'response_type' => 'code',
            'client_id' => config('interac.client_id'),
            'scope' => implode(' ', config('interac.scopes')),
            'state' => $state,
            'redirect_uri' => config('interac.redirect'),
        ]);

        // 7. Redirect the user’s browser to Interac Hub to start verification
        return redirect()->away($authUrl . '?' . $query);
    }

    /**
     * @throws ConnectionException
     * @throws RequestException
     */
    public function callback(Request $request): RedirectResponse
    {
        $cfg   = OpenIdDiscovery::config();

        // 1. Retrieve state and code from callback
        $state = $request->query('state');
        $code  = $request->query('code');

        // 2. Validate state to mitigate CSRF
        abort_unless($state && $state === session('interac.state'), 400, 'Invalid state');

        // 3. Create client_assertion JWT for token endpoint auth (private_key_jwt)
        $tokenEndpoint = $cfg['token_endpoint'];
        $now = time();
        $clientAssertion = [
            'iss' => config('interac.client_id'),
            'sub' => config('interac.client_id'),
            'aud' => $tokenEndpoint,
            'jti' => (string) Str::uuid(),
            'iat' => $now,
            'exp' => $now + 300,
        ];

        $headers = ['alg'=>'RS256','kid'=>config('interac.kid')];
        $clientAssertionJwt = JWT::encode(
            $clientAssertion,
            file_get_contents(config('interac.private_key')),
            'RS256',
            null,
            $headers
        );

        // 4. Exchange authorization code for access token
        $response = Http::asForm()->timeout(15)->post($tokenEndpoint, [
            'grant_type' => 'authorization_code',
            'code'       => $code,
            'client_assertion_type' => 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
            'client_assertion'      => $clientAssertionJwt,
            'client_id'    => config('interac.client_id'),
            'redirect_uri' => config('interac.redirect'),
            'code_verifier' => session('interac.pkce'),
        ])->throw()->json();

        $accessToken = $resp['access_token'] ?? null;

        // 5. Use access token to fetch user verification claims via UserInfo endpoint
        $userinfo = Http::withToken($accessToken)
            ->timeout(15)
            ->get($cfg['userinfo_endpoint'])
            ->throw()
            ->json();

        // 6. Clean up session
        session()->forget(['interac.state', 'interac.nonce', 'interac.pkce_verifier']);

        // 7. Display user claims (for demo purposes)
        return redirect()->route('dashboard')->with('interac_userinfo', $userinfo);
    }
}
