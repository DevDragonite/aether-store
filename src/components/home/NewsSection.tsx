import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

const newsItems = [
    {
        id: 1,
        title: "Aether X Pro: La nueva generación de refrigeración",
        date: "14 Feb 2026",
        image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=2574&auto=format&fit=crop",
        excerpt: "Presentamos nuestro nuevo sistema de refrigeración líquida custom, diseñado para mantener tus temperaturas bajo cero."
    },
    {
        id: 2,
        title: "NVIDIA RTX 5090: Análisis de rendimiento preliminar",
        date: "10 Feb 2026",
        image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=2670&auto=format&fit=crop",
        excerpt: "Probamos en exclusiva la próxima bestia de NVIDIA. Los resultados en 8K te dejarán sin aliento."
    },
    {
        id: 3,
        title: "Guía: Cómo optimizar Windows 12 para gaming",
        date: "05 Feb 2026",
        image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=2574&auto=format&fit=crop",
        excerpt: "Saca el máximo provecho a tu sistema operativo con estos ajustes esenciales para reducir la latencia."
    }
];

export function NewsSection() {
    return (
        <section className="py-20 relative overflow-hidden">
            {/* Decorative blob */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-aether-secondary/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-display font-bold mb-2">Últimas <span className="gradient-text">Novedades</span></h2>
                        <p className="text-text-secondary">Mantente al día con lo último en tecnología y hardware</p>
                    </div>
                    <Button variant="ghost" className="hidden md:flex">
                        Ver todo las noticias <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {newsItems.map((item) => (
                        <div key={item.id} className="group glass rounded-xl overflow-hidden hover:border-aether-primary/50 transition-colors duration-300">
                            <div className="h-48 overflow-hidden relative">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-aether-darker/90 to-transparent opacity-60" />
                                <span className="absolute bottom-4 left-4 text-xs font-bold bg-aether-primary/90 text-white px-3 py-1 rounded-full backdrop-blur-md">
                                    {item.date}
                                </span>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-3 group-hover:text-aether-primary transition-colors line-clamp-2">
                                    {item.title}
                                </h3>
                                <p className="text-text-secondary text-sm mb-6 line-clamp-3">
                                    {item.excerpt}
                                </p>
                                <Button variant="outline" size="sm" className="w-full group-hover:bg-aether-primary group-hover:border-aether-primary group-hover:text-white transition-all">
                                    Leer más
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Button variant="ghost">
                        Ver todo las noticias <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                </div>
            </div>
        </section>
    );
}
