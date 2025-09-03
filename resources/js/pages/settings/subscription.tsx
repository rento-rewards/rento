import type { BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import HeadingSmall from '@/components/heading-small';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { checkout } from '@/routes';

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

function getPriceId(choice: string): string {
    if (choice === 'monthly') {
        return import.meta.env.VITE_STRIPE_MONTHLY_PRICE_ID!;
    }
    return import.meta.env.VITE_STRIPE_ANNUAL_PRICE_ID!;
}

export default function Subscription() {
    const [choice, setChoice] = useState('monthly');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Subscription" />
            <SettingsLayout>
                <div className="space-y-6 @container">
                    <HeadingSmall title="Subscription" description="Update your account's subscription settings" />
                    {/*  Plan selection  */}
                    <RadioGroup value={choice} onValueChange={setChoice} className="grid @md:grid-cols-2 gap-4">
                        <div
                            className="border-input has-data-[state=checked]:border-primary/50 relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none">
                            <RadioGroupItem
                                value="monthly"
                                id="plan-monthly"
                                className="order-1 after:absolute after:inset-0"
                            />
                            <div className="grid grow gap-2">
                                <Label htmlFor="plan-monthly">
                                    Monthly
                                </Label>
                                <div className="text-muted-foreground mt-2 space-y-2">
                                    <p>
                                        <span className="text-foreground text-2xl font-bold">$5</span> per month
                                    </p>
                                    <p className="text-xs">Billed monthly</p>
                                </div>
                            </div>
                        </div>
                        {/* Radio card #2 */}
                        <div
                            className="border-input has-data-[state=checked]:border-primary/50 relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none">
                            <RadioGroupItem
                                value="annually"
                                id="plan-annually"
                                className="order-1 after:absolute after:inset-0"
                            />
                            <div className="grid grow gap-2">
                                <Label htmlFor="plan-annually">
                                    Annually{' '}
                                    <span className="text-emerald-500 text-xs leading-[inherit] font-normal">
                                        40% off
                                    </span>
                                </Label>
                                <div className="text-muted-foreground mt-2 space-y-2">
                                    <p>
                                        <span className="text-foreground text-2xl font-bold">$3</span> per month
                                    </p>
                                    <p className="text-xs">Billed $36 annually</p>
                                </div>
                            </div>
                        </div>
                    </RadioGroup>
                    <Button asChild>
                        <a href={checkout.url({ plan: getPriceId(choice) })}>
                            Subscribe
                        </a>
                    </Button>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
