import type { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { AuroraBackground } from '../ui/AuroraBackground';

interface LayoutProps {
    children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen flex flex-col relative text-text-primary">
            <AuroraBackground />
            <Navbar />
            <main className="flex-grow pt-16 relative z-10">
                {children}
            </main>
            <Footer />
        </div>
    );
}
