declare namespace App.Data {
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
