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
} from "lucide-react";

/* ---------------- TYPES ---------------- */

type LegalType = "privacy" | "terms" | "cookies" | "gdpr";

type FooterProps = {
  onOpenLegal: (type: LegalType) => void;
};

/* ---------------- DATA ---------------- */

const footerLinks = {
  platform: [
    "Bulk SMS",
    "RCS Messaging",
    "WhatsApp Business",
    "Voice APIs",
    "API Documentation",
  ],
  solutions: [
    "Marketing Campaigns",
    "OTP & Authentication",
    "Customer Support",
    "Alerts & Notifications",
  ],
  company: ["About Us", "Careers", "Blog", "Press", "Contact"],
};

const socialLinks = [
  {
    icon: Instagram,
    href: "https://www.instagram.com/xshootsms?igsh=MWN5dHFyNmk1M2dsZQ==",
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
    <footer className="relative overflow-hidden">
      {/* Top Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan/50 to-transparent" />

      <div className="container-custom section-padding">
        {/* MAIN GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-8 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <motion.a
              href="#"
              className="flex items-center gap-2 mb-6"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center">
                <img
                  src="/xxx.jpeg"
                  alt="Xshootsms Logo"
                  className="w-full h-full object-contain"
                />
              </div>

              <span className="text-xl font-bold text-foreground">
                Xshoot<span className="text-gradient-accent">sms</span>
              </span>
            </motion.a>

            <p className="text-muted-foreground mb-6 max-w-sm">
              Enterprise-grade messaging platform for businesses that demand
              speed, reliability, and scale.
            </p>

            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                  whileHover={{ scale: 1.1, y: -2 }}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-3">
              {footerLinks.platform.map((item) => (
                <li key={item} className="text-muted-foreground text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="font-semibold mb-4">Solutions</h4>
            <ul className="space-y-3">
              {footerLinks.solutions.map((item) => (
                <li key={item} className="text-muted-foreground text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((item) => (
                <li key={item} className="text-muted-foreground text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal — MODAL BASED (SAFE) */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal("privacy")}
                  className="text-muted-foreground hover:text-foreground transition cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal("terms")}
                  className="text-muted-foreground hover:text-foreground transition cursor-pointer"
                >
                  Terms & Conditions
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal("cookies")}
                  className="text-muted-foreground hover:text-foreground transition cursor-pointer"
                >
                  Cookie Policy
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal("gdpr")}
                  className="text-muted-foreground hover:text-foreground transition cursor-pointer"
                >
                  GDPR
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <MapPin className="w-4 h-4 text-cyan mt-1" />
                <span>
                  D-9, Vyapar Marg, Sector 3,
                  <br />
                  Noida, UP 201301, India
                </span>
              </li>

              <li className="flex gap-2">
                <Mail className="w-4 h-4 text-cyan" />
                hello@xshootsms.com
              </li>

              <li className="flex gap-2">
                <Phone className="w-4 h-4 text-cyan" />
                +91 97391 75550
              </li>
            </ul>
          </div>
        </div>

        {/* Compliance */}
        <div className="flex justify-center gap-6 mb-12">
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/30 border">
            <Shield className="w-5 h-5 text-cyan" />
            <span className="text-sm">SOC 2 Certified</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/30 border">
            <Lock className="w-5 h-5 text-cyan" />
            <span className="text-sm">GDPR Compliant</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/30 border">
            <Award className="w-5 h-5 text-cyan" />
            <span className="text-sm">ISO 27001</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <span>© {new Date().getFullYear()} Xshootsms. All rights reserved.</span>
          <span className="text-muted-foreground/80">
  Crafted  <span className="text-red-500"></span> by{" "}
  <span className="font-medium text-foreground">
    Abhinav Gupta
  </span>{" "}
  &{" "}
  <span className="font-medium text-foreground">
    Sarthak Gupta
  </span>
</span>

        </div>
      </div>
    </footer>
  );
};
