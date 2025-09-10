import { buttonVariants } from '@/components/ui/button';
import { TextEffect } from '@/components/ui/motion/text-effect';
import { register } from '@/routes';
import { Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

const MotionLink = motion(Link);

export default function CallToActionSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        once: true,
        margin: '0px 0px -100px 0px',
    });

    return (
        <section>
            <div className="bg-muted py-24">
                <div className="mx-auto flex max-w-screen-xl flex-col items-center px-8 text-center text-balance" ref={ref}>
                    <TextEffect
                        as="h2"
                        per="line"
                        preset="slide"
                        speedSegment={0.75}
                        trigger={isInView}
                        className="max-w-lg text-3xl font-semibold text-balance text-foreground lg:text-4xl"
                    >
                        Start Building Credit Score With Your Rent
                    </TextEffect>
                    <TextEffect as="p" per="line" preset="slide" speedSegment={0.75} delay={0.2} trigger={isInView} className="mt-4 text-lg">
                        Build your financial future. One rent payment at a time.
                    </TextEffect>
                    <div className="mt-8 flex gap-3">
                        <MotionLink
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            initial="hidden"
                            animate={isInView ? 'visible' : 'hidden'}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            prefetch
                            className={buttonVariants({
                                className: "pr-2.5"
                            })}
                            href={register()}
                        >
                            Try Rento for Free
                            <ChevronRight strokeWidth={2.5} className="size-3.5! opacity-50" />
                        </MotionLink>
                    </div>
                </div>
            </div>
        </section>
    );
}
