import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function PayRentIllustration() {
    return (
        <div aria-hidden="true"
             className="bg-background ring-border overflow-hidden
                rounded-2xl border border-transparent p-8 shadow-lg shadow-black/10 ring-1 space-y-6 relative @container/invoice">
            <span className="absolute top-4 right-4 z-10 bg-green-600 px-4 py-2 rounded font-bold text-lg transform shadow-md border">
                PAID
            </span>
            <div>
                <h3 className="text-xl text-foreground mb-1 font-semibold">Payment Invoice</h3>
                <Badge>
                    #2024-001
                </Badge>
            </div>
            <div className="grid grid-cols-1 @lg/invoice:grid-cols-2 gap-6">
                <div className="text-sm text-muted-foreground space-y-1">
                    <p className="font-medium text-foreground">Sunset Property Management</p>
                    <p>123 Main Street</p>
                    <p>Vancouver, BC V1A 1A1</p>
                    <p>contact@sunsetpm.com</p>
                </div>
                <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Amount</span>
                        <span className="font-semibold text-primary">$2,800</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Period</span>
                        <span className="text-foreground">January 2024</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Payment Date</span>
                        <span className="text-primary font-medium">December 28, 2023</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Payment Method</span>
                        <span className="text-foreground">Bank Transfer</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
