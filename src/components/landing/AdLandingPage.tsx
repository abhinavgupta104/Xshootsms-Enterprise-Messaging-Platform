import { useMemo, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logoImage from "@/assets/x.jpeg";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ChevronDown,
  Zap,
  Shield,
  BarChart3,
  Users,
  Send,
  Sparkles,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type AdLandingPageProps = {
  serviceKey: "rcs" | "voice-call" | "whatsapp-api" | "bulk-sms";
  title: string;
  subtitle: string;
  badge: string;
  heroBullets: string[];
  problem: { title: string; description: string; bullets: string[] };
  solution: { title: string; description: string; bullets: string[] };
  features: Array<{ title: string; description: string }>;
  benefits: Array<{ metric: string; label: string; description: string }>;
  howItWorks: Array<{ step: string; title: string; description: string }>;
  faqs: Array<{ question: string; answer: string }>;
  heroImage: string;
  finalCtaTitle: string;
  finalCtaText: string;
  ctaText?: string;
  socialProof?: { stats: Array<{ value: string; label: string }> };
  accentColor?: "purple" | "blue" | "cyan" | "emerald";
};

type UTMData = {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  gclid: string;
};

/* ------------------------------------------------------------------ */
/*  Accent color map                                                   */
/* ------------------------------------------------------------------ */

const accents = {
  purple: {
    gradient: "from-purple-600 via-fuchsia-500 to-pink-500",
    glow: "rgba(168,85,247,0.22)",
    glowAlt: "rgba(217,70,239,0.14)",
    ring: "ring-purple-500/40",
    text: "text-purple-700",
    bg: "bg-violet-500/10",
    border: "border-purple-200",
    btnGradient: "from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500",
    ctaBg: "from-purple-100 via-fuchsia-100 to-pink-100",
  },
  blue: {
    gradient: "from-cyan-600 via-blue-600 to-indigo-600",
    glow: "rgba(6,182,212,0.2)",
    glowAlt: "rgba(59,130,246,0.14)",
    ring: "ring-cyan-500/40",
    text: "text-cyan-700",
    bg: "bg-cyan-500/10",
    border: "border-cyan-200",
    btnGradient: "from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500",
    ctaBg: "from-cyan-100 via-blue-100 to-indigo-100",
  },
  cyan: {
    gradient: "from-cyan-600 via-teal-600 to-emerald-600",
    glow: "rgba(6,182,212,0.22)",
    glowAlt: "rgba(5,150,105,0.14)",
    ring: "ring-cyan-400/40",
    text: "text-cyan-700",
    bg: "bg-cyan-500/10",
    border: "border-cyan-200",
    btnGradient: "from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500",
    ctaBg: "from-cyan-100 via-teal-100 to-emerald-100",
  },
  emerald: {
    gradient: "from-emerald-600 via-green-600 to-teal-600",
    glow: "rgba(16,185,129,0.2)",
    glowAlt: "rgba(20,184,166,0.14)",
    ring: "ring-emerald-400/40",
    text: "text-emerald-700",
    bg: "bg-emerald-500/10",
    border: "border-emerald-200",
    btnGradient: "from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500",
    ctaBg: "from-emerald-100 via-green-100 to-teal-100",
  },
};

const featureIcons = [Zap, Shield, BarChart3, Users, Send, Sparkles];

/* ------------------------------------------------------------------ */
/*  Utilities                                                          */
/* ------------------------------------------------------------------ */

const API_BASE = import.meta.env.VITE_API_URL || "";

const getUTMData = (search: string): UTMData => {
  const params = new URLSearchParams(search);
  return {
    utm_source: params.get("utm_source") || "",
    utm_medium: params.get("utm_medium") || "",
    utm_campaign: params.get("utm_campaign") || "",
    utm_term: params.get("utm_term") || "",
    utm_content: params.get("utm_content") || "",
    gclid: params.get("gclid") || "",
  };
};

const trackLeadEvent = async (serviceKey: string) => {
  try {
    const ReactGA = (await import("react-ga4")).default;
    ReactGA.event("generate_lead", { category: "ads_landing", label: serviceKey });
  } catch { /* never block conversion */ }

  const w = window as Window & { gtag?: (...a: unknown[]) => void; dataLayer?: unknown[] };
  w.dataLayer?.push({ event: "lead_submit", service: serviceKey });
  w.gtag?.("event", "lead_submit", { service: serviceKey });
};

/* ------------------------------------------------------------------ */
/*  Reusable bits                                                      */
/* ------------------------------------------------------------------ */

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const SectionLabel = ({ children, ac }: { children: React.ReactNode; ac: typeof accents.purple }) => (
  <span className={`inline-flex items-center gap-2 rounded-full border ${ac.border} ${ac.bg} px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] ${ac.text} backdrop-blur`}>
    {children}
  </span>
);

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.08]">
    {children}
  </h2>
);

