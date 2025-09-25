<?php

namespace App\Gateways;

use Illuminate\Support\Str;
use Inertia\Ssr\HttpGateway;
use Inertia\Ssr\Response;

const patterns = [
    '/',
    '/legals*',
];

class InertiaHttpGateway extends HttpGateway
{
    public function dispatch(array $page): ?Response
    {
        if (isset($page['url']) && Str::is(patterns, $page['url'])) {
            return parent::dispatch($page);
        }
        return null;
    }
}
