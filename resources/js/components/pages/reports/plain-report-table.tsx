import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import ReportTableHeader from '@/components/pages/reports/table/header';
import { flexRender } from '@tanstack/react-table';
import ReportTableData = App.Data.Reports.ReportTableData;
import { Table as TableType } from "@tanstack/react-table"
import { columns } from '@/components/pages/reports/table/columns';

type Props = {
    table: TableType<ReportTableData>
}

export default function PlainReportTable({ table }: Props) {
    return <div className="overflow-hidden rounded-lg border border-border bg-background">
        <Table className="table-fixed">
            <TableHeader>
                <ReportTableHeader table={table} />
            </TableHeader>
            <TableBody>
                {table.getRowModel().rows.length <= 0 && <TableCell colSpan={columns.length} className="h-24 text-center">
                    No reports found.
                </TableCell>}
                {table.getRowModel().rows.map((row) => (
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
                ))}
            </TableBody>
        </Table>
    </div>
}
