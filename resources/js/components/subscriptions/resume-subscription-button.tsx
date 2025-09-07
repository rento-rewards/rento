import { Button } from '@/components/ui/button';
import {
    AlertDialog, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { useState } from 'react';
import SubscriptionData = App.Data.Subscription.SubscriptionData;
import { dateFormatter } from '@/lib/formatters';
import { Form } from '@inertiajs/react';
import { resume } from '@/routes/subscription';

type Props = {
    currentPlan: SubscriptionData,
}

export default function ResumeSubscriptionButton(props: Props) {
    const { currentPlan } = props;
    const [open, setOpen] = useState(false);
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger>
                <Button
                    variant="outline"
                >
                    Resume Subscription
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Ready to Resume Your Subscription?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        <ul className="list-disc ml-3 space-y-2">
                            <li>
                                Your subscription will be reactivated immediately, and you’ll regain access to all
                                features.
                            </li>
                            <li>
                                You will be charged on your next billing date, which
                                is <strong>{dateFormatter.format(new Date(currentPlan.next_billing_date))}</strong>.
                            </li>
                        </ul>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <Form {...resume.form()} onSuccess={() => setOpen(false)}>
                    {({ processing }) => (
                        <AlertDialogFooter>
                            <AlertDialogCancel type="button">
                                Go Back
                            </AlertDialogCancel>
                            <Button disabled={processing} type="submit">
                                {processing ? 'Resuming...' : 'Yes, Resume Subscription'}
                            </Button>
                        </AlertDialogFooter>
                    )}
                </Form>
            </AlertDialogContent>
        </AlertDialog>
    );
}
