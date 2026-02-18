import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBuilderStore } from '../../store/builderStore';
import { GlassCard } from '../ui/GlassCard';
import { Trash2, Plus, ChevronUp } from 'lucide-react';
import type { Component } from '../../types/component';
import { ComponentSelector } from './ComponentSelector';
import { Button } from '../ui/Button';

export function BuilderCanvas() {
    const { build, removeComponent } = useBuilderStore();
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

    const toggleCategory = (type: string) => {
        if (expandedCategory === type) {
            setExpandedCategory(null);
        } else {
            setExpandedCategory(type);
        }
    };

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
                const isExpanded = expandedCategory === type;
                const hasSelection = components.length > 0;

                return (
                    <div key={type} className={`transition-all duration-300 ${isExpanded ? 'my-6' : ''}`}>
                        <div className="flex justify-between items-center mb-2">
                            <div className="text-sm text-text-secondary font-bold flex items-center gap-2">
                                {label}
                                {hasSelection && <span className="text-aether-primary text-xs bg-aether-primary/10 px-2 py-0.5 rounded-full">Seleccionado</span>}
                            </div>
                            {(type === 'ram' || type === 'storage') && hasSelection && (
                                <button onClick={() => toggleCategory(type)} className="text-xs text-aether-primary hover:underline">
                                    + Agregar / Cambiar
                                </button>
                            )}
                        </div>

                        <AnimatePresence mode="wait">
                            {/* Selection View (Collapsed state with selection) */}
                            {hasSelection && !isExpanded ? (
                                <div className="space-y-2">
                                    {components.map((comp) => (
                                        <motion.div
                                            key={comp.id + comp.name}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            <GlassCard className="p-4 group relative overflow-hidden">
                                                <div className="absolute inset-0 bg-aether-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                <div className="flex items-center justify-between relative z-10">
                                                    <div className="flex items-center gap-4 cursor-pointer" onClick={() => toggleCategory(type)}>
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
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                removeComponent(type, comp.id);
                                                            }}
                                                            className="p-1.5 hover:bg-red-500/20 rounded-md transition-colors text-red-400"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => toggleCategory(type)}
                                                            className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-text-muted"
                                                        >
                                                            <ChevronUp className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </GlassCard>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : null}

                            {/* Expanded Selection Mode (Inline Accordion) */}
                            {isExpanded && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="bg-aether-darker/50 border border-white/10 rounded-xl p-4 shadow-inner">
                                        <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/5">
                                            <span className="text-sm text-text-muted">Seleccionando {label}...</span>
                                            <Button size="sm" variant="ghost" onClick={() => toggleCategory(type)}>
                                                Cerrar <ChevronUp className="ml-2 w-4 h-4" />
                                            </Button>
                                        </div>
                                        <div className="h-[400px]"> {/* Fixed height for inline scroll */}
                                            <ComponentSelector
                                                category={type}
                                                onClose={() => toggleCategory(type)}
                                                inline={true}
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Empty State (Click to Expand) */}
                            {!hasSelection && !isExpanded && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="glass rounded-lg p-6 text-center text-text-muted border-dashed border-2 border-white/5 hover:border-aether-primary/30 cursor-pointer transition-all hover:bg-white/5 group"
                                    onClick={() => toggleCategory(type)}
                                >
                                    <div className="flex flex-col items-center group-hover:scale-105 transition-transform">
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-aether-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <Plus className="w-8 h-8 mb-2 opacity-50 relative z-10" />
                                        </div>
                                        <span className="text-sm font-medium">Seleccionar {label}</span>
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
