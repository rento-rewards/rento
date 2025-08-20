import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Reports',
        href: '/reports',
    }
]

export default function ReportIndex() {
    return <AppLayout breadcrumbs={breadcrumbs}>
        <Head title={'Reports'} />
        <div className="flex w-full flex-1 flex-col gap-8 p-4">
            <div className="flex gap-4 justify-end">
                <Button asChild>
                    <Link href={route('reports.create')} prefetch>
                        <Plus />
                        New Report
                    </Link>
                </Button>
            </div>
        </div>
    </AppLayout>
}
