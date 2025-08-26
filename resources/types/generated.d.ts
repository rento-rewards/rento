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
export type ReportFormData = {
payment_amount: number;
payment_date: string;
due_month: number;
due_year: number;
need_upload: boolean;
proof_of_payment: any | null;
};
export type ReportTableData = {
id: number;
created_at: string;
payment_amount: number;
payment_date: string;
status: App.Enums.ReportStatus;
};
}
declare namespace App.Enums {
export type ReportStatus = 'created' | 'verified' | 'reported';
}
