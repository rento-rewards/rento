import { ComponentProps } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';
import { CircleAlert } from 'lucide-react';
import { Form } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { destroy } from '@/routes/leases';

type LeaseDeleteDialogProps = {
    lease: App.Data.Leases.LeaseDetailData
} & ComponentProps<typeof Dialog>;

export default function LeaseDeleteDialog({ lease, ...rest }: LeaseDeleteDialogProps) {
    return <Dialog {...rest}>
        <DialogContent>
            <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
                <div
                    className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border text-destructive"
                    aria-hidden="true"
                >
                    <CircleAlert className="opacity-80" size={16} strokeWidth={2} />
                </div>
                <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this lease for <strong>{lease.address_line_1}</strong>? This
                        action cannot be
                        undone.
                    </DialogDescription>
                </DialogHeader>
            </div>
            <DialogFooter>
                <Form
                    {...destroy.form(lease)}
                    className="flex gap-4 w-full justify-end"
                    disableWhileProcessing
                >
                    <Button variant="secondary" type="button" onClick={() => rest.onOpenChange?.(false)}>
                        Cancel
                    </Button>
                    <Button variant="destructive" type="submit">Delete</Button>
                </Form>
            </DialogFooter>
        </DialogContent>
    </Dialog>;
}
