import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ComponentProps, useState } from 'react';
import { cn } from '@/lib/utils';
import { currencyFormatter, dateFormatter } from '@/lib/formatters';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';
import { Link } from '@inertiajs/react';

export type NextDueLease = App.Data.Leases.LeaseDetailData & {
    next_due_date: string;
}

type Props = {
    nextDues: NextDueLease[]
} & ComponentProps<typeof Card>;

export default function NextDue(props: Props) {
    const [index, setIndex] = useState(0);
    const canGoPrev = index > 0;
    const canGoNext = index < props.nextDues.length - 1;
    const { nextDues, className, ...rest } = props;
    const lease = nextDues[index];
    return (
        <Card className={cn(className)} {...rest}>
            <CardHeader className="flex-row justify-between">
                <CardTitle>Next Payment</CardTitle>
                <div className="inline-flex -space-x-px rounded-md shadow-xs rtl:space-x-reverse">
                    <Button
                        className="rounded-none shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10"
                        variant="outline"
                        size="icon"
                        aria-label="Flip Horizontal"
                        disabled={!canGoPrev}
                        onClick={() => setIndex(index - 1)}
                    >
                        <ChevronLeft size={16} aria-hidden="true" />
                    </Button>
                    <Button
                        className="rounded-none shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10"
                        variant="outline"
                        size="icon"
                        aria-label="Flip Vertical"
                        disabled={!canGoNext}
                        onClick={() => setIndex(index + 1)}
                    >
                        <ChevronRight size={16} aria-hidden="true" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
                <p className="text-4xl font-bold">{currencyFormatter.format(lease.rent_amount)}</p>
                <p className="text-muted-foreground">Due on {dateFormatter.format(new Date(lease.next_due_date))}</p>
                <div className="flex gap-4 items-start">
                    <Home size={24} className="text-muted-foreground"></Home>
                    <div>
                        <p className="text-muted-foreground">Address</p>
                        {lease.address_line_2 ? <p>{lease.address_line_2}</p> : null}
                        <p>{lease.address_line_1}</p>
                        <p>{lease.city}</p>
                        <p>{lease.province} {lease.postal_code}</p>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex w-full gap-4 items-center justify-end">
                <p className="text-sm text-muted-foreground">Already paid your rent?</p>
                <Button>
                    <Link href={route('reports.create', { lease_id: lease.id })} className="inline-flex items-center gap-1">
                        Report now
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}
