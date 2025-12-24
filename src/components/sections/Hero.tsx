import { motion } from "framer-motion";
import { ArrowRight, MessageSquare, Phone, Mail, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const FloatingIcon = ({ 
  icon: Icon, 
  className, 
  delay = 0 
}: { 
  icon: any; 
  className: string; 
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: delay + 0.5, duration: 0.5, type: "spring" }}
    className={`absolute ${className}`}
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

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-cyan/10 blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-orange/10 blur-[100px]"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-secondary/20 blur-[150px]"
        />

        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                             linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Floating Message Icons */}
      <FloatingIcon icon={MessageSquare} className="top-32 left-[10%] md:left-[15%]" delay={0} />
      <FloatingIcon icon={Phone} className="top-40 right-[10%] md:right-[15%]" delay={0.3} />
      <FloatingIcon icon={Mail} className="bottom-40 left-[15%] md:left-[20%]" delay={0.6} />
      <FloatingIcon icon={Zap} className="bottom-32 right-[15%] md:right-[20%]" delay={0.9} />

      {/* Content */}
      <div className="container-custom relative z-10 px-4 md:px-8 text-center">
        {/* Tagline Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border/50 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
          <span className="text-sm text-muted-foreground">Technology for Innovators</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight"
        >
          Enterprise Messaging That{" "}
          <span className="relative">
            <span className="text-gradient-accent">Scales</span>
            <motion.svg
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 1 }}
              className="absolute -bottom-2 left-0 w-full"
              viewBox="0 0 200 10"
              fill="none"
            >
              <path
                d="M0 8C50 0 150 0 200 8"
                stroke="url(#underline-gradient)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="underline-gradient" x1="0" y1="0" x2="200" y2="0">
                  <stop stopColor="hsl(var(--orange))" />
                  <stop offset="1" stopColor="hsl(var(--cyan))" />
                </linearGradient>
              </defs>
            </motion.svg>
          </span>
          <br />
          With Your Business
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10"
        >
          Bulk SMS, RCS, WhatsApp Business & Voice APIs built for{" "}
          <span className="text-foreground font-medium">speed</span>,{" "}
          <span className="text-foreground font-medium">reliability</span>, and{" "}
          <span className="text-foreground font-medium">growth</span>.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button className="btn-primary text-base px-8 py-6 gap-2 group">
              Get Started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button className="btn-secondary text-base px-8 py-6">
              Talk to an Expert
            </Button>
          </motion.div>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 md:mt-24 relative"
        >
          <div className="relative mx-auto max-w-5xl">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-cyan/20 via-transparent to-transparent blur-3xl opacity-50" />
            
            {/* Dashboard Mock */}
            <div className="glass-card p-1 md:p-2 rounded-2xl">
              <div className="rounded-xl bg-navy-deep/80 p-4 md:p-6 overflow-hidden">
                {/* Dashboard Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-destructive" />
                    <div className="w-3 h-3 rounded-full bg-orange" />
                    <div className="w-3 h-3 rounded-full bg-cyan" />
                  </div>
                  <div className="text-xs text-muted-foreground">Xshootsms Dashboard</div>
                </div>
                
                {/* Dashboard Content */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    { label: "Messages Sent", value: "2.4M", change: "+12.5%" },
                    { label: "Delivery Rate", value: "99.8%", change: "+0.3%" },
                    { label: "Active Campaigns", value: "127", change: "+8" },
                  ].map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2 + i * 0.1 }}
                      className="bg-muted/20 rounded-lg p-4"
                    >
                      <div className="text-xs text-muted-foreground mb-1">{stat.label}</div>
                      <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                      <div className="text-xs text-cyan">{stat.change}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Chart Placeholder */}
                <div className="h-32 md:h-48 bg-muted/10 rounded-lg flex items-end justify-around p-4 gap-2">
                  {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((height, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ duration: 0.8, delay: 1.4 + i * 0.05 }}
                      className="flex-1 bg-gradient-to-t from-cyan to-cyan/50 rounded-t"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-cyan"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};
