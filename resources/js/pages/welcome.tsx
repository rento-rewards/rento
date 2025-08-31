import LandingLayout from '@/layouts/landing-layout';
import HeroSection from '@/components/pages/landing/sections/hero';
import CallToActionSection from '@/components/pages/landing/sections/call-to-action';

export default function Welcome() {
    return (
        <LandingLayout>
            <HeroSection />
            <CallToActionSection />
        </LandingLayout>
    );
}
