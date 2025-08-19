import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn, formatDate, isValidDate } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { ComponentProps, useState } from 'react';

interface DateOfBirthInputProps extends ComponentProps<'input'> {}

export default function DateOfBirthInput(props: DateOfBirthInputProps) {
    const { className, name, ...rest } = props;
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState<Date | undefined>();
    const [month, setMonth] = useState<Date | undefined>(date);
    const [value, setValue] = useState(formatDate(date));

    // Add hidden input for form submission
    const hiddenInputValue = date ? date.toISOString().split('T')[0] : '';

    return (
        <div className="relative flex gap-2">
            <Input
                value={value}
                onChange={(e) => {
                    const date = new Date(e.target.value);
                    if (isValidDate(date)) {
                        setValue(formatDate(date));
                        setDate(date);
                    }
                }}
                onKeyDown={(e) => {
                    if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        setOpen(true);
                    }
                }}
                className={cn('bg-background, pr-10', className)}
                {...rest}
            />
            <input type="hidden" name={name} value={hiddenInputValue} />
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button id="date-picker" variant="ghost" className="absolute top-1/2 right-2 size-6 -translate-y-1/2">
                        <CalendarIcon className="size-3.5" />
                        <span className="sr-only">Select date</span>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="end" alignOffset={-8} sideOffset={10}>
                    <Calendar
                        mode="single"
                        selected={date}
                        captionLayout="dropdown"
                        month={month}
                        onMonthChange={setMonth}
                        onSelect={(date) => {
                            setDate(date);
                            setValue(formatDate(date));
                            setOpen(false);
                        }}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}
