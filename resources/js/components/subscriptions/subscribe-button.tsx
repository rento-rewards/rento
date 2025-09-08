import { FormEvent, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
    DialogTitle,
    DialogDescription, DialogFooter, DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import CardInputs from '@/components/payments/card-inputs';
import CreditCardDisplay from '@/components/payments/credit-card-display';
import { useForm } from '@inertiajs/react';
import { subscribe } from '@/routes/subscription';

type Props = {
    paymentMethod?: App.Data.Subscription.PaymentMethodData,
    subscriptionType: App.Enums.SubscriptionType
}

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

export function SubscribeButton(props: Props) {
    const [open, setOpen] = useState(false);

    return <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button>Subscribe</Button>
        </DialogTrigger>
        <Elements stripe={stripePromise}>
            <SubscribeDialogContent {...props} onSuccess={() => setOpen(false)} />
        </Elements>
    </Dialog>;
}

function SubscribeDialogContent(props: Props & { onSuccess: () => void }) {
    const { paymentMethod, subscriptionType } = props;
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [showCreditCardForm, setShowCreditCardForm] = useState(false);
    const { data, setData, processing, post } = useForm<App.Data.Subscription.SubscriptionFormData>({
        type: subscriptionType,
        payment_method_id: paymentMethod?.id || ''
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!data.payment_method_id) {
            if (!stripe || !elements) return;

            setLoading(true);
            const cardNumber = elements.getElement('cardNumber');

            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardNumber!
            });

            if (error || !paymentMethod) {
                console.error(error?.message);
                setLoading(false);
                return;
            }
            setLoading(false);
            setData('payment_method_id', paymentMethod.id);
        }

        post(subscribe.url(), {
            onFinish: () => {
                setLoading(false);
                props.onSuccess();
            }
        });
    }

    return <DialogContent>
        <form onSubmit={handleSubmit}>
            <DialogHeader>
                <DialogTitle>Subscribe</DialogTitle>
                <DialogDescription className="flex flex-col gap-2 my-4">
                    <div>
                        You have <strong>14 days</strong> free trial. After that, we will charge you <strong>{
                        subscriptionType === 'monthly' ? '$5 monthly' : '$36 annually'
                    }</strong> for the subscription. You can cancel anytime.
                    </div>
                    {
                        (paymentMethod && !showCreditCardForm) ? <div className="space-y-4">
                            <div className="mb-2">
                                We will use your existing payment method
                            </div>
                            <CreditCardDisplay card={paymentMethod} />
                        </div> : <div className="space-y-4">
                            <div>
                                Please enter your credit card details
                            </div>
                            <CardInputs />
                        </div>
                    }
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant="ghost">
                        Cancel
                    </Button>
                </DialogClose>
                {paymentMethod && <Button type="button" variant="outline"
                                          onClick={() => setShowCreditCardForm(!showCreditCardForm)}>
                    {showCreditCardForm ? 'Use existing payment method' : 'Use a different card'}
                </Button>}
                <Button type="submit" disabled={loading || processing}>{
                    loading || processing ? 'Processing...' : 'Subscribe'
                }</Button>
            </DialogFooter>
        </form>
    </DialogContent>
}
