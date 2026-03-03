import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.jpeg";

type NavbarProps = {
  onOpenOptIn: () => void;
  onOpenContact: () => void;
};

const navLinks = [
  { name: "Platform", href: "/#platform" },
  { name: "Solutions", href: "/#solutions" },
  { name: "Industries", href: "/#industries" },
  { name: "Pricing", href: "/pricing" },
  { name: "FAQ", href: "/faq" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/#company" },
];

export const Navbar = ({ onOpenOptIn, onOpenContact }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href.startsWith("/#")) {
      return location.pathname === "/" && location.hash === href.substring(1);
    }
    return location.pathname === href;
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] flex justify-center p-3 md:p-4 pointer-events-none">
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`pointer-events-auto flex items-center justify-between transition-all duration-500 ease-out ${isScrolled
          ? "w-full max-w-[1024px] px-4 md:px-6 py-2.5 mt-2 rounded-full bg-white/70 dark:bg-slate-950/70 backdrop-blur-2xl border border-white/40 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
          : "w-full max-w-7xl px-4 py-4 bg-transparent"
          }`}
      >
        {/* Logo */}
        <Link to="/" className="relative z-10 flex items-center gap-2 group shrink-0">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center"
          >
            <img
              src={logo}
              alt="Xshootsms Logo"
              className={`w-auto object-contain rounded-lg transition-all duration-300 ${isScrolled ? "h-10 md:h-12" : "h-14 md:h-16"}`}
            />
          </motion.div>
        </Link>


        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center bg-black/5 dark:bg-white/5 rounded-full px-2 py-1.5 border border-black/5 dark:border-white/10 shadow-inner backdrop-blur-md">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.name}
                to={link.href}
                className={`relative px-5 py-2 text-sm xl:text-base font-bold transition-colors duration-300 ${active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {active && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-white dark:bg-slate-800 rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_10px_rgba(0,0,0,0.3)] border border-black/5 dark:border-white/10"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Login Dropdown */}
          <div
            className="relative hidden md:block"
            onMouseEnter={() => setIsLoginDropdownOpen(true)}
            onMouseLeave={() => setIsLoginDropdownOpen(false)}
          >
            <Button
              variant="outline"
              className="relative overflow-hidden font-bold rounded-xl px-5 transition-all duration-300 flex items-center gap-2 border border-border/40 bg-background/50 backdrop-blur-md hover:bg-white hover:text-black hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] group dark:hover:bg-slate-100 dark:hover:text-slate-900"
            >
              <span className="relative z-10 flex items-center gap-1">
                Login
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isLoginDropdownOpen ? "rotate-180" : ""}`} />
              </span>
            </Button>

            <AnimatePresence>
              {isLoginDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute top-full right-0 mt-3 w-64 bg-white/95 dark:bg-slate-900/95 border border-white/20 dark:border-white/10 rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] p-3 z-50 flex flex-col gap-1 backdrop-blur-2xl"
                >
                  <a
                    href="https://vcallz.com/login"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-3 text-sm font-semibold rounded-xl hover:bg-gradient-to-r hover:from-cyan/10 hover:to-blue-500/10 hover:text-cyan transition-all duration-300 text-foreground group"
                  >
                    <span className="transform transition-transform duration-300 group-hover:translate-x-1">Voice Call</span>
                  </a>
                  <a
                    href="https://bot.mywapz.com/login"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-3 text-sm font-semibold rounded-xl hover:bg-gradient-to-r hover:from-emerald-500/10 hover:to-green-500/10 hover:text-emerald-500 transition-all duration-300 text-foreground group"
                  >
                    <span className="transform transition-transform duration-300 group-hover:translate-x-1">WhatsApp Business API</span>
                  </a>
                  <a
                    href="http://text.xshootsms.com/app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-3 text-sm font-semibold rounded-xl hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10 hover:text-purple-500 transition-all duration-300 text-foreground group"
                  >
                    <span className="transform transition-transform duration-300 group-hover:translate-x-1">Text SMS</span>
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Button
            variant="ghost"
            onClick={onOpenContact}
            className="hidden md:flex font-bold rounded-xl px-6 transition-all duration-300 hover:bg-muted/80 hover:scale-105 active:scale-95"
          >
            Contact
          </Button>
          <Button
            onClick={onOpenOptIn}
            className="group flex items-center gap-2 text-sm md:text-base font-bold px-6 md:px-8 py-2 md:py-6 rounded-xl bg-gradient-to-r from-cyan to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-[0_4px_14px_0_rgba(6,182,212,0.39)] hover:shadow-[0_6px_20px_rgba(6,182,212,0.23)] transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Get a Quote
          </Button>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 ml-1 rounded-xl text-foreground/70 hover:text-foreground hover:bg-muted/80 active:scale-95 transition-all duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-background/80 backdrop-blur-sm lg:hidden pointer-events-auto"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              <motion.div
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 h-screen w-[300px] bg-white/95 dark:bg-slate-950/95 backdrop-blur-3xl border-l border-white/20 dark:border-white/10 shadow-[-20px_0_40px_rgba(0,0,0,0.1)] p-6 lg:hidden pointer-events-auto flex flex-col z-[10000]"
              >
                {/* Drawer header with close button */}
                <div className="flex items-center justify-between mb-8">
                  <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                    <img src={logo} alt="Xshootsms" className="h-8 w-auto object-contain rounded-lg" />
                  </Link>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-xl bg-muted hover:bg-muted/80 text-foreground/70 hover:text-foreground transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex flex-col gap-2 overflow-y-auto">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`px-4 py-4 rounded-xl text-lg font-medium transition-all ${isActive(link.href)
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                    >
                      {link.name}
                    </Link>
                  ))}

                  <div className="mt-4 px-4 py-2">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Login Portals</h3>
                    <div className="flex flex-col gap-1">
                      <a
                        href="https://vcallz.com/login"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-3 rounded-xl text-base font-medium transition-all text-muted-foreground hover:bg-muted hover:text-foreground flex items-center gap-2"
                      >
                        Voice Call
                      </a>
                      <a
                        href="https://bot.mywapz.com/login"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-3 rounded-xl text-base font-medium transition-all text-muted-foreground hover:bg-muted hover:text-foreground flex items-center gap-2"
                      >
                        WhatsApp API
                      </a>
                      <a
                        href="http://text.xshootsms.com/app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-3 rounded-xl text-base font-medium transition-all text-muted-foreground hover:bg-muted hover:text-foreground flex items-center gap-2"
                      >
                        Text SMS
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-auto flex flex-col gap-4 pb-8">
                  <Button
                    variant="outline"
                    className="w-full py-6 rounded-xl text-lg font-bold border-border/40 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white transition-all duration-300"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenContact();
                    }}
                  >
                    Contact Sales
                  </Button>
                  <Button
                    className="w-full py-6 rounded-xl text-lg font-bold bg-gradient-to-r from-cyan to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-[0_4px_14px_0_rgba(6,182,212,0.39)] hover:shadow-[0_6px_20px_rgba(6,182,212,0.23)] transition-all duration-300 transform hover:-translate-y-0.5"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenOptIn();
                    }}
                  >
                    Get a Quote
                  </Button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.header>
    </div>
  );
};
