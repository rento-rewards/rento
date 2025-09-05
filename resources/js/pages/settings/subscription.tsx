import type { BreadcrumbItem, FlashMessage } from '@/types';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import HeadingSmall from '@/components/heading-small';
import { Head } from '@inertiajs/react';
import NewSubscription from '@/components/subscriptions/new-subscription';
import SubscriptionData = App.Data.Subscription.SubscriptionData;
import CurrentPlan from '@/components/subscriptions/current-plan';
import AlertMessage from '@/components/alert-message';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Settings',
        href: '/settings'
    },
    {
        title: 'Subscription',
        href: '/settings/subscription'
    }
];

type Props = {
    flash: FlashMessage,
    current_plan?: SubscriptionData
}

export default function Subscription(props: Props) {
    console.log(props);
    const { flash, current_plan } = props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Subscription" />
            <SettingsLayout>
                <div className="space-y-6 @container">
                    <HeadingSmall title="Subscription" description="Update your account's subscription settings" />
                    {flash.success && <AlertMessage variant="success">
                        {flash.success}
                    </AlertMessage>}
                    {flash.error && <AlertMessage variant="error">
                        {flash.error}
                    </AlertMessage>}
                    {current_plan ? <CurrentPlan {...current_plan} /> : <NewSubscription />}
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
