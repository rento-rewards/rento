import SubscriptionData = App.Data.Subscription.SubscriptionData;
import { dateFormatter } from '@/lib/formatters';
import CancelSubscriptionButton from '@/components/subscriptions/cancel-subscription-button';
import ChangePlanButton from '@/components/subscriptions/change-plan-button';
import ResumeSubscriptionButton from '@/components/subscriptions/resume-subscription-button';

type Props = {
    currentPlan: SubscriptionData,
};

export default function CurrentPlan(props: Props) {
    const { currentPlan } = props;
    return <div className="space-y-4 @container">
        <h4 className="font-semibold">Current plan</h4>
        <div className="grid @md:grid-cols-2 gap-4">
            <div className="bg-muted p-4 rounded-lg">
                <div className="text-sm font-semibold mb-2">{currentPlan.type === 'monthly' ? 'Monthly' : 'Yearly'}</div>
                <div className="text-muted-foreground">
                    <p>
                        <span className="text-foreground text-2xl font-bold">
                            ${currentPlan.type === 'monthly' ? 5 : 3}
                        </span> per month
                    </p>
                    <p className="text-sm mt-2">{
                        currentPlan.type === 'monthly'
                            ? 'Billed monthly'
                            : 'Billed $36 yearly'
                    }</p>
                </div>
            </div>
            <div className="flex flex-col justify-between bg-muted p-4 rounded-lg">
                <div className="text-sm font-semibold mb-2">{
                    currentPlan.on_grace_period ? 'Subscription ends on' : 'Next billing date'
                }</div>
                <div className="text-muted-foreground text-xl font-semibold tracking-tight">{
                    dateFormatter.format(new Date(currentPlan.next_billing_date))
                }</div>
            </div>
        </div>
        <div className="flex flex-wrap gap-2 items-end-safe">
            {!currentPlan.on_grace_period && <ChangePlanButton currentPlan={currentPlan} />}
            {currentPlan.on_grace_period && <ResumeSubscriptionButton currentPlan={currentPlan} />}
            {!currentPlan.on_grace_period && <CancelSubscriptionButton endDate={new Date(currentPlan.next_billing_date)} />}
        </div>
    </div>;
}
