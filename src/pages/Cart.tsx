import { motion } from 'framer-motion';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';

export function Cart() {
    const { items, removeItem, updateQuantity, getTotal } = useCartStore();
    const total = getTotal();
    const shipping = total > 1000 ? 0 : 50;
    const finalTotal = total + shipping;

    if (items.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                <div className="w-24 h-24 glass rounded-full flex items-center justify-center mb-6">
                    <ShoppingBag className="w-10 h-10 text-text-muted" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Tu carrito está vacío</h2>
                <p className="text-text-secondary mb-8">Parece que aún no has agregado nada.</p>
                <Link to="/catalogo">
                    <Button>Ir al Catálogo</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
            <h1 className="text-3xl font-display font-bold mb-8">Tu Carrito</h1>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-8 space-y-4">
                    {items.map((item) => (
                        <motion.div layout key={item.id}>
                            <GlassCard className="flex gap-4 items-center p-4">
                                <div className="w-20 h-20 bg-white/5 rounded-lg flex items-center justify-center text-2xl shrink-0">
                                    {/* Placeholder image logic */}
                                    {item.type === 'prebuilt' ? '🖥️' : '📦'}
                                </div>

                                <div className="flex-grow">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="font-semibold">{item.name}</h3>
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="text-text-muted hover:text-red-400 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <p className="text-sm text-text-secondary capitalize">{item.type}</p>

                                    <div className="flex justify-between items-center mt-2">
                                        <div className="flex items-center gap-3">
                                            <button
                                                className="w-6 h-6 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center"
                                                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                            >-</button>
                                            <span className="text-sm w-4 text-center">{item.quantity}</span>
                                            <button
                                                className="w-6 h-6 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center"
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            >+</button>
                                        </div>
                                        <div className="font-bold gradient-text">
                                            ${(item.price * item.quantity).toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>

                {/* Summary */}
                <div className="lg:col-span-4">
                    <GlassCard className="sticky top-24">
                        <h2 className="text-xl font-bold mb-6">Resumen del Pedido</h2>

                        <div className="space-y-4 mb-6 text-sm">
                            <div className="flex justify-between text-text-secondary">
                                <span>Subtotal</span>
                                <span>${total.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-text-secondary">
                                <span>Envío</span>
                                <span>{shipping === 0 ? 'Gratis' : `$${shipping}`}</span>
                            </div>
                            <div className="border-t border-white/10 pt-4 flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span className="gradient-text">${finalTotal.toLocaleString()}</span>
                            </div>
                        </div>

                        <Button fullWidth size="lg">
                            Proceder al Pago
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>

                        <p className="text-xs text-center text-text-muted mt-4">
                            Pagos seguros y encriptados.
                        </p>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
}
