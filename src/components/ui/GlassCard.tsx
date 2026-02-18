import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import clsx from 'clsx';

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
    onClick?: () => void;
}

export function GlassCard({ children, className, hover = true, onClick }: GlassCardProps) {
    return (
        <motion.div
            whileHover={hover ? { y: -4, scale: 1.01 } : {}}
            onClick={onClick}
            className={clsx(
                'glass rounded-2xl p-6 transition-all duration-300',
                hover && 'glass-hover cursor-pointer',
                'shadow-lg shadow-black/20',
                className
            )}
        >
            {/* Shimmer effect */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            </div>

            {children}
        </motion.div>
    );
}
