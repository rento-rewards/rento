import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { Area, AreaChart, CartesianGrid, YAxis } from 'recharts';
import { TrendingUp } from 'lucide-react';

const chartData = [
    { month: "January", score: 650 },
    { month: "February", score: 685 },
    { month: "March", score: 700 },
    { month: "April", score: 746 },
    { month: "May", score: 788 },
    { month: "June", score: 810 },
]
const chartConfig = {
    score: {
        color: "var(--chart-2)",
    },
} satisfies ChartConfig

export default function BuildCreditIllustration() {
    return (
        <Card aria-hidden="true" className="pb-0 overflow-hidden max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Credit score</CardTitle>
                <CardDescription className="inline-flex items-center gap-2">Increases by 30 points this month
                    <TrendingUp className="size-4" />
                </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
                <ChartContainer config={chartConfig}>
                    <AreaChart
                        accessibilityLayer
                        data={chartData}
                        margin={{ top: 0, right: -1, left: -1, bottom: 0 }}
                    >
                        <CartesianGrid vertical={false} horizontal={false} />
                        <YAxis domain={[600, 850]} hide />
                        <Area
                            dataKey="score"
                            type="natural"
                            fill="var(--color-score)"
                            fillOpacity={0.4}
                            stroke="var(--color-score)"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
