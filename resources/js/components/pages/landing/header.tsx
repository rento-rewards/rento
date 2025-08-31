import { Link, usePage } from '@inertiajs/react';
import type { SharedData } from '@/types';

import { ChevronRight, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';
import LandingLogo from '@/components/pages/landing/logo';

const navigationLinks = [
    { href: '#features', label: 'Features' },
    { href: '#pricing', label: 'Pricing' }
];

export default function Component() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { auth } = usePage<SharedData>().props;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`sticky top-0 z-50 w-full backdrop-blur-lg transition-all duration-300 ${isScrolled ? 'bg-background/80 shadow-sm' : 'bg-transparent'}`}
        >
            <div className="flex h-16 items-center justify-between mx-auto max-w-screen-xl px-8">
                <Link className="inline-flex items-center gap-2 font-bold" href="/">
                    <LandingLogo color="text-primary" height={20} />
                </Link>
                <nav className="hidden md:flex gap-8">
                    {navigationLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
                <div className="hidden md:flex gap-2 items-center">
                    {auth.user ? (
                        <Button asChild>
                            <Link
                                href={route('dashboard')}
                            >
                                Dashboard <ChevronRight />
                            </Link>
                        </Button>
                    ) : (
                        <>
                            <Button asChild variant="ghost">
                                <Link href={route('login')}>Log in</Link>
                            </Button>
                            <Button asChild>
                                <Link href={route('register')}>Get started</Link>
                            </Button>
                        </>
                    )}
                </div>
                <div className="flex items-center gap-4 md:hidden">
                    <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                </div>
            </div>
            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="md:hidden absolute top-16 inset-x-0 bg-background/95 backdrop-blur-lg border-b"
                >
                    <div className="max-w-screen-xl mx-auto px-8 py-4 flex flex-col gap-4">
                        {navigationLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                    <div className="flex flex-col gap-2">
                        {auth.user ? (
                            <Button asChild className="m-4 w-full max-w-screen-xl mx-auto px-8">
                                <Link
                                    href={route('dashboard')}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Dashboard <ChevronRight />
                                </Link>
                            </Button>
                        ) : (
                            <div className="max-w-screen-xl w-full  mx-auto px-8 flex gap-4 m-4">
                                <Button asChild variant="outline" className="flex-1">
                                    <Link href={route('login')} onClick={() => setMobileMenuOpen(false)}>Log in</Link>
                                </Button>
                                <Button asChild className="flex-1">
                                    <Link href={route('register')} onClick={() => setMobileMenuOpen(false)}>Get started</Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </header>
    );
}

