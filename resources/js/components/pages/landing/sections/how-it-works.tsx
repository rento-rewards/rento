import PayRentIllustration from '@/components/pages/landing/illustrations/pay-rent';

export default function HowItWorks() {
    return (
        <section>
            <div className="mx-auto max-w-screen-xl px-8 py-12">
                <div className="@container relative">
                    <SectionDecorator />
                    <div className="@3xl:grid-cols-3 @3xl:divide-x grid grid-cols-1 border">
                        <div className="@4xl:p-12 @xl:p-8 w-full p-6">
                            <h2 className="text-foreground mb-6 text-3xl font-semibold">Building Credit Shouldn’t Be
                                Complicated</h2>
                            <p className="text-muted-foreground text-lg">In just three simple steps, we’ll help you
                                report your rent and start building the credit you deserve.</p>
                        </div>
                        <div className="@4xl:*:p-12 @xl:*:p-8 relative col-span-2 divide-y *:p-6">
                            <div className="group space-y-6">
                                <div>
                                    <span
                                        className="bg-foreground/5 text-foreground flex size-7
                                         items-center justify-center rounded-full text-sm font-medium">
                                        1
                                    </span>
                                    <h3 className="text-foreground my-4 text-lg font-semibold">
                                        Pay Your Rent
                                    </h3>
                                    <p className="text-muted-foreground">
                                        Keep paying your rent directly to your landlord, just like you always have. No
                                        changes needed.
                                    </p>
                                </div>
                                <PayRentIllustration />
                            </div>
                            <div className="group space-y-6">
                                <div>
                                    <span
                                        className="bg-foreground/5 text-foreground flex size-7
                                         items-center justify-center rounded-full text-sm font-medium">
                                        2
                                    </span>
                                    <h3 className="text-foreground my-4 text-lg font-semibold">
                                        Report Your Payment
                                    </h3>
                                    <p className="text-muted-foreground">
                                        Let us know when you’ve paid—it’s quick, simple, and only takes a moment.
                                    </p>
                                </div>
                            </div>
                            <div className="group space-y-6">
                                <div>
                                    <span
                                        className="bg-foreground/5 text-foreground flex size-7
                                         items-center justify-center rounded-full text-sm font-medium">
                                        3
                                    </span>
                                    <h3 className="text-foreground my-4 text-lg font-semibold">
                                        Build Your Credit
                                    </h3>
                                    <p className="text-muted-foreground">
                                        We send your payment reports to the Credit Bureau, helping you grow your credit
                                        score month after month.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function SectionDecorator() {
    return <>
        <span className="border-primary absolute -left-px -top-px block size-2 border-l-2 border-t-2"></span>
        <span className="border-primary absolute -right-px -top-px block size-2 border-r-2 border-t-2"></span>
        <span className="border-primary absolute -bottom-px -left-px block size-2 border-b-2 border-l-2"></span>
        <span className="border-primary absolute -bottom-px -right-px block size-2 border-b-2 border-r-2"></span>
    </>;
}
