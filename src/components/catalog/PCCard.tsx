import { Link } from 'react-router-dom';
import { GlassCard } from '../ui/GlassCard';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import type { PrebuiltPC } from '../../types/pc';
import { useCartStore } from '../../store/cartStore';

interface PCCardProps {
    pc: PrebuiltPC;
}

export function PCCard({ pc }: PCCardProps) {
    const { addItem } = useCartStore();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        addItem({
            id: pc.id,
            name: pc.name,
            price: pc.price,
            image: pc.images[0],
            quantity: 1,
            type: 'prebuilt'
        });
    };

    return (
        <Link to={`/pc/${pc.id}`}>
            <GlassCard>
                {/* Image */}
                <div className="relative h-56 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-aether-surface to-aether-elevated group">
                    {/* Badges */}
                    <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-10">
                        <div className="flex gap-2">
                            {pc.badge && (
                                <Badge variant={
                                    pc.badge === 'bestseller' ? 'success' :
                                        pc.badge === 'new' ? 'info' :
                                            pc.badge === 'limited' ? 'limited' : 'default'
                                }>
                                    {pc.badge === 'bestseller' ? 'Best Seller' :
                                        pc.badge === 'new' ? 'Nuevo' :
                                            pc.badge === 'limited' ? 'Edición Limitada' : pc.badge}
                                </Badge>
                            )}
                        </div>
                        {!pc.inStock && (
                            <Badge variant="warning">Agotado</Badge>
                        )}
                    </div>

                    {/* Image placeholder */}
                    <div className="w-full h-full flex items-center justify-center text-7xl group-hover:scale-110 transition-transform duration-500">
                        💻
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-aether-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Tier badge */}
                <div className="mb-3">
                    <span className={`text-xs font-semibold px-2 py-1 rounded ${pc.tier === 'entry' ? 'bg-blue-500/20 text-blue-400' :
                        pc.tier === 'mid' ? 'bg-purple-500/20 text-purple-400' :
                            pc.tier === 'high' ? 'bg-orange-500/20 text-orange-400' :
                                'bg-gradient-to-r from-yellow-500/20 to-pink-500/20 text-yellow-400'
                        }`}>
                        {pc.tier === 'entry' ? 'ENTRY' :
                            pc.tier === 'mid' ? 'MID-RANGE' :
                                pc.tier === 'high' ? 'HIGH-END' : 'ULTIMATE'}
                    </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-display font-bold mb-2 hover:gradient-text transition-all">
                    {pc.name}
                </h3>

                {/* Description */}
                <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                    {pc.description}
                </p>

                {/* Key Specs */}
                <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                    <div className="glass rounded-lg p-2">
                        <div className="text-text-secondary">GPU</div>
                        <div className="text-text-primary font-medium truncate">{pc.specs.gpu}</div>
                    </div>
                    <div className="glass rounded-lg p-2">
                        <div className="text-text-secondary">CPU</div>
                        <div className="text-text-primary font-medium truncate">{pc.specs.cpu}</div>
                    </div>
                </div>

                {/* Highlights */}
                <ul className="space-y-1 mb-4 text-sm">
                    {pc.highlights.slice(0, 2).map((highlight, i) => (
                        <li key={i} className="flex items-start text-text-secondary">
                            <span className="text-aether-accent mr-2">•</span>
                            <span className="line-clamp-1">{highlight}</span>
                        </li>
                    ))}
                </ul>

                {/* Price & Actions */}
                <div className="pt-4 border-t border-white/5">
                    <div className="flex items-baseline justify-between mb-4">
                        <div>
                            {pc.originalPrice && (
                                <div className="text-sm text-text-muted line-through">
                                    ${pc.originalPrice.toLocaleString()}
                                </div>
                            )}
                            <div className="text-2xl font-bold gradient-text">
                                ${pc.price.toLocaleString()}
                            </div>
                        </div>
                        {pc.originalPrice && (
                            <Badge variant="success">
                                {Math.round((1 - pc.price / pc.originalPrice) * 100)}% OFF
                            </Badge>
                        )}
                    </div>

                    <div className="flex gap-2">
                        <Button
                            size="sm"
                            onClick={handleAddToCart}
                            disabled={!pc.inStock}
                            className="flex-1"
                        >
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            {pc.inStock ? 'Agregar' : 'Agotado'}
                        </Button>
                        <Button size="sm" variant="outline">
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </GlassCard>
        </Link>
    );
}
