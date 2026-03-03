import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { scaleIn, viewport, EASE_OUT_EXPO } from "@/lib/animations";

const testimonials = [
  {
    quote: "Xshootsms transformed our customer engagement. We saw a 40% increase in conversion rates within the first month.",
    author: "Sarah Chen",
    role: "Head of Marketing",
    company: "TechFlow Inc.",
    metric: "40% conversion increase",
  },
  {
    quote: "The reliability is unmatched. We've processed over 50 million OTPs with 99.99% delivery rate.",
    author: "Michael Rivera",
    role: "CTO",
    company: "SecureAuth Labs",
    metric: "99.99% delivery rate",
  },
  {
    quote: "Their API integration was seamless. We went from zero to production in less than a day.",
    author: "Emily Watson",
    role: "Lead Developer",
    company: "StartupNow",
    metric: "< 1 day integration",
  },
  {
    quote: "The analytics dashboard gives us insights we never had before. We've optimized our messaging by 60%.",
    author: "David Park",
    role: "VP of Operations",
    company: "GlobalRetail Co.",
    metric: "60% optimization",
  },
];

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

  const go = (dir: number) => {
    setDirection(dir);
    setCurrentIndex((prev) =>
      (prev + dir + testimonials.length) % testimonials.length
    );
  };

  return (
    <section id="testimonials" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="text-center mb-16"
        >
          <motion.span
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="inline-block px-4 py-2 rounded-full bg-secondary/20 border border-secondary/30 text-secondary-foreground text-sm font-medium mb-6"
          >
            Testimonials
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Trusted by{" "}
            <span className="text-gradient-accent">Industry Leaders</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how businesses worldwide are achieving exceptional results with Xshootsms.
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                initial={{ opacity: 0, x: direction * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -60 }}
                transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                className="glass-card p-6 md:p-12"
                style={{ willChange: "transform, opacity" }}
              >
                {/* Quote Icon */}
                <div className="absolute top-8 right-8 opacity-10">
                  <Quote className="w-24 h-24 text-cyan" />
                </div>

                {/* Metric Badge */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.15, duration: 0.4, ease: EASE_OUT_EXPO }}
                  className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-orange/20 to-cyan/20 border border-orange/30 text-foreground text-sm font-medium mb-8"
                >
                  {testimonials[currentIndex].metric}
                </motion.div>

                {/* Quote */}
                <blockquote className="text-xl md:text-2xl text-foreground font-medium leading-relaxed mb-8 relative z-10">
                  "{testimonials[currentIndex].quote}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan to-orange flex items-center justify-center text-background font-bold text-lg">
                    {testimonials[currentIndex].author[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">
                      {testimonials[currentIndex].author}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <motion.button
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.92 }}
                transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
                onClick={() => go(-1)}
                className="w-12 h-12 rounded-full bg-muted/30 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDirection(i > currentIndex ? 1 : -1);
                      setCurrentIndex(i);
                    }}
                    aria-label={`View testimonial ${i + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 min-h-[8px] ${i === currentIndex
                        ? "w-8 bg-gradient-to-r from-orange to-cyan"
                        : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                      }`}
                  />
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.92 }}
                transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
                onClick={() => go(1)}
                className="w-12 h-12 rounded-full bg-muted/30 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
