import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import SubscriptionType = App.Enums.SubscriptionType;
import { SubscribeButton } from '@/components/subscriptions/subscribe-button';
import { useState } from 'react';

type Props = {
    paymentMethod?: App.Data.Subscription.PaymentMethodData
}

export default function NewSubscription(props: Props) {
    const { paymentMethod } = props;
    const [choice, setChoice] = useState<App.Enums.SubscriptionType>("monthly");

    return <>
        <RadioGroup value={choice}
                    onValueChange={(value) => setChoice(value as SubscriptionType)}
                    className="grid @md:grid-cols-2 gap-4">
            <div
                className="border-input has-data-[state=checked]:border-primary/50 relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none">
                <RadioGroupItem
                    value="monthly"
                    id="plan-monthly"
                    className="order-1 after:absolute after:inset-0"
                />
                <div className="grid grow gap-2">
                    <Label htmlFor="plan-monthly">Monthly</Label>
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
                    value="yearly"
                    id="plan-yearly"
                    className="order-1 after:absolute after:inset-0"
                />
                <div className="grid grow gap-2">
                    <Label htmlFor="plan-yearly space-x-2">
                        Yearly
                        <span className="text-emerald-500 text-xs leading-[inherit] font-normal">40% off</span>
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
        <SubscribeButton paymentMethod={paymentMethod} subscriptionType={choice} />
    </>;
}
