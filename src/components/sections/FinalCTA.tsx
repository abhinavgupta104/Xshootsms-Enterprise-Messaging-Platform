import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import {
  fadeUp,
  scaleIn,
  staggerContainer,
  viewport,
} from "@/lib/animations";

export const FinalCTA = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Animated Background — GPU only */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 5, 0],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-orange/20 via-cyan/10 to-secondary/20 blur-[100px]"
          style={{ willChange: "transform, opacity" }}
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -5, 0],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-cyan/20 via-orange/10 to-secondary/15 blur-[80px]"
          style={{ willChange: "transform, opacity" }}
        />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="glass-card p-10 md:p-16 text-center"
        >
          {/* Badge */}
          <motion.div
            variants={scaleIn}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange/20 to-cyan/20 border border-orange/30 mb-8"
          >
            <Sparkles className="w-4 h-4 text-orange" />
            <span className="text-sm text-foreground font-medium">Ready to get started?</span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6"
          >
            Start Powerful Messaging{" "}
            <span className="text-gradient-accent">Today</span>
          </motion.h2>

          {/* Subtext */}
          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Join thousands of businesses already scaling their communication with
            Xshootsms. Get started in minutes with our developer-friendly APIs.
          </motion.p>

          {/* Trust indicators */}
          <motion.div
            variants={staggerContainer}
            className="flex flex-wrap items-center justify-center gap-6 mt-10 pt-10 border-t border-border/50"
          >
            {[
              "No credit card required",
              "Free trial available",
              "24/7 Support",
            ].map((item) => (
              <motion.div
                key={item}
                variants={scaleIn}
                className="flex items-center gap-2 text-muted-foreground text-sm"
              >
                <div className="w-2 h-2 rounded-full bg-cyan" />
                {item}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
