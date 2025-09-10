import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TextEffect } from '@/components/ui/motion/text-effect';
import { Coins, Landmark, Lock } from 'lucide-react';
import { motion, stagger, useInView } from 'motion/react';
import { useRef } from 'react';

const features = [
    {
        icon: Landmark,
        title: 'Boost Your Credit',
        description: 'Gain points toward better loan approvals, lower interest rates, and more opportunities.',
    },
    {
        icon: Lock,
        title: 'Stay Private',
        description: 'Your landlord is never contacted. Your information stays safe and secure.',
    },
    {
        icon: Coins,
        title: 'No Extra Costs',
        description: 'No hidden fees, no credit checks—just clear, upfront pricing.',
    },
];

export default function FeaturesSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: '0px 0px -20% 0px', once: true });

    return (
        <section className="bg-linear-to-b from-muted to-background py-12" ref={ref}>
            <div className="mx-auto w-full max-w-screen-xl px-8">
                <div>
                    <TextEffect per="char" as="h2" className="mt-4 text-4xl font-semibold text-foreground" trigger={isInView}>
                        Your Rent, Finally Working for You
                    </TextEffect>
                    <TextEffect className="mt-4 mb-12 text-lg text-balance text-muted-foreground" trigger={isInView} delay={0.1}>
                        Turn every rent payment into progress toward better credit and more opportunities.
                    </TextEffect>
                </div>
                <motion.div
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: {
                            opacity: 1,
                            y: 0,
                            transition: {
                                delayChildren: stagger(0.2, { startDelay: 0.3 }),
                            },
                        },
                    }}
                    className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-3"
                >
                    {features.map((feature, index) => (
                        <motion.div key={index} variants={{
                            hidden: { opacity: 0, y: 20, scale: 0.95 },
                            visible: {
                                opacity: 1,
                                y: 0,
                                scale: 1,
                                transition: { type: 'spring', stiffness: 100, damping: 10 },
                            },
                        }}>
                            <Card>
                                <CardHeader>
                                    <feature.icon className="size-5 text-primary" />
                                    <CardTitle className="mt-5">{feature.title}</CardTitle>
                                    <CardDescription className="mt-3">{feature.description}</CardDescription>
                                </CardHeader>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