const GlowOrb = ({ className, ac }: { className: string; ac: typeof accents.purple }) => (
  <motion.div
    className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
    style={{ background: `radial-gradient(circle, ${ac.glow} 0%, transparent 70%)` }}
    animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
  />
);

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export const AdLandingPage = ({
  serviceKey,
  title,
  subtitle,
  badge,
  heroBullets,
  problem,
  solution,
  features,
  benefits,
  howItWorks,
  faqs,
  heroImage,
  finalCtaTitle,
  finalCtaText,
  ctaText = "Start Free Demo",
  socialProof,
  accentColor = "purple",
}: AdLandingPageProps) => {
  const ac = accents[accentColor];
  const location = useLocation();
  const utm = useMemo(() => getUTMData(location.search), [location.search]);
  const quoteHref = useMemo(() => `/get-a-quote${location.search || ""}`, [location.search]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !consent) return;
    setIsSubmitting(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/api/lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim() || "N/A",
          source: `Google Ads Landing - ${serviceKey}`,
          landing_path: location.pathname,
          ...utm,
        }),
      });
      if (!res.ok) throw new Error("Failed to submit");
      await trackLeadEvent(serviceKey);
      setIsSuccess(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ============================  RENDER  ============================ */
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background text-foreground overflow-hidden selection:bg-primary/20">
      {/* ── Ambient background glows ── */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <GlowOrb ac={ac} className="w-[600px] h-[600px] -top-48 -left-32" />
        <GlowOrb ac={ac} className="w-[500px] h-[500px] top-1/3 -right-40" />
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] rounded-full blur-[120px]"
          style={{ background: `radial-gradient(ellipse, ${ac.glowAlt} 0%, transparent 70%)` }}
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "linear-gradient(rgba(0,0,0,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.08) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      {/* ── Thin top nav bar ── */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-white/75 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="group flex items-center gap-3">
            <div className="relative h-9 w-9">
              <div className={`absolute -inset-2 rounded-full bg-gradient-to-r ${ac.gradient} opacity-35 blur-lg transition-opacity group-hover:opacity-60`} />
              <img
                src={logoImage}
                alt="XshootSMS logo"
                className={`relative h-9 w-9 rounded-xl object-cover ring-1 ${ac.ring} shadow-lg transition-transform group-hover:scale-105`}
              />
            </div>
            <div className="leading-none">
              <p className={`text-sm font-bold tracking-wide bg-gradient-to-r ${ac.gradient} bg-clip-text text-transparent`}>H2S</p>
              <p className="text-[11px] text-muted-foreground">XshootSMS</p>
            </div>
          </Link>
          <Link
            to={quoteHref}
            className="btn-primary rounded-lg px-4 py-2 text-sm font-semibold"
          >
            {ctaText}
          </Link>
        </div>
      </header>

      {/* ================================================================ */}
      {/*  1 · HERO                                                        */}
      {/* ================================================================ */}
      <section ref={heroRef} className="relative pt-20 pb-24 md:pt-28 md:pb-32 overflow-hidden">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="mx-auto max-w-7xl px-6">
          <div className="grid gap-14 lg:grid-cols-2 items-center">
            {/* Left – copy */}
            <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-8 max-w-xl">
              <motion.div variants={fadeUp}>
                <SectionLabel ac={ac}>
                  <Sparkles className="w-3.5 h-3.5" />
                  {badge}
                </SectionLabel>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] font-extrabold tracking-tight leading-[1.06]"
              >
                <span className={`bg-gradient-to-br ${ac.gradient} bg-clip-text text-transparent`}>{title.split(" ").slice(0, 3).join(" ")}</span>{" "}
                <span className="text-foreground">{title.split(" ").slice(3).join(" ")}</span>
              </motion.h1>

              <motion.p variants={fadeUp} className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                {subtitle}
              </motion.p>

              {/* Bullet chips */}
              <motion.ul variants={stagger} className="flex flex-wrap gap-2.5">
                {heroBullets.map((item) => (
                  <motion.li
                    key={item}
                    variants={fadeUp}
                    className={`flex items-center gap-2 rounded-full border ${ac.border} bg-background/70 backdrop-blur px-3.5 py-1.5 text-sm text-foreground/80`}
                  >
                    <CheckCircle2 className={`w-3.5 h-3.5 ${ac.text}`} />
                    {item}
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div variants={fadeUp} className="flex items-center gap-4 pt-2">
                <Link
                  to={quoteHref}
                  className="btn-primary inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-semibold"
                >
                  {ctaText}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4 decoration-border">
                  See how it works
                </a>
              </motion.div>
            </motion.div>

            {/* Right – hero image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative"
            >
              <div className={`absolute -inset-4 rounded-3xl bg-gradient-to-br ${ac.gradient} opacity-20 blur-2xl`} />
              <div className="relative rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-2 shadow-xl overflow-hidden">
                <img
                  src={heroImage}
                  alt={`${serviceKey} hero visual`}
                  className="w-full rounded-xl"
                />
                {/* Floating particles over image */}
                <motion.div
                  className={`absolute top-6 right-6 h-3 w-3 rounded-full bg-gradient-to-r ${ac.gradient}`}
                  animate={{ y: [0, -12, 0], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div
                  className={`absolute bottom-10 left-8 h-2 w-2 rounded-full bg-gradient-to-r ${ac.gradient}`}
                  animate={{ y: [0, 10, 0], opacity: [0.4, 0.9, 0.4] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ================================================================ */}
      {/*  Social proof strip                                              */}
      {/* ================================================================ */}
      {socialProof && (
        <section className="border-y border-border bg-muted/30 backdrop-blur">
          <div className="mx-auto max-w-7xl px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
            {socialProof.stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="text-center"
              >
                <p className={`text-3xl md:text-4xl font-extrabold bg-gradient-to-r ${ac.gradient} bg-clip-text text-transparent`}>
                  {s.value}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ================================================================ */}
      {/*  2 · PROBLEM                                                     */}
      {/* ================================================================ */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            {/* Left decorative card */}
            <motion.div variants={fadeUp} className="relative">
              <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-red-500/20 via-orange-500/10 to-transparent" />
              <div className="relative glass-card rounded-3xl border border-border p-8 md:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                    <span className="text-red-400 text-lg">!</span>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-red-400/80">The Problem</span>
                </div>
                <ul className="space-y-4">
                  {problem.bullets.map((point, i) => (
                    <motion.li key={i} variants={fadeUp} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-red-400/60 flex-shrink-0" />
                      <span className="text-muted-foreground leading-relaxed">{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
            {/* Right copy */}
            <motion.div variants={fadeUp} className="space-y-5">
              <SectionLabel ac={ac}>Problem</SectionLabel>
              <SectionHeading>{problem.title}</SectionHeading>
              <p className="text-muted-foreground leading-relaxed text-lg max-w-lg">{problem.description}</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  3 · SOLUTION                                                    */}
      {/* ================================================================ */}
      <section className="py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.015] to-transparent" />
        <div className="mx-auto max-w-7xl px-6 relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            {/* Left copy */}
            <motion.div variants={fadeUp} className="space-y-5 order-2 lg:order-1">
              <SectionLabel ac={ac}>Solution</SectionLabel>
              <SectionHeading>{solution.title}</SectionHeading>
              <p className="text-muted-foreground leading-relaxed text-lg max-w-lg">{solution.description}</p>
            </motion.div>
            {/* Right card */}
            <motion.div variants={fadeUp} className="relative order-1 lg:order-2">
              <div className={`absolute -inset-px rounded-3xl bg-gradient-to-br ${ac.gradient} opacity-[0.12]`} />
              <div className="relative glass-card rounded-3xl border border-border p-8 md:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`h-10 w-10 rounded-xl ${ac.bg} flex items-center justify-center`}>
                    <BadgeCheck className={`w-5 h-5 ${ac.text}`} />
                  </div>
                  <span className={`text-xs font-semibold uppercase tracking-widest ${ac.text} opacity-80`}>The Solution</span>
                </div>
                <ul className="space-y-4">
                  {solution.bullets.map((point, i) => (
                    <motion.li key={i} variants={fadeUp} className="flex items-start gap-3">
                      <CheckCircle2 className={`w-4 h-4 mt-1 ${ac.text} flex-shrink-0`} />
                      <span className="text-muted-foreground leading-relaxed">{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  4 · FEATURES GRID                                               */}
      {/* ================================================================ */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp}>
              <SectionLabel ac={ac}>Features</SectionLabel>
            </motion.div>
            <motion.div variants={fadeUp}>
              <SectionHeading>Everything you need to scale</SectionHeading>
            </motion.div>
            <motion.p variants={fadeUp} className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
              Built for teams that demand performance, reliability, and complete control over their messaging infrastructure.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4"
          >
            {features.map((item, idx) => {
              const Icon = featureIcons[idx % featureIcons.length];
              return (
                <motion.article
                  key={item.title}
                  variants={fadeUp}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="group relative glass-card rounded-2xl border border-border p-6 transition-colors hover:bg-card"
                >
                  {/* hover glow */}
                  <div className={`absolute -inset-px rounded-2xl bg-gradient-to-br ${ac.gradient} opacity-0 group-hover:opacity-[0.08] transition-opacity duration-500`} />
                  <div className="relative">
                    <div className={`h-10 w-10 rounded-xl ${ac.bg} flex items-center justify-center mb-4`}>
                      <Icon className={`w-5 h-5 ${ac.text}`} />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  5 · BENEFITS                                                    */}
      {/* ================================================================ */}
      <section className="py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent" />
        <div className="mx-auto max-w-7xl px-6 relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp}><SectionLabel ac={ac}>Impact</SectionLabel></motion.div>
            <motion.div variants={fadeUp}><SectionHeading>Measurable business outcomes</SectionHeading></motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-6"
          >
            {benefits.map((item) => (
              <motion.div
                key={item.metric}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className="relative glass-card rounded-2xl border border-border p-8 text-center"
              >
                <p className={`text-4xl md:text-5xl font-extrabold bg-gradient-to-r ${ac.gradient} bg-clip-text text-transparent`}>
                  {item.metric}
                </p>
                <p className="mt-3 font-semibold text-foreground">{item.label}</p>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  6 · HOW IT WORKS                                                */}
      {/* ================================================================ */}
      <section id="how-it-works" className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp}><SectionLabel ac={ac}>Process</SectionLabel></motion.div>
            <motion.div variants={fadeUp}><SectionHeading>Get started in minutes</SectionHeading></motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="relative"
          >
            {/* Connecting line */}
            <div className="hidden xl:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-1/2" />

            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {howItWorks.map((item, idx) => (
                <motion.article
                  key={item.step}
                  variants={fadeUp}
                  className="relative glass-card rounded-2xl border border-border p-6"
                >
                  <div className={`inline-flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br ${ac.gradient} text-white text-sm font-bold mb-5`}>
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  7 · FAQ                                                         */}
      {/* ================================================================ */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.div variants={fadeUp}><SectionLabel ac={ac}>FAQ</SectionLabel></motion.div>
            <motion.div variants={fadeUp}><SectionHeading>Common questions</SectionHeading></motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="space-y-3"
          >
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="rounded-xl border border-border bg-card/80 backdrop-blur overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left font-medium text-foreground hover:text-foreground transition-colors"
                >
                  {faq.question}
                  <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-300 flex-shrink-0 ml-4 ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openFaq === i ? "auto" : 0, opacity: openFaq === i ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  8 · LEAD FORM                                                   */}
      {/* ================================================================ */}
      <section id="lead-form" className="py-24 md:py-32">
        <div className="mx-auto max-w-2xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className={`absolute -inset-4 rounded-3xl bg-gradient-to-br ${ac.gradient} opacity-[0.08] blur-xl`} />
            <div className="relative glass-card rounded-2xl border border-border p-8 md:p-10">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">{ctaText}</h2>
                <p className="mt-2 text-muted-foreground">Fill in your details. Our team will reach out within 24 hours.</p>
              </div>

              {isSuccess ? (
                <div className={`rounded-xl border ${ac.border} ${ac.bg} p-6 text-center`}>
                  <p className={`font-semibold ${ac.text}`}>Request received successfully.</p>
                  <p className="mt-1 text-sm text-muted-foreground">Our team will contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                    aria-label="Full Name"
                    className="w-full rounded-xl border border-border bg-background px-4 py-3.5 text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-colors"
                  />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone Number"
                    aria-label="Phone Number"
                    className="w-full rounded-xl border border-border bg-background px-4 py-3.5 text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-colors"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Business Email"
                    aria-label="Business Email"
                    className="w-full rounded-xl border border-border bg-background px-4 py-3.5 text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-colors"
                  />
                  <label className="flex items-start gap-3 text-xs text-muted-foreground leading-relaxed">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-1 accent-primary"
                    />
                    <span>
                      I agree to receive communication from <strong className="text-foreground">XshootSMS</strong> via
                      RCS, SMS, WhatsApp, Email, or Call. I can opt out anytime.
                    </span>
                  </label>
                  {error && <p className="text-sm text-red-400">{error}</p>}
                  <Button
                    type="submit"
                    disabled={!consent || isSubmitting || !name.trim() || !phone.trim()}
                    className="w-full py-6 text-base font-semibold btn-primary"
                  >
                    {isSubmitting ? "Submitting..." : ctaText}
                  </Button>
                </form>
              )}

              <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
                <Link to="/terms" className="hover:text-foreground transition-colors">Terms & Conditions</Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  9 · FINAL CTA                                                   */}
      {/* ================================================================ */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden"
          >
            {/* Glow background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${ac.ctaBg} opacity-[0.15]`} />
            <div className="absolute inset-0 bg-background/65" />
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl" style={{ background: ac.glow }} />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full blur-3xl" style={{ background: ac.glowAlt }} />

            <div className="relative border border-border rounded-3xl px-8 py-16 md:px-16 md:py-20 text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground max-w-3xl mx-auto leading-[1.1]">
                {finalCtaTitle}
              </h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">{finalCtaText}</p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to={quoteHref}
                  className="btn-primary inline-flex items-center gap-2 rounded-xl px-8 py-4 font-semibold"
                >
                  {ctaText}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4 decoration-border"
                >
                  Learn more about H2S
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border py-8">
        <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} XshootSMS. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
