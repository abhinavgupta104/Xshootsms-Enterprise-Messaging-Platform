import { motion } from "framer-motion";
import {
  Building2,
  Globe2,
  TrendingUp,
  ShieldCheck,
  Zap,
  BarChart,
  Bot,
  Code2,
  MessageSquare,
  CheckCircle2,
  Server
} from "lucide-react";
import { NetworkVisualization } from "../visualizations/NetworkVisualization";

const features = [
  {
    icon: ShieldCheck,
    title: "Enterprise Security",
    desc: "DLT compliant with bank-grade encryption & data privacy.",
    className: "lg:col-span-2 bg-gradient-to-br from-navy-deep to-cyan/5"
  },
  {
    icon: Zap,
    title: "High Throughput",
    desc: "Process millions of messages with sub-second latency.",
    className: "lg:col-span-1 bg-gradient-to-br from-navy-deep to-orange/5"
  },
  {
    icon: Globe2,
    title: "Global Routing",
    desc: "Direct carrier connections across 190+ countries.",
    className: "lg:col-span-1 bg-gradient-to-br from-navy-deep to-purple-500/5"
  },
  {
    icon: BarChart,
    title: "Real-Time Analytics",
    desc: "Live delivery reports & granular campaign insights.",
    className: "lg:col-span-2 bg-gradient-to-br from-navy-deep to-green-500/5"
  }
];

const PerformanceTicker = () => (
  <div className="w-full bg-muted/20 border-y border-white/5 overflow-hidden py-3 mb-16 relative">
    <div className="flex animate-marquee whitespace-nowrap gap-16 items-center">
      {/* Duplicate content for seamless loop */}
      {[...Array(2)].map((_, i) => (
        <div key={i} className="flex gap-16 items-center opacity-70">
          <span className="flex items-center gap-2 text-sm font-mono"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> 99.99% Uptime</span>
          <span className="flex items-center gap-2 text-sm font-mono"><div className="w-2 h-2 rounded-full bg-cyan animate-pulse" /> 12ms Latency</span>
          <span className="flex items-center gap-2 text-sm font-mono"><div className="w-2 h-2 rounded-full bg-orange animate-pulse" /> 2.5B+ Messages Sent</span>
          <span className="flex items-center gap-2 text-sm font-mono"><div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" /> 10k+ Active Businesses</span>

          <span className="flex items-center gap-2 text-sm font-mono"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> 99.99% Uptime</span>
          <span className="flex items-center gap-2 text-sm font-mono"><div className="w-2 h-2 rounded-full bg-cyan animate-pulse" /> 12ms Latency</span>
          <span className="flex items-center gap-2 text-sm font-mono"><div className="w-2 h-2 rounded-full bg-orange animate-pulse" /> 2.5B+ Messages Sent</span>
          <span className="flex items-center gap-2 text-sm font-mono"><div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" /> 10k+ Active Businesses</span>
        </div>
      ))}
    </div>
  </div>
);

const Company = () => {
  return (
    <section id="company" className="section-padding bg-muted/40 overflow-hidden pt-0">
      <PerformanceTicker />

      <div className="container-custom">
        {/* Main Content Split */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">

          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-left"
          >
            <span className="badge text-xl md:text-2xl font-extrabold mb-6 block w-fit">
              About Xshootsms
            </span>

            <h2 className="heading-lg mt-4">
              XShootSMS – Cloud Communication &amp; <br />
              <span className="text-gradient-accent">Marketing Automation Platform</span>
            </h2>

            <p className="text-xl font-medium text-foreground/80 mt-6">
              India's leading Bulk SMS provider — WhatsApp Business API &amp; Performance Marketing at Scale
            </p>

            <p className="text-muted-foreground mt-6 leading-relaxed text-lg">
              XShootSMS is a leading business communication gateway in India, delivering high-performance Bulk SMS, WhatsApp Business API, RCS Messaging, Voice Calls, Chatbot Development, API Integration, and Marketing Automation across 190+ countries.
              <br /><br />
              We power startups, SMEs, enterprises, and marketing agencies with instant, secure, and conversion-focused mobile engagement — from OTP delivery to large-scale promotional campaigns.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {["Bulk SMS", "WhatsApp API", "RCS", "Voice", "Chatbots", "Marketing"].map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full bg-cyan/10 text-cyan text-sm font-semibold border border-cyan/20">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right: Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <NetworkVisualization />
          </motion.div>
        </div>

        {/* Why Choose Us - Bento Grid */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="heading-md mb-4">Why Businesses Trust <span className="text-gradient-accent">XShootSMS</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built for teams that demand performance, transparency, and control.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`glass-card p-8 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300 ${feature.className}`}
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <feature.icon className="w-24 h-24" />
                </div>

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-lg bg-background/50 backdrop-blur flex items-center justify-center mb-6 border border-white/10 shadow-inner">
                    <feature.icon className="w-6 h-6 text-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mission Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-gradient-to-r from-cyan/10 via-background to-orange/10 border border-white/5 p-8 md:p-12 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold mb-6">Built for Scale, Speed & ROI</h3>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Whether you're launching bulk promotional campaigns, automating customer journeys, or scaling enterprise notification workflows — XShootSMS provides the cloud infrastructure, automation, and intelligence your business needs to drive ROI.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
              {[
                "Fast OTP Delivery",
                "High Conversion Rates",
                "Secure Gateway",
                "Transparent Analytics"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="font-medium text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Company;
