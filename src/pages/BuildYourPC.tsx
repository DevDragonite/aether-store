import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, RotateCcw, X } from 'lucide-react';
import { useBuilderStore } from '../store/builderStore';
import { useCartStore } from '../store/cartStore';
import { Button } from '../components/ui/Button';
import { BuilderCanvas } from '../components/builder/BuilderCanvas';
import { ComponentSelector } from '../components/builder/ComponentSelector';
import toast from 'react-hot-toast';

export function BuildYourPC() {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const { getTotalPrice, clearBuild, build } = useBuilderStore();
    const { addItem } = useCartStore();

    const totalPrice = getTotalPrice();

    const handleAddToCart = () => {
        // Logic to add bundled PC to cart
        // For now, we simulate adding a custom PC item
        // Ideally, we'd add individual components or a "Custom Build" item with metadata

        // Check if essential parts are selected
        const essentials = ['cpu', 'motherboard', 'ram', 'storage', 'psu', 'case'];
        const missing = essentials.filter(t => !build.components[t] || (Array.isArray(build.components[t]) && (build.components[t] as any[]).length === 0));

        if (missing.length > 0) {
            toast.error(`Faltan componentes esenciales: ${missing.join(', ')}`);
            return;
        }

        addItem({
            id: `custom-build-${Date.now()}`,
            name: 'Custom Aether PC',
            price: totalPrice,
            quantity: 1,
            image: '/assets/pcs/spark-1.jpg', // Placeholder
            type: 'prebuilt' // Treat as prebuilt for simplicity in cart
        });
        toast.success('PC agregada al carrito');
        clearBuild();
    };

    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-display font-bold mb-2">
                    Arma tu <span className="gradient-text">Máquina</span>
                </h1>
                <p className="text-text-secondary">
                    Selecciona cada componente para crear tu PC ideal. Aether asegura la compatibilidad.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Builder Canvas (Left/Center) */}
                <div className={`lg:col-span-${activeCategory ? '7' : '8'} lg:col-start-${activeCategory ? '1' : '3'} transition-all duration-300`}>
                    <BuilderCanvas onSelectCategory={setActiveCategory} />

                    {/* Summary Bar (Only visible when NO category is selected) */}
                    {!activeCategory && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-8 glass p-6 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-4 z-20"
                        >
                            <div>
                                <div className="text-sm text-text-secondary">Total Estimado</div>
                                <div className="text-3xl font-bold gradient-text">${totalPrice.toLocaleString()}</div>
                            </div>
                            <div className="flex gap-2 w-full sm:w-auto">
                                <Button variant="ghost" onClick={clearBuild} title="Reiniciar">
                                    <RotateCcw className="w-5 h-5" />
                                </Button>
                                <Button onClick={handleAddToCart} className="flex-1 sm:flex-initial">
                                    <ShoppingCart className="w-5 h-5 mr-2" />
                                    Agregar al Carrito
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Component Selector (Right Side Panel) */}
                <AnimatePresence>
                    {activeCategory && (
                        <motion.div
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 100 }}
                            className="lg:col-span-5 fixed inset-y-0 right-0 w-full md:w-[500px] lg:static lg:w-auto lg:h-[calc(100vh-100px)] pointer-events-none flex flex-col justify-end pb-6 lg:pb-0"
                        >
                            <div className="lg:hidden absolute top-4 right-4 z-50 pointer-events-auto">
                                <button onClick={() => setActiveCategory(null)}>
                                    <X />
                                </button>
                            </div>

                            {/* Component List Container */}
                            <div className="pointer-events-auto w-full glass rounded-xl lg:rounded-b-none p-6 relative flex-1 overflow-hidden mb-4 lg:mb-6 h-[calc(100%-180px)]">
                                <ComponentSelector
                                    category={activeCategory}
                                    onClose={() => setActiveCategory(null)}
                                />
                            </div>

                            {/* Floating Summary Card */}
                            <div className="pointer-events-auto w-full glass border border-white/10 rounded-xl p-6 shadow-2xl relative z-50">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="text-sm text-text-secondary">Total Estimado</div>
                                    <div className="text-2xl font-bold gradient-text">${totalPrice.toLocaleString()}</div>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="ghost" onClick={clearBuild} title="Reiniciar" className="shrink-0">
                                        <RotateCcw className="w-5 h-5" />
                                    </Button>
                                    <Button onClick={handleAddToCart} className="flex-1">
                                        <ShoppingCart className="w-5 h-5 mr-2" />
                                        Agregar al Carrito
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
