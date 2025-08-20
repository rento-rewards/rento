import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Reports', href: route('reports') },
    { title: 'Report Details', href: '' }
];

type Props = {
    report: App.Data.Reports.ReportData,
}

export default function ReportShow() {
    return (<AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Report Details" />
    </AppLayout>);
}
