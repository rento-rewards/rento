<?php

namespace App\Socialite;

use App\Services\Interac\OpenIdDiscovery;
use Firebase\JWT\JWT;
use Illuminate\Support\Str;
use Laravel\Socialite\Two\AbstractProvider;

class InteracProvider extends AbstractProvider
{
    protected $scopes = ['openid', 'general_scope'];
    protected $scopeSeparator = ' ';
    protected $usesPKCE = true;

    protected function getAuthUrl($state)
    {
        $cfg = OpenIdDiscovery::config();

        $now = time();
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
            'iat' => $now,
            'exp' => $now + 300,
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

    protected function getTokenUrl()
    {
        return OpenIdDiscovery::config()['token_endpoint'];
    }

    protected function getUserByToken($token)
    {

    }

    protected function mapUserToObject(array $user)
    {
        // TODO: Implement mapUserToObject() method.
    }
}
