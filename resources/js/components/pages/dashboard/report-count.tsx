import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ComponentProps, useState } from 'react';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
    ChartConfig,
    ChartContainer,
    ChartLegend, ChartLegendContent,
    ChartStyle,
    ChartTooltip,
    ChartTooltipContent
} from '@/components/ui/chart';
import { Label, Pie, PieChart } from 'recharts';

const options = [
    { id: 'this_year', name: 'This Year' },
    { id: 'all_time', name: 'All Time' }
];

export type ReportCountData = {
    created?: number,
    verified?: number,
    reported?: number,
}

const chartConfig = {
    "created": {
        label: "Processing",
        color: "var(--chart-3)",
    },
    "verified": {
        label: "Verified",
        color: "var(--chart-1)",
    },
    "reported": {
        label: "Reported",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig;

type Props = ComponentProps<typeof Card> & {
    reportCounts: Record<string, ReportCountData>;
}

export default function ReportCount(props: Props) {
    const id = "report-count";
    const { reportCounts, className, ...rest } = props;
    const [option, setOption] = useState("this_year");
    const counts = reportCounts[option];
    const data = [
        { status: "created", count: counts?.created || 0, fill: "var(--color-created)" },
        { status: "verified", count: counts?.verified || 0, fill: "var(--color-verified)" },
        { status: "reported", count: counts?.reported || 0, fill: "var(--color-reported)" }
    ]

    const totalCount = data.reduce((acc, item) => acc + item.count, 0);

    return <Card data-chart={id} className={cn('flex flex-col', className)} {...rest}>
        <ChartStyle id={id} config={chartConfig} />
        <CardHeader>
            <CardTitle className="pb-2">
                Report Count
            </CardTitle>
            <Select value={option} onValueChange={setOption}>
                <SelectTrigger
                    className="h-7 w-[130px] rounded-lg pl-2.5"
                    aria-label="Select a value"
                >
                    <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent align="end" className="rounded-xl">
                    {options.map((option) => (
                        <SelectItem value={option.id} key={option.id} className="rounded-lg [&_span]:flex">
                            {option.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </CardHeader>
        <CardContent className="flex flex-1 justify-center pb-0">
            <ChartContainer
                id={id}
                config={chartConfig}
                className="mx-auto aspect-square w-full max-w-[300px]"
            >
                <PieChart>
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                    />
                    <Pie
                        data={data}
                        nameKey="status"
                        dataKey="count"
                        innerRadius={60}
                        strokeWidth={10}
                    >
                        <Label
                            content={({ viewBox }) => {
                                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                    return (
                                        <text
                                            x={viewBox.cx}
                                            y={viewBox.cy}
                                            textAnchor="middle"
                                            dominantBaseline="middle"
                                        >
                                            <tspan
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                className="fill-foreground text-4xl font-bold"
                                            >
                                                {totalCount.toLocaleString()}
                                            </tspan>
                                            <tspan
                                                x={viewBox.cx}
                                                y={(viewBox.cy || 0) + 24}
                                                className="fill-muted-foreground"
                                            >
                                                Reports
                                            </tspan>
                                        </text>
                                    )
                                }
                            }}
                        />
                    </Pie>
                    <ChartLegend
                        content={<ChartLegendContent nameKey="status" />}
                        className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
                    />
                </PieChart>
            </ChartContainer>
        </CardContent>
    </Card>;
}
