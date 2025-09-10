import LandingLayout from '@/layouts/landing-layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { register } from '@/routes';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { TextEffect } from '@/components/ui/motion/text-effect';
import { motion } from 'motion/react';
import { SlidingNumber } from '@/components/ui/motion/sliding-number';

const MotionCard = motion(Card);
export default function Pricing() {
    const [choice, setChoice] = useState<App.Enums.SubscriptionType>('monthly');
    const price = choice === 'monthly' ? 5 : 3;

    return <LandingLayout>
        <div className="flex flex-col gap-6 items-center py-12 w-full mx-auto px-8 @container
            bg-radial-[125%_125%_at_50%_10%] from-background to-muted">
            <TextEffect as="h2" preset="blur"
                        className="text-foreground text-2xl @sm:text-4xl font-semibold text-center text-balance">Simple
                Plan,
                Transparent Pricing</TextEffect>
            <TextEffect as="p" per="line"
                        delay={0.2}
                        className="text-muted-foreground text-balance text-md @sm:text-lg text-center">Choose the plan
                that works
                best for you.</TextEffect>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-input/50 inline-flex h-9 rounded-md p-0.5">
                <RadioGroup
                    value={choice}
                    onValueChange={(value: App.Enums.SubscriptionType) => setChoice(value)}
                    className="group after:bg-background has-focus-visible:after:border-ring has-focus-visible:after:ring-ring/50 relative inline-grid grid-cols-[1fr_1fr] items-center gap-0 text-sm font-medium after:absolute after:inset-y-0 after:w-1/2 after:rounded-sm after:shadow-xs after:transition-[translate,box-shadow] after:duration-300 after:ease-[cubic-bezier(0.16,1,0.3,1)] has-focus-visible:after:ring-[3px] data-[state=off]:after:translate-x-0 data-[state=on]:after:translate-x-full"
                    data-state={choice === 'monthly' ? 'off' : 'on'}>
                    <label
                        className="group-data-[state=on]:text-muted-foreground/70 relative z-10 inline-flex h-full min-w-8 cursor-pointer items-center justify-center px-4 whitespace-nowrap transition-colors select-none">
                        Monthly
                        <RadioGroupItem id="monthly" value="monthly" className="sr-only" />
                    </label>
                    <label
                        className="group-data-[state=off]:text-muted-foreground/70 relative z-10 inline-flex h-full min-w-8 cursor-pointer items-center justify-center px-4 whitespace-nowrap transition-colors select-none">
                        Yearly{' '}
                        <span
                            className="ml-2 group-data-[state=off]:text-muted-foreground/70 transition-colors group-data-[state=on]:text-emerald-500">
                              -40%
                            </span>
                        <RadioGroupItem id="annually" value="annually" className="sr-only" />
                    </label>
                </RadioGroup>
            </motion.div>
            <MotionCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.75 }}
                className="p-8 @md:p-10">
                <CardHeader>
                    <CardTitle className="text-xl text-center">All-in-One Solution</CardTitle>
                    <CardDescription className="text-muted-foreground text-center">One simple plan for all your
                        needs.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                    <div className="flex gap-4 items-center justify-center mx-auto">
                        <div className="inline-flex items-center text-5xl font-bold text-right">$
                            <SlidingNumber value={price} />
                        </div>
                        <div className="text-left">
                            <div className="text-sm">Per month</div>
                            <div className="text-xs text-muted-foreground">
                                {choice === 'monthly' ? 'Billed monthly' : 'Billed annually'}
                            </div>
                        </div>
                    </div>
                    <Button className="mt-6">
                        <Link href={register()}>
                            Get Started Now
                        </Link>
                    </Button>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <p className="text-xs @sm:text-sm text-center text-muted-foreground text-balance">All plans include
                        a 14-day free trial. No credit card required. No hidden fees. Cancel anytime.</p>
                </CardFooter>
            </MotionCard>
        </div>
    </LandingLayout>;
}
