<?php

namespace App\Http\Controllers\Interac;

use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Laravel\Socialite\Facades\Socialite;


class VerificationController extends Controller
{
    public function start()
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
            $interac = Socialite::driver('interac')->user();

            $request->user()->interac()->create([
                'sub' => $interac->getId(),
                'payload' => json_encode($interac->user),
                'document_type' => $interac->user['doc_type'],
                'expiry_date' => $interac->user['expiry_date'],
            ]);

            return redirect()->route('dashboard')->with('success', 'Interac verification successful.');
        } catch (Exception $e) {
            Log::error('Interac callback error', ['error' => $e]);
            return redirect()->route('dashboard')->with(['error' => 'Interac verification failed. Please try again.']);
        }
    }
}
