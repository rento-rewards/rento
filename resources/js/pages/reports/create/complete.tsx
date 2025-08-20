import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Reports',
        href: '/reports',
    },
    {
        title: 'New Report',
        href: '/reports/create',
    }
]

export default function ReportCreate() {
    return <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="New Report" />
        <div className="w-full @container/report-form">
        </div>
    </AppLayout>
}
