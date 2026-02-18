import { Hero } from '../components/home/Hero';
import { FeaturedPCs } from '../components/home/FeaturedPCs';
import { TrustSection } from '../components/home/TrustSection';
import { NewsSection } from '../components/home/NewsSection';
import { FAQSection } from '../components/home/FAQSection';

export function Home() {
    return (
        <main>
            <Hero />
            <TrustSection />
            <FeaturedPCs />
            <NewsSection />
            <FAQSection />
        </main>
    );
}
