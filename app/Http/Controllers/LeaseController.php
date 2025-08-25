<?php

namespace App\Http\Controllers;

use App\Data\Leases\LeaseData;
use App\Models\Lease;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class LeaseController extends Controller
{
    public function index(): Response
    {
        $leases = auth()->user()->leases()->get();
        return Inertia::render('leases/index', [
            'leases' => $leases,
        ]);
    }

    public function create(): Response
    {
        $upload_option = LeaseData::rulesMetadata();
        return Inertia::render('leases/create', [
            'upload_option' => $upload_option,
        ]);
    }

    public function store(LeaseData $data): RedirectResponse
    {
        $lease = auth()->user()->leases()->create($data->toArray());
        return redirect()->route('leases.show', $lease)->with('success', 'Lease created successfully.');
    }

    public function show(Lease $lease): Response
    {
        return Inertia::render('leases/show', [
            'lease' => $lease,
        ]);
    }

    public function edit(Lease $lease): Response
    {
        return Inertia::render('leases/edit', [
            'lease' => $lease,
        ]);
    }

    public function update(LeaseData $data, Lease $lease): RedirectResponse
    {
        $lease->update($data->toArray());
        return redirect()->route('leases.show', $lease)->with('success', 'Lease updated successfully.');
    }

    public function destroy(Lease $lease): RedirectResponse
    {
        $lease->delete();
        return redirect()->route('leases')->with('success', 'Lease deleted successfully.');
    }
}
