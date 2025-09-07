import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import CreditCardForm from '@/components/payments/credit-card-form';
import { router } from '@inertiajs/react';
import { store } from '@/routes/billing';
import { useState } from 'react';

export default function UpdatePaymentMethod() {
    const [open, setOpen] = useState(false);
    return <Dialog open={open} onOpenChange={setOpen}>
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
            <CreditCardForm processPaymentMethod={(paymentMethod) => {
                router.post(store.url(), {
                    payment_method_id: paymentMethod.id
                }, {
                    onSuccess: () => setOpen(false)
                })
            }} />
        </DialogContent>
    </Dialog>;
}
