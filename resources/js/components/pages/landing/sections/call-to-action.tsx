import { ChevronRight } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { register } from '@/routes';

export default function CallToActionSection() {
    return <section>
        <div className="bg-muted py-24">
            <div className="mx-auto max-w-screen-xl px-8 flex flex-col items-center text-center text-balance">
                <h2 className="text-foreground max-w-lg text-balance text-3xl font-semibold lg:text-4xl">
                    Start Building Credit Score With Your Rent
                </h2>
                <p className="mt-4 text-lg">Build your financial future. One rent payment at a time.</p>
                <div className="mt-8 flex gap-3">
                    <Button
                        asChild
                        className="pr-2">
                        <Link href={register()}>
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
