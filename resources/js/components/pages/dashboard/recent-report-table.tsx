import PlainReportTable from '@/components/pages/reports/plain-report-table';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { columns } from '@/components/pages/reports/table/columns';

type Props = {
    reports: App.Data.Reports.ReportTableData[]
}

export default function RecentReportTable({ reports }: Props) {
    const table = useReactTable({
        columns,
        data: reports,
        getCoreRowModel: getCoreRowModel(),
    })
    return (
        <PlainReportTable table={table} />
    )
}
