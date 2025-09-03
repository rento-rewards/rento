import type { BreadcrumbItem, FlashMessage } from '@/types';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import HeadingSmall from '@/components/heading-small';
import { Head } from '@inertiajs/react';
import { FormEvent, useCallback, useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { loadStripe, PaymentMethod } from '@stripe/stripe-js';
import {
    CardNumberElement,
    Elements,
    useElements,
    useStripe
} from '@stripe/react-stripe-js';
import { Card, CardContent } from '@/components/ui/card';
import CardInputs from '@/components/payments/card-inputs';
import { subscribe } from '@/routes/subscription';
import { router } from '@inertiajs/react';
import { CircleAlert, CircleCheckIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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
                                    Monthly{" "}
                                    {currentPlan === "monthly" && <Badge>Current</Badge>}
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
                                    Annually{" "}
                                    <span className="text-emerald-500 text-xs leading-[inherit] font-normal">
                                        40% off
                                    </span>{" "}
                                    {currentPlan === "annually" && <Badge>Current</Badge>}
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
                    {flash.success && <div className="rounded-md border border-emerald-500/50 px-4 py-3 text-emerald-600">
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
                    {!currentPlan && <Elements stripe={stripePromise}>
                        <CreditCardForm processSubscription={processSubscription} />
                    </Elements>}
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}

function CreditCardForm({ processSubscription }: { processSubscription: (method: PaymentMethod) => void }) {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (!stripe || !elements) return;

        setLoading(true);
        const cardNumber = elements.getElement(CardNumberElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: cardNumber!,
        });

        if (error || !paymentMethod) {
            console.error(error.message);
            setLoading(false);
            return;
        }

        processSubscription(paymentMethod)
        setLoading(false);
    }

    return <Card className="@container">
        <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <CardInputs />
                <Button type="submit" disabled={!stripe || loading}>
                    {loading ? 'Processing...' : 'Subscribe'}
                </Button>
            </form>
        </CardContent>
    </Card>
}
