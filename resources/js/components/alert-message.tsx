import { cva, VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { ComponentProps } from 'react';
import { cn } from '@/lib/utils';
import { CircleAlertIcon, CircleCheckIcon, InfoIcon, TriangleAlertIcon } from 'lucide-react';

const alertMessageVariant = cva(
    'rounded-md border px-4 py-3 text-sm',
    {
        variants: {
            variant: {
                info: 'border-blue-500/50 text-blue-600',
                success: 'border-emerald-500/50 text-emerald-600',
                warning: 'border-yellow-500/50 text-yellow-600',
                error: 'border-red-500/50 text-red-600'
            }
        },
        defaultVariants: {
            variant: 'info'
        }
    }
);

type Props = ComponentProps<'div'> & VariantProps<typeof alertMessageVariant>

type Variant = VariantProps<typeof alertMessageVariant>['variant']

export default function AlertMessage({ className, children, variant }: Props) {
    const Icon = variant === 'success' ? CircleCheckIcon
        : variant === 'warning' ? TriangleAlertIcon
            : variant === 'error' ? CircleAlertIcon
                : InfoIcon;

    return (
        <div className={cn(alertMessageVariant({ className, variant }))}>
            <div>
                <Icon
                    className="me-3 -mt-0.5 inline-flex opacity-60"
                    size={16}
                    aria-hidden="true"
                />
                {children}
            </div>
        </div>
    );
}
