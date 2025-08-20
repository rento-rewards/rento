import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { CalendarIcon, DollarSignIcon, Edit2Icon, EllipsisVerticalIcon, TrashIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import LeaseDeleteDialog from '@/components/pages/leases/lease-delete-dialog';
import { currencyFormatter, formatOrdinals } from '@/lib/formatters';

export type LeaseDataWithId = App.Data.Leases.LeaseData & { id: string };

type LeaseCardProps = {
    lease: LeaseDataWithId;
}

export default function LeaseCard({ lease }: LeaseCardProps) {
    const {
        address_line_1,
        rent_amount,
        monthly_due_date,
        province,
        city
    } = lease;
    const [open, setOpen] = useState(false);


    return (
        <>
            <Card className="relative transition-shadow hover:shadow-xl">
                <CardHeader>
                    <CardTitle>
                        <Link
                            href={route('leases.show', lease)}
                            className="before:absolute before:inset-0"
                            prefetch
                        >
                        {address_line_1}
                        </Link>
                    </CardTitle>
                    <CardDescription>
                        {city}, {province}
                    </CardDescription>
                    <div className="z-10 absolute top-2 right-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    aria-label="More options"
                                    className="size-8"
                                >
                                    <EllipsisVerticalIcon className="size-4" aria-hidden />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild>
                                    <Link href={route('leases.edit', lease)} prefetch>
                                        <Edit2Icon className="opacity-60" aria-hidden />
                                        Edit
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="text-destructive"
                                    onClick={() => setOpen(true)}
                                >
                                    <TrashIcon className="opacity-60 text-destructive" aria-hidden />
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4 text-sm leading-4">
                    <div className="flex gap-3">
                        <DollarSignIcon className="size-4" />{' '}
                        <span>{currencyFormatter.format(rent_amount)}</span>
                    </div>
                    <div className="flex gap-3">
                        <CalendarIcon className="size-4" />
                        {monthly_due_date > 28
                            ? 'Due on last day of the month'
                            : `Due on every ${formatOrdinals(monthly_due_date)} day`}
                    </div>
                </CardContent>
            </Card>
            <LeaseDeleteDialog lease={lease} open={open} onOpenChange={setOpen} />
        </>
    );
}
