import { ColumnDef } from '@tanstack/react-table';
import { currencyFormatter } from '@/lib/formatters';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StatusBadge from '@/components/pages/invoices/table/status-badge';

export const columns: ColumnDef<App.Data.Subscription.InvoiceTableData>[] = [
    {
        accessorKey: 'date',
        header: 'Issued',
        size: 150,
        cell: ({ row }) => {
            const date = new Date(row.original.date);
            return date.toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
    },
    {
        accessorKey: 'total',
        header: () => <div className="text-center">Amount</div>,
        size: 100,
        cell: ({ row }) => {
            return (
                <div className="text-center font-medium">
                    {currencyFormatter.format(Number(row.original.total))}
                </div>);
        }
    },
    {
        accessorKey: 'status',
        header: 'Status',
        size: 100,
        cell: ({ row }) => {
            return <StatusBadge status={row.original.status} />
        }
    },
    {
        accessorKey: 'id',
        header: '',
        size: 40,
        cell: ({ row }) => {
            return (
                <div className="flex justify-center">
                    <Button variant="ghost">
                        <ChevronRight size={16} />
                    </Button>
                </div>
            );
        }
    }
];
