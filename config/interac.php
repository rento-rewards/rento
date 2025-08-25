<?php

return [
    'client_id'     => env('INTERAC_CLIENT_ID'),
    'client_secret' => env('INTERAC_CLIENT_SECRET'),
    'redirect_uri'  => env('INTERAC_REDIRECT_URI'),
    'auth_url'      => env('INTERAC_AUTH_URL'),
    'token_url'     => env('INTERAC_TOKEN_URL'),
    'userinfo_url'  => env('INTERAC_USERINFO_URL'),
    'scopes'        => env('INTERAC_SCOPES', 'openid profile'),
];
