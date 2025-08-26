import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import ReportCount from '@/components/pages/dashboard/ReportCount';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import Greeting from '@/components/pages/dashboard/Greeting';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex flex-1 flex-col gap-4 rounded-xl p-4 w-full max-w-screen-lg mx-auto @container/dashboard">
                <Greeting />
            </div>
        </AppLayout>
    );
}
