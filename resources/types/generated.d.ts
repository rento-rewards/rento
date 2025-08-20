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
};
}
declare namespace App.Data.Reports {
export type ReportData = {
payment_amount: number;
payment_date: string;
due_month: number;
due_year: number;
};
}
