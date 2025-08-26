import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, DollarSign, Mail, Phone, User } from 'lucide-react';
import { formatPhoneNumber } from 'react-phone-number-input';
import { currencyFormatter, formatOrdinals } from '@/lib/formatters';

type LeaseDetailProps = {
    lease: App.Data.Leases.LeaseDetailData
}

export default function LeaseDetail(props: LeaseDetailProps) {
    const { lease } = props;

    return (
        <>
            <div className="grid gap-4 @md:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Address</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                        {lease.address_line_2 ? <p>{lease.address_line_2}</p> : null}
                        <p>{lease.address_line_1}</p>
                        <p>{lease.city}</p>
                        <p>{lease.province}</p>
                        <p>{lease.postal_code}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Rent</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm">
                        <div className="flex items-center gap-2">
                            <DollarSign className="size-4" />
                            {currencyFormatter.format(Number(lease.rent_amount))}
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="size-4" />
                            {lease.monthly_due_date > 28 ? (
                                "Due on last day of the month"
                            ) : (
                                `Due on every ${formatOrdinals(lease.monthly_due_date)} day`
                            )}
                        </div>
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
        </>
    );

}
