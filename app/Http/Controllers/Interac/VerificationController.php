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
        $code = $request->get('code');
        if (!$code) {
            return redirect()->route('dashboard')->with(['error' => 'Interac verification failed. Please try again.']);
        }
        try {
            $user = Socialite::driver('interac')->user();

            $request->user()->interac()->create([
                'sub' => $user->getId(),
                'payload' => json_encode($user->user),
                'document_type' => $user->user['doc_type'],
                'expiry_date' => $user->user['expiry_date'],
            ]);

            return redirect()->route('dashboard')->with('success', 'Interac verification successful.');
        } catch (Exception $e) {
            Log::error('Interac callback error', ['error' => $e]);
            return redirect()->route('dashboard')->with(['error' => 'Interac verification failed. Please try again.']);
        }
    }
}
