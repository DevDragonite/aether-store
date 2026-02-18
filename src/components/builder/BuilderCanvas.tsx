import { motion, AnimatePresence } from 'framer-motion';
import { useBuilderStore } from '../../store/builderStore';
import { GlassCard } from '../ui/GlassCard';
import { Trash2, Plus } from 'lucide-react';
import type { Component } from '../../types/component';

interface BuilderCanvasProps {
    onSelectCategory: (category: string) => void;
}

export function BuilderCanvas({ onSelectCategory }: BuilderCanvasProps) {
    const { build, removeComponent } = useBuilderStore();

    const componentTypes = [
        { type: 'cpu', label: 'Procesador', icon: '💻' },
        { type: 'cooler', label: 'Cooler', icon: '❄️' },
        { type: 'motherboard', label: 'Motherboard', icon: '🔧' },
        { type: 'ram', label: 'Memoria RAM', icon: '💾' },
        { type: 'gpu', label: 'Tarjeta Gráfica', icon: '🎮' },
        { type: 'storage', label: 'Almacenamiento', icon: '💿' },
        { type: 'psu', label: 'Fuente de Poder', icon: '⚡' },
        { type: 'case', label: 'Gabinete', icon: '📦' },
    ];

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-display font-bold mb-6">Tu Configuración</h2>

            {componentTypes.map(({ type, label, icon }) => {
                const component = build.components[type] as Component | Component[] | undefined;
                const isArray = Array.isArray(component);
                const components = isArray ? component : component ? [component] : [];

                return (
                    <div key={type}>
                        <div className="flex justify-between items-center mb-2">
                            <div className="text-sm text-text-secondary">{label}</div>
                            {(type === 'ram' || type === 'storage') && (
                                <button onClick={() => onSelectCategory(type)} className="text-xs text-aether-primary hover:underline">
                                    + Agregar otro
                                </button>
                            )}
                        </div>

                        <AnimatePresence mode="popLayout">
                            {components.length > 0 ? (
                                components.map((comp) => (
                                    <motion.div
                                        key={comp.id + comp.name} // Unique key
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="mb-2"
                                    >
                                        <GlassCard className="p-4">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="text-3xl">{icon}</div>
                                                    <div>
                                                        <div className="font-semibold text-sm sm:text-base">{comp.name}</div>
                                                        <div className="text-xs text-text-secondary">{comp.brand}</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="font-bold gradient-text">
                                                        ${comp.price.toLocaleString()}
                                                    </div>
                                                    <button
                                                        onClick={() => removeComponent(type, comp.id)}
                                                        className="p-1.5 hover:bg-red-500/20 rounded-md transition-colors text-red-400"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </GlassCard>
                                    </motion.div>
                                ))
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="glass rounded-lg p-6 text-center text-text-muted border-dashed border-2 border-white/5 hover:border-aether-primary/30 cursor-pointer transition-colors"
                                    onClick={() => onSelectCategory(type)}
                                >
                                    <div className="flex flex-col items-center">
                                        <Plus className="w-8 h-8 mb-2 opacity-50" />
                                        <span className="text-sm">Seleccionar {label}</span>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    );
}
