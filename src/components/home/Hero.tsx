import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';

export function Hero() {
    const [currentImage, setCurrentImage] = useState(0);

    // Background images (Gaming setups)
    const images = [
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1920",
        "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=1920",
        "https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?auto=format&fit=crop&q=80&w=1920",
        "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=1920"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev: number) => (prev + 1) % images.length);
        }, 3000); // 3 seconds for better UX (1.5s is too fast for background)
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Animated background images */}
            {images.map((img, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentImage ? 'opacity-40' : 'opacity-0'}`}
                >
                    <img
                        src={img}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-aether-darker/50 mix-blend-multiply" />
                </div>
            ))}

            {/* Gradient Overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-aether-darker via-aether-darker/80 to-transparent" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring' }}
                        className="inline-flex items-center glass px-4 py-2 rounded-full mb-6"
                    >
                        <Zap className="w-4 h-4 text-aether-primary mr-2" />
                        <span className="text-sm font-medium">Tecnología de siguiente nivel</span>
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-aether-primary via-aether-secondary via-aether-accent to-aether-primary bg-[length:200%_auto] animate-shimmer-text">
                            Eleva tu <br className="hidden md:block" />
                            experiencia gaming
                        </span>
                    </h1>

                    <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-8 leading-relaxed">
                        PCs gaming premium diseñadas con los mejores componentes.
                        Potencia, estilo y rendimiento sin compromisos.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link to="/catalogo" className="w-full sm:w-auto">
                            <Button size="lg" className="group w-full sm:w-[200px] flex items-center justify-center">
                                Ver Catálogo
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <Link to="/arma-tu-pc" className="w-full sm:w-auto">
                            <Button size="lg" variant="secondary" className="w-full sm:w-[200px] flex items-center justify-center">
                                Arma tu PC
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center">
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-1.5 h-1.5 bg-aether-primary rounded-full mt-2"
                    />
                </div>
            </motion.div>
        </section>
    );
}
