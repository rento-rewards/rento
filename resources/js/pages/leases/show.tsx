import { BreadcrumbItem, LaravelPagination } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import LeaseDetail from '@/components/pages/leases/lease-detail';
import { Button } from '@/components/ui/button';
import { Download, Edit2, Plus, Trash } from 'lucide-react';
import { useState } from 'react';
import LeaseDeleteDialog from '@/components/pages/leases/lease-delete-dialog';
import ReportTable from '@/components/pages/reports/report-table';

type LeaseShowProps = {
    lease: App.Data.Leases.LeaseDetailData,
    reports: LaravelPagination<App.Data.Reports.ReportTableData>
}

export default function LeaseShow({ lease, reports }: LeaseShowProps) {
    const [open, setOpen] = useState(false);
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Leases',
            href: route('leases')
        },
        {
            title: lease.address_line_1,
            href: ''
        }
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Lease Details" />
            <div className="flex w-full flex-1 flex-col gap-4 p-4 @container max-w-screen-lg mx-auto">
                <h2 className="text-3xl font-semibold tracking-tight">
                    {lease.address_line_1}
                </h2>
                <div className="flex gap-2">
                    <Button variant="outline" asChild>
                        <Link href={route('leases.edit', lease)} prefetch>
                            <Edit2 />
                            Edit
                        </Link>
                    </Button>
                    <Button variant="destructive" onClick={() => setOpen(true)}>
                        <Trash /> Delete
                    </Button>
                    <Button asChild className="ms-auto" variant="outline">
                        <a href={route('leases.download', lease)}>
                            <Download /> Lease Document
                        </a>
                    </Button>
                    <Button asChild>
                        <Link href={route('reports.create', { lease_id: lease.id })}>
                            <Plus />
                            New Report
                        </Link>
                    </Button>
                </div>
                <LeaseDetail lease={lease} />

                <div className="space-y-4">
                    <h3 className="text-2xl font-semibold tracking-tight">Reports</h3>
                    <ReportTable reports={reports} />
                </div>
            </div>
            <LeaseDeleteDialog lease={lease} open={open} onOpenChange={setOpen} />
        </AppLayout>
    );
}
