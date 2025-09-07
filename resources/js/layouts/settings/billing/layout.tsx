import { PropsWithChildren } from 'react';
import HeadingSmall from '@/components/heading-small';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from '@inertiajs/react';

const tabs = [
    { name: 'Payment Method', href: '/settings/billing' },
    { name: 'Invoices', href: '/settings/billing/invoices' }
];

export default function BillingLayout({ children }: PropsWithChildren) {
    if (typeof window === 'undefined') {
        return null;
    }

    const currentPath = window.location.pathname;

    return (
        <div className="space-y-6">
            <HeadingSmall title="Billing" description="Manage your payment information and invoices" />
            <Tabs value={currentPath}>
                <TabsList className="bg-transparent">
                    {tabs.map((tab) => (
                        <TabsTrigger
                            className="data-[state=active]:bg-muted data-[state=active]:shadow-none"
                            value={tab.href}
                            key={tab.href} asChild>
                            <Link href={tab.href}>
                                {tab.name}
                            </Link>
                        </TabsTrigger>
                    ))}
                </TabsList>
            </Tabs>
            {children}
        </div>
    );
}
