import type { BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import SettingsLayout from '@/layouts/settings/layout';
import InvoiceTable from '@/components/pages/invoices/invoice-table';
import { Button } from '@/components/ui/button';
import BillingLayout from '@/layouts/settings/billing/layout';
import billing from '@/routes/billing'

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
    invoices: App.Data.Subscription.InvoiceTableData[],
    has_more: boolean,
}

export default function Invoices(props: Props) {
    console.log(props);
    const { invoices, has_more } = props;
    const loadMore = () => {
        if (!has_more) return;
        router.get(billing.invoices(), {
            last_invoice: invoices.at(invoices.length - 1)?.id
        }, {
            preserveScroll: true,
            preserveUrl: true,
            only: ['invoices', 'has_more'],
        })
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Billing" />
            <SettingsLayout>
                <BillingLayout>
                    <div className="flex flex-col gap-2">
                        <InvoiceTable invoices={invoices} />
                        {has_more &&
                            <div className="flex justify-center">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    rel="noopener noreferrer"
                                    onClick={loadMore}
                                >
                                    View More
                                </Button>
                            </div>
                        }
                    </div>
                </BillingLayout>
            </SettingsLayout>
        </AppLayout>
    );
}
