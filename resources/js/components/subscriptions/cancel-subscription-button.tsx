import {
    AlertDialog, AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader, AlertDialogTitle,
    AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { dateFormatter } from '@/lib/formatters';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { cancel } from '@/routes/subscription';
import { Form } from '@inertiajs/react';

type Props = {
    endDate: Date
}

const VALUE = 'cancel my subscription';

export default function CancelSubscriptionButton(props: Props) {
    const { endDate } = props;
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');

    return <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger>
            <Button variant="destructive">Cancel Subscription</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader className="text-start text-balance">
                <AlertDialogTitle>
                    Are you sure you want to cancel your subscription?
                </AlertDialogTitle>
                <AlertDialogDescription className="space-y-4">
                    <ul className="space-y-2 list-disc pl-3">
                        <li>Your subscription will remain active until <strong>{dateFormatter.format(endDate)}</strong>.
                        </li>
                        <li>You won’t be charged again after today.</li>
                        <li>You can always resubscribe later.</li>
                    </ul>
                    <div className="grid gap-2">
                        <Label htmlFor="confirm-cancel">
                            Type <strong className="text-primary">{VALUE}</strong> to confirm.
                        </Label>
                        <Input
                            type="text"
                            id="confirm-cancel"
                            placeholder="Type here to confirm"
                            value={value}
                            onChange={(event) => setValue(event.target.value)}
                        />
                    </div>
                </AlertDialogDescription>
            </AlertDialogHeader>
            <Form {...cancel.form()} onSuccess={() => setOpen(false)}>
                {({ processing }) => (
                    <AlertDialogFooter>
                        <AlertDialogCancel type="button">Go Back</AlertDialogCancel>
                        <Button type="submit" variant="destructive" disabled={(value !== VALUE) || processing}>
                            {processing ? 'Cancelling...' : 'Yes, Cancel Subscription'}
                        </Button>
                    </AlertDialogFooter>
                )}
            </Form>
        </AlertDialogContent>
    </AlertDialog>;
}
