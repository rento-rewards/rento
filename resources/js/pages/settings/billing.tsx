import type { BreadcrumbItem, FlashMessage } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import SettingsLayout from '@/layouts/settings/layout';
import AlertMessage from '@/components/alert-message';
import CreditCardDisplay from '@/components/payments/credit-card-display';
import PaymentMethodData = App.Data.Subscription.PaymentMethodData;
import UpdatePaymentMethod from '@/components/payments/update-payment-method';
import AddNewPaymentMethod from '@/components/payments/add-new-payment-method';
import InvoiceTableData = App.Data.Subscription.InvoiceTableData;
import BillingLayout from '@/layouts/settings/billing/layout';

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
            <BillingLayout>
                {flash.success &&
                    <AlertMessage variant="success">
                        {flash.success}
                    </AlertMessage>}
                {flash.error && <AlertMessage variant="error">
                    {flash.error}
                </AlertMessage>}
                {payment_method ?
                    <div className="flex flex-col gap-3">
                        <CreditCardDisplay card={payment_method} />
                        <div className="flex justify-end">
                            <UpdatePaymentMethod />
                        </div>
                    </div>
                    : <AddNewPaymentMethod />}
            </BillingLayout>
        </SettingsLayout>
    </AppLayout>;
}
