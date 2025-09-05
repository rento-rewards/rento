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

export default function AddNewPaymentMethod() {
    return <Dialog>
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
            <CreditCardForm processPaymentMethod={console.log} />
        </DialogContent>
    </Dialog>;
}
