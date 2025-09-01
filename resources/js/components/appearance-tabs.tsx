import { Appearance, useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';
import { LucideIcon, Monitor, Moon, Sun } from 'lucide-react';
import { HTMLAttributes } from 'react';

type Props = {
    hasLabel?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export default function AppearanceToggleTab({ className = '', hasLabel, ...props }: Props) {
    const { appearance, updateAppearance } = useAppearance();

    const tabs: { value: Appearance; icon: LucideIcon; label: string }[] = [
        { value: 'light', icon: Sun, label: 'Light' },
        { value: 'dark', icon: Moon, label: 'Dark' },
        { value: 'system', icon: Monitor, label: 'System' },
    ];

    return (
        <div className={cn('inline-flex gap-1 rounded-lg bg-muted text-muted-foreground p-1', className)} {...props}>
            {tabs.map(({ value, icon: Icon, label }) => (
                <button
                    key={value}
                    onClick={() => updateAppearance(value)}
                    data-active={appearance === value}
                    className={cn(
                        'flex items-center rounded-md px-3.5 py-1.5 transition-colors',
                        'data-[active=true]:shadow-xs data-[active=true]:bg-background data-[active=true]:text-foreground',
                        'data-[active=false]:hover:text-foreground',
                    )}
                >
                    <Icon className={cn('h-4 w-4', hasLabel && '-ml-1')} />
                    {hasLabel && <span className="ml-1.5 text-sm">{label}</span>}
                </button>
            ))}
        </div>
    );
}
