import { LaravelPagination } from '@/types';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { columns } from '@/components/pages/reports/table/columns';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pagination, PaginationContent, PaginationItem } from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from 'lucide-react';
import { useId } from 'react';
import { Link } from '@inertiajs/react';
import PlainReportTable from '@/components/pages/reports/plain-report-table';

type Props = {
    reports: LaravelPagination<App.Data.Reports.ReportTableData>,
    handlePerPageChange?: (value: string) => void
}

export default function ReportTable({ reports, handlePerPageChange }: Props) {
    const table = useReactTable({
        columns,
        data: reports.data,
        getCoreRowModel: getCoreRowModel(),
        manualFiltering: true,
        manualPagination: true,
        manualSorting: true,
        pageCount: reports.last_page,
        rowCount: reports.total
    });

    const id = useId();

    return (
        <>
            <PlainReportTable table={table} />
            <div className="flex items-center justify-between gap-8">
                {/* Results per page */}
                <div className="flex items-center gap-3">
                    <Label htmlFor={id} className="max-sm:sr-only">
                        Rows per page
                    </Label>
                    <Select
                        value={reports.per_page.toString()}
                        onValueChange={handlePerPageChange}
                    >
                        <SelectTrigger id={id} className="w-fit whitespace-nowrap">
                            <SelectValue placeholder="Select number of results" />
                        </SelectTrigger>
                        <SelectContent
                            className="
                            [&_*[role=option]>span]:end-2
                            [&_*[role=option]>span]:start-auto
                            [&_*[role=option]]:pe-8
                            [&_*[role=option]]:ps-2">
                            {[5, 10, 25].map((pageSize) => (
                                <SelectItem key={pageSize} value={pageSize.toString()}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                {/* Page number information */}
                <div className="flex grow justify-end whitespace-nowrap text-sm text-muted-foreground">
                    <p
                        className="whitespace-nowrap text-sm text-muted-foreground"
                        aria-live="polite"
                    >
          <span className="text-foreground">
            {table.getState().pagination.pageIndex *
                table.getState().pagination.pageSize +
                1}
              -
              {Math.min(
                  Math.max(
                      table.getState().pagination.pageIndex *
                      table.getState().pagination.pageSize +
                      table.getState().pagination.pageSize,
                      0
                  ),
                  table.getRowCount()
              )}
          </span>{' '}
                        of{' '}
                        <span className="text-foreground">
            {table.getRowCount().toString()}
          </span>
                    </p>
                </div>
                {/* Pagination buttons */}
                <div>
                    <Pagination>
                        <PaginationContent>
                            {/* First page button */}
                            <PaginationItem>
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="disabled:pointer-events-none disabled:opacity-50"
                                    disabled={!table.getCanPreviousPage()}
                                    aria-label="Go to first page"
                                >
                                    <Link href={reports.first_page_url}>
                                        <ChevronFirst size={16} strokeWidth={2} aria-hidden="true" />
                                    </Link>
                                </Button>
                            </PaginationItem>
                            {/* Previous page button */}
                            <PaginationItem>
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="disabled:pointer-events-none disabled:opacity-50"
                                    disabled={!table.getCanPreviousPage()}
                                    aria-label="Go to previous page"
                                >
                                    {reports.prev_page_url ? <Link href={reports.prev_page_url}>
                                        <ChevronLeft size={16} strokeWidth={2} aria-hidden="true" />
                                    </Link> : <ChevronLeft size={16} strokeWidth={2} aria-hidden="true" />}
                                </Button>
                            </PaginationItem>
                            {/* Next page button */}
                            <PaginationItem>
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="disabled:pointer-events-none disabled:opacity-50"
                                    disabled={!table.getCanNextPage()}
                                    aria-label="Go to next page"
                                >
                                    {reports.next_page_url ? <Link href={reports.next_page_url}>
                                        <ChevronRight size={16} strokeWidth={2} aria-hidden="true" />
                                    </Link> : <ChevronRight size={16} strokeWidth={2} aria-hidden="true" />}
                                </Button>
                            </PaginationItem>
                            {/* Last page button */}
                            <PaginationItem>
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="disabled:pointer-events-none disabled:opacity-50"
                                    disabled={!table.getCanNextPage()}
                                    aria-label="Go to last page"
                                >
                                    <Link href={reports.last_page_url}>
                                        <ChevronLast size={16} strokeWidth={2} aria-hidden="true" />
                                    </Link>
                                </Button>
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </>
    );
}
