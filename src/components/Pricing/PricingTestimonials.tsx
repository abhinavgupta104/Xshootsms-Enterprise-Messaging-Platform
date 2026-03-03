import { motion } from "framer-motion";
import { Quote, Star, TrendingUp } from "lucide-react";
import { pricingTestimonials } from "@/data/pricingTestimonials";

export const PricingTestimonials = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-4 rounded-full mb-6 shadow-2xl">
                    <Star className="w-7 h-7" />
                    <span className="font-black text-xl tracking-wide">Customer Success Stories</span>
                </div>
                <p className="text-muted-foreground text-xl font-medium">
                    See how businesses are growing with Xshootsms
                </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
                {pricingTestimonials.map((testimonial, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="glass-card rounded-3xl p-8 border border-border hover:shadow-2xl hover:scale-105 transition-all relative overflow-hidden group"
                    >
                        {/* Background gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                        {/* Quote icon */}
                        <div className="absolute top-6 right-6 opacity-10">
                            <Quote className="w-20 h-20 text-purple-600" />
                        </div>

                        <div className="relative z-10">
                            {/* Tier badge */}
                            <div className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-xs font-bold mb-4">
                                {testimonial.tier} Plan
                            </div>

                            {/* Quote */}
                            <p className="text-foreground text-lg leading-relaxed mb-6 italic">
                                "{testimonial.quote}"
                            </p>

                            {/* Metrics */}
                            <div className="flex gap-4 mb-6">
                                <div className="flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-lg">
                                    <TrendingUp className="w-4 h-4 text-green-600" />
                                    <span className="text-sm font-bold text-foreground">
                                        {testimonial.metrics.improvement}
                                    </span>
                                </div>
                                {testimonial.metrics.deliveryRate && (
                                    <div className="bg-muted/50 px-4 py-2 rounded-lg">
                                        <span className="text-sm font-bold text-foreground">
                                            {testimonial.metrics.deliveryRate}
                                        </span>
                                    </div>
                                )}
                                {testimonial.metrics.volume && (
                                    <div className="bg-muted/50 px-4 py-2 rounded-lg">
                                        <span className="text-sm font-bold text-foreground">
                                            {testimonial.metrics.volume}
                                        </span>
                                    </div>
                                )}
                                {testimonial.metrics.timeSaved && (
                                    <div className="bg-muted/50 px-4 py-2 rounded-lg">
                                        <span className="text-sm font-bold text-foreground">
                                            {testimonial.metrics.timeSaved}
                                        </span>
                                    </div>
                                )}
                                {testimonial.metrics.engagement && (
                                    <div className="bg-muted/50 px-4 py-2 rounded-lg">
                                        <span className="text-sm font-bold text-foreground">
                                            {testimonial.metrics.engagement}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Author */}
                            <div className="flex items-center gap-4 pt-4 border-t border-border">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-lg">
                                    {testimonial.name.charAt(0)}
                                </div>
                                <div>
                                    <div className="font-bold text-foreground">{testimonial.name}</div>
                                    <div className="text-sm text-muted-foreground">
                                        {testimonial.role} at {testimonial.company}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
