import { motion } from "framer-motion";
import { BarChart3, PieChart, Activity, Users, Send, CheckCircle } from "lucide-react";

export const ProductPreview = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan/5 via-transparent to-orange/5" />

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
            Product Preview
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Powerful Dashboard,{" "}
            <span className="text-gradient-accent">Real Insights</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Monitor, analyze, and optimize your messaging campaigns with our intuitive dashboard.
          </p>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-2 rounded-2xl"
        >
          <div className="rounded-xl bg-navy-deep/90 p-6 overflow-hidden">
            {/* Dashboard Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive" />
                  <div className="w-3 h-3 rounded-full bg-orange" />
                  <div className="w-3 h-3 rounded-full bg-cyan" />
                </div>
                <span className="text-sm text-muted-foreground">Campaign Analytics</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-muted-foreground px-3 py-1 rounded-full bg-muted/20">Live</span>
                <span className="text-xs text-muted-foreground">Last updated: Now</span>
              </div>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { icon: Send, label: "Total Sent", value: "12.4M", change: "+15.2%" },
                { icon: CheckCircle, label: "Delivered", value: "12.3M", change: "+14.8%" },
                { icon: Users, label: "Engaged", value: "4.2M", change: "+23.5%" },
                { icon: Activity, label: "Conversion", value: "18.7%", change: "+5.2%" },
              ].map((metric, i) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="bg-muted/20 rounded-xl p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <metric.icon className="w-5 h-5 text-muted-foreground" />
                    <span className="text-xs text-cyan">{metric.change}</span>
                  </div>
                  <div className="text-2xl font-bold text-foreground">{metric.value}</div>
                  <div className="text-xs text-muted-foreground">{metric.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Charts Row */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Main Chart */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="md:col-span-2 bg-muted/10 rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-foreground font-medium">Message Volume</h4>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-cyan" />
                      SMS
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-orange" />
                      WhatsApp
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-secondary" />
                      RCS
                    </span>
                  </div>
                </div>
                <div className="h-48 flex items-end justify-between gap-2">
                  {[65, 78, 52, 90, 68, 85, 72, 95, 80, 88, 75, 92].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col gap-1">
                      <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h * 0.4}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + i * 0.03 }}
                        className="bg-secondary/60 rounded-t"
                      />
                      <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h * 0.3}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.55 + i * 0.03 }}
                        className="bg-orange/70 rounded"
                      />
                      <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h * 0.3}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 + i * 0.03 }}
                        className="bg-cyan/80 rounded-b"
                      />
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Pie Chart */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="bg-muted/10 rounded-xl p-6"
              >
                <h4 className="text-foreground font-medium mb-4">Channel Distribution</h4>
                <div className="relative w-32 h-32 mx-auto">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    <motion.circle
                      initial={{ strokeDashoffset: 283 }}
                      whileInView={{ strokeDashoffset: 113 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6, duration: 1 }}
                      cx="50" cy="50" r="45"
                      fill="none"
                      stroke="hsl(var(--cyan))"
                      strokeWidth="10"
                      strokeDasharray="283"
                    />
                    <motion.circle
                      initial={{ strokeDashoffset: 283 }}
                      whileInView={{ strokeDashoffset: 198 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.7, duration: 1 }}
                      cx="50" cy="50" r="45"
                      fill="none"
                      stroke="hsl(var(--orange))"
                      strokeWidth="10"
                      strokeDasharray="283"
                      strokeDashoffset="113"
                    />
                    <motion.circle
                      initial={{ strokeDashoffset: 283 }}
                      whileInView={{ strokeDashoffset: 254 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8, duration: 1 }}
                      cx="50" cy="50" r="45"
                      fill="none"
                      stroke="hsl(var(--secondary))"
                      strokeWidth="10"
                      strokeDasharray="283"
                      strokeDashoffset="198"
                    />
                  </svg>
                </div>
                <div className="space-y-2 mt-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan" />
                      SMS
                    </span>
                    <span className="text-muted-foreground">60%</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-orange" />
                      WhatsApp
                    </span>
                    <span className="text-muted-foreground">30%</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-secondary" />
                      RCS
                    </span>
                    <span className="text-muted-foreground">10%</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
