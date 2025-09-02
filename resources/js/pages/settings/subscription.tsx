import type { BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';
import Heading from '@/components/heading';
import SettingsLayout from '@/layouts/settings/layout';
import HeadingSmall from '@/components/heading-small';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Settings',
        href: '/settings',
    },
    {
        title: 'Subscription',
        href: '/settings/subscription',
    },
];

export default function Subscription() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Subscription" />
            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Subscription" description="Update your account's subscription settings" />
                </div>
            </SettingsLayout>
        </AppLayout>
    )
}
