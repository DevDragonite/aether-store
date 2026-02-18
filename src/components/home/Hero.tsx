import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';

export function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-aether-darker via-aether-dark to-aether-darker">
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-aether-primary/20 rounded-full blur-3xl animate-float" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-aether-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
                </div>
            </div>

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

                    <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
                        Eleva tu
                        <span className="block gradient-text bg-[length:200%_auto] animate-shimmer-text">experiencia gaming</span>
                    </h1>

                    <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-8">
                        PCs gaming premium diseñadas con los mejores componentes.
                        Potencia, estilo y rendimiento sin compromisos.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/catalogo">
                            <Button size="lg" className="group">
                                Ver Catálogo
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <Link to="/arma-tu-pc">
                            <Button size="lg" variant="secondary">
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
