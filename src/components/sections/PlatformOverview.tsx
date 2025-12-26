import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Phone,
  Smartphone,
  MessageCircle,
  Code,
  Zap,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

const features = [
  {
    icon: MessageSquare,
    title: "Bulk SMS",
    short:
      "Send millions of SMS messages globally with carrier-grade delivery and real-time analytics.",
    details: [
      "High-throughput SMS delivery across global operators",
      "DLT-compliant transactional & promotional routes",
      "Real-time delivery reports & analytics dashboard",
      "Smart routing for optimal cost and delivery speed",
    ],
    gradient: "from-orange to-orange-glow",
  },
  {
    icon: Phone,
    title: "Voice Call APIs",
    short:
      "Programmable voice solutions for IVR, call tracking, and automated voice messaging.",
    details: [
      "IVR & call flow builder",
      "Automated outbound voice campaigns",
      "Call recording & analytics",
      "Global voice termination support",
    ],
    gradient: "from-cyan to-cyan-glow",
  },
  {
    icon: Smartphone,
    title: "RCS Messaging",
    short:
      "Rich, interactive messaging with images, carousels, and actionable buttons.",
    details: [
      "Verified business messaging",
      "Rich media, carousels & CTA buttons",
      "Read receipts & engagement tracking",
      "Branded sender experience",
    ],
    gradient: "from-secondary to-purple-dark",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Business",
    short:
      "Official WhatsApp Business API for conversational commerce and customer support.",
    details: [
      "Template & session messaging",
      "Chatbots & live agent handoff",
      "Order updates & notifications",
      "Official Meta-approved API",
    ],
    gradient: "from-cyan to-electric-blue",
  },
  {
    icon: Code,
    title: "APIs & Smart Automation",
    short:
      "Enterprise APIs with SDKs and intelligent automation for messaging workflows.",
    details: [
      "REST APIs with SDKs (Node, Python, Java, PHP)",
      "Webhook-based delivery reports",
      "Automated retries & fallback logic",
      "CRM, ERP & system integrations",
      "Chat-bot integration",
      "Salesforce integration",
    ],
    gradient: "from-orange to-cyan",
  },
  {
    icon: Zap,
    title: "Digital Marketing",
    short:
      "Promote products and services across digital channels with measurable ROI.",
    details: [
      "SEO (Search Engine Optimization) – improving website visibility on Google",
      "Social Media Marketing – promoting through platforms like Instagram, Facebook, LinkedIn",
      "Content Marketing – blogs, videos, posts to educate and attract users",
      "Performance Marketing – Google Ads, Meta Ads",
    ],
    gradient: "from-electric-blue to-secondary",
  },
];

export const PlatformOverview = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="platform" className="section-padding relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-cyan/5 blur-[150px]" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-cyan/10 border border-cyan/20 text-cyan text-sm font-medium mb-6">
            Platform
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Complete Messaging{" "}
            <span className="text-gradient-accent">Infrastructure</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to communicate with your customers at scale,
            through their preferred channels.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={feature.title}
                whileHover={{ y: -6 }}
                className="glass-card p-6 md:p-8 cursor-pointer transition-all hover:border-cyan/30"
                onClick={() =>
                  setOpenIndex(isOpen ? null : index)
                }
              >
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} p-0.5 mb-6`}
                >
                  <div className="w-full h-full rounded-xl bg-background/90 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-foreground" />
                  </div>
                </div>

                {/* Title */}
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {/* Short text */}
                <p className="text-muted-foreground mt-3">
                  {feature.short}
                </p>

                {/* Expanded content */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden mt-4 border-t border-border/50 pt-4 space-y-2 text-sm text-muted-foreground"
                    >
                      {feature.details.map((item, i) => (
                        <p key={i}>• {item}</p>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Learn more */}
                <div className="mt-4 flex items-center text-cyan text-sm font-medium">
                  <span>{isOpen ? "Show less" : "Learn more"}</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
