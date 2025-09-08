declare namespace App.Data.Leases {
export type LeaseData = {
address_line_1: string;
address_line_2: string | null;
city: string;
province: string;
postal_code: string;
country: string;
rent_amount: number;
lease_start_date: string;
monthly_due_date: number;
landlord_name: string;
landlord_email: string;
landlord_phone: string;
document: any;
};
export type LeaseDetailData = {
id: number;
address_line_1: string;
address_line_2: string | null;
city: string;
province: string;
postal_code: string;
country: string;
rent_amount: number;
lease_start_date: string;
monthly_due_date: number;
landlord_name: string;
landlord_email: string;
landlord_phone: string;
};
}
declare namespace App.Data.Reports {
export type ReportDetailData = {
id: number;
payment_amount: number;
payment_date: string;
due_month: number;
due_year: number;
status: App.Enums.ReportStatus;
created_at: string;
verified_at: string | null;
report_date: string | null;
};
export type ReportFormData = {
payment_amount: number;
payment_date: string;
due_month: number;
due_year: number;
need_upload: boolean;
proof_of_payment: any | null;
};
export type ReportTableData = {
due_month_year: string;
id: number;
created_at: string;
payment_amount: number;
payment_date: string;
due_month: number;
due_year: number;
status: App.Enums.ReportStatus;
};
}
declare namespace App.Data.Subscription {
export type InvoiceTableData = {
id: string;
date: string;
total: string;
status: App.Enums.PaymentStatus;
};
export type PaymentMethodData = {
id: string;
brand: string;
last4: string;
exp_month: number;
exp_year: number;
};
export type SubscriptionData = {
type: App.Enums.SubscriptionType;
next_billing_date: string;
on_grace_period: boolean;
};
export type SubscriptionFormData = {
type: App.Enums.SubscriptionType;
payment_method_id: string;
};
}
declare namespace App.Enums {
export type PaymentStatus = 'paid' | 'uncollectible' | 'void' | 'open' | 'draft';
export type ReportStatus = 'created' | 'verified' | 'reported';
export type SubscriptionType = 'monthly' | 'yearly';
}
