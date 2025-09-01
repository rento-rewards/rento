import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const features = [
    {
        title: 'Improve Key Credit Factors',
        icon: '📊',
        points: [
            'Build a Longer Credit History — Start early and show consistency by reporting monthly rent.',
            'Diversify Your Credit Mix — Add rent payments to your profile for a more balanced history.',
            'Create a Positive Payment History — Prove your reliability with on-time rent reporting.'
        ]
    },
    {
        title: 'Get Better Rates on Loans',
        icon: '🏡',
        points: [
            'Boost Loan Approvals — A stronger credit score increases your chances of approval.',
            'Unlock Lower Interest Rates — Save thousands over time with better credit terms.',
            'Achieve Your Goals Faster — Move closer to big milestones like a new car or home.'
        ]
    }
];

export function BenefitsSection() {
    return (
        <section className="bg-linear-to-t to-background from-muted py-12">
            <div className="mx-auto w-full max-w-screen-xl px-8">
                <div>
                    <h2 className="text-foreground mt-4 text-4xl font-semibold">Your Rent, Your Credit, Your Future</h2>
                    <p className="text-muted-foreground mb-12 mt-4 text-balance text-lg">From building a stronger credit
                        history to qualifying for loans at lower rates, rent reporting helps you reach your financial
                        goals faster.</p>
                </div>
                <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2">
                    {features.map((feature, index) => (
                        <Card
                            key={index}
                        >
                            <CardHeader>
                                <div className="text-4xl mb-2">{feature.icon}</div>
                                <CardTitle className="text-xl font-semibold mb-4">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3">
                                    {feature.points.map((point, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                            <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
