import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
    {
        question: "¿Cuánto tiempo demora el armado de un PC gamer personalizado?",
        answer: "El tiempo estándar de armado y pruebas es de 3 a 5 días hábiles. Para configuraciones con refrigeración líquida custom, puede tomar hasta 10 días."
    },
    {
        question: "¿Ofrecen garantía en los PCs armados?",
        answer: "Sí, todos nuestros PCs incluyen 2 años de garantía en mano de obra y la garantía oficial de cada fabricante para los componentes individuales (generalmente 3 años)."
    },
    {
        question: "¿Puedo hacer upgrade de mi PC actual con ustedes?",
        answer: "Absolutamente. Trae tu equipo para una evaluación gratuita y te recomendaremos las mejores opciones de mejora para maximizar tu rendimiento."
    },
    {
        question: "¿Realizan envíos a todo Chile?",
        answer: "Hacemos envíos asegurados a todas las regiones de Chile a través de nuestros partners logísticos certificados."
    },
    {
        question: "¿Qué formas de pago aceptan?",
        answer: "Aceptamos tarjetas de crédito/débito, transferencias bancarias y pago en criptomonedas (USDT, BTC, ETH)."
    }
];

export function FAQSection() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <section className="py-20 relative">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-display font-bold mb-4">Preguntas <span className="gradient-text">Frecuentes</span></h2>
                    <p className="text-text-secondary">Respuestas a las dudas más comunes sobre nuestros servicios</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="glass rounded-xl overflow-hidden border border-white/5 data-[open=true]:border-aether-primary/30 transition-colors">
                            <button
                                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-white/5 transition-colors"
                            >
                                <span className="font-bold text-lg">{faq.question}</span>
                                {activeIndex === index ? <ChevronUp className="text-aether-primary" /> : <ChevronDown className="text-text-secondary" />}
                            </button>
                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 pb-6 text-text-secondary border-t border-white/5 pt-4">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
