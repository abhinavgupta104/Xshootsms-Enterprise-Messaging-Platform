import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { pricingFAQ } from "@/data/pricingFAQ";

export const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-10 py-4 rounded-full mb-6 shadow-2xl">
                    <HelpCircle className="w-7 h-7" />
                    <span className="font-black text-xl tracking-wide">Frequently Asked Questions</span>
                </div>
                <p className="text-muted-foreground text-xl font-medium">
                    Everything you need to know about our pricing
                </p>
            </motion.div>

            <div className="space-y-4">
                {pricingFAQ.map((faq, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="glass-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-shadow"
                    >
                        <button
                            onClick={() => toggleFAQ(index)}
                            className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-muted/50 transition-colors min-h-12"
                            aria-label={`Toggle ${faq.question}`}
                            aria-expanded={openIndex === index}
                        >
                            <span className="text-lg font-bold text-foreground pr-4">
                                {faq.question}
                            </span>
                            <motion.div
                                animate={{ rotate: openIndex === index ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ChevronDown className="w-6 h-6 text-muted-foreground flex-shrink-0" />
                            </motion.div>
                        </button>

                        <AnimatePresence>
                            {openIndex === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-8 pb-6 text-muted-foreground leading-relaxed">
                                        {faq.answer}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
