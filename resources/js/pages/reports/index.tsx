import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, LaravelPagination } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import ReportTable from '@/components/pages/reports/report-table';
import { create, index } from '@/actions/App/Http/Controllers/ReportController';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Reports',
        href: '/reports',
    }
]

type Props = {
    reports: LaravelPagination<App.Data.Reports.ReportTableData>
}

export default function ReportIndex({ reports }: Props) {
    return <AppLayout breadcrumbs={breadcrumbs}>
        <Head title={'Reports'} />
        <div className="flex w-full flex-1 flex-col gap-4 p-4 max-w-screen-lg mx-auto">
            <div className="flex gap-4 justify-end">
                <Button asChild>
                    <Link href={create()} prefetch>
                        <Plus />
                        New Report
                    </Link>
                </Button>
            </div>
            <ReportTable reports={reports} handlePerPageChange={(value) => {
                router.visit(index({ query: { per_page: value }}), { preserveState: true });
            }} />
        </div>
    </AppLayout>
}
