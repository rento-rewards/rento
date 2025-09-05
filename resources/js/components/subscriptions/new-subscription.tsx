import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import SubscriptionType = App.Enums.SubscriptionType;
import CreditCardForm from '@/components/payments/credit-card-form';
import { subscribe } from '@/routes/subscription';
import { PaymentMethod } from '@stripe/stripe-js';

export default function NewSubscription() {
    const { data, setData, post } = useForm<App.Data.Subscription.SubscriptionFormData>({
        type: "monthly",
        payment_method_id: ""
    });

    const handleNewSubscription = (paymentMethod: PaymentMethod) => {
        setData('payment_method_id', paymentMethod.id);
        post(subscribe.url())
    }

    return <>
        <RadioGroup value={data.type}
                    onValueChange={(value) => setData('type', value as SubscriptionType)}
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
        <CreditCardForm processPayment={handleNewSubscription} />
    </>;
}
