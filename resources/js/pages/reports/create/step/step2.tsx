import ReportLayout from '@/components/pages/reports/layout';
import { Head, Link, useForm } from '@inertiajs/react';
import ReportFormStepper from '@/components/pages/reports/form-stepper';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { DollarSign, LoaderCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import SingleDocumentUpload from '@/components/single-document-upload';
import { FormEvent } from 'react';
import { UploadOption } from '@/types';
import { FileMetadata } from '@/hooks/use-file-upload';
import ReportData = App.Data.Reports.ReportFormData;

type Props = {
    lease: App.Data.Leases.LeaseData & { id: string },
    report?: App.Data.Reports.ReportFormData,
    proof_of_payment?: FileMetadata,
    upload_option: UploadOption
}

const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

export default function ReportCreateStep2({ lease, report, upload_option, proof_of_payment }: Props) {
    console.log({ report, proof_of_payment });
    const {
        data, processing, setData, post,
        // @ts-ignore
        errors
    } = useForm<ReportData>({
        due_month: report?.due_month || new Date().getMonth() + 1,
        due_year: report?.due_year || new Date().getFullYear(),
        payment_amount: report?.payment_amount || lease.rent_amount,
        payment_date: report?.payment_date || '',
        need_upload: !Boolean(proof_of_payment),
        proof_of_payment: null
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('reports.store.step2'));
    };

    return (
        <ReportLayout>
            <Head title="New Report - Step 2" />
            <div className="w-full @container/report-form">
                <ReportFormStepper className="border-b border-border" value={2} />
                <form
                    onSubmit={handleSubmit}
                    className="mx-auto p-4 space-y-4 max-w-screen-md">
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
                                    value={data.payment_amount}
                                    onChange={(e) => {
                                        setData('payment_amount', e.target.valueAsNumber);
                                    }}
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
                                value={data.payment_date}
                                onChange={(e) => {
                                    setData('payment_date', e.target.value);
                                }}
                                required
                            />
                            <InputError message={errors.payment_date} className="mt-2" />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="due_month">Due month<span
                                className="text-destructive ml-1">*</span></Label>
                            <Select name="due_month" required value={String(data.due_month)}
                                    onValueChange={(value) => {
                                        setData('due_month', Number(value));
                                    }}>
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
                                value={data.due_year}
                                onChange={(e) => setData('due_year', e.target.valueAsNumber)}
                                min={2000} // Set a reasonable minimum year
                                required
                                step="1"
                            />
                            <InputError message={errors.due_year} className="mt-2" />
                        </div>

                        <div className="grid gap-2 col-span-2">
                            <Label htmlFor="payment_amount">Proof of payment
                                <span className="text-destructive ml-1">*</span>
                            </Label>
                            <SingleDocumentUpload uploadOption={{
                                maxSize: upload_option.max_size ? upload_option.max_size * 1024 : undefined,
                                accept: upload_option.mime_types?.join(', '),
                                initialFiles: proof_of_payment ? [proof_of_payment] : [],
                                onFilesAdded: (files) => {
                                    const file = files.at(0)?.file;
                                    if (file) {
                                        setData('proof_of_payment', file);
                                        setData('need_upload', true);
                                    }
                                }
                            }} />
                            <InputError message={errors.proof_of_payment} className="mt-2" />
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
                </form>
            </div>
        </ReportLayout>
    );
}
