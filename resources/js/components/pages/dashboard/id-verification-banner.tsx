import { IdCard } from 'lucide-react';

import { Button } from "@/components/ui/button"
import verification from '@/routes/verification';

export default function IdVerificationBanner() {
    return (
        <div className="dark bg-muted text-foreground px-4 py-3 rounded-2xl">
            <div className="flex gap-2 md:items-center">
                <div className="flex grow gap-3 md:items-center">
                    <div
                        className="bg-primary/15 flex size-9 shrink-0 items-center justify-center rounded-full max-md:mt-0.5"
                        aria-hidden="true"
                    >
                        <IdCard className="opacity-80" size={16} />
                    </div>
                    <div className="flex grow flex-col justify-between gap-x-12 gap-y-3 md:flex-row md:items-center">
                        <div className="space-y-0.5">
                            <p className="text-sm font-medium">
                                Please verify your identity
                            </p>
                            <p className="text-muted-foreground text-sm">
                                To comply with regulations, we need to verify your identity.
                            </p>
                        </div>
                        <div className="flex gap-2 max-md:flex-wrap">
                            <Button size="sm" className="text-sm" asChild>
                                <a href={verification.start.url()}>
                                    Verify
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
