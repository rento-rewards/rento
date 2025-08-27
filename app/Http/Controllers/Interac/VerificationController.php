<?php

namespace App\Http\Controllers\Interac;

use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Laravel\Socialite\Facades\Socialite;


class VerificationController extends Controller
{
    public function start(Request $request)
    {
        return Socialite::driver('interac')->redirect();
    }

    public function callback(Request $request)
    {
        Log::info('Interac callback', $request->all());
        try {
            $user = Socialite::driver('interac')->user();
            Log::info($user->toArray());
            redirect()->route('dashboard');
        } catch (Exception $e) {
            Log::error('Interac callback error', ['error' => $e]);
            return redirect()->route('dashboard')->withErrors(['msg' => 'Interac verification failed. Please try again.']);
        }
    }
}
