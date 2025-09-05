import type { BreadcrumbItem, FlashMessage } from '@/types';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import HeadingSmall from '@/components/heading-small';
import { Head } from '@inertiajs/react';
import { CircleAlert, CircleCheckIcon } from 'lucide-react';
import NewSubscription from '@/components/subscriptions/new-subscription';
import SubscriptionData = App.Data.Subscription.SubscriptionData;
import CurrentPlan from '@/components/subscriptions/current-plan';

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
                    {flash.success &&
                        <div className="rounded-md border border-emerald-500/50 px-4 py-3 text-emerald-600">
                            <p className="text-sm">
                                <CircleCheckIcon
                                    className="me-3 -mt-0.5 inline-flex opacity-60"
                                    size={16}
                                    aria-hidden="true"
                                />
                                {flash.success}
                            </p>
                        </div>}
                    {flash.error && <div className="rounded-md border border-red-500/50 px-4 py-3 text-red-600">
                        <p className="text-sm">
                            <CircleAlert
                                className="me-3 -mt-0.5 inline-flex opacity-60"
                                size={16}
                                aria-hidden="true"
                            />
                            {flash.error}
                        </p>
                    </div>}
                    {current_plan ? <CurrentPlan {...current_plan} /> : <NewSubscription />}
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
