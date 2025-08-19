import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { ComponentProps } from 'react';

const provinces = [
    "Alberta",
    "British Columbia",
    "Manitoba",
    "New Brunswick",
    "Newfoundland and Labrador",
    "Nova Scotia",
    "Ontario",
    "Prince Edward Island",
    "Quebec",
    "Saskatchewan",
    "Northwest Territories",
    "Nunavut",
    "Yukon"
];

interface ProvinceInputProps extends ComponentProps<typeof Select>{
    id?: string;
    className?: string;
    placeholder?: string;
}

export default function ProvinceInput(props: ProvinceInputProps) {
    const { className, placeholder, id, ...rest } = props;
    return (
        <Select {...rest}>
            <SelectTrigger className={className} id={id}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {provinces.map((province) => (
                    <SelectItem key={province} value={province}>
                        {province}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
