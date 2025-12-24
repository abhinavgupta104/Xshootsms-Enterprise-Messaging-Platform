import { motion } from "framer-motion";
import { 
  Twitter, 
  Linkedin, 
  Facebook, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin,
  Shield,
  Lock,
  Award
} from "lucide-react";

const footerLinks = {
  platform: [
    { name: "Bulk SMS", href: "#" },
    { name: "RCS Messaging", href: "#" },
    { name: "WhatsApp Business", href: "#" },
    { name: "Voice APIs", href: "#" },
    { name: "API Documentation", href: "#" },
  ],
  solutions: [
    { name: "Marketing Campaigns", href: "#" },
    { name: "OTP & Authentication", href: "#" },
    { name: "Customer Support", href: "#" },
    { name: "Alerts & Notifications", href: "#" },
  ],
  company: [
    { name: "About Us", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Press", href: "#" },
    { name: "Contact", href: "#" },
  ],
  legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Cookie Policy", href: "#" },
    { name: "GDPR", href: "#" },
  ],
};

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

export const Footer = () => {
  return (
    <footer className="relative overflow-hidden">
      {/* Animated gradient divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan/50 to-transparent" />
      
      <div className="container-custom section-padding">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <motion.a
              href="#"
              className="flex items-center gap-2 mb-6 group"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-orange to-cyan flex items-center justify-center">
                <span className="text-background font-bold text-lg">X</span>
              </div>
              <span className="text-xl font-bold text-foreground">
                Xshoot<span className="text-gradient-accent">sms</span>
              </span>
            </motion.a>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Enterprise-grade messaging platform for businesses that demand speed, reliability, and scale.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Platform</h4>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Solutions</h4>
            <ul className="space-y-3">
              {footerLinks.solutions.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Compliance Badges */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/30 border border-border/50">
            <Shield className="w-5 h-5 text-cyan" />
            <span className="text-sm text-muted-foreground">SOC 2 Certified</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/30 border border-border/50">
            <Lock className="w-5 h-5 text-cyan" />
            <span className="text-sm text-muted-foreground">GDPR Compliant</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/30 border border-border/50">
            <Award className="w-5 h-5 text-cyan" />
            <span className="text-sm text-muted-foreground">ISO 27001</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Xshootsms. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm">
            Technology for Innovators
          </p>
        </div>
      </div>
    </footer>
  );
};
