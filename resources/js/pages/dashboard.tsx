import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import ReportCount, { ReportCountData } from '@/components/pages/dashboard/report-count';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import Greeting from '@/components/pages/dashboard/greeting';
import RecentReportTable from '@/components/pages/dashboard/recent-report-table';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import NextDue, { NextDueLease } from '@/components/pages/dashboard/next-due';
import { reports } from '@/routes';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard'
    }
];

type Props = {
    dashboard: {
        recent_reports: App.Data.Reports.ReportTableData[],
        report_counts: {
            all_time: ReportCountData,
            this_year: ReportCountData
        },
        next_due: NextDueLease[]
    }
}

export default function Dashboard(props: Props) {
    const { dashboard } = props;
    console.log(dashboard);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div
                className="flex h-full flex-1 flex-col gap-12 rounded-xl p-4 w-full max-w-screen-lg mx-auto">
                <Greeting />
                <div className="grid md:grid-cols-2 gap-4">
                    <ReportCount reportCounts={dashboard.report_counts} />
                    <NextDue nextDues={dashboard.next_due} />
                </div>
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">
                        Recent Reports
                    </h2>
                    <RecentReportTable reports={dashboard.recent_reports} />
                    <Button variant="link" className="px-0">
                        <Link href={reports()} className="inline-flex items-center gap-1">
                            View All Reports <ArrowRight size={24} />
                        </Link>
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
}
