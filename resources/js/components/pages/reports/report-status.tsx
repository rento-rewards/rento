import {
    Timeline,
    TimelineContent,
    TimelineDate,
    TimelineHeader, TimelineIndicator,
    TimelineItem,
    TimelineSeparator, TimelineTitle
} from '@/components/ui/timeline';
import { dateFormatter } from '@/lib/formatters';
import { CheckIcon } from 'lucide-react';
import { Timestamp } from '@/types';

type Props = {
    report: App.Data.Reports.ReportDetailData
}

export default function ReportStatus({ report }: Props) {
    const { created_at, verified_at, report_date } = report;

    const items = [
        { date: new Date(created_at), title: 'Report Created' },
        verified_at ?
            { date: new Date(verified_at), title: 'Verified' } :
            { date: null, title: 'Verification' },
        report_date ?
            { date: new Date(report_date), title: 'Reported' } :
            { date: null, title: 'Report to Credit Bureau' },
    ];

    const step = items.findIndex((item) => item.date === null);

    return (
        <Timeline value={step}>
            {items.map(((item, index) => (
                <TimelineItem
                    step={index}
                    key={index}
                    className="group-data-[orientation=vertical]/timeline:ms-10">
                    <TimelineHeader>
                        <TimelineSeparator
                            className="group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=vertical]/timeline:translate-y-6.5" />
                        <TimelineTitle>{item.title}</TimelineTitle>
                        <TimelineIndicator
                            className="group-data-completed/timeline-item:bg-primary group-data-completed/timeline-item:text-primary-foreground flex size-6 items-center justify-center group-data-completed/timeline-item:border-none group-data-[orientation=vertical]/timeline:-left-7">
                            {index < step ? <CheckIcon
                                size={16}
                            />: null}
                        </TimelineIndicator>
                    </TimelineHeader>
                    <TimelineContent>
                        {item.date ? <TimelineDate>{dateFormatter.format(item.date)}</TimelineDate> : null}
                    </TimelineContent>
                </TimelineItem>
            )))}
        </Timeline>
    );
}
