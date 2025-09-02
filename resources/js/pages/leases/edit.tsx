import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, UploadOption } from '@/types';
import LeaseForm from '@/components/pages/leases/lease-form';
import { index } from '@/actions/App/Http/Controllers/LeaseController';

type LeaseEditProps = {
    lease: App.Data.Leases.LeaseData & { id: string };
    upload_option: UploadOption;
}

export default function LeaseEdit({ lease, upload_option }: LeaseEditProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Leases',
            href: index.url()
        },
        {
            title: 'Edit Lease',
            href: ''
        }
    ];

    return <AppLayout breadcrumbs={breadcrumbs}>
        <LeaseForm defaultValues={lease} uploadOption={upload_option} />
    </AppLayout>
}
