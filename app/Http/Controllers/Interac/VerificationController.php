<?php

namespace App\Http\Controllers\Interac;

use App\Http\Controllers\Controller;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Request;

class VerificationController extends Controller
{
    public function start(Request $request)
    {

    }

    /**
     * @throws ConnectionException
     */
    public function callback(Request $request)
    {

    }
}
