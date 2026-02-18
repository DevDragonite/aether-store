import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

export function Footer() {
    return (
        <footer className="glass mt-20 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-aether-primary to-aether-secondary rounded-lg flex items-center justify-center">
                                <span className="text-2xl font-bold">A</span>
                            </div>
                            <span className="text-2xl font-display font-bold gradient-text">
                                AETHER
                            </span>
                        </div>
                        <p className="text-text-secondary text-sm">
                            PCs gaming premium diseñadas para llevar tu experiencia al siguiente nivel.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold mb-4">Enlaces Rápidos</h3>
                        <ul className="space-y-2">
                            <li><Link to="/catalogo" className="text-text-secondary hover:text-aether-primary transition-colors text-sm">Catálogo</Link></li>
                            <li><Link to="/componentes" className="text-text-secondary hover:text-aether-primary transition-colors text-sm">Componentes</Link></li>
                            <li><Link to="/arma-tu-pc" className="text-text-secondary hover:text-aether-primary transition-colors text-sm">Arma tu PC</Link></li>
                            <li><Link to="/contacto" className="text-text-secondary hover:text-aether-primary transition-colors text-sm">Contacto</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-semibold mb-4">Contacto</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center space-x-2 text-text-secondary text-sm">
                                <Mail className="w-4 h-4" />
                                <span>info@aether.com</span>
                            </li>
                            <li className="flex items-center space-x-2 text-text-secondary text-sm">
                                <Phone className="w-4 h-4" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center space-x-2 text-text-secondary text-sm">
                                <MapPin className="w-4 h-4" />
                                <span>Ciudad, País</span>
                            </li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="font-semibold mb-4">Síguenos</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:border-aether-primary transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:border-aether-primary transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:border-aether-primary transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 mt-8 pt-8 text-center text-text-secondary text-sm">
                    © {new Date().getFullYear()} AETHER. Todos los derechos reservados.
                </div>
            </div>
        </footer>
    );
}
