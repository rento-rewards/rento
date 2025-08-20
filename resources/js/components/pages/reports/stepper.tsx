import {
    Stepper,
    StepperIndicator,
    StepperItem,
    StepperSeparator,
    StepperTitle,
    StepperTrigger
} from '@/components/ui/stepper';
import { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

const steps = [
    { step: 1, title: 'Lease' },
    { step: 2, title: 'Report' },
    { step: 3, title: 'Confirmation' }
];

type ReportFormStepperProps = ComponentProps<typeof Stepper>

export default function ReportFormStepper(props: ReportFormStepperProps) {
    const { className, ...rest } = props;
    return (
        <>
            <Stepper {...rest} className={cn('p-4 @max-lg/report-form:hidden', className)}>
                {steps.map(({ step, title }) => (
                    <StepperItem step={step} key={step} className="not-last:flex-1">
                        <StepperTrigger className="rounded">
                            <StepperIndicator />
                            <div className="text-left">
                                <StepperTitle>{title}</StepperTitle>
                            </div>
                        </StepperTrigger>
                        {step < steps.length && (
                            <StepperSeparator className="mx-4" />
                        )}
                    </StepperItem>
                ))}
            </Stepper>
            <div className={cn('p-4 @lg/report-form:hidden', className)}>
                <p className="text-muted-foreground">Step {props.value} of {steps.length}</p>
                <h3 className="text-2xl font-semibold tracking-tight">{steps[(props.value || 1) - 1].title}</h3>
            </div>
        </>
    );
}
