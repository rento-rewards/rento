import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import LeaseCard, { LeaseDataWithId } from '@/components/pages/leases/lease-card';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Leases',
        href: '/leases',
    },
];

type LeaseIndexProps = {
    leases?: LeaseDataWithId[]
}

export default function LeaseIndex(props: LeaseIndexProps) {
    const { leases } = props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Leases" />
            <div className="flex w-full flex-1 flex-col gap-8 p-4 @container max-w-screen-lg mx-auto">
                <Button asChild>
                    <Link href={route("leases.create")} prefetch className="ml-auto">
                        <Plus />
                        Create Lease
                    </Link>
                </Button>
                {/* Placeholder for lease list or content */}
                {}
                <div className="grid gap-4 @md:grid-cols-2 @lg:grid-cols-3">
                    {leases?.map(lease => (
                        <LeaseCard lease={lease} key={lease.id} />
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
