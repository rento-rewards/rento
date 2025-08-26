<?php

namespace App\Http\Controllers;

use App\Data\Leases\DocumentData;
use App\Data\Leases\LeaseDetailData;
use App\Data\Reports\ReportDetailData;
use App\Data\Reports\ReportFormData;
use App\Data\Reports\ReportTableData;
use App\Http\Requests\Reports\LeaseLookupRequest;
use App\Models\Lease;
use App\Models\Report;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ReportController extends Controller
{
    public function index(): Response
    {
        $per_page = request('per_page', 10);
        $reports = auth()->user()->reports()->paginate($per_page)->withQueryString();
        return Inertia::render('reports/index', [
            'reports' => ReportTableData::collect($reports),
        ]);
    }

    public function create(): RedirectResponse
    {
        return redirect()->route('reports.create.step1');
    }

    public function step1(): Response
    {
        $leases = auth()->user()->leases()->get();
        $lease = $this->getCurrentLease();

        return Inertia::render('reports/create/step/step1', [
            'leases' => $leases,
            'lease_id' => $lease?->id,
        ]);
    }

    public function processStep1(LeaseLookupRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $request->session()->put('lease_id', $data['lease_id']);
        return redirect()->route('reports.create.step2');
    }

    public function step2(): Response
    {
        $lease = $this->getLeaseOrRedirect();
        $report = $this->getCurrentReport();
        return Inertia::render('reports/create/step/step2', [
            'lease' => $lease,
            'report' => $report,
            'upload_option' => DocumentData::rulesMetadata(),
            'proof_of_payment' => session('proof_of_payment'),
        ]);
    }

    public function processStep2(ReportFormData $data): RedirectResponse
    {
        // Upload the proof of payment file
        if ($data->need_upload) {
            $proof_of_payment = Storage::disk('reports')->putFile('tmp', $data->proof_of_payment);
            session()->put('proof_of_payment', [
                'name' => $data->proof_of_payment->getClientOriginalName(),
                'size' => $data->proof_of_payment->getSize(),
                'type' => $data->proof_of_payment->getClientMimeType(),
                'url' => Storage::disk('leases')->url($proof_of_payment),
                'id' => $proof_of_payment,
            ]);
        }

        session()->put('report_data', $data->except('proof_of_payment')->toArray());
        return redirect()->route('reports.create.step3');
    }

    public function step3(): Response
    {
        $lease = $this->getLeaseOrRedirect();
        $report = $this->getReportOrRedirect();
        $proof_of_payment = $this->getProofOfPaymentOrRedirect();
        return Inertia::render('reports/create/step/step3', [
            'lease' => $lease,
            'report' => $report,
            'proof_of_payment' => $proof_of_payment,
        ]);
    }

    public function store(): RedirectResponse
    {
        $lease = $this->getLeaseOrRedirect();
        $report = $this->getReportOrRedirect();
        $proof_of_payment = $this->getProofOfPaymentOrRedirect();

        // Move the proof of payment file from tmp to the lease folder
        $old_path = $proof_of_payment['id'];
        $new_path = basename($old_path);
        Storage::disk('reports')->move($old_path, $new_path);
        $report['proof_of_payment'] = $new_path;

        $report = $lease->reports()->create($report);
        session()->forget(['lease_id', 'report_data', 'proof_of_payment']);

        return redirect()->route('reports.show', $report);
    }

    public function show(Report $report): Response {
        return Inertia::render('reports/show', [
            'report' => ReportDetailData::from($report),
            'lease' => LeaseDetailData::from($report->lease),
        ]);
    }

    private function getCurrentLease(): ?Lease {
        $lease_id = session('lease_id');
        return $lease_id ? auth()->user()->leases()->find($lease_id) : null;
    }

    private function getLeaseOrRedirect(): Lease {
        $lease = $this->getCurrentLease();

        if (!$lease) {
            abort(redirect()->route('reports.create.step1')->withErrors([
                'lease_id' => 'Please select a lease to continue.',
            ]));
        }

        return $lease;
    }

    private function getCurrentReport() {
        return session('report_data');
    }

    private function getReportOrRedirect() {
        $report = $this->getCurrentReport();

        if (!$report) {
            abort(redirect()->route('reports.create.step2')->withErrors([
                'report_data' => 'Please complete the previous steps to continue.',
            ]));
        }

        return $report;
    }

    private function getProofOfPaymentOrRedirect() {
        $proof_of_payment = session('proof_of_payment');

        if (!$proof_of_payment) {
            abort(redirect()->route('reports.create.step2')->withErrors([
                'proof_of_payment' => 'Please upload a proof of payment to continue.',
            ]));
        }

        return $proof_of_payment;
    }
}
