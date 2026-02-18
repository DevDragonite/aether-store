import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCatalogStore } from '../store/catalogStore';
import { useCartStore } from '../store/cartStore';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';

export function ComponentsShop() {
    const { components } = useCatalogStore();
    const { addItem } = useCartStore();
    const [filter, setFilter] = useState<string>('all');

    const types = ['all', 'cpu', 'gpu', 'motherboard', 'ram', 'storage', 'case', 'cooler', 'psu'];

    const filteredComponents = filter === 'all'
        ? components
        : components.filter(c => c.type === filter);

    const handleAddToCart = (component: any) => {
        addItem({
            id: component.id,
            name: component.name,
            price: component.price,
            image: component.image,
            quantity: 1,
            type: 'component'
        });
        toast.success('Producto agregado al carrito');
    };

    return (
        <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-display font-bold mb-4">
                    Componentes <span className="gradient-text">Premium</span>
                </h1>
                <div className="flex flex-wrap justify-center gap-2 mt-6">
                    {types.map((t) => (
                        <Button
                            key={t}
                            variant={filter === t ? 'primary' : 'secondary'}
                            size="sm"
                            onClick={() => setFilter(t)}
                            className="capitalize"
                        >
                            {t}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredComponents.map((comp, index) => (
                    <motion.div
                        key={comp.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                    >
                        <GlassCard className="h-full flex flex-col">
                            <div className="h-40 bg-white/5 rounded-lg mb-4 flex items-center justify-center text-4xl">
                                {/* Placeholder */}
                                📦
                            </div>
                            <div className="mb-2">
                                <span className="text-xs text-text-secondary uppercase tracking-wider">{comp.brand}</span>
                                <h3 className="font-bold leading-tight">{comp.name}</h3>
                            </div>

                            <div className="flex-grow text-xs text-text-secondary mb-4 space-y-1">
                                {Object.entries(comp.specs).slice(0, 3).map(([k, v]) => (
                                    <div key={k}>{k}: <span className="text-text-primary">{v}</span></div>
                                ))}
                            </div>

                            <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-auto">
                                <div className="font-bold text-lg">${comp.price}</div>
                                <button
                                    onClick={() => handleAddToCart(comp)}
                                    className="p-2 rounded-lg bg-white/10 hover:bg-aether-primary hover:text-white transition-colors"
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                </button>
                            </div>
                        </GlassCard>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
