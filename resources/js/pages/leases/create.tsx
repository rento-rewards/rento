import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import ProvinceInput from '@/components/pages/leases/province-input';
import { AddressAutofill } from '@mapbox/search-js-react';
import { PhoneInput } from '@/components/phone-input';
import { DollarSign } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { formatOrdinals } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import LeaseForm from '@/components/pages/leases/lease-form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Leases',
        href: '/leases'
    },
    {
        title: 'New Lease',
        href: '/leases/create'
    }
];

export default function LeaseCreate() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Lease" />
            <LeaseForm />
        </AppLayout>
    );
}
