import { ChevronRight } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

export default function CallToActionSection() {
    return <section>
        <div className="bg-muted py-12">
            <div className="mx-auto max-w-screen-xl px-8">
                <h2 className="text-foreground max-w-lg text-balance text-3xl font-semibold lg:text-4xl">
                    Start Building Credit Score With Your Rent
                </h2>
                <p className="mt-4 text-lg">Build your financial future. One rent payment at a time.</p>
                <div className="mt-8 flex gap-3">
                    <Button
                        asChild
                        className="pr-2">
                        <Link href={route('register')}>
                            Try Rento for Free
                            <ChevronRight
                                strokeWidth={2.5}
                                className="size-3.5! opacity-50"
                            />
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    </section>
}
