import { ReactNode } from 'react';
import Header from '@/components/pages/landing/header';
import Footer from '@/components/pages/landing/footer';

type Props = {
    children?: ReactNode
}

export default function LandingLayout({children}: Props) {
    return (
        <div className="flex min-h-[100dvh] flex-col">
            <Header />
            <main className="flex flex-col flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    )
}
