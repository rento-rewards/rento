import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PayRentIllustration() {
    return (
        <Card aria-hidden="true"
             className="relative @container/invoice">
            <CardHeader>
                <CardTitle>Payment Invoice</CardTitle>
                <Badge className="bg-green-600 mt-1 font-semibold">
                    PAID
                </Badge>
            </CardHeader>
            <CardContent className="grid grid-cols-1 @lg/invoice:grid-cols-2 gap-6">
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
            </CardContent>
        </Card>
    );
}
