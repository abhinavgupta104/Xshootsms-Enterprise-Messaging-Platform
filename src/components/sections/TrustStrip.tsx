import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  { value: 99.9, suffix: "%", label: "Uptime Guarantee" },
  { value: 50, suffix: "M+", label: "Messages Daily" },
  { value: 500, suffix: "+", label: "Enterprise Clients" },
  { value: 150, suffix: "+", label: "Countries Covered" },
];

const clientLogos = [
  { icon: "🏦", label: "Banking & Finance" },
  { icon: "🛒", label: "E-Commerce" },
  { icon: "🏥", label: "Healthcare" },
  { icon: "🎓", label: "EdTech" },
  { icon: "🚚", label: "Logistics" },
  { icon: "🏨", label: "Hospitality" },
  { icon: "📱", label: "Telecom" },
  { icon: "🏗️", label: "Real Estate" },
  { icon: "💳", label: "FinTech" },
  { icon: "🛡️", label: "Insurance" },
  { icon: "🍔", label: "Food & Delivery" },
  { icon: "✈️", label: "Travel & Tourism" },
];

const AnimatedCounter = ({ value, suffix, duration = 2 }: { value: number; suffix: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const stepTime = (duration * 1000) / end;

      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start >= end) {
          clearInterval(timer);
          setCount(end);
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="text-3xl md:text-4xl font-bold text-foreground">
      {count}{suffix}
    </span>
  );
};

export const TrustStrip = () => {
  return (
    <section className="relative py-16 overflow-hidden">
      {/* Stats */}
      <div className="container-custom px-4 md:px-8 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-12" />

      {/* Trusted By */}
      <div className="text-center mb-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sm text-muted-foreground uppercase tracking-widest"
        >
          Trusted by industry leaders
        </motion.p>
      </div>

      {/* Logo Marquee */}
      {/* Logo Marquee */}
      <div className="relative w-full overflow-hidden mask-linear-gradient">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex w-max">
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="flex gap-16 items-center pr-16"
          >
            {/* Repeat list 4x to ensure smooth loop */}
            {[...clientLogos, ...clientLogos, ...clientLogos, ...clientLogos].map((industry, index) => (
              <div
                key={`${industry.label}-${index}`}
                className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity duration-300 cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-white/5 to-white/10 group-hover:from-cyan/20 group-hover:to-blue-500/20 flex items-center justify-center border border-white/5 group-hover:border-cyan/30 transition-all text-xl">
                  {industry.icon}
                </div>
                <span className="text-sm font-semibold text-muted-foreground group-hover:text-foreground tracking-wide transition-colors whitespace-nowrap">
                  {industry.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
