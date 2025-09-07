import InvoiceTableData = App.Data.Subscription.InvoiceTableData;
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { columns } from '@/components/pages/invoices/table/columns';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import InvoiceTableHeader from '@/components/pages/invoices/table/header';

type Props = {
    invoices: InvoiceTableData[]
}

export default function InvoiceTable({ invoices }: Props) {
    const table = useReactTable({
        columns,
        data: invoices,
        getCoreRowModel: getCoreRowModel(),
        manualFiltering: true,
        manualPagination: true,
        manualSorting: true
    });

    return (
        <div className="overflow-hidden">
            <Table className="table-fixed">
                <TableHeader>
                    <InvoiceTableHeader table={table} />
                </TableHeader>
                <TableBody>
                    {
                        table.getRowModel().rows?.length ?
                            (table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && 'selected'}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))) : <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No invoices found.
                                </TableCell>
                            </TableRow>}
                </TableBody>
            </Table>
        </div>
    );
}
