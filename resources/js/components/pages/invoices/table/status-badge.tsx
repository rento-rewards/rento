import PaymentStatus = App.Enums.PaymentStatus;
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

type Props = {
    status: PaymentStatus
}

export default function StatusBadge({ status }: Props) {
    return <Badge className={cn(
        'bg-muted',
        status === 'paid' && 'text-green-800',
        status === 'void' && 'text-muted-foreground',
        status === 'uncollectible' && 'bg-destructive text-destructive',
        status === 'open' && 'bg-yellow-200 text-yellow-800',
        status === 'draft' && 'text-primary',
    )}>
        {
            status === 'paid' ? 'Paid' :
                status === 'void' ? 'Void' :
                    status === 'uncollectible' ? 'Failed' :
                        status === 'open' ? 'Pending' :
                            status === 'draft' ? 'Draft' : status
        }
    </Badge>;
}
