<?php

namespace App\Socialite;

use App\Services\Interac\OpenIdDiscovery;
use Firebase\JWT\JWT;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Laravel\Socialite\Two\AbstractProvider;
use Laravel\Socialite\Two\User;

class InteracProvider extends AbstractProvider
{
    protected $scopes = ['openid', 'general_scope'];
    protected $scopeSeparator = ' ';
    protected $usesPKCE = true;

    protected function getCodeFields($state = null): array
    {
        $cfg = OpenIdDiscovery::config();
        $fields = parent::getCodeFields($state);

        $payload = [
            'aud' => $cfg['issuer'],
            'iss' => $this->clientId,
            'state' => $state,
            'nonce' => Str::uuid()->toString(),
            ...$fields
        ];
        $jws = JWT::encode(
            $payload,
            file_get_contents(config('services.interac.private_key')),
            'RS256',
            config('services.interac.kid'),
        );
        $fields['request'] = $jws;

        return $fields;
    }

    protected function getAuthUrl($state): string
    {
        $cfg = OpenIdDiscovery::config();
        return $this->buildAuthUrlFromBase($cfg['authorization_endpoint'], $state);
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

        $jws = JWT::encode(
            $payload,
            file_get_contents(config('services.interac.private_key')),
            'RS256',
            config('service.interac.kid'),
        );

        $fields['client_assertion'] = $jws;

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
        Log::info($response->getBody());
        return json_decode($response->getBody(), true);
    }

    protected function mapUserToObject(array $user): User
    {
        $name = ($user['given_name'] ?? '') . ' ' . ($user['family_name'] ?? '');
        return (new User)->setRaw($user)->map([
            'id' => $user['sub'],
            'name' => trim($name) ?: null,
            'date_of_birth' => $user['birthdate'] ?? null,
        ]);
    }
}
