import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCatalogStore } from '../store/catalogStore';
import { PCCard } from '../components/catalog/PCCard';
import { Button } from '../components/ui/Button';

export function Catalog() {
    const { tier } = useParams<{ tier?: string }>();
    const { prebuiltPCs } = useCatalogStore();
    const [selectedTier, setSelectedTier] = useState<string>(tier || 'all');

    const tiers = ['all', 'entry', 'mid', 'high', 'ultimate'];

    const filteredPCs = useMemo(() => {
        if (selectedTier === 'all') return prebuiltPCs;
        return prebuiltPCs.filter(pc => pc.tier === selectedTier);
    }, [prebuiltPCs, selectedTier]);

    return (
        <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
                    Catálogo <span className="gradient-text">AETHER</span>
                </h1>
                <p className="text-text-secondary max-w-2xl mx-auto mb-8">
                    Explora nuestras configuraciones premium diseñadas para cada nivel de experiencia.
                </p>

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-2">
                    {tiers.map((t) => (
                        <Button
                            key={t}
                            variant={selectedTier === t ? 'primary' : 'secondary'}
                            size="sm"
                            onClick={() => setSelectedTier(t)}
                            className="capitalize"
                        >
                            {t}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPCs.map((pc, index) => (
                    <motion.div
                        key={pc.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <PCCard pc={pc} />
                    </motion.div>
                ))}
            </div>

            {filteredPCs.length === 0 && (
                <div className="text-center py-20 text-text-muted">
                    No se encontraron PCs en esta categoría.
                </div>
            )}
        </div>
    );
}
