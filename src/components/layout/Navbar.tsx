import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../../store/cartStore';
import { Button } from '../ui/Button';

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const { items } = useCartStore();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { path: '/', label: 'Inicio' },
        { path: '/catalogo', label: 'Catálogo' },
        { path: '/componentes', label: 'Componentes' },
        { path: '/arma-tu-pc', label: 'Arma tu PC' },
        { path: '/contacto', label: 'Contacto' },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'glass shadow-lg shadow-black/10'
                : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-aether-primary to-aether-secondary rounded-lg flex items-center justify-center">
                            <span className="text-2xl font-bold">A</span>
                        </div>
                        <span className="text-2xl font-display font-bold gradient-text">
                            AETHER
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        {/* Search Bar */}
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="Buscar..."
                                className="bg-white/5 border border-white/10 rounded-full py-1.5 px-4 pl-10 text-sm focus:outline-none focus:border-aether-primary/50 transition-all w-40 focus:w-60"
                            />
                            <svg className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>

                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`text-sm font-medium transition-colors ${location.pathname === link.path
                                    ? 'text-aether-primary'
                                    : 'text-text-secondary hover:text-text-primary'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Cart & Actions */}
                    <div className="flex items-center space-x-4">
                        <Link to="/carrito" className="relative group">
                            <Button variant="ghost" size="sm" className="relative">
                                <ShoppingCart className="w-5 h-5 group-hover:text-aether-primary transition-colors" />
                                {items.length > 0 && (
                                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-aether-primary rounded-full text-[10px] flex items-center justify-center animate-pulse">
                                        {items.length}
                                    </span>
                                )}
                            </Button>
                        </Link>

                        {/* Login Button */}
                        <Button variant="outline" size="sm" className="hidden md:flex border-white/20 hover:border-aether-primary/50">
                            Login
                        </Button>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 text-text-primary"
                        >
                            {isMobileMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden glass border-t border-white/10"
                    >
                        <div className="px-4 py-6 space-y-4">
                            {/* Mobile Search */}
                            <div className="relative mb-4">
                                <input
                                    type="text"
                                    placeholder="Buscar..."
                                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 pl-10 text-sm focus:outline-none focus:border-aether-primary/50"
                                />
                                <svg className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>

                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block text-text-primary hover:text-aether-primary transition-colors py-2"
                                >
                                    {link.label}
                                </Link>
                            ))}

                            <div className="pt-4 border-t border-white/10">
                                <Button variant="outline" className="w-full justify-center">
                                    Iniciar Sesión
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
