import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Shield,
  Lock,
  Award,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import logoUrl from "../../assets/xshootsms-logo.png";

/* ---------------- TYPES ---------------- */

type LegalType = "privacy" | "terms" | "cookies" | "gdpr";

type FooterProps = {
  onOpenLegal: (type: LegalType) => void;
};

/* ---------------- DATA ---------------- */

const footerLinks = {
  platform: [
    { name: "Bulk SMS", href: "/#platform" },
    { name: "RCS Messaging", href: "/#platform" },
    { name: "WhatsApp Business", href: "/#platform" },
    { name: "Voice APIs", href: "/#platform" },
    { name: "API Documentation", href: "/#platform" },
  ],
  solutions: [
    { name: "Marketing Campaigns", href: "/?tab=marketing#solutions" },
    { name: "OTP & Authentication", href: "/?tab=otp#solutions" },
    { name: "Customer Support", href: "/?tab=support#solutions" },
    { name: "Alerts & Notifications", href: "/?tab=alerts#solutions" },
  ],
  company: [
    { name: "About Us", href: "/#company" },
    { name: "Careers", href: "/#company" },
    { name: "Blog", href: "/blog" },
    { name: "Press", href: "/#company" },
    { name: "Contact", href: "/#contact" },
  ],
};

const socialLinks = [
  {
    icon: Instagram,
    href: "https://www.instagram.com/xshootsms_/",
    label: "Instagram",
  },
  {
    icon: Facebook,
    href: "https://www.facebook.com/shootbulksms",
    label: "Facebook",
  },
];

/* ---------------- COMPONENT ---------------- */

export const Footer = ({ onOpenLegal }: FooterProps) => {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-background to-muted/20">
      {/* Top Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan/50 to-transparent" />

      <div className="container-custom section-padding">
        {/* MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand Section - Takes 3 columns on large screens */}
          <div className="lg:col-span-3">
            <motion.a
              href="/"
              className="flex items-center gap-2 mb-6"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative w-10 h-10 rounded-xl flex items-center justify-center">
                <img
                  src={logoUrl}
                  alt="Xshootsms Enterprise Messaging Platform Logo"
                  className="w-full h-full object-contain"
                  width="40"
                  height="40"
                  loading="lazy"
                />
              </div>

              <span className="text-xl font-bold text-foreground">
                Xshoot<span className="text-gradient-accent">sms</span>
              </span>
            </motion.a>

            <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
              Enterprise-grade messaging platform for businesses that demand
              speed, reliability, and scale.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-cyan hover:bg-cyan/10 border border-transparent hover:border-cyan/20 transition-all"
                  whileHover={{ scale: 1.1, y: -2 }}
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Platform - 2 columns */}
          <div className="lg:col-span-2">
            <h3 className="font-bold text-foreground mb-4 text-sm uppercase tracking-wider">
              Platform
            </h3>
            <ul className="space-y-3">
              {footerLinks.platform.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-muted-foreground hover:text-cyan text-sm transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{item.name}</span>
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions - 2 columns */}
          <div className="lg:col-span-2">
            <h3 className="font-bold text-foreground mb-4 text-sm uppercase tracking-wider">
              Solutions
            </h3>
            <ul className="space-y-3">
              {footerLinks.solutions.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-muted-foreground hover:text-cyan text-sm transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{item.name}</span>
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company - 2 columns */}
          <div className="lg:col-span-2">
            <h3 className="font-bold text-foreground mb-4 text-sm uppercase tracking-wider">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((item) => (
                <li key={item.name}>
                  {item.href.startsWith("/") ? (
                    <Link
                      to={item.href}
                      className="text-muted-foreground hover:text-cyan text-sm transition-colors inline-flex items-center gap-1 group"
                    >
                      <span>{item.name}</span>
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      className="text-muted-foreground hover:text-cyan text-sm transition-colors inline-flex items-center gap-1 group"
                    >
                      <span>{item.name}</span>
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal - 1 column */}
          <div className="lg:col-span-1">
            <h3 className="font-bold text-foreground mb-4 text-sm uppercase tracking-wider">
              Legal
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal("privacy")}
                  className="text-muted-foreground hover:text-cyan transition-colors text-left inline-flex items-center gap-1 group"
                >
                  <span>Privacy</span>
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal("terms")}
                  className="text-muted-foreground hover:text-cyan transition-colors text-left inline-flex items-center gap-1 group"
                >
                  <span>Terms</span>
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal("cookies")}
                  className="text-muted-foreground hover:text-cyan transition-colors text-left inline-flex items-center gap-1 group"
                >
                  <span>Cookies</span>
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal("gdpr")}
                  className="text-muted-foreground hover:text-cyan transition-colors text-left inline-flex items-center gap-1 group"
                >
                  <span>GDPR</span>
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Section - Full Width Card */}
        <div className="mb-12">
          <div className="glass-card p-8 rounded-2xl border border-border/50">
            <h3 className="font-bold text-foreground mb-6 text-lg flex items-center gap-2">
              <Mail className="w-5 h-5 text-cyan" />
              Get in Touch
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Office 1 */}
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-cyan mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground text-sm mb-1">
                      Nucleus Ai
                    </p>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      D-9, Vyapar Marg, Sector 3<br />
                      Noida, Uttar Pradesh 201301
                    </p>
                    <p className="text-xs mt-2">
                      <span className="text-muted-foreground">GST:</span>{" "}
                      <span className="text-foreground font-medium">09AAYFN8401A1Z4</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Office 2 */}
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-cyan mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground text-sm mb-1">
                      Zonal Office
                    </p>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      1009, Galaxy Diamond Plaza<br />
                      Haibatpur, Sector 4<br />
                      Greater Noida West, U.P. 201309
                    </p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Mail className="w-4 h-4 text-cyan mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground text-sm mb-1">
                      Email
                    </p>
                    <a
                      href="mailto:hello@xshootsms.com"
                      className="text-muted-foreground hover:text-cyan text-xs transition-colors"
                    >
                      hello@xshootsms.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Phone className="w-4 h-4 text-cyan mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground text-sm mb-1">
                      Phone
                    </p>
                    <a
                      href="tel:+919739175550"
                      className="text-muted-foreground hover:text-cyan text-xs transition-colors"
                    >
                      +91 97391 75550
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Compliance Badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <motion.div
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/30 border border-border/50 hover:border-cyan/30 transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            <Shield className="w-5 h-5 text-cyan" />
            <span className="text-sm font-medium">SOC 2 Certified</span>
          </motion.div>
          <motion.div
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/30 border border-border/50 hover:border-cyan/30 transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            <Lock className="w-5 h-5 text-cyan" />
            <span className="text-sm font-medium">GDPR Compliant</span>
          </motion.div>
          <motion.div
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/30 border border-border/50 hover:border-cyan/30 transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            <Award className="w-5 h-5 text-cyan" />
            <span className="text-sm font-medium">ISO 27001</span>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <span>© {new Date().getFullYear()} Xshootsms. All rights reserved.</span>
          <motion.div
            className="flex items-center gap-1.5 text-muted-foreground/80 group"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span>developed by</span>
            <motion.span
              className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan via-purple-500 to-cyan bg-[length:200%_auto] cursor-default"
              animate={{
                backgroundPosition: ["0% center", "200% center"],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
              whileHover={{ scale: 1.05 }}
            >
              NucleusAi
            </motion.span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};
