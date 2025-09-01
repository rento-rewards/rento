import LandingLayout from '@/layouts/landing-layout';
import HeroSection from '@/components/pages/landing/sections/hero';
import CallToActionSection from '@/components/pages/landing/sections/call-to-action';
import FeaturesSection from '@/components/pages/landing/sections/features';
import HowItWorks from '@/components/pages/landing/sections/how-it-works';

export default function Welcome() {
    return (
        <LandingLayout>
            <HeroSection />
            <FeaturesSection />
            <HowItWorks />
            <CallToActionSection />
        </LandingLayout>
    );
}
