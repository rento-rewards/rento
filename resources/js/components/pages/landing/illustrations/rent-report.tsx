import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLogoIcon from '@/components/app-logo-icon';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function RentReportIllustration() {
    return (
        <Card aria-hidden="true" className="max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="inline-flex items-baseline gap-2">
                    <AppLogoIcon className="size-4" />
                    Rent Report
                </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid gap-2">
                    <Label>Payment Amount</Label>
                    <div className="relative">
                        <Input
                            value={2800}
                            className={'peer ps-9'}
                            readOnly
                        />
                        <div
                            className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                            <DollarSign size={16} strokeWidth={2} aria-hidden="true" />
                        </div>
                    </div>
                </div>
                <div className="grid gap-2">
                    <Label>Payment Date</Label>
                    <Input
                        value="December 28, 2023"
                        readOnly
                    />
                </div>
                <Button>
                    Report
                </Button>
            </CardContent>
        </Card>
    );
}
