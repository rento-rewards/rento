import BuildCreditIllustration from '@/components/pages/landing/illustrations/build-credit';
import PayRentIllustration from '@/components/pages/landing/illustrations/pay-rent';
import RentReportIllustration from '@/components/pages/landing/illustrations/rent-report';
import { TextEffect } from '@/components/ui/motion/text-effect';
import { useInView } from 'motion/react';
import { ComponentType, useRef } from 'react';
import { InView } from '@/components/ui/motion/in-view';

type Step = {
    title: string;
    description: string;
    illustration: ComponentType;
};

const steps = [
    {
        title: 'Pay Your Rent',
        description: 'Keep paying your rent directly to your landlord, just like you always have. No changes needed.',
        illustration: PayRentIllustration
    },
    {
        title: 'Report Your Payment',
        description: 'Let us know when you’ve paid—it’s quick, simple, and only takes a moment.',
        illustration: RentReportIllustration
    },
    {
        title: 'Build Your Credit',
        description: 'We send your payment reports to the Credit Bureau, helping you grow your credit score month after month.',
        illustration: BuildCreditIllustration
    }
] satisfies Step[];

export default function HowItWorks() {
    const titleRef = useRef(null);
    const titleInView = useInView(titleRef, {
        once: true,
        margin: '0px 0px -100px 0px'
    });

    return (
        <section>
            <div className="mx-auto max-w-screen-xl px-8 py-12">
                <div className="@container relative">
                    <SectionDecorator />
                    <div className="grid grid-cols-1 border @3xl:grid-cols-3 @3xl:divide-x">
                        <div className="w-full p-6 @xl:p-8 @4xl:p-12" ref={titleRef}>
                            <TextEffect as="h2" per="char" trigger={titleInView}
                                        className="mb-6 text-3xl font-semibold text-foreground">
                                Building Credit Shouldn’t Be Complicated
                            </TextEffect>
                            <TextEffect as="p" per="word" delay={0.3} trigger={titleInView}
                                        className="text-lg text-muted-foreground">
                                In just three simple steps, we’ll help you report your rent and start building the
                                credit you deserve.
                            </TextEffect>
                        </div>
                        <div className="relative col-span-2 divide-y *:p-6 @xl:*:p-8 @4xl:*:p-12">
                            {steps.map((step, index) => (
                                <IllustratedStep step={step} index={index} key={index} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function IllustratedStep({ step, index }: { step: Step; index: number }) {
    const ref = useRef(null);
    const inView = useInView(ref, {
        once: true,
        margin: '0px 0px -100px 0px'
    });

    return (
        <div
            className="group space-y-6"
            ref={ref}
        >
            <div>
                <TextEffect as="span" preset="scale" trigger={inView}
                            className="flex size-7 items-center justify-center rounded-full bg-foreground/5 text-sm font-medium text-foreground">
                    {(index + 1).toString()}
                </TextEffect>
                <TextEffect as="h3" per="line" preset="fade" delay={0.2} trigger={inView}
                            className="my-4 text-lg font-semibold text-foreground">{step.title}</TextEffect>
                <TextEffect as="p" per="line" preset="fade" delay={0.4} trigger={inView}
                            className="text-muted-foreground">{step.description}</TextEffect>
            </div>
            <InView once
                    variants={{
                        hidden: { opacity: 0, y: 30 },
                        visible: {
                            opacity: 1, y: 0, transition: {
                                duration: 0.5,
                                delay: 0.6
                            }
                        }
                    }}
                    viewOptions={{ margin: '0px 0px -50px 0px' }}
            >
                <step.illustration />
            </InView>
        </div>
    );
}

function SectionDecorator() {
    return (
        <>
            <span className="absolute -top-px -left-px block size-2 border-t-2 border-l-2 border-primary"></span>
            <span className="absolute -top-px -right-px block size-2 border-t-2 border-r-2 border-primary"></span>
            <span className="absolute -bottom-px -left-px block size-2 border-b-2 border-l-2 border-primary"></span>
            <span className="absolute -right-px -bottom-px block size-2 border-r-2 border-b-2 border-primary"></span>
        </>
    );
}
