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

                {/* Component Selector Overlay (Full Right Half) */}
                <AnimatePresence>
                    {activeCategory && (
                        <motion.div
                            initial={{ opacity: 0, x: '100%' }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 right-0 w-full lg:w-[50%] bg-aether-darker border-l border-white/10 shadow-2xl z-50 flex flex-col"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-aether-darker/50 backdrop-blur-md">
                                <h2 className="text-xl font-bold">Seleccionar Componente</h2>
                                <button onClick={() => setActiveCategory(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                    <X />
                                </button>
                            </div>

                            {/* Split Content Area */}
                            <div className="flex-1 flex overflow-hidden relative">
                                {/* Component List (Scrollable Left Column) */}
                                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-4 pb-32 lg:pb-6">
                                    <ComponentSelector
                                        category={activeCategory}
                                        onClose={() => setActiveCategory(null)}
                                    />
                                </div>

                                {/* Fixed Summary Card (Right Column - Desktop Only) */}
                                <div className="hidden lg:flex w-80 flex-col justify-end p-6 pointer-events-none">
                                    <div className="pointer-events-auto bg-aether-surface/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
                                        <div className="flex justify-between items-center mb-4">
                                            <div className="text-sm text-text-secondary">Total Estimado</div>
                                            <div className="text-3xl font-bold gradient-text">${totalPrice.toLocaleString()}</div>
                                        </div>
                                        <div className="space-y-3">
                                            <Button onClick={handleAddToCart} className="w-full">
                                                <ShoppingCart className="w-5 h-5 mr-2" />
                                                Agregar al Carrito
                                            </Button>
                                            <Button variant="ghost" onClick={clearBuild} className="w-full text-text-muted hover:text-text-primary">
                                                <RotateCcw className="w-4 h-4 mr-2" />
                                                Reiniciar Configuración
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Mobile/Tablet Sticky Footer (Visible < lg) */}
                            <div className="lg:hidden p-4 bg-aether-surface border-t border-white/10 space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-text-secondary">Total:</span>
                                    <span className="text-xl font-bold gradient-text">${totalPrice.toLocaleString()}</span>
                                </div>
                                <Button onClick={handleAddToCart} className="w-full">
                                    Agregar al Carrito
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
