import { AddressAutofill } from '@mapbox/search-js-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import ProvinceInput from '@/components/pages/leases/province-input';
import { DollarSign } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PhoneInput } from '@/components/phone-input';
import { Button } from '@/components/ui/button';
import { useForm } from '@inertiajs/react';
import { formatOrdinals } from '@/lib/formatters';
import SingleDocumentUpload from '@/components/single-document-upload';
import { UploadOption } from '@/types';
import { FormEvent, useState } from 'react';
import axios from 'axios';
import { extract, store, update } from '@/routes/leases';
import { Checkbox } from '@/components/ui/checkbox';

type LeaseFormProps = {
    defaultValues?: App.Data.Leases.LeaseData & { id: number };
    uploadOption: UploadOption;
    reportAfterSave?: boolean;
}

export default function LeaseForm(props: LeaseFormProps) {
    const { defaultValues, uploadOption, reportAfterSave } = props;
    const [afterReport, setAfterReport] = useState(reportAfterSave || false);
    const {
        data, setData, post, put, processing,
        // @ts-ignore
        errors
    } = useForm<App.Data.Leases.LeaseData>({
        address_line_1: defaultValues?.address_line_1 || '',
        address_line_2: defaultValues?.address_line_2 || '',
        city: defaultValues?.city || '',
        province: defaultValues?.province || '',
        postal_code: defaultValues?.postal_code || '',
        country: 'Canada',
        rent_amount: defaultValues?.rent_amount || 0,
        lease_start_date: defaultValues?.lease_start_date || '',
        monthly_due_date: defaultValues?.monthly_due_date || 1,
        landlord_name: defaultValues?.landlord_name || '',
        landlord_email: defaultValues?.landlord_email || '',
        landlord_phone: defaultValues?.landlord_phone || '',
        document: null
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (defaultValues) {
            put(update.url({ id: defaultValues.id }, {
                query: {
                    report_after_save: afterReport,
                }
            }));
        } else {
            post(store.url({
                query: {
                    report_after_save: afterReport,
                }
            }));
        }
    };

    const handleUpload = (file: any) => {
        const form = new FormData();
        form.append('document', file);
        axios.post(extract.url(), form).then(response => {
            setData('document', file);
            console.log(response);
        });
    };


    return <form
        className="flex h-full flex-1 flex-col
                gap-8 overflow-x-auto rounded-xl p-4 w-full max-w-screen-md mx-auto"
        onSubmit={handleSubmit}
    >
        <section className="grid gap-2">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Lease Document<span
                className="text-destructive ml-1">*</span></h3>
            <SingleDocumentUpload uploadOption={{
                maxSize: uploadOption.max_size ? uploadOption.max_size * 1024 : undefined,
                accept: uploadOption.mime_types?.join(', '),
                onFilesAdded: ((files) => {
                    const file = files[0].file;
                    handleUpload(file);
                })
            }} />
            <InputError message={errors.document} className="mt-2" />
        </section>
        <div className="flex items-center gap-3">
            <Checkbox id="new-report" checked={afterReport}
                      onCheckedChange={(checked) => setAfterReport(checked === true)} />
            <Label htmlFor="new-report">Start a new report after saving this lease</Label>
        </div>
        {/* @ts-ignore */}
        <AddressAutofill
            accessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}>
            <section className="space-y-4 @container/address">
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Address</h3>
                <div className="grid gap-2">
                    <Label htmlFor="address_line_1">Address line 1<span
                        className="text-destructive ml-1">*</span></Label>
                    <Input
                        id="address_line_1"
                        type="text"
                        name="address_line_1"
                        placeholder="Start typing your address, e.g. 123 Main St"
                        autoComplete="address-line1"
                        value={data.address_line_1}
                        onChange={(e) => setData('address_line_1', e.target.value)}
                        required
                    />
                    <InputError message={errors.address_line_1} className="mt-2" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="address_line_2">Address line 2</Label>
                    <Input
                        id="address_line_2"
                        type="text"
                        name="address_line_2"
                        placeholder="Apartment, suite, etc. (optional)"
                        autoComplete="address-line2"
                        value={data.address_line_2 || ''}
                        onChange={(e) => setData('address_line_2', e.target.value)} />
                    <InputError message={errors.address_line_2} className="mt-2" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="city">City<span
                        className="text-destructive ml-1">*</span></Label>
                    <Input
                        id="city"
                        type="text"
                        name="city"
                        placeholder="Enter your city"
                        autoComplete="address-level2"
                        value={data.city}
                        onChange={(e) => setData('city', e.target.value)}
                        required />
                    <InputError message={errors.city} className="mt-2" />
                </div>
                <div className="grid gap-x-4 gap-y-2 grid-cols-1 @lg/address:grid-cols-3">
                    <div className="grid gap-2">
                        <Label htmlFor="province">Province<span
                            className="text-destructive ml-1">*</span></Label>
                        <ProvinceInput
                            required
                            id="province"
                            name="province"
                            value={data.province}
                            placeholder="Select a province"
                            autoComplete="address-level1"
                            onValueChange={(value) => setData('province', value)}
                        />
                        <InputError message={errors.province} className="mt-2" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="postal_code">Postal code<span className="text-destructive ml-1">*</span></Label>
                        <Input
                            id="postal_code"
                            type="text"
                            required
                            autoComplete="postal-code"
                            name="postal_code"
                            value={data.postal_code}
                            onChange={(e) => setData('postal_code', e.target.value)}
                            placeholder="A1A 1A1"
                        />
                        <InputError message={errors.postal_code} className="mt-2" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="country">Country</Label>
                        <Input
                            id="country"
                            type="text"
                            required
                            name="country"
                            value={data.country}
                            disabled
                        />
                        <InputError message={errors.country} className="mt-2" />
                    </div>
                </div>
            </section>
        </AddressAutofill>
        <section className="space-y-4 @container/lease">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Lease Details</h3>
            <div className="grid gap-2">
                <Label htmlFor="rent_amount">Rent Amount<span
                    className="text-destructive ml-1">*</span></Label>
                <div className="relative">
                    <Input
                        id="rent_amount"
                        type="number"
                        name="rent_amount"
                        min={0}
                        step="0.01"
                        value={data.rent_amount}
                        className={'peer ps-9'}
                        onChange={(e) => {
                            setData('rent_amount', parseFloat(e.target.value));
                        }}
                        required
                    />
                    <div
                        className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                        <DollarSign size={16} strokeWidth={2} aria-hidden="true" />
                    </div>
                </div>
                <InputError message={errors.rent_amount} className="mt-2" />
            </div>
            <div className="grid gap-x-4 gap-y-2 grid-cols-1 @lg/lease:grid-cols-2">

                <div className="grid gap-2">
                    <Label htmlFor="lease_start_date">Lease Start Date<span
                        className="text-destructive ml-1">*</span></Label>
                    <Input
                        id="lease_start_date"
                        type="date"
                        name="lease_start_date"
                        value={data.lease_start_date}
                        onChange={(e) => setData('lease_start_date', e.target.value)}
                        required
                    />
                    <InputError message={errors.lease_start_date} className="mt-2" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="monthly_due_date">Monthly Due Date<span
                        className="text-destructive ml-1">*</span></Label>
                    <Select
                        onValueChange={(e) => setData('monthly_due_date', parseInt(e))}
                        required>
                        <SelectTrigger className="relative ps-16" id="monthly_due_date">
                                    <span
                                        className="pointer-events-none
                                        absolute start-0 inline-flex items-center
                                        justify-center ps-3 text-muted-foreground/80
                                        group-has-[[disabled]]:opacity-50">Every</span>
                            <SelectValue />
                            <span
                                className="pointer-events-none absolute
                                        end-0 inline-flex items-center justify-center
                                        pe-8 text-sm text-muted-foreground
                                        peer-disabled:opacity-50">day of the month</span>
                        </SelectTrigger>
                        <SelectContent>
                            {[...Array(28).keys()].map((day) => (
                                <SelectItem key={day} value={(day + 1).toString()}>
                                    {formatOrdinals(day + 1)}
                                </SelectItem>
                            ))}
                            <SelectItem value="31">last</SelectItem>
                        </SelectContent>
                    </Select>
                    <InputError message={errors.monthly_due_date} className="mt-2" />
                </div>
            </div>
        </section>
        <section className="space-y-4 @container/landlord">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Landlord Information</h3>
            <div className="grid gap-x-4 gap-y-2 grid-cols-1 @lg/landlord:grid-cols-3">
                <div className="grid gap-2">
                    <Label htmlFor="landlord_name">Landlord Name<span className="text-destructive ml-1">*</span></Label>
                    <Input
                        id="landlord_name"
                        type="text"
                        name="landlord_name"
                        value={data.landlord_name}
                        onChange={(e) => setData('landlord_name', e.target.value)}
                        required
                    />
                    <InputError message={errors.landlord_name} className="mt-2" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="landlord_email">Landlord Email<span
                        className="text-destructive ml-1">*</span></Label>
                    <Input
                        id="landlord_email"
                        type="email"
                        name="landlord_email"
                        value={data.landlord_email}
                        onChange={(e) => setData('landlord_email', e.target.value)}
                        required
                    />
                    <InputError message={errors.landlord_email} className="mt-2" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="landlord_phone">Landlord Phone<span
                        className="text-destructive ml-1">*</span></Label>
                    <PhoneInput
                        id="landlord_phone"
                        name="landlord_phone"
                        value={data.landlord_phone}
                        onChange={(phone) => setData('landlord_phone', phone.toString())}
                        defaultCountry="CA"
                        required
                    />
                    <InputError message={errors.landlord_phone} className="mt-2" />
                </div>
            </div>
        </section>
        <Button type="submit" disabled={processing}>Submit</Button>
    </form>;
}
