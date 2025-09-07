import { flexRender, Table } from '@tanstack/react-table';
import { TableHead, TableRow } from '@/components/ui/table';

export default function InvoiceTableHeader({ table }: {
    table: Table<App.Data.Subscription.InvoiceTableData>;
}) {
    return <>
        {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                    return (
                        <TableHead
                            key={header.id}
                            style={{ width: `${header.getSize()}px` }}
                        >
                            {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                )}
                        </TableHead>
                    );
                })}
            </TableRow>
        ))}
    </>
}
