import { motion } from "framer-motion";
import { Building2, Globe2, TrendingUp } from "lucide-react";

const Company = () => {
  return (
    <section id="company" className="section-padding bg-muted/40">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          {/* ✅ Bigger + Bold */}
          <span className="badge text-xl md:text-2xl font-extrabold">
            About Xshootsms
          </span>

          <h4 className="heading-lg mt-4">
            Empowering Your Business with Digital Excellence
          </h4>

          <p className="text-muted-foreground mt-6 leading-relaxed">
            Xshootsms is an enterprise-grade communication platform built to help businesses connect with their customers at scale—reliably, securely, and in real time.
            <br /><br />
            We empower startups, growing businesses, and large enterprises with powerful messaging capabilities across SMS, WhatsApp, RCS, and Voice, all through a single, unified platform. Our infrastructure is designed for high throughput, low latency, and mission-critical delivery, ensuring your messages reach the right audience at the right moment.
            <br /><br />
            At Xshootsms, we believe communication should be fast, intelligent, and measurable. That’s why our platform combines global routing, real-time analytics, advanced security, and developer-friendly APIs to support everything from transactional alerts to large-scale marketing campaigns.
            <br /><br />
            We are built for teams that demand performance, transparency, and control—whether it’s delivering OTPs, running customer engagement campaigns, or powering product notifications worldwide.
            <br /><br />
            <strong>Our mission is simple:</strong><br />
            To make enterprise communication reliable, scalable, and effortless for modern businesses.
          </p>

          <p className="text-muted-foreground mt-4 leading-relaxed">
            We have successfully served international clients across{" "}
            <strong>India, Canada, Europe, and the Middle East</strong>, combining
            proven technical expertise with deep business insight to deliver
            measurable ROI and long-term competitive advantage.
          </p>
        </motion.div>

        {/* Highlights */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card p-8 text-center"
          >
            <Building2 className="w-10 h-10 mx-auto text-green-500 mb-4" />
            <h3 className="text-lg font-semibold">Enterprise-Grade Delivery</h3>
            <p className="text-muted-foreground mt-2">
              Operating from a state-of-the-art development center in Delhi NCR & Bangalore,
              India, supported by strategic alliances with leading IT solution providers.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-card p-8 text-center"
          >
            <Globe2 className="w-10 h-10 mx-auto text-green-500 mb-4" />
            <h3 className="text-lg font-semibold">Global Reach</h3>
            <p className="text-muted-foreground mt-2">
              Trusted offshore development and outsourcing partner for leading
              global software and web companies across multiple regions.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="glass-card p-8 text-center"
          >
            <TrendingUp className="w-10 h-10 mx-auto text-green-500 mb-4" />
            <h3 className="text-lg font-semibold">Sustained Growth</h3>
            <p className="text-muted-foreground mt-2">
              Averaging over <strong>100% annual growth</strong> in revenue,
              profitability, client base, and team strength over recent years.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Company;
