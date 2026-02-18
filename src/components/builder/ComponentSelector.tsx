import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { useCatalogStore } from '../../store/catalogStore';
import { useBuilderStore } from '../../store/builderStore';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import type { Component } from '../../types/component';

interface ComponentSelectorProps {
    category: string;
    onClose?: () => void;
    inline?: boolean;
}

export function ComponentSelector({ category, onClose, inline = false }: ComponentSelectorProps) {
    const { components } = useCatalogStore();
    const { addComponent, build } = useBuilderStore();

    const categoryComponents = useMemo(() => {
        return components.filter(c => c.type === category);
    }, [components, category]);

    const handleSelect = (component: Component) => {
        addComponent(component);
        if (onClose) onClose();
    };

    const currentSelection = build.components[category];
    const isSelected = (id: string) => {
        if (Array.isArray(currentSelection)) {
            return currentSelection.some(c => c.id === id);
        }
        return currentSelection?.id === id;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: inline ? -10 : 0, x: inline ? 0 : 50 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: inline ? -10 : 0, x: inline ? 0 : 50 }}
            className={`h-full flex flex-col ${inline ? '' : ''}`}
        >
            {!inline && (
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold capitalize">Seleccionar {category}</h3>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full">
                        <X className="w-5 h-5" />
                    </button>
                </div>
            )}

            <div className="flex-grow overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                {categoryComponents.map((comp) => (
                    <GlassCard
                        key={comp.id}
                        className={`p-4 ${isSelected(comp.id) ? 'border-aether-primary ring-1 ring-aether-primary' : ''}`}
                        onClick={() => handleSelect(comp)}
                    >
                        <div className="flex gap-4">
                            <div className="w-20 h-20 bg-white/5 rounded-lg flex items-center justify-center text-3xl shrink-0">
                                {/* Image placeholder */}
                                📦
                            </div>
                            <div className="flex-grow">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="font-bold">{comp.name}</h4>
                                        <p className="text-sm text-text-secondary">{comp.brand}</p>
                                    </div>
                                    {isSelected(comp.id) && <Check className="text-aether-primary w-5 h-5" />}
                                </div>

                                <div className="mt-2 text-xs text-text-muted grid grid-cols-2 gap-1">
                                    {Object.entries(comp.specs).slice(0, 4).map(([k, v]) => (
                                        <div key={k}><span className="opacity-70">{k}:</span> {v}</div>
                                    ))}
                                </div>

                                <div className="mt-3 flex justify-between items-center">
                                    <span className="font-bold text-lg gradient-text">${comp.price}</span>
                                    <Button size="sm" variant={isSelected(comp.id) ? "outline" : "primary"}>
                                        {isSelected(comp.id) ? 'Seleccionado' : 'Seleccionar'}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </GlassCard>
                ))}

                {categoryComponents.length === 0 && (
                    <div className="text-center py-10 text-text-muted">
                        No hay componentes disponibles en esta categoría.
                    </div>
                )}
            </div>
        </motion.div>
    );
}
