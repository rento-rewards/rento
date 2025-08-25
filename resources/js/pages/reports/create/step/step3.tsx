import ReportLayout from '@/components/pages/reports/layout';
import { Form, Head, Link } from '@inertiajs/react';
import ReportFormStepper from '@/components/pages/reports/form-stepper';
import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

import { currencyFormatter, dateFormatter, formatMonth, formatOrdinals } from '@/lib/formatters';
import { MailIcon, Paperclip, PhoneIcon, UserIcon } from 'lucide-react';
import { formatPhoneNumber } from 'react-phone-number-input';
import { FileMetadata } from '@/hooks/use-file-upload';

type Props = {
    report: App.Data.Reports.ReportData,
    lease: App.Data.Leases.LeaseData,
    proof_of_payment: FileMetadata
}

export default function ReportCreateStep3({ report, lease, proof_of_payment }: Props) {
    console.log(proof_of_payment);
    const [section, setSection] = useState<'lease' | 'payment'>('lease');
    return (
        <ReportLayout>
            <Head title="New Report - Step 3" />
            <div className="w-full @container/report-form">
                <ReportFormStepper className="border-b border-border" value={3} />
                <Accordion
                    type="single"
                    className="max-w-screen-md mx-auto px-4"
                    value={section}
                >
                    <AccordionItem value="lease">
                        <AccordionTrigger onClick={() => setSection('lease')}>
                            Lease Information
                        </AccordionTrigger>
                        <AccordionContent className="space-y-4">
                            <div>
                                <h2 className="font-semibold mb-1">Address</h2>
                                {lease.address_line_2 ? <p>{lease.address_line_2}</p> : null}
                                <p>{lease.address_line_1}</p>
                                <p>
                                    {lease.city}, {lease.province}
                                </p>
                                <p>{lease.postal_code}</p>
                            </div>
                            <div>
                                <h2 className="font-semibold mb-1">Rent</h2>
                                <div>{currencyFormatter.format(lease.rent_amount)}</div>
                                <div>
                                    {lease.monthly_due_date > 28
                                        ? "Due on last day of the month"
                                        : `Due on every ${formatOrdinals(lease.monthly_due_date)}`}
                                </div>
                            </div>
                            <div>
                                <h2 className="font-semibold mb-1">Landlord</h2>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <UserIcon className="size-4" />
                                        {lease.landlord_name}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MailIcon className="size-4" />
                                        {lease.landlord_email}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <PhoneIcon className="size-4" />
                                        {formatPhoneNumber(lease.landlord_phone)}
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button type="button" variant="outline" asChild>
                                    <Link href={route('reports.create.step1')}>
                                        Edit
                                    </Link>
                                </Button>
                                <Button type="button" onClick={() => setSection('payment')}>
                                    Next
                                </Button>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="payment">
                        <AccordionTrigger onClick={() => setSection("payment")}>
                            Rent Report
                        </AccordionTrigger>
                        <AccordionContent className="space-y-8 mt-4">
                            <div className="flex">
                                Payment Amount
                                <strong className="ms-auto">
                                    {currencyFormatter.format(report.payment_amount)}
                                </strong>
                            </div>
                            <div className="flex">
                                Payment Date
                                <strong className="ms-auto">
                                    {dateFormatter.format(new Date(report.payment_date))}
                                </strong>
                            </div>
                            <div className="flex">
                                Due Month
                                <strong className="ms-auto">
                                    {formatMonth(report.due_month, report.due_year)}
                                </strong>
                            </div>
                            <div className="flex">
                                Proof of Payment
                                <strong className="ms-auto">
                                    <Paperclip className="size-4 inline me-1" />
                                    {proof_of_payment.name}
                                </strong>
                            </div>
                            <Button variant="outline" asChild>
                                <Link href={route('reports.create.step2')}>
                                    Edit
                                </Link>
                            </Button>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <Form method="post" action={route('reports.store')} className="flex justify-end p-4 max-w-screen-md mx-auto space-x-2">
                    {({ processing }) => (
                        <>
                            <Button variant="outline" type="button" asChild>
                                <Link href={route('reports.create.step2')}>
                                    Back
                                </Link>
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Submitting...' : 'Submit'}
                            </Button>
                        </>
                    )}
                </Form>
            </div>
        </ReportLayout>
    );
}
