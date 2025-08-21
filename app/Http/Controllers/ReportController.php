<?php

namespace App\Http\Controllers;

use App\Data\Reports\ReportData;
use App\Http\Requests\Reports\LeaseLookupRequest;
use App\Models\Lease;
use App\Models\Report;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;
use Inertia\Response;

class ReportController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('reports/index', []);
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

    public function step2()
    {
        $lease = $this->getLeaseOrRedirect();
        $report = $this->getCurrentReport();
        return Inertia::render('reports/create/step/step2', [
            'lease' => $lease,
            'report' => $report
        ]);
    }

    public function processStep2(ReportData $data): RedirectResponse
    {
        session()->put('report_data', $data);
        return redirect()->route('reports.create.step3');
    }

    public function step3(): Response
    {
        $lease = $this->getLeaseOrRedirect();
        $report = $this->getReportOrRedirect();
        return Inertia::render('reports/create/step/step3', [
            'lease' => $lease,
            'report' => $report,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $lease = $this->getLeaseOrRedirect();
        $data = $this->getReportOrRedirect();

        $report = $lease->reports()->create($data->toArray());
        session()->forget(['lease_id', 'report_data']);

        return redirect()->route('reports.show', $report);
    }

    public function show(Report $report): Response {
        $lease = $report->lease()->first();
        return Inertia::render('reports/show', [
            'report' => $report,
            'lease' => $lease,
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

    private function getCurrentReport(): ?ReportData {
        return session('report_data');
    }

    private function getReportOrRedirect(): ReportData {
        $report = $this->getCurrentReport();

        if (!$report) {
            abort(redirect()->route('reports.create.step2')->withErrors([
                'report_data' => 'Please complete the previous steps to continue.',
            ]));
        }

        return $report;
    }
}
