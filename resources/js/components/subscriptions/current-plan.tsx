import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import SubscriptionData = App.Data.Subscription.SubscriptionData;
import { Button } from '@/components/ui/button';
import { dateFormatter } from '@/lib/formatters';
import CancelSubscriptionButton from '@/components/subscriptions/cancel-subscription-button';

type Props = Pick<SubscriptionData, 'type' | 'next_billing_date'>;

export default function CurrentPlan(props: Props) {
    const { type, next_billing_date } = props;
    return <div className="space-y-4 @container">
        <h4 className="font-semibold">Current plan</h4>
        <div className="grid @md:grid-cols-2 gap-4">
            <div className="bg-muted p-4 rounded-lg">
                <div className="text-sm font-semibold mb-2">{type === 'monthly' ? 'Monthly' : 'Yearly'}</div>
                <div className="text-muted-foreground">
                    <p>
                            <span
                                className="text-foreground text-2xl font-bold">${type === 'monthly' ? 5 : 3}</span> per
                        month
                    </p>
                    <p className="text-sm mt-2">{
                        type === 'monthly'
                            ? 'Billed monthly'
                            : 'Billed $36 yearly'
                    }</p>
                </div>
            </div>
            <div className="flex flex-col justify-between bg-muted p-4 rounded-lg">
                <div className="text-sm font-semibold mb-2">Next Billing</div>
                <div className="text-muted-foreground text-xl font-semibold tracking-tight">{
                    dateFormatter.format(new Date(next_billing_date))
                }</div>
            </div>
        </div>
        <div className="flex flex-wrap gap-2 items-end-safe">
            <Button variant="outline">
                Change Plan
            </Button>
            <CancelSubscriptionButton endDate={new Date(next_billing_date)} />
        </div>
    </div>;
}
