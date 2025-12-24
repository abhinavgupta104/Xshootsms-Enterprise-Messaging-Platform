import { motion } from "framer-motion";
import { 
  MessageSquare, 
  Phone, 
  Smartphone, 
  MessageCircle, 
  Code, 
  Zap,
  ArrowRight
} from "lucide-react";

const features = [
  {
    icon: MessageSquare,
    title: "Bulk SMS",
    description: "Send millions of SMS messages globally with carrier-grade delivery and real-time analytics.",
    gradient: "from-orange to-orange-glow",
  },
  {
    icon: Phone,
    title: "Voice Call APIs",
    description: "Programmable voice solutions for IVR, call tracking, and automated voice messaging.",
    gradient: "from-cyan to-cyan-glow",
  },
  {
    icon: Smartphone,
    title: "RCS Messaging",
    description: "Rich, interactive messaging with images, carousels, and actionable buttons.",
    gradient: "from-secondary to-purple-dark",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Business",
    description: "Official WhatsApp Business API for conversational commerce and customer support.",
    gradient: "from-cyan to-electric-blue",
  },
  {
    icon: Code,
    title: "APIs & Integrations",
    description: "RESTful APIs with SDKs for every major language. Connect in minutes.",
    gradient: "from-orange to-cyan",
  },
  {
    icon: Zap,
    title: "Smart Automation",
    description: "AI-powered message routing, scheduling, and intelligent delivery optimization.",
    gradient: "from-electric-blue to-secondary",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export const PlatformOverview = () => {
  return (
    <section id="platform" className="section-padding relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-cyan/5 blur-[150px]" />

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
            Platform
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Complete Messaging{" "}
            <span className="text-gradient-accent">Infrastructure</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to communicate with your customers at scale, through their preferred channels.
          </p>
        </motion.div>

        {/* Feature Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group"
            >
              <div className="glass-card h-full p-6 md:p-8 transition-all duration-300 hover:border-cyan/30">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} p-0.5 mb-6`}>
                  <div className="w-full h-full rounded-xl bg-background/90 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-foreground" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {feature.description}
                </p>

                {/* Learn More Link */}
                <div className="flex items-center text-cyan text-sm font-medium group-hover:gap-2 transition-all">
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
