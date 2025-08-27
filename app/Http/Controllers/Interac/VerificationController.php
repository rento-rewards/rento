<?php

namespace App\Http\Controllers\Interac;

use App\Http\Controllers\Controller;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Client\RequestException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;


class VerificationController extends Controller
{
    public function start(Request $request)
    {
        return Socialite::driver('interac')->redirect();
    }

    /**
     * @throws ConnectionException
     * @throws RequestException
     */
    public function callback(Request $request)
    {
        $user = Socialite::driver('interac')->user();
    }
}
