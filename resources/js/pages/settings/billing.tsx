import type { BreadcrumbItem, FlashMessage } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import SettingsLayout from '@/layouts/settings/layout';
import HeadingSmall from '@/components/heading-small';
import AlertMessage from '@/components/alert-message';
import CreditCardDisplay from '@/components/payments/credit-card-display';
import PaymentMethodData = App.Data.Subscription.PaymentMethodData;
import UpdatePaymentMethod from '@/components/payments/update-payment-method';
import AddNewPaymentMethod from '@/components/payments/add-new-payment-method';

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
    flash: FlashMessage,
    payment_method?: PaymentMethodData
}

export default function Billing(props: Props) {
    const { flash, payment_method } = props;
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
                <div className="flex flex-col gap-2">
                    <div className="flex items-baseline-last flex-wrap justify-between">
                        <h4 className="font-semibold">Payment Method</h4>
                        {payment_method && <UpdatePaymentMethod />}
                    </div>
                    {payment_method ? <CreditCardDisplay card={payment_method} />
                        : <AddNewPaymentMethod />}
                </div>
            </div>
        </SettingsLayout>
    </AppLayout>;
}
