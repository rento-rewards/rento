import ReportLayout from '@/components/pages/reports/layout';
import { Form, Head, Link } from '@inertiajs/react';
import ReportFormStepper from '@/components/pages/reports/stepper';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { DollarSign, LoaderCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

type Props = {
    lease: App.Data.Leases.LeaseData & { id: string },
    report?: App.Data.Reports.ReportData
}

const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

export default function ReportCreateStep2({ lease, report }: Props) {
    return (
        <ReportLayout>
            <Head title="New Report - Step 2" />
            <div className="w-full @container/report-form">
                <ReportFormStepper className="border-b border-border" value={2} />
                <Form
                    method="post"
                    action={route('reports.store.step2')}
                    disableWhileProcessing
                    className="mx-auto p-4 space-y-4 max-w-screen-md">
                    {({ processing, errors }) => (
                        <div className="grid @md/report-form:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="payment_amount">Payment amount<span
                                    className="text-destructive ml-1">*</span></Label>
                                <div className="relative">
                                    <Input
                                        id="payment_amount"
                                        type="number"
                                        name="payment_amount"
                                        min={0}
                                        defaultValue={report?.payment_amount || lease.rent_amount}
                                        step="0.01"
                                        className={'peer ps-9'}
                                        required
                                    />
                                    <div
                                        className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                                        <DollarSign size={16} strokeWidth={2} aria-hidden="true" />
                                    </div>
                                </div>
                                <InputError message={errors.payment_amount} className="mt-2" />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="payment_date">Payment date<span
                                    className="text-destructive ml-1">*</span></Label>
                                <Input
                                    id="payment_date"
                                    type="date"
                                    name="payment_date"
                                    defaultValue={report?.payment_date || new Date().toISOString().split('T')[0]} // Default to today
                                    required
                                />
                                <InputError message={errors.payment_date} className="mt-2" />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="due_month">Due month<span
                                    className="text-destructive ml-1">*</span></Label>
                                <Select name="due_month" required defaultValue={
                                    String(report?.due_month || (new Date().getMonth() + 1)) // Default to current month
                                }>
                                    <SelectTrigger id="due_month">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {MONTHS.map((month, index) => (
                                            <SelectItem key={index} value={String(index + 1)}>
                                                {month}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.due_month} className="mt-2" />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="due_year">Due year<span
                                    className="text-destructive ml-1">*</span></Label>
                                <Input
                                    id="due_year"
                                    type="number"
                                    name="due_year"
                                    defaultValue={report?.due_year || new Date().getFullYear()} // Default to current year
                                    min={2000} // Set a reasonable minimum year
                                    required
                                    step="1"
                                />
                                <InputError message={errors.due_year} className="mt-2" />
                            </div>

                            <div className="@md/report-form:col-span-2 flex justify-end gap-2">
                                <Button type="button" variant="outline" asChild>
                                    <Link href={route('reports.create.step1')}>
                                        Back
                                    </Link>
                                </Button>
                                <Button type="submit" disabled={processing}>
                                        {processing ? (
                                            <LoaderCircle className="animate-spin" />
                                        ) : (
                                            'Next'
                                        )}
                                </Button>
                            </div>
                        </div>
                    )}
                </Form>
            </div>
        </ReportLayout>
    );
}
