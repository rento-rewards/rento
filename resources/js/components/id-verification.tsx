import HeadingSmall from '@/components/heading-small';
import IdVerificationBanner from '@/components/pages/dashboard/id-verification-banner';
import { CheckIcon } from 'lucide-react';

export default function IdentityVerification({ verified }: { verified: boolean }) {
    return (
        <div className="space-y-6">
            <HeadingSmall
                title="Identity Verification"
                description="Manage your identity verification settings"
            />
            {!verified ? (
                <IdVerificationBanner />
            ) : (
                <div className="dark bg-muted text-foreground px-4 py-3 rounded-2xl">
                    <div className="flex gap-2 md:items-center">
                        <div className="flex grow gap-3 md:items-center">
                            <div
                                className="bg-primary/15 flex size-9 shrink-0 items-center justify-center rounded-full max-md:mt-0.5"
                                aria-hidden="true"
                            >
                                <CheckIcon className="opacity-80" size={16} />
                            </div>
                            <div className="flex grow flex-col justify-between gap-12 md:flex-row md:items-center">
                                <div className="space-y-0.5">
                                    <p className="text-sm font-medium">
                                        Your identity has been verified
                                    </p>
                                    <p className="text-muted-foreground text-sm">
                                        Thank you for verifying your identity. You now have full access to all features.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)}
        </div>
    );
}
