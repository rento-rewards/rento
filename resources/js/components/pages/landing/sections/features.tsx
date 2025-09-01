import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Landmark, Lock, Coins } from 'lucide-react';

export default function FeaturesSection() {
    return <section className="bg-linear-to-b to-background from-muted py-12">
        <div className="mx-auto w-full max-w-screen-xl px-8">
            <div>
                <h2 className="text-foreground mt-4 text-4xl font-semibold">Your Rent, Finally Working for You</h2>
                <p className="text-muted-foreground mb-12 mt-4 text-balance text-lg">Turn every rent payment into
                    progress toward better credit and more opportunities.</p>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader>
                        <Landmark className="text-primary size-5" />
                        <CardTitle className="mt-5">Boost Your Credit</CardTitle>
                        <CardDescription className="mt-3">
                            Gain points toward better loan approvals, lower interest rates, and more opportunities.
                        </CardDescription>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader>
                        <Lock className="text-primary size-5" />
                        <CardTitle className="mt-5">Stay Private</CardTitle>
                        <CardDescription className="mt-3">
                            Your landlord is never contacted. Your information stays safe and secure.
                        </CardDescription>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader>
                        <Coins className="text-primary size-5" />
                        <CardTitle className="mt-5">No Extra Costs</CardTitle>
                        <CardDescription className="mt-3">
                            No hidden fees, no credit checks—just clear, upfront pricing.
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
        </div>
    </section>;
};
