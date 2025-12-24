import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { 
  Server, 
  Shield, 
  Zap, 
  TrendingUp,
  Globe,
  Clock,
  Award,
  Lock
} from "lucide-react";

const reasons = [
  {
    icon: Server,
    title: "Enterprise Infrastructure",
    description: "Distributed globally across multiple data centers with automatic failover and redundancy.",
    stat: { value: 99.99, suffix: "%", label: "Uptime SLA" },
  },
  {
    icon: Shield,
    title: "Security & Compliance",
    description: "SOC 2, GDPR, HIPAA compliant with end-to-end encryption and data residency options.",
    stat: { value: 256, suffix: "-bit", label: "Encryption" },
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Average message delivery in under 500ms with intelligent routing and carrier optimization.",
    stat: { value: 500, suffix: "ms", label: "Avg Delivery" },
  },
  {
    icon: TrendingUp,
    title: "Infinite Scale",
    description: "From 100 to 100 million messages. Our infrastructure scales automatically with your needs.",
    stat: { value: 10, suffix: "B+", label: "Messages/Month" },
  },
];

const AnimatedStat = ({ value, suffix, label }: { value: number; suffix: string; label: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const stepValue = value / steps;
      const stepDuration = duration / steps;
      
      let current = 0;
      const timer = setInterval(() => {
        current += stepValue;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, stepDuration);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl font-bold text-gradient-accent">
        {count}{suffix}
      </div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
};

export const WhyXshootsms = () => {
  return (
    <section id="why-us" className="section-padding relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-cyan/10 blur-[150px]"
        />
        <motion.div
          animate={{ 
            scale: [1.1, 1, 1.1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-orange/10 blur-[120px]"
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full bg-cyan/10 border border-cyan/20 text-cyan text-sm font-medium mb-6"
          >
            Why Choose Us
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Built for{" "}
            <span className="text-gradient-accent">Enterprise</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            When reliability matters, businesses trust Xshootsms for their mission-critical communications.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="glass-card p-8 group"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan to-orange p-0.5">
                  <div className="w-full h-full rounded-xl bg-background flex items-center justify-center">
                    <reason.icon className="w-7 h-7 text-foreground" />
                  </div>
                </div>
                <AnimatedStat {...reason.stat} />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {reason.title}
              </h3>
              <p className="text-muted-foreground">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Badges Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4"
        >
          {[
            { icon: Globe, label: "Global Coverage" },
            { icon: Clock, label: "24/7 Support" },
            { icon: Award, label: "Award Winning" },
            { icon: Lock, label: "Bank-Grade Security" },
          ].map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-3 px-6 py-3 rounded-full bg-muted/30 border border-border/50"
            >
              <badge.icon className="w-5 h-5 text-cyan" />
              <span className="text-sm text-foreground font-medium">{badge.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
