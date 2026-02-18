import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Check, Zap } from 'lucide-react';
import { useCatalogStore } from '../store/catalogStore';
import { useCartStore } from '../store/cartStore';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { GlassCard } from '../components/ui/GlassCard';

export function PCDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { getPCById } = useCatalogStore();
    const { addItem } = useCartStore();

    const pc = getPCById(id || '');

    if (!pc) {
        return (
            <div className="min-h-screen flex items-center justify-center text-center">
                <div>
                    <h2 className="text-2xl font-bold mb-4">PC no encontrada</h2>
                    <Button onClick={() => navigate('/catalogo')}>Volver al Catálogo</Button>
                </div>
            </div>
        );
    }

    const handleAddToCart = () => {
        addItem({
            id: pc.id,
            name: pc.name,
            price: pc.price,
            image: pc.images[0],
            quantity: 1,
            type: 'prebuilt'
        });
        // Optional: Add toast notification here
    };

    return (
        <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <Button variant="ghost" className="mb-8" onClick={() => navigate(-1)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Images */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                >
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-aether-surface to-aether-elevated relative flex items-center justify-center">
                        <div className="text-9xl">💻</div>
                        {/* Use {pc.images[0]} in real implementation */}
                    </div>
                </motion.div>

                {/* Info */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <div className="flex gap-2 mb-4">
                        <Badge>{pc.tier.toUpperCase()}</Badge>
                        {pc.badge && <Badge variant="info">{pc.badge}</Badge>}
                    </div>

                    <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">{pc.name}</h1>
                    <p className="text-xl text-text-secondary mb-6">{pc.description}</p>

                    <div className="flex items-baseline gap-4 mb-8">
                        <span className="text-4xl font-bold gradient-text">${pc.price.toLocaleString()}</span>
                        {pc.originalPrice && (
                            <span className="text-xl text-text-muted line-through">${pc.originalPrice.toLocaleString()}</span>
                        )}
                    </div>

                    <div className="flex gap-4 mb-12">
                        <Button size="lg" onClick={handleAddToCart} disabled={!pc.inStock} className="flex-1">
                            <ShoppingCart className="w-5 h-5 mr-2" />
                            {pc.inStock ? 'Agregar al Carrito' : 'Agotado'}
                        </Button>
                    </div>

                    {/* Specs */}
                    <GlassCard className="mb-8">
                        <h3 className="text-xl font-bold mb-6 flex items-center">
                            <Zap className="w-5 h-5 mr-2 text-aether-primary" />
                            Especificaciones Técnicas
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                            {Object.entries(pc.specs).map(([key, value]) => (
                                <div key={key} className="flex flex-col p-3 rounded-lg bg-white/5">
                                    <span className="text-text-secondary capitalize mb-1">{key}</span>
                                    <span className="font-medium text-text-primary">{value}</span>
                                </div>
                            ))}
                        </div>
                    </GlassCard>

                    {/* Highlights */}
                    <div className="space-y-3">
                        <h3 className="font-semibold text-lg mb-4">Destacados</h3>
                        {pc.highlights.map((highlight, index) => (
                            <div key={index} className="flex items-start">
                                <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                                <span className="text-text-secondary">{highlight}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
