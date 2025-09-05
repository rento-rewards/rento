import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { loadStripe } from '@stripe/stripe-js';
import CreditCardForm from '@/components/payments/credit-card-form';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY!);

export default function UpdatePaymentMethod() {
    return <Dialog>
        <DialogTrigger asChild>
            <Button variant="outline">Update</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader className="text-left">
                <DialogTitle>Update Payment Method</DialogTitle>
                <DialogDescription>
                    Enter your new payment information below.
                </DialogDescription>
            </DialogHeader>
            <CreditCardForm processPaymentMethod={console.log} />
        </DialogContent>
    </Dialog>;
}
