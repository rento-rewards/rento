import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Leases',
        href: '/leases',
    },
];

export default function LeaseIndex() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Leases" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4 container">
                <Button asChild>
                    <Link href="/leases/create" prefetch className="ml-auto">
                        <Plus />
                        Create Lease
                    </Link>
                </Button>
                {/* Placeholder for lease list or content */}
            </div>
        </AppLayout>
    );
}
