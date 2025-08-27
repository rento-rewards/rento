<?php

return [
    'client_id' => env('INTERAC_CLIENT_ID'),
    'scopes' => env('INTERAC_SCOPES'),
    'redirect' => env('INTERAC_REDIRECT_URI'),
    'jwk_uri' => env('INTERAC_JWKS_URL'),
    'jwt_kid' => env('INTERAC_JWT_KID'),
    'private_key' => storage_path('app/keys/interac-private.pem'),
    'public_key' => storage_path('app/keys/interac-public.pem'),
    'discovery' => env('INTERAC_DISCOVERY', 'https://gateway-portal.hub-verify.innovation.interac.ca/.well-known/openid-configuration'),
];
