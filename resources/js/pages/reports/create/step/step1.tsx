import ReportLayout from '@/components/pages/reports/layout';
import { Form, Head, Link } from '@inertiajs/react';
import ReportFormStepper from '@/components/pages/reports/form-stepper';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import InputError from '@/components/input-error';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { LoaderCircle, Plus } from 'lucide-react';
import { currencyFormatter, formatOrdinals } from '@/lib/formatters';
import ReportController from '@/actions/App/Http/Controllers/ReportController';
import { create } from '@/routes/leases';

type Props = {
    leases: (App.Data.Leases.LeaseData & { id: string })[],
    lease_id?: string
}

export default function ReportCreateStep1({ leases, lease_id }: Props) {
    return (
        <ReportLayout>
            <Head title="New Report - Step 1" />
            <div className="w-full @container/report-form">
                <ReportFormStepper className="border-b border-border" value={1} />
                <Form
                    {...ReportController.processStep1.form()}
                    disableWhileProcessing
                    className="mx-auto p-4 space-y-4 max-w-screen-md">
                    {({ processing, errors }) => (
                        <>
                            <InputError message={errors.lease_id} />
                            <RadioGroup
                                name="lease_id"
                                className="flex flex-col"
                                defaultValue={lease_id}
                            >
                                {leases.length === 0 && (
                                    <Button variant="outline" className="p-8 border-dashed" asChild>
                                        <Link href={create()} prefetch>
                                            <Plus /> Add new lease
                                        </Link>
                                    </Button>
                                )}
                                {leases.map((lease) => (
                                    <div
                                        key={lease.id}
                                        className="relative flex items-center space-x-3 space-y-0 rounded-lg border border-input p-4 shadow-xs shadow-black/5 has-[[data-state=checked]]:border-ring"
                                    >
                                        <RadioGroupItem
                                            value={lease.id}
                                            className="after:absolute after:inset-0"
                                        />
                                        <div className="space-y-2">
                                            <Label>
                                                {lease.address_line_2 ? `${lease.address_line_2}, ` : ''}
                                                {lease.address_line_1}, {lease.city}, {lease.province} {lease.postal_code}
                                            </Label>
                                            <div className="flex text-sm">
                                                <span className="font-mono">
                                                  {currencyFormatter.format(lease.rent_amount)}
                                                </span>
                                                <Separator orientation="vertical" className="mx-2" />
                                                <span>
                                                  {lease.monthly_due_date > 28
                                                      ? 'Due on last day of the month'
                                                      : `Due on every ${formatOrdinals(lease.monthly_due_date)}`}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </RadioGroup>
                            <div className="flex justify-end">
                                <Button type="submit" disabled={processing || leases.length === 0}>
                                    {processing ? (
                                        <LoaderCircle className="animate-spin" />
                                    ) : (
                                        'Next'
                                    )}
                                </Button>
                            </div>
                        </>
                    )}
                </Form>
            </div>
        </ReportLayout>
    );
}
