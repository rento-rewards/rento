import { loadStripe, PaymentMethod } from '@stripe/stripe-js';
import { CardNumberElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { FormEvent, useState } from 'react';
import CardInputs from '@/components/payments/card-inputs';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY!);

type Props = {
    processPayment: (method: PaymentMethod) => void,
    className?: string
}

export default function(props: Props) {
    return <Elements stripe={stripePromise}>
        <CreditCardForm {...props} />
    </Elements>;
}

function CreditCardForm({ processPayment, className }: Props) {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setLoading(true);
        const cardNumber = elements.getElement(CardNumberElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardNumber!
        });

        if (error || !paymentMethod) {
            console.error(error.message);
            setLoading(false);
            return;
        }

        processPayment(paymentMethod);
        setLoading(false);
    };

    return <form className={cn('space-y-4', className)} onSubmit={handleSubmit}>
        <CardInputs />
        <Button type="submit" disabled={!stripe || loading}>
            {loading ? 'Processing...' : 'Subscribe'}
        </Button>
    </form>;

}
