import LandingLayout from '@/layouts/landing-layout';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { register } from '@/routes';
import { Badge } from '@/components/ui/badge';

export default function Pricing() {
    const [choice, setChoice] = useState('monthly');

    return <LandingLayout>
        <div className="flex flex-col gap-6 items-center py-12 w-full mx-auto px-8 @container
            bg-radial-[125%_125%_at_50%_10%] from-background to-muted">
            <h2 className="text-foreground text-2xl @sm:text-4xl font-semibold text-center text-balance">Simple Plan, Transparent Pricing</h2>
            <p className="text-muted-foreground text-balance text-md @sm:text-lg text-center">Choose the plan that works best for you.</p>
            <Tabs value={choice} onValueChange={setChoice} className="w-full max-w-[375px] text-sm text-muted-foreground">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                    <TabsTrigger value="annually">Annually</TabsTrigger>
                </TabsList>
            </Tabs>
            <div className="text-sm">
                <span className="font-medium text-primary">Save 40%</span> on Annual Billing
            </div>
            <Card className="p-8 @md:p-10">
                <CardHeader>
                    <CardTitle className="text-xl text-center">All-in-One Solution</CardTitle>
                    <CardDescription className="text-muted-foreground text-center">One simple plan for all your needs.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                    <div className="flex gap-4 items-center justify-center mx-auto">
                        <div className="text-5xl font-bold text-right">${choice === "monthly" ? 5 : 3}</div>
                        <div className="text-left">
                            <div className="text-sm">Per month</div>
                            <div className="text-xs text-muted-foreground">
                                {choice === "monthly" ? "Billed monthly" : "Billed annually"}
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
                    <p className="text-xs @sm:text-sm text-center text-muted-foreground text-balance">All plans include a 14-day free trial. No credit card required. No hidden fees. Cancel anytime.</p>
                </CardFooter>
            </Card>
        </div>
    </LandingLayout>
}
