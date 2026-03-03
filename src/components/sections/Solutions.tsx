import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Megaphone,
  Shield,
  Headphones,
  Bell,
  TrendingUp,
  CheckCircle,
  ArrowUpRight,
} from "lucide-react";
import {
  fadeUp,
  scaleIn,
  staggerContainerFast,
  viewport,
  smoothTransition,
  EASE_OUT_EXPO,
} from "@/lib/animations";

const solutions = [
  {
    id: "marketing",
    icon: Megaphone,
    title: "Marketing Campaigns",
    description: "Drive engagement with personalized promotional campaigns across all channels.",
    features: [
      "A/B testing for message optimization",
      "Scheduled campaign delivery",
      "Rich media support",
      "Conversion tracking",
    ],
    metrics: { sent: "2.5M", delivered: "99.2%", engagement: "34%" },
  },
  {
    id: "otp",
    icon: Shield,
    title: "OTP & Authentication",
    description: "Secure your applications with reliable one-time passwords and 2FA.",
    features: [
      "Sub-second delivery",
      "Multi-channel fallback",
      "Custom OTP length",
      "Rate limiting built-in",
    ],
    metrics: { sent: "5M", delivered: "99.9%", speed: "<1s" },
  },
  {
    id: "support",
    icon: Headphones,
    title: "Customer Support",
    description: "Enable two-way conversations for superior customer service experiences.",
    features: [
      "Automated responses",
      "Agent routing",
      "Conversation history",
      "Sentiment analysis",
    ],
    metrics: { resolved: "89%", satisfaction: "4.8/5", response: "<2min" },
  },
  {
    id: "alerts",
    icon: Bell,
    title: "Alerts & Notifications",
    description: "Keep customers informed with timely transactional messages and alerts.",
    features: [
      "Delivery confirmations",
      "Status updates",
      "Appointment reminders",
      "Emergency broadcasts",
    ],
    metrics: { sent: "10M+", delivered: "99.8%", opened: "95%" },
  },
];

export const Solutions = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const validIds = solutions.map((s) => s.id);
  const tabParam = searchParams.get("tab");
  const initialTab =
    tabParam && validIds.includes(tabParam) ? tabParam : solutions[0].id;
  const [activeTab, setActiveTab] = useState(initialTab);
  const activeSolution = solutions.find((s) => s.id === activeTab)!;

  useEffect(() => {
    if (searchParams.has("tab")) {
      setTimeout(() => {
        const el = document.getElementById("solutions");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
      const next = new URLSearchParams(searchParams);
      next.delete("tab");
      setSearchParams(next, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="solutions" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-orange/5 blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-secondary/10 blur-[150px]" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="text-center mb-16"
        >
          <motion.span
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="inline-block px-4 py-2 rounded-full bg-secondary/20 border border-secondary/30 text-secondary-foreground text-sm font-medium mb-6"
          >
            Solutions
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            SMS Marketing, WhatsApp Automation{" "}
            <span className="text-gradient-accent">&amp; More</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From promotional Bulk SMS campaigns to OTP authentication and business notifications — tailored for every use case.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          variants={staggerContainerFast}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {solutions.map((solution) => (
            <motion.button
              key={solution.id}
              variants={scaleIn}
              onClick={() => setActiveTab(solution.id)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={smoothTransition}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors duration-300 ${activeTab === solution.id
                  ? "bg-gradient-to-r from-orange to-cyan text-background"
                  : "bg-muted/30 text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
            >
              <solution.icon className="w-4 h-4" />
              {solution.title}
            </motion.button>
          ))}
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
            className="grid lg:grid-cols-2 gap-8 items-center"
            style={{ willChange: "transform, opacity" }}
          >
            {/* Left: Info */}
            <div className="glass-card p-8 md:p-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange to-cyan p-0.5">
                  <div className="w-full h-full rounded-xl bg-background flex items-center justify-center">
                    <activeSolution.icon className="w-7 h-7 text-foreground" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">
                    {activeSolution.title}
                  </h3>
                </div>
              </div>

              <p className="text-muted-foreground text-lg mb-8">
                {activeSolution.description}
              </p>

              <ul className="space-y-4 mb-8">
                {activeSolution.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.02 }}
                transition={smoothTransition}
                className="flex items-center gap-2 text-orange font-medium group"
              >
                Explore Solution
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.button>
            </div>

            {/* Right: Dashboard Mock */}
            <div className="glass-card p-6 md:p-8">
              <div className="rounded-xl bg-navy-deep/80 p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-foreground font-semibold uppercase text-xs tracking-wider">
                    {activeSolution.title} Analytics
                  </h3>
                  <span className="text-xs text-muted-foreground">Last 30 days</span>
                </div>

                {/* Metrics Grid */}
                <motion.div
                  variants={staggerContainerFast}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-3 gap-4 mb-6"
                >
                  {Object.entries(activeSolution.metrics).map(([key, value]) => (
                    <motion.div
                      key={key}
                      variants={scaleIn}
                      className="bg-muted/20 rounded-lg p-4 text-center"
                    >
                      <div className="text-2xl font-bold text-foreground">{value}</div>
                      <div className="text-xs text-muted-foreground capitalize">{key}</div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Chart */}
                <div className="h-40 bg-muted/10 rounded-lg p-4 relative overflow-hidden">
                  <svg className="w-full h-full" viewBox="0 0 400 120">
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--cyan))" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="hsl(var(--cyan))" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <motion.path
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: 0.2 }}
                      d="M0,100 Q50,80 100,85 T200,60 T300,70 T400,40"
                      fill="none"
                      stroke="hsl(var(--cyan))"
                      strokeWidth="2"
                    />
                    <motion.path
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 0.5 }}
                      d="M0,100 Q50,80 100,85 T200,60 T300,70 T400,40 L400,120 L0,120 Z"
                      fill="url(#chartGradient)"
                    />
                  </svg>
                  <div className="absolute top-4 right-4 flex items-center gap-2 text-cyan text-sm">
                    <TrendingUp className="w-4 h-4" />
                    +24.5%
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
