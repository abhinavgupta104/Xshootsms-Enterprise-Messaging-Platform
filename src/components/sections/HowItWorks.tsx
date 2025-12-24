import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link2, PenTool, Send, BarChart3, Sparkles } from "lucide-react";

const steps = [
  {
    icon: Link2,
    title: "Connect",
    description: "Integrate with our APIs in minutes using SDKs for every major programming language.",
  },
  {
    icon: PenTool,
    title: "Create",
    description: "Build personalized message templates with dynamic variables and rich media content.",
  },
  {
    icon: Send,
    title: "Send",
    description: "Launch campaigns across SMS, RCS, WhatsApp, and Voice with a single API call.",
  },
  {
    icon: BarChart3,
    title: "Track",
    description: "Monitor delivery, engagement, and conversions in real-time with detailed analytics.",
  },
  {
    icon: Sparkles,
    title: "Optimize",
    description: "Use AI-powered insights to improve message timing, content, and channel selection.",
  },
];

export const HowItWorks = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section className="section-padding relative overflow-hidden" ref={containerRef}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan/5 to-transparent" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full bg-orange/10 border border-orange/20 text-orange text-sm font-medium mb-6"
          >
            How It Works
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            From Integration to{" "}
            <span className="text-gradient-accent">Optimization</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get started in minutes with our streamlined workflow designed for developers and marketers alike.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-border">
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-cyan via-orange to-cyan"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Steps */}
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative flex items-center gap-8 mb-16 last:mb-0 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Icon Node */}
              <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan to-orange p-0.5"
                >
                  <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center">
                    <step.icon className="w-7 h-7 text-foreground" />
                  </div>
                </motion.div>
              </div>

              {/* Content Card */}
              <div className={`flex-1 pl-24 md:pl-0 ${index % 2 === 0 ? "md:pr-16" : "md:pl-16"}`}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="glass-card p-6 md:p-8"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-semibold text-cyan bg-cyan/10 px-3 py-1 rounded-full">
                      Step {index + 1}
                    </span>
                    <h3 className="text-xl font-semibold text-foreground">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground">{step.description}</p>
                </motion.div>
              </div>

              {/* Empty space for alignment */}
              <div className="hidden md:block flex-1" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
