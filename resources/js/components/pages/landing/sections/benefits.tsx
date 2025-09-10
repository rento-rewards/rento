import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TextEffect } from '@/components/ui/motion/text-effect';
import { CheckCircle } from 'lucide-react';
import { stagger } from 'motion';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

const features = [
    {
        title: 'Improve Key Credit Factors',
        icon: '📊',
        points: [
            'Build a Longer Credit History — Start early and show consistency by reporting monthly rent.',
            'Diversify Your Credit Mix — Add rent payments to your profile for a more balanced history.',
            'Create a Positive Payment History — Prove your reliability with on-time rent reporting.',
        ],
    },
    {
        title: 'Get Better Rates on Loans',
        icon: '🏡',
        points: [
            'Boost Loan Approvals — A stronger credit score increases your chances of approval.',
            'Unlock Lower Interest Rates — Save thousands over time with better credit terms.',
            'Achieve Your Goals Faster — Move closer to big milestones like a new car or home.',
        ],
    },
];

export function BenefitsSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        margin: '0px 0px -100px 0px',
        once: true,
    });

    return (
        <section className="bg-linear-to-t from-muted to-background py-12">
            <div className="mx-auto w-full max-w-screen-xl px-8">
                <div ref={ref}>
                    <TextEffect as="h2" per="char" trigger={isInView} className="mt-4 text-4xl font-semibold text-foreground">
                        Your Rent, Your Credit, Your Future
                    </TextEffect>
                    <TextEffect
                        as="p"
                        per="word"
                        trigger={isInView}
                        speedReveal={2}
                        className="mt-4 mb-12 text-lg text-balance text-muted-foreground"
                    >
                        From building a stronger credit history to qualifying for loans at lower rates, rent reporting helps you reach your financial
                        goals faster.
                    </TextEffect>
                </div>
                <motion.div
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: {
                            opacity: 1,
                            y: 0,
                            transition: {
                                delayChildren: stagger(0.3, { startDelay: 0.5 }),
                            },
                        },
                    }}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={{
                                hidden: {
                                    opacity: 0,
                                    y: 50,
                                },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    transition: {
                                        duration: 0.5,
                                        ease: 'easeOut',
                                    },
                                },
                            }}
                        >
                            <Card>
                                <CardHeader>
                                    <div className="mb-2 text-4xl">{feature.icon}</div>
                                    <CardTitle className="mb-4 text-xl font-semibold">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-3">
                                        {feature.points.map((point, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                                <span>{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
