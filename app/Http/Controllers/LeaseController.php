<?php

namespace App\Http\Controllers;

use App\Data\Leases\LeaseData;
use App\Data\Leases\LeaseDocumentData;
use App\Models\Lease;
use App\Services\LeaseDocumentExtractionService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class LeaseController extends Controller
{
    public function __construct(
        private LeaseDocumentExtractionService $leaseDocumentExtractionService
    ) {
    }

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
        $user = auth()->user();
        $document = Storage::disk('leases')->putFile('/', $data->document);
        if ($document === false) {
            return redirect()->back()->withErrors(['document' => 'Failed to upload document.'])->withInput();
        }
        $entry = [
            ...$data->except('document')->toArray(),
            'document' => $document
        ];
        $lease = $user->leases()->create($entry);
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
            'upload_option' => LeaseData::rulesMetadata(),
        ]);
    }

    public function update(LeaseData $data, Lease $lease): RedirectResponse
    {
        $lease->update($data->toArray());
        return redirect()->route('leases.show', $lease)->with('success', 'Lease updated successfully.');
    }

    public function destroy(Lease $lease): RedirectResponse
    {
        Storage::disk('leases')->delete($lease->document);
        $lease->delete();
        return redirect()->route('leases')->with('success', 'Lease deleted successfully.');
    }

    public function extract(LeaseDocumentData $data): JsonResponse
    {
        $extracted = $this->leaseDocumentExtractionService->extract($data);
        return response()->json($extracted);
    }

    public function download(Lease $lease)
    {
        $document = $lease->document;
        $extension = pathinfo($document, PATHINFO_EXTENSION);
        $url = Storage::disk('leases')->temporaryUrl($document, now()->addMinutes(5), [
            'ResponseContentDisposition' => "attachment; filename=\"lease.{$extension}\""
        ]);
        return redirect($url);
    }
}
