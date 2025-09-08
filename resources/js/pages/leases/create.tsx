import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, UploadOption } from '@/types';
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

type Props = {
    upload_option: UploadOption;
    report_after_save: boolean
}

export default function LeaseCreate(props: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Lease" />
            <LeaseForm uploadOption={props.upload_option} reportAfterSave={props.report_after_save} />
        </AppLayout>
    );
}
