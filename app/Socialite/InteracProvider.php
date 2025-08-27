<?php

namespace App\Socialite;

use App\Services\Interac\OpenIdDiscovery;
use Firebase\JWT\JWT;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Laravel\Socialite\Two\AbstractProvider;

class InteracProvider extends AbstractProvider
{
    protected $scopes = ['openid', 'general_scope'];
    protected $scopeSeparator = ' ';
    protected $usesPKCE = true;

    protected function getAuthUrl($state): string
    {
        $cfg = OpenIdDiscovery::config();

        $payload = [
            'aud' => $cfg['issuer'],
            'iss' => $this->clientId,
            'client_id' => $this->clientId,
            'redirect_uri' => $this->redirectUrl,
            'response_type' => 'code',
            'scope' => implode(' ', $this->scopes),
            'state' => $state,
            'nonce' => Str::uuid()->toString(),
            'code_challenge' => $this->getCodeChallenge(),
            'code_challenge_method' => $this->getCodeChallengeMethod(),
        ];

        $jwt = JWT::encode(
            $payload,
            file_get_contents(config('services.interac.private_key')),
            'RS256',
            config('service.interac.kid'),
            ['alg' => 'RS256', 'kid' => config('services.interac.kid')]
        );

        $query = http_build_query([
            'request'      => $jwt,
            'state'        => $state,
            'client_id'    => $this->clientId,
            'redirect_uri' => $this->redirectUrl,
            'scope'        => implode(' ', $this->scopes),
            'response_type'=> 'code',
        ]);

        return $cfg['authorization_endpoint'] . '?' . $query;
    }

    protected function getTokenHeaders($code): array
    {
        return [];
    }

    protected function getTokenFields($code): array
    {
        $fields = parent::getTokenFields($code);
        $fields['client_assertion_type'] = 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer';

        $now = time();

        $payload = [
            'iss' => $this->clientId,
            'sub' => $this->clientId,
            'aud' => $this->getTokenUrl(),
            'exp' => $now + 300,
            'iat' => $now,
            'jti' => Str::uuid()->getHex()->toString(),
        ];

        $jwt = JWT::encode(
            $payload,
            file_get_contents(config('services.interac.private_key')),
            'RS256',
            config('service.interac.kid'),
            ['alg' => 'RS256', 'kid' => config('services.interac.kid')]
        );

        $fields['client_assertion'] = $jwt;

        return $fields;
    }

    protected function getTokenUrl()
    {
        return OpenIdDiscovery::config()['token_endpoint'];
    }

    protected function getUserByToken($token)
    {
        $cfg = OpenIdDiscovery::config();
        $response = $this->getHttpClient()->get($cfg['userinfo_endpoint'], [
            'headers' => [
                'Authorization' => 'Bearer ' . $token,
            ]
        ]);
        return json_decode($response->getBody(), true);
    }

    protected function mapUserToObject(array $user)
    {
        Log::info('user', $user);
    }
}
