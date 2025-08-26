import { BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import LeaseDetail from '@/components/pages/leases/lease-detail';
import { Button } from '@/components/ui/button';
import { Download, Edit2, Trash } from 'lucide-react';
import { useState } from 'react';
import LeaseDeleteDialog from '@/components/pages/leases/lease-delete-dialog';

type LeaseShowProps = {
    lease: App.Data.Leases.LeaseDetailData
}

export default function LeaseShow(props: LeaseShowProps) {
    const [open, setOpen] = useState(false);
    const { lease } = props;
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Leases',
            href: route('leases')
        },
        {
            title: lease.address_line_1,
            href: route('leases.show', lease)
        }
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Lease Details" />
            <div className="flex w-full flex-1 flex-col gap-4 p-4 @container max-w-screen-lg mx-auto">
                <h2 className="text-xl lg:text-2xl font-semibold">
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
                    <Button asChild className="ms-auto">
                        <a href={route('leases.download', lease)}>
                            <Download /> Lease Document
                        </a>
                    </Button>
                </div>
                <LeaseDetail lease={lease} />
            </div>
            <LeaseDeleteDialog lease={lease} open={open} onOpenChange={setOpen} />
        </AppLayout>
    );
}
