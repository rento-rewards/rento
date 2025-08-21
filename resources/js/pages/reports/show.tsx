import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Timestamp } from '@/types';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { currencyFormatter, dateFormatter } from '@/lib/formatters';
import { Mail, Phone, User } from 'lucide-react';
import { formatPhoneNumber } from 'react-phone-number-input';
import ReportStatus from '@/components/pages/reports/report-status';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Reports', href: route('reports') },
    { title: 'Report Details', href: '' }
];

type Props = {
    report: App.Data.Reports.ReportData & Timestamp,
    lease: App.Data.Leases.LeaseData
}

export default function ReportShow({ report, lease }: Props) {
    return (<AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Report Details" />
        <div className="@container w-full p-4">
            <div className="grid @lg:grid-cols-[2fr_1fr] gap-4 w-full max-w-screen-lg mx-auto mt-8">
                <div className="space-y-4 order-2 @lg:order-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>Report Status</CardTitle>
                            <div className="mt-4">
                                <ReportStatus report={report} />
                            </div>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Proof of Payment</CardTitle>
                        </CardHeader>
                    </Card>
                </div>
                <div className="space-y-4 order-1 @lg:order-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Payment</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                            <p className="text-2xl font-bold font-mono">
                                {currencyFormatter.format(report.payment_amount)}
                            </p>
                            <p>
                                Paid on {dateFormatter.format(new Date(report.payment_date))}
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Address</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                            {lease.address_line_2 ? <p>{lease.address_line_2}</p> : null}
                            <p>{lease.address_line_1}</p>
                            <p>{lease.city}, {lease.province}</p>
                            <p>{lease.postal_code}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Landlord</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm">
                            <div className="flex items-center gap-2">
                                <User className="size-4" />
                                {lease.landlord_name}
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail className="size-4" />
                                {lease.landlord_email}
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="size-4" />
                                {formatPhoneNumber(lease.landlord_phone)}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    </AppLayout>);
}
