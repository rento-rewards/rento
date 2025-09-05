import type { BreadcrumbItem, FlashMessage } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import SettingsLayout from '@/layouts/settings/layout';
import HeadingSmall from '@/components/heading-small';
import AlertMessage from '@/components/alert-message';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Settings',
        href: '/settings'
    },
    {
        title: 'Billing',
        href: '/settings/billing'
    }
];

type Props = {
    flash: FlashMessage
}

export default function Billing(props: Props) {
    const { flash } = props;
    return <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Billing" />
        <SettingsLayout>
            <HeadingSmall title="Billing" description="Manage your payment information and invoices" />
            {flash.success &&
                <AlertMessage variant="success">
                    {flash.success}
                </AlertMessage>}
            {flash.error && <AlertMessage variant="error">
                {flash.error}
            </AlertMessage>}
            <div className="space-y-6">

            </div>
        </SettingsLayout>
    </AppLayout>;
}
