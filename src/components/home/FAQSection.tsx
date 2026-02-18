import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
    {
        question: "¿Dónde están ubicados?",
        answer: "Nuestra tienda física y showroom se encuentra en el Centro Comercial Parque Cerro Verde, Caracas, Venezuela. Puedes visitarnos para probar nuestros equipos y recibir asesoría personalizada."
    },
    {
        question: "¿Cuánto tiempo demora el armado de un PC?",
        answer: "El tiempo estándar de armado y pruebas es de 48 a 72 horas hábiles. Para configuraciones extremas con refrigeración líquida custom, puede tomar hasta 5 días hábiles."
    },
    {
        question: "¿Ofrecen garantía en Venezuela?",
        answer: "Sí, todos nuestros PCs incluyen 1 año de garantía directa en tienda por mano de obra y la garantía oficial de cada fabricante para los componentes individuales."
    },
    {
        question: "¿Realizan envíos al interior del país?",
        answer: "Hacemos envíos asegurados a toda Venezuela a través de Zoom, Tealca y Liberty Express, con embalaje de alta protección para garantizar que tu equipo llegue perfecto."
    },
    {
        question: "¿Qué métodos de pago aceptan?",
        answer: "Aceptamos Divisas en efectivo, Zelle, Transferencias en Bolívares (Banesco/Mercantil/Pago Móvil) y Criptomonedas (USDT/BTC)."
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
