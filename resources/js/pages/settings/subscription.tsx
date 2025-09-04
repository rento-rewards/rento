import type { BreadcrumbItem, FlashMessage } from '@/types';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import HeadingSmall from '@/components/heading-small';
import { Head, router } from '@inertiajs/react';
import { useCallback, useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { loadStripe, PaymentMethod } from '@stripe/stripe-js';
import { subscribe } from '@/routes/subscription';
import { CircleAlert, CircleCheckIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import CreditCardForm from '@/components/payments/credit-card-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY!);

type Props = {
    flash: FlashMessage,
    currentPlan?: string,
    paymentMethod?: {
        brand: string,
        last4: string,
        exp_month: number,
        exp_year: number
    }
}

export default function Subscription(props: Props) {
    const { flash, currentPlan, paymentMethod } = props;
    const [choice, setChoice] = useState(currentPlan || 'monthly');
    console.log(paymentMethod);

    const processSubscription = useCallback((method: PaymentMethod) => {
        const url = subscribe.url({ query: { plan: getPriceId(choice), payment_method: method.id } });
        router.post(url);
    }, []);

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
                                    Monthly{' '}
                                    {currentPlan === 'monthly' && <Badge>Current</Badge>}
                                </Label>
                                <div className="text-muted-foreground mt-2 space-y-2">
                                    <p>
                                        <span className="text-foreground text-2xl font-bold">$5</span> per month
                                    </p>
                                    <p className="text-xs">Billed monthly</p>
                                </div>
                            </div>
                        </div>
                        <div
                            className="border-input has-data-[state=checked]:border-primary/50 relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none">
                            <RadioGroupItem
                                value="annually"
                                id="plan-annually"
                                className="order-1 after:absolute after:inset-0"
                            />
                            <div className="grid grow gap-2">
                                <Label htmlFor="plan-annually space-x-2">
                                    Annually{' '}
                                    <span className="text-emerald-500 text-xs leading-[inherit] font-normal">
                                        40% off
                                    </span>{' '}
                                    {currentPlan === 'annually' && <Badge>Current</Badge>}
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
                    {!currentPlan && <Card>
                        <CardHeader>
                            <CardTitle>Payment Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CreditCardForm processPayment={processSubscription} />
                        </CardContent>
                    </Card>}
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
