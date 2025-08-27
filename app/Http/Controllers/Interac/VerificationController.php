<?php

namespace App\Http\Controllers\Interac;

use App\Http\Controllers\Controller;
use App\Services\Interac\OpenIdDiscovery;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Client\RequestException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Jose\Component\Core\AlgorithmManager;
use Jose\Component\KeyManagement\JWKFactory;
use Jose\Component\Signature\Algorithm\RS256;
use Jose\Component\Signature\JWSBuilder;
use Jose\Component\Signature\Serializer\CompactSerializer;


class VerificationController extends Controller
{
    public function start(Request $request): RedirectResponse
    {
        // 1. Replying party setup
        $rp_client_id = config('interac.client_id');
        $rp_scopes = config('interac.scopes');
        $rp_redirect = config('interac.redirect');

        $private_key = file_get_contents(config('interac.private_key'));
        $signature_key = JWKFactory::createFromKey($private_key, null, [
            'use' => 'sig', // key use: signature
            'alg' => 'RS256', // algorithm
            'kid' => config('interac.jwt_kid'),
        ]);

        // 2. Parse Hub API Endpoints
        $cfg = OpenIdDiscovery::config();
        $hub_client_id = $cfg['issuer'];
        $hub_authorization_endpoint = $cfg['authorization_endpoint'];

        // 3. Generate session parameters
        $code_verifier = Str::random(64);
        $encoded = base64_encode(hash('sha256', $code_verifier, true));
        $code_challenge = strtr(rtrim($encoded, '='), '+/', '-_');

        $state = Str::uuid()->toString();
        $nonce = Str::uuid()->toString();

        session([
            'interac.state' => $state,
            'interac.nonce' => $nonce,
            'interac.pkce' => $code_verifier,
        ]);

        // 4. Create JWS
        $rp_request_header = [
            'alg' => $signature_key->get('alg'),
            'kid' => $signature_key->get('kid'),
        ];

        $rp_payload = [
            'code_challenge' => $code_challenge,
            'code_challenge_method' => 'S256',
            'redirect_uri' => $rp_redirect,
            'client_id' => $rp_client_id,
            'scope' => $rp_scopes,
            'iss' => $rp_client_id,
            'aud' => $hub_client_id,
            'response_type' => 'code',
            'state' => $state,
            'nonce' => $nonce,
            'ui_locale' => 'en-CA',

        ];

        $jws_builder = new JWSBuilder(new AlgorithmManager([
            new RS256(),
        ]));
        $jws = $jws_builder->create()
            ->withPayload(json_encode($rp_payload))
            ->addSignature($signature_key, $rp_request_header)
            ->build();

        $serializer = new CompactSerializer();
        $jws_request = $serializer->serialize($jws, 0);


        // 6. Build query string: include “request” JWT and also required OIDC params
        $query = http_build_query([
            'request' => $jws_request,
            'response_type' => $rp_payload['response_type'],
            'client_id' => $rp_payload['client_id'],
            'scope' => $rp_payload['scope'],
            'state' => $state,
            'redirect_uri' => $rp_payload['redirect_uri'],
        ]);

        // 7. Redirect the user’s browser to Interac Hub to start verification
        return redirect($hub_authorization_endpoint . '?' . $query);
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
        Log::info($userinfo);
        session()->forget(['interac.state', 'interac.nonce', 'interac.pkce_verifier']);

        // 7. Display user claims (for demo purposes)
        return redirect()->route('dashboard');
    }
}
