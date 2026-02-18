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
                                <div className="relative h-48 mb-4 rounded-lg overflow-hidden group-hover:scale-105 transition-transform duration-500">
                                    {pc.badge && (
                                        <div className="absolute top-3 right-3 z-10">
                                            <Badge variant={pc.badge === 'bestseller' ? 'success' : 'default'}>
                                                {pc.badge === 'bestseller' ? 'Best Seller' : pc.badge}
                                            </Badge>
                                        </div>
                                    )}
                                    <img
                                        src={
                                            index === 0 ? "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=800" :
                                                index === 1 ? "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=800" :
                                                    "https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?auto=format&fit=crop&q=80&w=800"
                                        }
                                        alt={pc.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-aether-surface via-transparent to-transparent opacity-60" />
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
