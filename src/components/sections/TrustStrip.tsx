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
  "TechCorp", "Finova", "HealthPlus", "EduSmart", 
  "LogiFlow", "RetailMax", "CloudNine", "DataPrime",
  "SecureNet", "GrowthLab", "PayEase", "MediaHub"
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
      <div className="relative">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
        
        <div className="flex overflow-hidden">
          <motion.div
            animate={{ x: [0, -50 * clientLogos.length] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex gap-12 items-center"
          >
            {[...clientLogos, ...clientLogos].map((logo, index) => (
              <div
                key={`${logo}-${index}`}
                className="flex-shrink-0 px-6 py-3 rounded-lg bg-muted/20 border border-border/30"
              >
                <span className="text-muted-foreground font-medium whitespace-nowrap">
                  {logo}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
