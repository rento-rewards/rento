import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import LeaseCard from '@/components/pages/leases/lease-card';
import { create } from '@/routes/leases';
import LeaseData = App.Data.Leases.LeaseData;

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Leases',
        href: '/leases'
    }
];

type LeaseIndexProps = {
    leases?: (LeaseData & { id: number })[],
}

export default function LeaseIndex(props: LeaseIndexProps) {
    const { leases } = props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Leases" />
            <div className="flex w-full flex-1 flex-col gap-8 p-4 @container max-w-screen-lg mx-auto">
                <Button asChild>
                    <Link href={create()} prefetch className="ml-auto">
                        <Plus />
                        Create Lease
                    </Link>
                </Button>
                {/* Placeholder for lease list or content */}
                <div className="grid gap-4 @md:grid-cols-2 @lg:grid-cols-3">
                    {!leases || leases.length === 0 && (
                        <Button variant="outline" className="col-span-full p-8 border-dashed" asChild>
                            <Link href={create()} prefetch>
                                <Plus /> Add new lease
                            </Link>
                        </Button>
                    )}
                    {leases?.map(lease => (
                        <LeaseCard lease={lease} key={lease.id} />
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
