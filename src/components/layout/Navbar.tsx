import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.jpeg";

type NavbarProps = {
  onOpenOptIn: () => void;
  onOpenContact: () => void;
};

const navLinks = [
  { name: "Platform", href: "#platform" },
  { name: "Solutions", href: "#solutions" },
  { name: "Why Xshootsms", href: "#why-us" },
  { name: "Industries", href: "#industries" },
  { name: "Company", href: "#company" },
  { name: "Testimonials", href: "#testimonials" },
];

export const Navbar = ({ onOpenOptIn, onOpenContact }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav className="container-custom flex items-center justify-between h-20 px-4 md:px-8">
        {/* Logo */}
        <motion.a href="#" whileHover={{ scale: 1.02 }}>
          <img src={logo} alt="Xshootsms Logo" className="h-20 w-auto" />
        </motion.a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-muted-foreground hover:text-foreground text-sm font-medium"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <Button variant="ghost" onClick={onOpenContact}>
            Contact
          </Button>
          <Button className="btn-primary" onClick={onOpenOptIn}>
            Get a Quote
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-t border-border"
          >
            <div className="p-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-muted-foreground text-lg"
                >
                  {link.name}
                </a>
              ))}

              <Button
                variant="ghost"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenContact();
                }}
              >
                Contact
              </Button>

              <Button
                className="btn-primary mt-2"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenOptIn();
                }}
              >
                Get a Quote
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
