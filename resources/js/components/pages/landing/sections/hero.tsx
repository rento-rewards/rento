import { Button } from '@/components/ui/button';
import { AnimatedGroup } from '@/components/ui/motion/animated-group';
import { TextEffect } from '@/components/ui/motion/text-effect';
import { register } from '@/routes';
import { Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import { stagger } from 'motion';
import { motion, type Variants } from 'motion/react';

const transitionVariants = {
    item: {
        hidden: {
            opacity: 0,
            filter: 'blur(12px)',
            y: 12,
        },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: {
                type: 'spring',
                bounce: 0.3,
                duration: 1.5,
            },
        },
    },
} satisfies {
    item?: Variants;
};

const MotionButton = motion.create(Button);

export default function HeroSection() {
    return (
        <section className="overflow-x-hidden bg-linear-to-b from-background to-muted">
            <div className="relative py-36">
                <div className="relative z-10 mx-auto w-full max-w-screen-xl px-6">
                    <div className="md:w-1/2">
                        <div>
                            <TextEffect
                                preset="fade-in-blur"
                                speedSegment={0.3}
                                as="h1"
                                className="max-w-md text-5xl font-bold tracking-tighter text-balance md:text-6xl"
                            >
                                The Credit Builder for Renters
                            </TextEffect>
                            <TextEffect
                                per="line"
                                preset="fade-in-blur"
                                speedSegment={0.3}
                                delay={0.5}
                                as="p"
                                className="my-8 max-w-2xl text-xl text-balance text-muted-foreground"
                            >
                                Use your largest monthly expense to build your credit score!
                            </TextEffect>

                            <div className="flex items-center gap-3">
                                <MotionButton
                                    initial={{
                                        opacity: 0,
                                        filter: 'blur(12px)',
                                        y: 12,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        filter: 'blur(0px)',
                                        y: 0,
                                        transition: {
                                            type: 'spring',
                                            bounce: 0.3,
                                            duration: 1.5,
                                            delay: 1,
                                        },
                                    }}
                                    asChild
                                    size="lg"
                                    className="pr-4.5"
                                >
                                    <Link href={register()} prefetch>
                                        <span className="text-nowrap">Get Started</span>
                                        <ChevronRight className="opacity-50" />
                                    </Link>
                                </MotionButton>
                            </div>
                        </div>

                        <div className="mt-10">
                            <TextEffect preset="fade-in-blur" as="p" speedSegment={0.5} delay={1} className="text-muted-foreground">
                                Reported to
                            </TextEffect>
                            <AnimatedGroup
                                variants={{
                                    container: {
                                        visible: {
                                            transition: {
                                                delayChildren: stagger(0.05, { startDelay: 1.5 }),
                                            },
                                            opacity: 1,
                                            filter: 'blur(0px)',
                                            y: 0,
                                        },
                                    },
                                    ...transitionVariants,
                                }}
                                className="mt-6 grid max-w-sm grid-cols-3 gap-6"
                            >
                                <img className="h-6 w-fit" src="/assets/equifax.svg" alt="Equifax" height="16" width="auto" />
                            </AnimatedGroup>
                        </div>
                    </div>
                </div>

                <motion.div
                    initial={{
                        opacity: 0,
                        filter: 'blur(12px)',
                        y: 12,
                    }}
                    animate={{
                        opacity: 1,
                        filter: 'blur(0px)',
                        y: 0,
                        transition: {
                            type: 'spring',
                            bounce: 0.3,
                            duration: 1.5,
                            delay: 1,
                        },
                    }}
                    className="mt-24 translate-x-12 perspective-near md:absolute md:top-40 md:-right-6 md:bottom-16 md:left-1/2 md:mt-0 md:translate-x-0"
                >
                    <div className="relative h-full before:absolute before:-inset-x-4 before:top-0 before:bottom-7 before:skew-x-6 before:rounded-[calc(var(--radius)+1rem)] before:border before:border-foreground/5 before:bg-foreground/5">
                        <div className="relative h-full -translate-y-12 skew-x-6 overflow-hidden rounded-(--radius) border border-transparent bg-background shadow-md ring-1 shadow-foreground/10 ring-foreground/5">
                            <picture>
                                <img
                                    src="/assets/rento-light.png"
                                    alt="Dashboard light mode"
                                    className="size-full object-cover object-top-left dark:hidden"
                                />
                                <img
                                    src="/assets/rento-dark.png"
                                    alt="Dashboard light mode"
                                    className="hidden size-full object-cover object-top-left dark:block"
                                />
                            </picture>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
