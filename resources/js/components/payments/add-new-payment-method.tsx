import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CreditCardForm from '@/components/payments/credit-card-form';
import { router } from '@inertiajs/react';
import { store } from '@/routes/billing';
import { useState } from 'react';

export default function AddNewPaymentMethod() {
    const [open, setOpen] = useState(false);
    return <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
            <Button variant="outline" className="border-dashed w-full h-16">
                <Plus />New Payment Method
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader className="text-start">
                <DialogTitle>Add Payment Method</DialogTitle>
                <DialogDescription>
                    Enter your new payment information below.
                </DialogDescription>
            </DialogHeader>
            <CreditCardForm processPaymentMethod={(paymentMethod) => {
                router.post(store.url(), {
                    payment_method_id: paymentMethod.id
                }, { onSuccess: () => setOpen(false) })
            }} />
        </DialogContent>
    </Dialog>;
}
