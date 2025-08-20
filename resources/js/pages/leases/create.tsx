import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import LeaseForm from '@/components/pages/leases/lease-form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Leases',
        href: '/leases'
    },
    {
        title: 'New Lease',
        href: '/leases/create'
    }
];

export default function LeaseCreate() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Lease" />
            <LeaseForm />
        </AppLayout>
    );
}
