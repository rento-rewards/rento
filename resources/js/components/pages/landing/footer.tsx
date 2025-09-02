import { Link } from '@inertiajs/react';
import LandingLogo from '@/components/pages/landing/logo';
import { Mail, Phone } from 'lucide-react';
import AppearanceTabs from '@/components/appearance-tabs';
import legal from '@/routes/legal';

const links = [
    {
        group: 'Product',
        items: [
            {
                title: 'Home',
                href: "/",
            },
            {
                title: 'Pricing',
                href: '#pricing',
            }
        ],
    },
    {
        group: 'Legal',
        items: [
            {
                title: 'Privacy Policy',
                href: legal.privacyPolicy(),
            },
            {
                title: 'Terms of Service',
                href: legal.termsOfService()
            },
        ],
    },
]

export default function FooterSection() {
    return (
        <footer className="bg-background border-t pt-8">
            <div className="mx-auto max-w-screen-xl px-8">
                <div className="grid gap-12 md:grid-cols-5">
                    <div className="md:col-span-2 space-y-8">
                        <Link
                            href="/"
                            aria-label="go home"
                            className="block size-fit">
                            <LandingLogo height={20} />
                        </Link>
                        <div className="flex flex-wrap gap-4">
                            <a href="#">
                                <Mail className="size-5 text-muted-foreground hover:text-foreground" />
                            </a>
                            <a href="#">
                                <Phone className="size-5 text-muted-foreground hover:text-foreground" />
                            </a>
                        </div>
                    </div>

                    <div className="col-span-3 grid grid-cols-2 gap-6">
                        {links.map((link, index) => (
                            <div
                                key={index}
                                className="space-y-4">
                                <span className="block font-medium">{link.group}</span>
                                {link.items.map((item, index) => (
                                    <Link
                                        key={index}
                                        href={item.href}
                                        prefetch
                                        className="text-muted-foreground hover:text-primary block duration-150">
                                        <span>{item.title}</span>
                                    </Link>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-12 flex flex-wrap items-center justify-between gap-6 py-6 border-t">
                    <span className="text-muted-foreground order-last block text-center text-sm md:order-first">
                        © {new Date().getFullYear()} Rento Rewards Inc. All rights reserved
                    </span>
                    <div className="order-first flex flex-wrap justify-center gap-6 text-sm md:order-last">
                        <AppearanceTabs />
                    </div>
                </div>
            </div>
        </footer>
    )
}
