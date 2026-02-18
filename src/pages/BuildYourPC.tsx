import { ShoppingCart, RotateCcw } from 'lucide-react';
import { useBuilderStore } from '../store/builderStore';
import { useCartStore } from '../store/cartStore';
import { Button } from '../components/ui/Button';
import { BuilderCanvas } from '../components/builder/BuilderCanvas';
import toast from 'react-hot-toast';

export function BuildYourPC() {
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

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
                {/* Builder Canvas (Main Content - Left) */}
                <div className="lg:col-span-8">
                    <BuilderCanvas />
                </div>

                {/* Sticky Summary Card (Right Sidebar) */}
                <div className="lg:col-span-4 sticky top-24 h-fit">
                    <div className="glass border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden group">
                        {/* Background Gradient Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-aether-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative z-10">
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <ShoppingCart className="w-5 h-5 text-aether-primary" />
                                Resumen del Pedido
                            </h3>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between items-center text-text-secondary text-sm">
                                    <span>Componentes</span>
                                    <span>{Object.values(build.components).flat().length} seleccionados</span>
                                </div>
                                <div className="h-px bg-white/10" />
                                <div className="flex justify-between items-end">
                                    <span className="text-text-secondary mb-1">Total Estimado</span>
                                    <span className="text-4xl font-bold gradient-text">${totalPrice.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Button onClick={handleAddToCart} className="w-full py-4 text-lg shadow-lg shadow-aether-primary/20">
                                    Agregar al Carrito
                                </Button>
                                <Button variant="ghost" onClick={clearBuild} className="w-full text-text-muted hover:text-red-400 hover:bg-red-500/10">
                                    <RotateCcw className="w-4 h-4 mr-2" />
                                    Reiniciar Configuración
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
