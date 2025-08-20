import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { ReactNode } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: "Reports", href: '/reports' },
    { title: "New Report", href: '' }
];

export default function ReportLayout({ children }: { children: ReactNode }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            {children}
        </AppLayout>
    );
}
