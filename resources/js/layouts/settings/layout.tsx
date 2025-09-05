import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';
import { Badge, CircleDollarSign, CreditCard, RectangleEllipsis, SwatchBook, User } from 'lucide-react';

const sidebarNavItems: NavItem[] = [
    {
        title: 'Profile',
        href: '/settings/profile',
        icon: User,
    },
    {
        title: 'Password',
        href: '/settings/password',
        icon: RectangleEllipsis,
    },
    {
        title: 'Subscription',
        href: '/settings/subscription',
        icon: Badge
    },
    {
        title: 'Billing',
        href: '/settings/billing',
        icon: CircleDollarSign
    },
    {
        title: 'Appearance',
        href: '/settings/appearance',
        icon: SwatchBook,
    },
];

export default function SettingsLayout({ children }: PropsWithChildren) {
    // When server-side rendering, we only render the layout on the client...
    if (typeof window === 'undefined') {
        return null;
    }

    const currentPath = window.location.pathname;

    return (
        <div className="px-4 py-6 @container">
            <Heading title="Settings" description="Manage your profile and account settings" />

            <div className="flex flex-col @lg:flex-row @lg:space-x-12">
                <aside className="w-full max-w-xl @lg:w-48">
                    <nav className="flex @lg:flex-col gap-1">
                        {sidebarNavItems.map((item, index) => (
                            <Button
                                key={`${item.href}-${index}`}
                                size="sm"
                                variant="ghost"
                                asChild
                                className={cn('@lg:w-full @lg:justify-start', {
                                    'bg-muted': currentPath === item.href,
                                })}
                            >
                                <Link href={item.href} prefetch>
                                    {item.icon && <item.icon />} {item.title}
                                </Link>
                            </Button>
                        ))}
                    </nav>
                </aside>

                <Separator className="my-6 @lg:hidden" />

                <div className="flex-1 @md:max-w-2xl">
                    <section className="max-w-xl space-y-12">{children}</section>
                </div>
            </div>
        </div>
    );
}
