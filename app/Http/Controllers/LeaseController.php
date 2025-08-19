<?php

namespace App\Http\Controllers;

use App\Data\LeaseData;
use Inertia\Inertia;

use App\Models\Lease;

class LeaseController extends Controller
{
    public function index() {
        return Inertia::render('leases/index');
    }

    public function create()
    {
        return Inertia::render('leases/create');
    }

    public function store(LeaseData $data) {
        auth()->user()->leases()->create($data->toArray());
        return redirect()->route('leases')->with('success', 'Lease created successfully.');
    }
}
