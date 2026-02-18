import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export function Contact() {
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = (data: any) => {
        console.log(data);
        toast.success('Mensaje enviado correctamente');
        reset();
    };

    return (
        <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-display font-bold mb-4">
                    Contáctanos
                </h1>
                <p className="text-text-secondary max-w-2xl mx-auto">
                    ¿Tienes dudas sobre tu build? Nuestro equipo de expertos está aquí para ayudarte.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Info */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                >
                    <GlassCard className="p-8">
                        <h3 className="text-xl font-bold mb-6">Información de Contacto</h3>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-lg bg-aether-primary/20 flex items-center justify-center text-aether-primary shrink-0">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-1">Email</h4>
                                    <p className="text-text-secondary text-sm">ventas@aether.com</p>
                                    <p className="text-text-secondary text-sm">soporte@aether.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-lg bg-aether-secondary/20 flex items-center justify-center text-aether-secondary shrink-0">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-1">Teléfono</h4>
                                    <p className="text-text-secondary text-sm">+1 (555) 123-4567</p>
                                    <p className="text-text-secondary text-sm">Lun-Vie: 9am - 6pm</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-lg bg-aether-accent/20 flex items-center justify-center text-aether-accent shrink-0">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-1">Oficina</h4>
                                    <p className="text-text-secondary text-sm">Av. Tecnología 123</p>
                                    <p className="text-text-secondary text-sm">Ciudad Futura, 10001</p>
                                </div>
                            </div>
                        </div>
                    </GlassCard>
                </motion.div>

                {/* Form */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <GlassCard className="p-8">
                        <h3 className="text-xl font-bold mb-6">Envíanos un mensaje</h3>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Nombre</label>
                                    <input
                                        {...register('firstName')}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-aether-primary transition-colors"
                                        placeholder="John"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Apellido</label>
                                    <input
                                        {...register('lastName')}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-aether-primary transition-colors"
                                        placeholder="Doe"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Email</label>
                                <input
                                    type="email"
                                    {...register('email')}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-aether-primary transition-colors"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Mensaje</label>
                                <textarea
                                    {...register('message')}
                                    rows={4}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-aether-primary transition-colors"
                                    placeholder="¿En qué podemos ayudarte?"
                                />
                            </div>

                            <Button type="submit" fullWidth>
                                Enviar Mensaje
                                <Send className="w-4 h-4 ml-2" />
                            </Button>
                        </form>
                    </GlassCard>
                </motion.div>
            </div>
        </div>
    );
}
