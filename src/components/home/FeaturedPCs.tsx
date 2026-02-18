import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ArrowRight } from 'lucide-react';
import { useCatalogStore } from '../../store/catalogStore';

export function FeaturedPCs() {
    const { prebuiltPCs } = useCatalogStore();

    // Get bestsellers
    const featured = prebuiltPCs.filter(pc => pc.badge === 'bestseller').slice(0, 3);

    return (
        <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-display font-bold mb-4">
                        Los más <span className="gradient-text">populares</span>
                    </h2>
                    <p className="text-text-secondary max-w-2xl mx-auto">
                        Nuestras configuraciones más vendidas, perfectas para cualquier tipo de jugador
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {featured.map((pc, index) => (
                        <motion.div
                            key={pc.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <GlassCard>
                                {/* Image */}
                                <div className="relative h-48 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-aether-surface to-aether-elevated">
                                    {pc.badge && (
                                        <div className="absolute top-3 right-3 z-10">
                                            <Badge variant={pc.badge === 'bestseller' ? 'success' : 'default'}>
                                                {pc.badge === 'bestseller' ? 'Best Seller' : pc.badge}
                                            </Badge>
                                        </div>
                                    )}
                                    {/* Placeholder - replace with actual image */}
                                    <div className="w-full h-full flex items-center justify-center text-6xl">
                                        💻
                                    </div>
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-display font-bold mb-2">{pc.name}</h3>
                                <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                                    {pc.description}
                                </p>

                                {/* Key specs */}
                                <div className="space-y-2 mb-4 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-text-secondary">GPU:</span>
                                        <span className="text-text-primary font-medium">{pc.specs.gpu}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-text-secondary">CPU:</span>
                                        <span className="text-text-primary font-medium">{pc.specs.cpu}</span>
                                    </div>
                                </div>

                                {/* Price & CTA */}
                                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                    <div>
                                        <div className="text-2xl font-bold gradient-text">
                                            ${pc.price.toLocaleString()}
                                        </div>
                                    </div>
                                    <Link to={`/pc/${pc.id}`}>
                                        <Button size="sm">
                                            Ver más
                                            <ArrowRight className="ml-2 w-4 h-4" />
                                        </Button>
                                    </Link>
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link to="/catalogo">
                        <Button variant="outline" size="lg">
                            Ver todo el catálogo
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
