import PaymentMethodData = App.Data.Subscription.PaymentMethodData;
import getCardBrandSVG from '@/components/payments/card-brands';

type Props = {
    card: PaymentMethodData
}

export default function CreditCardDisplay({ card }: Props) {
    const Icon = getCardBrandSVG(card.brand);

    return (
        <div className="flex items-center gap-4 border-2 p-4 rounded-2xl @container/credit-card">
            <Icon className="w-12 h-8" role="img" />
            <div className="text-sm">
                <p className="text-sm font-medium">•••• •••• •••• {card.last4}</p>
                <p className="text-sm text-muted-foreground">
                    Expires {
                    card.exp_month.toString().padStart(2, '0')
                }/{
                    card.exp_year.toString().slice(-2)
                }</p>
            </div>
        </div>
    );
}
