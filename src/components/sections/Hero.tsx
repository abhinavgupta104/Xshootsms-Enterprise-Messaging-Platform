import { motion } from "framer-motion";
import { ArrowRight, MessageSquare, Zap, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  fadeUp,
  scaleIn,
  staggerContainer,
  viewport,
  EASE_OUT_EXPO,
} from "@/lib/animations";

type HeroProps = {
  onOpenOptIn: () => void;
  onOpenContact: () => void;
};

const FloatingIcon = ({
  icon: Icon,
  className,
  delay = 0,
}: {
  icon: React.ElementType;
  className: string;
  delay?: number;
}) => (
  <motion.div
    variants={scaleIn}
    initial="hidden"
    animate="visible"
    transition={{ delay: delay + 0.5, duration: 0.5, ease: EASE_OUT_EXPO }}
    className={`absolute ${className} pointer-events-none`}
  >
    <motion.div
      animate={{ y: [0, -15, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
      className="glass-card p-3 md:p-4"
      style={{ willChange: "transform" }}
    >
      <Icon className="w-5 h-5 md:w-6 md:h-6 text-cyan" />
    </motion.div>
  </motion.div>
);

export const Hero = ({ onOpenOptIn, onOpenContact }: HeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 md:pt-40">
      {/* Dynamic Background - Light Theme */}
      <div className="absolute inset-0 -z-10 bg-background">
        <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:50px_50px]" />
        <div className="absolute inset-0 bg-gradient-radial from-cyan-500/5 via-transparent to-transparent" />

        {/* Animated Orbs — GPU-composited (transform + opacity only) */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-200/40 rounded-full blur-[100px]"
          style={{ willChange: "transform, opacity" }}
        />
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-200/40 rounded-full blur-[100px]"
          style={{ willChange: "transform, opacity" }}
        />
      </div>

      {/* Floating Icons */}
      <FloatingIcon icon={MessageSquare} className="top-32 left-[15%] hidden md:block" />
      <FloatingIcon icon={Zap} className="bottom-32 right-[20%] hidden md:block" delay={0.9} />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="container-custom relative z-10 px-4 md:px-8 text-center"
      >
        {/* Badge */}
        <motion.div
          variants={scaleIn}
          className="inline-block mb-6 px-4 py-1.5 rounded-full bg-cyan-50 border border-cyan-100 backdrop-blur-sm"
        >
          <span className="text-sm font-medium text-cyan-700">
            🚀 #1 Bulk SMS &amp; WhatsApp API Provider in India
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight text-slate-900"
        >
          Powering Enterprise <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">
            Messaging at Scale
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={fadeUp}
          className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          India's most trusted Bulk SMS gateway, WhatsApp Business API, RCS &amp; programmable Voice solutions.
          Deliver OTPs, campaigns, and transactional alerts at scale with a secure, high-throughput cloud platform.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Button
            className="btn-primary h-14 px-8 text-lg gap-2 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all"
            onClick={onOpenOptIn}
          >
            Get Started Free
            <ArrowRight className="w-5 h-5" />
          </Button>

          <Button
            variant="outline"
            className="h-14 px-8 text-lg border-slate-200 hover:bg-slate-50 hover:text-slate-900"
            onClick={onOpenContact}
          >
            Talk to Sales
          </Button>
        </motion.div>

        {/* Trust Stats */}
        <motion.div
          variants={fadeUp}
          className="mt-16 flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-slate-500"
        >
          <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> 99.99% Uptime
          </span>
          <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200">
            <ShieldCheck className="w-4 h-4 text-slate-600" /> GDPR Compliant
          </span>
          <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200">
            <Zap className="w-4 h-4 text-yellow-500" /> Instant Delivery
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
};
