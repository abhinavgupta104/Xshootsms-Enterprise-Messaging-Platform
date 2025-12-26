import { motion } from "framer-motion";
import { ArrowRight, MessageSquare, Phone, Mail, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

type HeroProps = {
  onOpenOptIn: () => void;
  onOpenContact: () => void;
};

const FloatingIcon = ({
  icon: Icon,
  className,
  delay = 0,
}: {
  icon: any;
  className: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: delay + 0.5, duration: 0.5, type: "spring" }}
    className={`absolute ${className} pointer-events-none`}
  >
    <motion.div
      animate={{ y: [0, -15, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
      className="glass-card p-3 md:p-4"
    >
      <Icon className="w-5 h-5 md:w-6 md:h-6 text-cyan" />
    </motion.div>
  </motion.div>
);

export const Hero = ({ onOpenOptIn, onOpenContact }: HeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Floating Icons */}
      <FloatingIcon icon={MessageSquare} className="top-32 left-[15%]" />
      <FloatingIcon icon={Phone} className="top-40 right-[15%]" delay={0.3} />
      <FloatingIcon icon={Mail} className="bottom-40 left-[20%]" delay={0.6} />
      <FloatingIcon icon={Zap} className="bottom-32 right-[20%]" delay={0.9} />

      {/* Content */}
      <div className="container-custom relative z-10 px-4 md:px-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
        >
          Enterprise Messaging That{" "}
          <span className="text-gradient-accent">Scales</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10"
        >
          Bulk SMS, RCS, WhatsApp Business & Voice APIs built for speed,
          reliability, and growth.
        </motion.p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            className="btn-primary px-8 py-6 gap-2"
            onClick={onOpenOptIn}
          >
           Get Started
            <ArrowRight className="w-4 h-4" />
          </Button>

          <Button
            className="btn-secondary px-8 py-6"
            onClick={onOpenContact}
          >
            Talk to an Expert
          </Button>
        </div>
      </div>
    </section>
  );
};

