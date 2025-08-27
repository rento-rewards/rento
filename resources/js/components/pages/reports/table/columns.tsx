import { ColumnDef } from '@tanstack/react-table';
import { currencyFormatter, dateFormatter } from '@/lib/formatters';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export const columns: ColumnDef<App.Data.Reports.ReportTableData>[] = [
    {
        accessorKey: 'created_at',
        header: 'Created At',
        cell: ({ row }) => {
            return dateFormatter.format(new Date(row.original.created_at));
        },
        size: 160
    },
    {
        accessorKey: 'payment_date',
        header: 'Payment Date',
        cell: ({ row }) => {
            return dateFormatter.format(new Date(row.original.payment_date));
        },
        size: 160
    },
    {
        accessorKey: 'due_month_year',
        header: 'Due Month',
        cell: ({ row }) => {
            return row.original.due_month_year;
        },
        size: 120
    },
    {
        accessorKey: 'status',
        header: () => <div className="text-right">Status</div>,
        cell: ({ row }) => {
            const isReported = row.original.status === 'verified';
            return (
                <div className="flex items-end">
                    <Badge variant="outline" className="gap-1.5 ml-auto">
                        <span
                            className={cn(
                                'size-1.5 rounded-full',
                                isReported ? 'bg-green-500' : 'bg-amber-500'
                            )}
                            aria-hidden="true"
                        />
                        {isReported ? 'Reported' : 'Processing'}
                    </Badge>
                </div>
            );
        },
        size: 80
    },
    {
        accessorKey: 'payment_amount',
        header: () => <div className="text-right">Amount</div>,
        cell: ({ row }) => {
            return (
                <div className="text-right font-medium">
                    <span>{currencyFormatter.format(Number(row.original.payment_amount))}</span>
                </div>
            );
        }
    },
    {
        accessorKey: 'id',
        header: () => null,
        cell: ({ row }) => {
            const id = row.original.id;
            return (
                <div className="flex">
                    <Button className="ml-auto" size="icon" variant="ghost" asChild>
                        <Link href={route('reports.show', { id })}>
                            <ChevronRight size={16} />
                        </Link>
                    </Button>
                </div>
            );
        },
        size: 40
    }
];
