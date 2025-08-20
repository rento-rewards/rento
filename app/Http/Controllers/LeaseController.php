<?php

namespace App\Http\Controllers;

use App\Data\LeaseData;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

use App\Models\Lease;

class LeaseController extends Controller
{
    public function index() {
        $leases = auth()->user()->leases()->get();
        return Inertia::render('leases/index', [
            'leases' => $leases,
        ]);
    }

    public function create()
    {
        return Inertia::render('leases/create');
    }

    public function store(LeaseData $data) {
        $lease = auth()->user()->leases()->create($data->toArray());
        return redirect()->route('leases.show', $lease)->with('success', 'Lease created successfully.');
    }

    public function show(Lease $lease) {
        return Inertia::render('leases/show', [
            'lease' => $lease,
        ]);
    }

    public function edit(Lease $lease) {
        return Inertia::render('leases/edit', [
            'lease' => $lease,
        ]);
    }

    public function update(LeaseData $data, Lease $lease) {
        $lease->update($data->toArray());
        return redirect()->route('leases.show', $lease)->with('success', 'Lease updated successfully.');
    }

    public function destroy(Lease $lease) {
        $lease->delete();
        return redirect()->route('leases')->with('success', 'Lease deleted successfully.');
    }
}
