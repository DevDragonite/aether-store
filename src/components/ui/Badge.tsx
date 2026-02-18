import clsx from 'clsx';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'default' | 'success' | 'warning' | 'info' | 'limited';
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
    const variants = {
        default: 'bg-aether-primary/20 text-aether-primary border-aether-primary/30',
        success: 'bg-green-500/20 text-green-400 border-green-500/30',
        warning: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
        info: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
        limited: 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-pink-400 border-pink-500/30',
    };

    return (
        <span className={clsx(
            'inline-block px-3 py-1 rounded-full text-xs font-semibold',
            'border backdrop-blur-sm',
            variants[variant]
        )}>
            {children}
        </span>
    );
}
