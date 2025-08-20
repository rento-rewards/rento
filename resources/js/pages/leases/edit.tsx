import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import LeaseForm from '@/components/pages/leases/lease-form';

type LeaseEditProps = {
    lease: App.Data.LeaseData & { id: string };
}

export default function LeaseEdit({ lease }: LeaseEditProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Leases',
            href: route('leases')
        },
        {
            title: 'Edit Lease',
            href: route('leases.edit', { id: lease.id }) // Replace with actual lease ID
        }
    ];

    return <AppLayout breadcrumbs={breadcrumbs}>
        <LeaseForm defaultValues={lease} />
    </AppLayout>
}
