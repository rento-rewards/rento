import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useForm } from '@inertiajs/react';
import SubscriptionType = App.Enums.SubscriptionType;
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { FormEvent } from 'react';
import { update } from '@/routes/subscription';

type Props = {
    currentPlan: SubscriptionType
}

export default function ChangePlanButton(props: Props) {
    const { currentPlan } = props;
    const { data, setData, processing, patch } = useForm({
        type: currentPlan
    });

    const handlePlanSwitch = (e: FormEvent) => {
        e.preventDefault();
        if (data.type === currentPlan) {
            return;
        }
        patch(update.url())
    }

    return <Dialog>
        <DialogTrigger asChild>
            <Button variant="outline">
                Switch Plan
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader className="text-left">
                <DialogTitle>Switch Your Plan</DialogTitle>
                <DialogDescription>
                    You’ll keep all your current features — just choose how you’d like to be billed.
                </DialogDescription>
            </DialogHeader>
            <form onSubmit={handlePlanSwitch}>
                <RadioGroup name="type" className="gap-2 mb-4" value={data.type}
                            onValueChange={(value) => setData('type', value as SubscriptionType)}>
                    <div
                        className="border-input has-data-[state=checked]:border-primary/50 relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none">
                        <RadioGroupItem
                            value="monthly"
                            id="switch-monthly"
                            className="order-1 after:absolute after:inset-0"
                        />
                        <div className="grid grow gap-2">
                            <Label className="flex items-baseline gap-2" htmlFor="switch-monthly">
                                <span>Monthly</span>
                                {currentPlan === "monthly" && <Badge>Current</Badge>}
                            </Label>
                            <p className="text-xs">
                                <span className="text-lg font-semibold">$5</span> per month
                            </p>
                            <p className="text-muted-foreground text-xs">
                                Billed monthly
                            </p>
                        </div>
                    </div>
                    <div
                        className="border-input has-data-[state=checked]:border-primary/50 relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none">
                        <RadioGroupItem
                            value="yearly"
                            id="switch-yearly"
                            className="order-1 after:absolute after:inset-0"
                        />
                        <div className="grid grow gap-2">
                            <Label className="flex items-baseline gap-2" htmlFor="switch-yearly">
                                <span>
                                    Yearly
                                </span>
                                {currentPlan === "yearly" ? <Badge>Current</Badge> : <span className="text-primary text-xs">Save 40%</span>}
                            </Label>
                            <p className="text-xs">
                                <span className="text-lg font-semibold">$3</span> per month
                            </p>
                            <p className="text-muted-foreground text-xs">
                                Billed $36 yearly
                            </p>
                        </div>
                    </div>
                </RadioGroup>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">
                            Keep Current Plan
                        </Button>
                    </DialogClose>
                    <Button disabled={processing || data.type === currentPlan}>
                        {processing ? 'Switching...' : 'Switch Plan'}
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>;
}
