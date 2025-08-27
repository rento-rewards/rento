<?php

namespace App\Http\Controllers\Interac;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class JwksController extends Controller
{
    public function show(): JsonResponse
    {
        $path = storage_path('app/keys/interac-jwks.json');
        $jwks = file_get_contents($path);
        return response()->json(json_decode($jwks, true))
            ->header('Content-Type', 'application/json');
    }
}
