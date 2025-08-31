import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { prefersDark, useAppearance } from '@/hooks/use-appearance';

export default function HeroSection() {
    const { appearance } = useAppearance();

    return <section className="bg-linear-to-b to-muted from-background">
        <div className="relative py-36">
            <div className="relative z-10 mx-auto w-full max-w-screen-xl px-6">
                <div className="md:w-1/2">
                    <div>
                        <h1 className="max-w-md text-balance text-5xl font-medium md:text-6xl">The Credit Builder for
                            Renters</h1>
                        <p className="text-muted-foreground my-8 max-w-2xl text-balance text-xl">Use your largest
                            monthly expense to build your credit score!</p>

                        <div className="flex items-center gap-3">
                            <Button
                                asChild
                                size="lg"
                                className="pr-4.5">
                                <Link href={route('register')}>
                                    <span className="text-nowrap">Get Started</span>
                                    <ChevronRight className="opacity-50" />
                                </Link>
                            </Button>
                        </div>
                    </div>

                    <div className="mt-10">
                        <p className="text-muted-foreground">Reported to</p>
                        <div className="mt-6 grid max-w-sm grid-cols-3 gap-6">
                            <img
                                className="h-6 w-fit"
                                src="/assets/equifax.svg"
                                alt="Equifax"
                                height="16"
                                width="auto"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="perspective-near mt-24 translate-x-12 md:absolute md:-right-6 md:bottom-16 md:left-1/2 md:top-40 md:mt-0 md:translate-x-0">
                <div
                    className="
                        before:border-foreground/5 before:bg-foreground/5
                        relative h-full
                        before:absolute before:-inset-x-4 before:bottom-7 before:top-0 before:skew-x-6
                        before:rounded-[calc(var(--radius)+1rem)] before:border">
                    <div
                        className="bg-background rounded-(--radius) shadow-foreground/10 ring-foreground/5 relative h-full -translate-y-12 skew-x-6 overflow-hidden border border-transparent shadow-md ring-1">
                        <picture>
                            <source media="(prefers-color-scheme: dark)" src="/assets/rento-dark.png" />
                            <img
                                src={(appearance === "light" || appearance === "system" && !prefersDark()) ? '/assets/rento-light.png' : '/assets/rento-dark.png'}
                                alt="Dashboard light mode"
                                className="object-top-left size-full object-cover"
                            />
                        </picture>
                    </div>
                </div>
            </div>
        </div>
    </section>;
}
