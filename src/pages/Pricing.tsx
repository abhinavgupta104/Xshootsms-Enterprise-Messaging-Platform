import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Check, MessageSquare, Phone, MessageCircle, Sparkles, Zap, Shield, TrendingUp, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactModal } from "@/components/modals/ContactModal";
import { motion } from "framer-motion";
import { PricingTestimonials } from "@/components/Pricing/PricingTestimonials";
import { CostCalculator } from "@/components/Pricing/CostCalculator";
import { useCurrency } from "@/hooks/useCurrency";
import { Currency, currencySymbols, convertPrice, formatPrice } from "@/data/currencyRates";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { OptInModal } from "@/components/OptInModal";
import PrivacyPolicyModal from "@/components/modals/legal/PrivacyPolicyModal";
import TermsModal from "@/components/modals/legal/TermsModal";
import CookiePolicyModal from "@/components/modals/legal/CookiePolicyModal";
import GDPRModal from "@/components/modals/legal/GDPRModal";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { MobileCTABar } from "@/components/layout/MobileCTABar";

type LegalType = "privacy" | "terms" | "cookies" | "gdpr" | null;

// Individual Volume Slider Component with Premium Design
const IndividualVolumeSlider = ({ value, onChange, color = "green", icon: Icon }) => {
  const tiers = [
    { value: 10000, label: "10K" },
    { value: 50000, label: "50K" },
    { value: 100000, label: "100K" },
    { value: 500000, label: "500K" },
  ];

  const colorClasses = {
    green: {
      bg: "from-emerald-500/10 via-green-500/5 to-cyan-500/10",
      gradient: "#10b981",
      text: "text-emerald-600 dark:text-emerald-400",
      dot: "bg-emerald-500",
      track: "bg-emerald-100",
      icon: "text-emerald-500",
      glow: "shadow-emerald-500/20"
    },
    blue: {
      bg: "from-blue-500/10 via-cyan-500/5 to-sky-500/10",
      gradient: "#3b82f6",
      text: "text-blue-600 dark:text-blue-400",
      dot: "bg-blue-500",
      track: "bg-blue-100",
      icon: "text-blue-500",
      glow: "shadow-blue-500/20"
    },
    purple: {
      bg: "from-purple-500/10 via-pink-500/5 to-fuchsia-500/10",
      gradient: "#a855f7",
      text: "text-purple-600 dark:text-purple-400",
      dot: "bg-purple-500",
      track: "bg-purple-100",
      icon: "text-purple-500",
      glow: "shadow-purple-500/20"
    }
  };

  const colors = colorClasses[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`relative bg-gradient-to-br ${colors.bg} rounded-3xl p-8 border-2 ${colors.track} shadow-2xl ${colors.glow}`}
    >

      <div className="relative z-10">
        <div className="flex items-center justify-center gap-4 mb-8">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Icon className={`w-10 h-10 ${colors.icon} drop-shadow-lg`} />
          </motion.div>
          <div className={`text-5xl font-black ${colors.text} drop-shadow-sm`}>
            {value.toLocaleString()}
          </div>
        </div>

        <div className="relative px-2">
          <input
            type="range"
            min="10000"
            max="500000"
            step="10000"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className={`w-full h-3 ${colors.track} rounded-full appearance-none cursor-pointer relative z-10 transition-all hover:scale-105`}
            style={{
              background: `linear-gradient(to right, ${colors.gradient} 0%, ${colors.gradient} ${((value - 10000) / (500000 - 10000)) * 100}%, #e5e7eb ${((value - 10000) / (500000 - 10000)) * 100}%, #e5e7eb 100%)`
            }}
          />

          <div className="relative mt-3">
            {tiers.map((tier) => (
              <div
                key={tier.value}
                className="absolute transform -translate-x-1/2"
                style={{ left: `${((tier.value - 10000) / (500000 - 10000)) * 100}%` }}
              >
                <div className={`w-4 h-4 ${colors.dot} rounded-full border-3 border-white shadow-lg`}></div>
                <div className="text-xs font-bold text-gray-600 mt-2 whitespace-nowrap">
                  {tier.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Premium Price Card Component
const PriceCard = ({ info, color, volume, unit, currency, onGetStarted }) => {
  const colorClasses = {
    green: { gradient: "from-emerald-600 to-green-600", badge: "bg-emerald-100 text-emerald-800" },
    blue: { gradient: "from-blue-600 to-cyan-600", badge: "bg-blue-100 text-blue-800" },
    purple: { gradient: "from-purple-600 to-pink-600", badge: "bg-purple-100 text-purple-800" }
  };

  const colors = colorClasses[color];
  const convertedTotal = convertPrice(info.total, currency);
  const convertedPrice = convertPrice(info.price, currency);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`glass-card rounded-3xl shadow-2xl p-10 border-2 ${colors.badge.replace('bg-', 'border-').replace('-100', '-200')} relative group hover:scale-105 transition-transform duration-300`}
    >

      <div className="relative z-10 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
          className={`inline-flex items-center gap-2 ${colors.badge} px-6 py-3 rounded-full text-sm font-bold mb-6 uppercase tracking-wider shadow-lg`}
        >
          <Sparkles className="w-4 h-4" />
          {info.tier} Plan
        </motion.div>

        <div className={`text-6xl md:text-7xl font-black bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent mb-4 drop-shadow-sm`}>
          {formatPrice(convertedTotal, currency)}
        </div>

        <div className="text-lg text-muted-foreground font-medium mb-6">
          {volume.toLocaleString()} {unit} @ {formatPrice(convertedPrice, currency)} per {unit.toLowerCase()}
        </div>

        <Button
          className="w-full btn-primary shadow-lg hover:shadow-xl transition-shadow"
          size="lg"
          onClick={onGetStarted}
        >
          Get Started
        </Button>
      </div>
    </motion.div>
  );
};

// Compact Features List — tight rows, no giant white cards
const FeaturesList = ({ features, color }) => {
  const colorClasses = {
    green: { bg: "from-emerald-50 to-green-100", icon: "bg-emerald-500", border: "border-emerald-200", text: "text-emerald-700" },
    blue: { bg: "from-blue-50 to-cyan-100", icon: "bg-blue-500", border: "border-blue-200", text: "text-blue-700" },
    purple: { bg: "from-purple-50 to-pink-100", icon: "bg-purple-500", border: "border-purple-200", text: "text-purple-700" }
  };
  const colors = colorClasses[color];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className={`bg-gradient-to-br ${colors.bg} rounded-3xl shadow-xl p-8 border-2 ${colors.border} h-full`}
    >
      <h3 className="text-xl font-black mb-5 text-foreground flex items-center gap-2">
        <div className={`w-8 h-8 rounded-xl ${colors.icon} flex items-center justify-center shadow`}>
          <Zap className="w-4 h-4 text-white" />
        </div>
        What's Included
      </h3>

      <ul className="space-y-2">
        {features.map((feature, idx) => (
          <motion.li
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + idx * 0.06 }}
            className="flex items-center gap-3 py-2 px-3 rounded-xl hover:bg-white/60 transition-colors cursor-default"
          >
            <div className={`w-5 h-5 rounded-full ${colors.icon} flex items-center justify-center flex-shrink-0 shadow`}>
              <Check className="w-3 h-3 text-white" />
            </div>
            <span className="text-foreground text-sm font-medium leading-snug">{feature}</span>
          </motion.li>
        ))}
      </ul>

      <p className={`mt-4 text-xs ${colors.text} font-medium`}>* Tax extra as applicable</p>
    </motion.div>
  );
};

// Currency Selector — prominent label with flag
const CurrencySelector = ({ currency, onChange }) => {
  const currencies: Currency[] = ['INR', 'USD', 'EUR'];
  const flags: Record<Currency, string> = { INR: '🇮🇳', USD: '🇺🇸', EUR: '🇪🇺' };

  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">
        Viewing prices in {flags[currency] || ''}
      </p>
      <div className="flex items-center gap-2 glass-card px-5 py-2.5 rounded-full border border-border shadow-sm">
        <Globe className="w-4 h-4 text-muted-foreground" />
        <select
          value={currency}
          onChange={(e) => onChange(e.target.value as Currency)}
          className="bg-transparent border-none text-sm font-bold text-foreground focus:outline-none cursor-pointer"
          aria-label="Select currency"
        >
          {currencies.map((curr) => (
            <option key={curr} value={curr}>
              {currencySymbols[curr]} {curr}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

const NAVIGATION_SECTIONS = [
  { id: 'sms', label: 'Bulk SMS', color: 'emerald' },
  { id: 'voice', label: 'Voice', color: 'blue' },
  { id: 'rcs', label: 'RCS', color: 'purple' },
  { id: 'whatsapp', label: 'WhatsApp', color: 'green' },
];

// Sticky section jump nav
const SectionNav = () => {
  const [active, setActive] = useState('sms');

  useEffect(() => {
    const handler = () => {
      for (const s of NAVIGATION_SECTIONS) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom > 120) { setActive(s.id); break; }
      }
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const activeClass: Record<string, string> = {
    sms: 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-md',
    voice: 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md',
    rcs: 'bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-md',
    whatsapp: 'bg-gradient-to-r from-green-600 to-green-500 text-white shadow-md',
  };

  return (
    <div className="sticky top-[72px] z-50 flex justify-center py-2 px-4 pointer-events-none">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="pointer-events-auto flex items-center gap-1 glass-card px-2 py-1.5 rounded-full border border-border shadow-lg backdrop-blur-xl overflow-x-auto max-w-full"
        style={{ WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
      >
        {NAVIGATION_SECTIONS.map((s) => (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap flex-shrink-0 ${active === s.id ? activeClass[s.id] : 'text-muted-foreground hover:text-foreground'
              }`}
          >
            {s.label}
          </button>
        ))}
      </motion.div>
    </div>
  );
};

// Bulk SMS Pricing Component
const BulkSmsPricing = ({ currency, onGetStarted }) => {
  const [volume, setVolume] = useState(50000);

  const getTierInfo = (vol) => {
    if (vol <= 10000) return {
      price: 0.25,
      total: 2500,
      tier: "Starter",
      savings: null,
      features: [
        "Lifetime validity",
        "Multi-language SMS support",
        "Fixed 6 letters/numbers sender ID",
        "Instant delivery report",
      ]
    };
    if (vol <= 50000) return {
      price: 0.2,
      total: vol * 0.2,
      tier: "Growing",
      savings: "20% savings",
      features: [
        "Lifetime validity",
        "Multi-language SMS support",
        "Fixed 6 letters/numbers sender ID",
        "Instant delivery report",
        "API access included",
      ]
    };
    if (vol <= 100000) return {
      price: 0.18,
      total: vol * 0.18,
      tier: "Professional",
      savings: "28% savings",
      features: [
        "Lifetime validity",
        "Multi-language SMS support",
        "Fixed 6 letters/numbers sender ID",
        "Instant delivery report",
        "API access included",
        "Priority delivery",
      ]
    };
    return {
      price: 0.16,
      total: vol * 0.16,
      tier: "Enterprise",
      savings: "36% savings",
      features: [
        "Lifetime validity",
        "Multi-language SMS support",
        "Fixed 6 letters/numbers sender ID",
        "Instant delivery report",
        "API access included",
        "Priority delivery",
        "Dedicated account manager",
      ]
    };
  };

  const info = getTierInfo(volume);

  return (
    <div id="sms" className="mb-32 relative scroll-mt-36">
      <div className="absolute top-10 left-10 opacity-10 pointer-events-none"><MessageSquare className="w-32 h-32 text-emerald-500" /></div>
      <div className="absolute bottom-10 right-10 opacity-10 pointer-events-none"><Zap className="w-24 h-24 text-green-500" /></div>

      <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16 relative z-10">
        {/* Section number */}
        <p className="text-xs font-black text-emerald-500 uppercase tracking-[0.3em] mb-3">01 / Bulk SMS</p>
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white px-10 py-4 rounded-full mb-6 shadow-2xl hover:shadow-emerald-500/50 transition-shadow">
          <MessageSquare className="w-7 h-7" />
          <h2 className="font-black text-xl tracking-wide">Bulk SMS Pricing</h2>
        </div>
        {info.savings && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: [1, 1.12, 1], opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="inline-block bg-green-100 text-green-800 px-6 py-2 rounded-full text-sm font-bold mb-4"
          >
            💰 {info.savings} vs Starter
          </motion.div>
        )}
        <p className="text-muted-foreground text-xl font-medium">Adjust the slider to see pricing and benefits</p>
      </motion.div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-start relative z-10">
        <div className="space-y-8">
          <IndividualVolumeSlider value={volume} onChange={setVolume} color="green" icon={MessageSquare} />
          <PriceCard info={info} color="green" volume={volume} unit="SMS" currency={currency} onGetStarted={onGetStarted} />
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}
            className="relative bg-gradient-to-br from-emerald-500/10 to-green-500/10 rounded-3xl p-8 border-2 border-emerald-200 overflow-hidden">
            <div className="absolute inset-0 bg-grid-black/[0.02]" />
            <div className="relative flex items-center justify-center gap-6">
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}
                className="w-20 h-20 rounded-2xl bg-emerald-500 flex items-center justify-center shadow-2xl">
                <MessageSquare className="w-10 h-10 text-white" />
              </motion.div>
              <div><p className="text-sm font-bold text-emerald-600 mb-1">Instant Delivery</p><p className="text-xs text-muted-foreground">99.9% uptime guaranteed</p></div>
            </div>
          </motion.div>
        </div>
        <FeaturesList features={info.features} color="green" />
      </div>
    </div>
  );
};

// Voice Call Pricing Component (similar structure)
const VoiceSmsPricing = ({ currency, onGetStarted }) => {
  const [volume, setVolume] = useState(50000);

  const getTierInfo = (vol) => {
    if (vol <= 10000) return {
      price: 0.35,
      total: 3500,
      tier: "Starter",
      savings: null,
      features: [
        "Lifetime validity",
        "Multi-language voice call support",
        "Fixed 10-digit sender ID",
        "100% delivery with instant delivery report",
      ]
    };
    if (vol <= 50000) return {
      price: 0.3,
      total: vol * 0.3,
      tier: "Growing",
      savings: "14% savings",
      features: [
        "Lifetime validity",
        "Multi-language voice call support",
        "Fixed 10-digit sender ID",
        "100% delivery with instant delivery report",
        "API available at extra cost",
      ]
    };
    if (vol <= 100000) return {
      price: 0.28,
      total: vol * 0.28,
      tier: "Professional",
      savings: "20% savings",
      features: [
        "Lifetime validity",
        "Multi-language voice call support",
        "Fixed 10-digit sender ID",
        "100% delivery with instant delivery report",
        "API available at extra cost",
        "Advanced call routing",
      ]
    };
    return {
      price: 0.25,
      total: vol * 0.25,
      tier: "Enterprise",
      savings: "29% savings",
      features: [
        "Lifetime validity",
        "Multi-language voice call support",
        "Fixed 10-digit sender ID",
        "100% delivery with instant delivery report",
        "API available at extra cost",
        "Advanced call routing",
        "Dedicated support line",
      ]
    };
  };

  const info = getTierInfo(volume);

  return (
    <div id="voice" className="mb-32 relative scroll-mt-36">
      <div className="absolute top-10 right-10 opacity-10 pointer-events-none"><Phone className="w-32 h-32 text-blue-500" /></div>
      <div className="absolute bottom-10 left-10 opacity-10 pointer-events-none"><TrendingUp className="w-24 h-24 text-cyan-500" /></div>

      <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16 relative z-10">
        <p className="text-xs font-black text-blue-500 uppercase tracking-[0.3em] mb-3">02 / Voice Calls</p>
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-10 py-4 rounded-full mb-6 shadow-2xl hover:shadow-blue-500/50 transition-shadow">
          <Phone className="w-7 h-7" />
          <h2 className="font-black text-xl tracking-wide">Voice Call Pricing</h2>
        </div>
        {info.savings && (
          <motion.div initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: [1, 1.12, 1], opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="inline-block bg-blue-100 text-blue-800 px-6 py-2 rounded-full text-sm font-bold mb-4">
            💰 {info.savings} vs Starter
          </motion.div>
        )}
        <p className="text-muted-foreground text-xl font-medium">Adjust the slider to see pricing and benefits</p>
      </motion.div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-start relative z-10">
        <div className="space-y-8">
          <IndividualVolumeSlider value={volume} onChange={setVolume} color="blue" icon={Phone} />
          <PriceCard info={info} color="blue" volume={volume} unit="Calls" currency={currency} onGetStarted={onGetStarted} />
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}
            className="relative bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-3xl p-8 border-2 border-blue-200 overflow-hidden">
            <div className="absolute inset-0 bg-grid-black/[0.02]" />
            <div className="relative flex items-center justify-center gap-6">
              <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 2.5, repeat: Infinity }}
                className="w-20 h-20 rounded-2xl bg-blue-500 flex items-center justify-center shadow-2xl">
                <Phone className="w-10 h-10 text-white" />
              </motion.div>
              <div><p className="text-sm font-bold text-blue-600 mb-1">Crystal Clear Audio</p><p className="text-xs text-muted-foreground">HD voice quality</p></div>
            </div>
          </motion.div>
        </div>
        <FeaturesList features={info.features} color="blue" />
      </div>
    </div>
  );
};

// RCS Pricing Component
const RcsPricing = ({ currency, onGetStarted }) => {
  const [volume, setVolume] = useState(50000);

  const getTierInfo = (vol) => {
    if (vol <= 10000) return {
      price: 3500,
      setupFee: 5000,
      tier: "Starter",
      range: "10,000 Messages",
      popular: false,
      features: [
        "Powerful web APIs",
        "Rich media support",
        "No-code chatbot builder",
        "No monthly cost",
      ]
    };
    if (vol <= 50000) return {
      price: 15000,
      setupFee: 5000,
      tier: "Most Popular",
      range: "50,000 Messages",
      popular: true,
      features: [
        "Powerful web APIs",
        "Rich media support",
        "No-code chatbot builder",
        "No monthly cost",
        "Unlimited live chat agents",
        "Bulk RCS campaigns",
      ]
    };
    return {
      price: 24000,
      setupFee: 0,
      tier: "Regular",
      range: "1,00,000+ Messages",
      popular: false,
      features: [
        "Powerful web APIs",
        "Rich media support",
        "No-code chatbot builder",
        "No monthly cost",
        "Unlimited live chat agents",
        "Bulk RCS campaigns",
        "24×7 support",
        "Conversation analytics",
        "Blue tick verification",
      ]
    };
  };

  const info = getTierInfo(volume);

  return (
    <div id="rcs" className="mb-32 relative scroll-mt-36">
      <div className="absolute top-10 left-10 opacity-10 pointer-events-none"><MessageCircle className="w-32 h-32 text-purple-500" /></div>
      <div className="absolute bottom-10 right-10 opacity-10 pointer-events-none"><Sparkles className="w-24 h-24 text-pink-500" /></div>

      <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16 relative z-10">
        <p className="text-xs font-black text-purple-500 uppercase tracking-[0.3em] mb-3">03 / RCS Messaging</p>
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-4 rounded-full mb-6 shadow-2xl hover:shadow-purple-500/50 transition-shadow">
          <MessageCircle className="w-7 h-7" />
          <h2 className="font-black text-xl tracking-wide">RCS Messaging Pricing</h2>
        </div>
        {info.popular && (
          <motion.div initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: [1, 1.12, 1], opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="inline-block bg-purple-100 text-purple-800 px-6 py-2 rounded-full text-sm font-bold mb-4">⭐ Most Popular Choice</motion.div>
        )}
        <p className="text-muted-foreground text-xl font-medium">Adjust the slider to see pricing and benefits</p>
      </motion.div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-start relative z-10">
        <div className="space-y-8">
          <IndividualVolumeSlider value={volume} onChange={setVolume} color="purple" icon={MessageCircle} />

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card rounded-3xl shadow-2xl p-10 border-2 border-purple-500 relative group hover:scale-105 transition-transform">
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full text-sm font-bold mb-6 uppercase tracking-wider shadow-lg">
                <Sparkles className="w-4 h-4" />{info.tier}
              </div>
              <div className="text-6xl md:text-7xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">
                {formatPrice(convertPrice(info.price, currency), currency)}
              </div>
              <div className="text-base text-muted-foreground font-semibold mb-4">{info.range}</div>
              <div className="inline-block text-sm text-foreground bg-muted rounded-xl py-2 px-6 font-semibold mb-6">
                Setup: <span className="text-purple-600">{info.setupFee === 0 ? 'Free' : formatPrice(convertPrice(info.setupFee, currency), currency)}</span>
              </div>
              <Button className="w-full btn-primary shadow-lg hover:shadow-xl transition-shadow" size="lg" onClick={onGetStarted}>Get Started</Button>
            </div>
          </motion.div>

          {/* Icon card — float instead of spin (#7) */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}
            className="relative bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl p-8 border-2 border-purple-200 overflow-hidden">
            <div className="absolute inset-0 bg-grid-black/[0.02]" />
            <div className="relative flex items-center justify-center gap-6">
              <motion.div
                animate={{ y: [0, -8, 0], scale: [1, 1.04, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-2xl">
                <MessageCircle className="w-10 h-10 text-white" />
              </motion.div>
              <div><p className="text-sm font-bold text-purple-600 mb-1">Rich Media Support</p><p className="text-xs text-muted-foreground">Images, videos & more</p></div>
            </div>
          </motion.div>
        </div>
        <FeaturesList features={info.features} color="purple" />
      </div>
    </div>
  );
};

// WhatsApp Pricing Component with Monthly/Yearly Toggle
const WhatsappPricing = ({ currency, onGetStarted }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  const plans = [
    {
      name: "Growth Plan",
      priceMonthly: 4299,
      priceYearly: 3599,
      billing: billingCycle === 'yearly' ? "per month, billed yearly" : "per month",
      description:
        "Plug-and-play chatbots, broadcasts and a shared inbox to jump-start marketing and sales automation with integrated workflows for expanding teams.",
      features: [
        "Template message charges",
        "6 users",
        "Chatbot builder with basic connectors",
        "Messaging and chatbot analytics",
        "Broadcast to segmented contacts",
        "Shared team inbox with collaborative features",
        "WhatsApp Flows/Forms",
        "Basic messaging API",
        "30+ Native integrations",
        "WhatsApp catalogs",
      ],
      popular: false,
    },
    {
      name: "Scale Plan",
      priceMonthly: 9299,
      priceYearly: 7799,
      billing: billingCycle === 'yearly' ? "per month, billed yearly" : "per month",
      description:
        "Ideal for companies looking to grow with advanced WhatsApp automation capabilities + nifty team management features.",
      features: [
        "Template message charges",
        "6 users",
        "Everything in Growth plan, plus:",
        "Chatbot builder with advanced connectors and utilities",
        "Drip campaigns",
        "WhatsApp native payment",
        "Advanced messaging API",
        "Custom roles",
        "Multiple WhatsApp numbers/channels",
        "AI rewrite",
        "Team management",
      ],
      popular: true,
    },
    {
      name: "Pro Plan",
      priceMonthly: 17999,
      priceYearly: 14999,
      billing: billingCycle === 'yearly' ? "per month, billed yearly" : "per month",
      description:
        "Perfect for large teams ready to unlock advanced, AI-based WhatsApp automation with enterprise-ready security.",
      features: [
        "Template message charges (5% Off)",
        "6 users",
        "Everything in Scale plan, plus:",
        "AI-powered chatbots",
        "Dynamic forms",
        "Enterprise-grade security",
        "IP restrictions",
        "Number masking",
        "Priority support",
      ],
      popular: false,
    },
  ];

  const calculateSavings = (monthly, yearly) => {
    return Math.round(((monthly - yearly) / monthly) * 100);
  };

  // Comparison table feature rows
  const comparisonFeatures = [
    { label: 'Monthly Price', growth: `${formatPrice(convertPrice(plans[0].priceMonthly, currency), currency)}/mo`, scale: `${formatPrice(convertPrice(plans[1].priceMonthly, currency), currency)}/mo`, pro: `${formatPrice(convertPrice(plans[2].priceMonthly, currency), currency)}/mo` },
    { label: 'Yearly Price', growth: `${formatPrice(convertPrice(plans[0].priceYearly, currency), currency)}/mo`, scale: `${formatPrice(convertPrice(plans[1].priceYearly, currency), currency)}/mo`, pro: `${formatPrice(convertPrice(plans[2].priceYearly, currency), currency)}/mo` },
    { label: 'Users', growth: '6', scale: '6', pro: '6' },
    { label: 'Chatbot Builder', growth: 'Basic', scale: 'Advanced', pro: 'AI-powered' },
    { label: 'Analytics', growth: '✅', scale: '✅', pro: '✅' },
    { label: 'Broadcasts', growth: '✅', scale: '✅', pro: '✅' },
    { label: 'Drip Campaigns', growth: '—', scale: '✅', pro: '✅' },
    { label: 'WhatsApp Payment', growth: '—', scale: '✅', pro: '✅' },
    { label: 'AI Rewrite', growth: '—', scale: '✅', pro: '✅' },
    { label: 'Template Discount', growth: '—', scale: '—', pro: '5% Off' },
    { label: 'IP Restrictions', growth: '—', scale: '—', pro: '✅' },
    { label: 'Number Masking', growth: '—', scale: '—', pro: '✅' },
    { label: 'Support', growth: 'Standard', scale: 'Priority', pro: '24/7 Priority' },
  ];

  return (
    <div id="whatsapp" className="mb-32 relative scroll-mt-36">
      <div className="absolute top-10 right-10 opacity-10 pointer-events-none"><MessageSquare className="w-32 h-32 text-emerald-500" /></div>
      <div className="absolute bottom-10 left-10 opacity-10 pointer-events-none"><Shield className="w-24 h-24 text-green-500" /></div>

      <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16 relative z-10">
        <p className="text-xs font-black text-emerald-500 uppercase tracking-[0.3em] mb-3">04 / WhatsApp Automation</p>
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white px-10 py-4 rounded-full mb-6 shadow-2xl hover:shadow-emerald-500/50 transition-shadow">
          <MessageSquare className="w-7 h-7" />
          <h2 className="font-black text-xl tracking-wide">WhatsApp Automation Pricing</h2>
        </div>

        {/* Billing Toggle */}
        <div className="inline-flex items-center gap-4 glass-card px-6 py-3 rounded-full border border-border mb-6">
          <button onClick={() => setBillingCycle('monthly')}
            className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${billingCycle === 'monthly' ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg' : 'text-muted-foreground hover:text-foreground'}`}>
            Monthly
          </button>
          <button onClick={() => setBillingCycle('yearly')}
            className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${billingCycle === 'yearly' ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg' : 'text-muted-foreground hover:text-foreground'}`}>
            Yearly <span className="ml-2 text-xs bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full">Save up to 20%</span>
          </button>
        </div>
        <p className="text-muted-foreground text-xl font-medium">Choose the perfect plan for your team</p>
      </motion.div>

      {/* Plan cards grid */}
      <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20">
        {plans.map((plan, idx) => {
          const price = billingCycle === 'yearly' ? plan.priceYearly : plan.priceMonthly;
          const savings = calculateSavings(plan.priceMonthly, plan.priceYearly);
          return (
            <motion.div key={plan.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
              className={`relative glass-card rounded-3xl shadow-xl p-8 border-2 transition-all hover:shadow-2xl hover:-translate-y-1 ${plan.popular ? 'border-emerald-500 shadow-emerald-500/20' : 'border-border'}`}>
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-xl flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />Most Popular
                  </span>
                </div>
              )}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-black mb-3 text-foreground">{plan.name}</h3>
                <div className="text-5xl font-black bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-1">
                  {formatPrice(convertPrice(price, currency), currency)}
                </div>
                <div className="text-sm text-muted-foreground font-medium mb-2">{plan.billing}</div>
                {billingCycle === 'yearly' && (
                  <motion.div initial={{ scale: 0.8 }} animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 0.5 }}
                    className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold">Save {savings}%</motion.div>
                )}
              </div>
              <p className="text-muted-foreground text-sm mb-6 leading-relaxed min-h-[80px]">{plan.description}</p>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 shadow">
                      <Check className="w-2.5 h-2.5 text-white" />
                    </div>
                    <span className="text-sm text-foreground font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full btn-primary shadow-lg hover:shadow-xl transition-shadow" size="lg" onClick={onGetStarted}>Start Free Trial</Button>
            </motion.div>
          );
        })}
      </div>

      {/* Comparison table */}
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto">
        <h3 className="text-center text-2xl font-black mb-8 text-foreground">Plan Comparison</h3>
        <div className="overflow-x-auto rounded-2xl border border-border shadow-lg">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/60">
                <th className="text-left px-6 py-4 font-bold text-foreground w-1/3">Feature</th>
                <th className="text-center px-4 py-4 font-bold text-foreground">Growth</th>
                <th className="text-center px-4 py-4 font-bold text-emerald-600 bg-emerald-50/60">Scale ⭐</th>
                <th className="text-center px-4 py-4 font-bold text-foreground">Pro</th>
              </tr>
            </thead>
            <tbody>
              {comparisonFeatures.map((row, i) => (
                <tr key={i} className={`border-t border-border/50 ${i % 2 === 0 ? 'bg-background' : 'bg-muted/20'}`}>
                  <td className="px-6 py-3 font-medium text-muted-foreground">{row.label}</td>
                  <td className="text-center px-4 py-3 text-foreground">{row.growth}</td>
                  <td className="text-center px-4 py-3 text-foreground bg-emerald-50/30 font-medium">{row.scale}</td>
                  <td className="text-center px-4 py-3 text-foreground">{row.pro}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

// Trust Badges Component
const TrustBadges = () => {
  const badges = [
    { icon: Shield, text: "30-Day Money-Back Guarantee" },
    { icon: TrendingUp, text: "99.9% Uptime SLA" },
    { icon: Check, text: "SOC 2 Certified" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap justify-center gap-6 mb-20"
    >
      {badges.map((badge, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: idx * 0.1 }}
          className="flex items-center gap-3 glass-card px-6 py-4 rounded-2xl border border-border hover:shadow-lg transition-shadow"
        >
          <badge.icon className="w-6 h-6 text-emerald-600" />
          <span className="font-bold text-foreground">{badge.text}</span>
        </motion.div>
      ))}
    </motion.div>
  );
};

// Main Pricing Page
const Pricing = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const [isOptInOpen, setIsOptInOpen] = useState(false);
  const [legalModal, setLegalModal] = useState<LegalType>(null);
  const { currency, changeCurrency } = useCurrency();

  const handleGetStarted = () => {
    setContactOpen(true);
  };

  return (
    <>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-muted/20 to-background">
        <Navbar
          onOpenOptIn={() => setIsOptInOpen(true)}
          onOpenContact={() => setContactOpen(true)}
        />

        <main className="flex-1 pt-32 pb-24" id="main-content">
          <Helmet>
            <title>Pricing Plans - Xshootsms | Flexible Messaging Solutions</title>
            <meta
              name="description"
              content="Transparent pricing for Bulk SMS, WhatsApp Business API, RCS Messaging, and Voice APIs. Choose the perfect plan to scale your business communication."
            />
            <link rel="canonical" href="https://xshootsms.com/pricing" />

            {/* Breadcrumb Schema */}
            <script type="application/ld+json">
              {JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://xshootsms.com"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Pricing",
                    "item": "https://xshootsms.com/pricing"
                  }
                ]
              })}
            </script>

            {/* Product/Service Schema */}
            <script type="application/ld+json">
              {JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "Xshootsms Enterprise Messaging",
                "description": "Enterprise-grade messaging solutions including Bulk SMS, WhatsApp Business API, and RCS.",
                "provider": {
                  "@type": "Organization",
                  "name": "Xshootsms",
                  "url": "https://xshootsms.com"
                },
                "offers": {
                  "@type": "AggregateOffer",
                  "priceCurrency": "INR",
                  "lowPrice": "0.16",
                  "highPrice": "17999",
                  "offerCount": "10"
                }
              })}
            </script>
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://xshootsms.com/pricing" />
            <meta property="og:title" content="Pricing - Xshootsms | Enterprise Messaging Plans" />
            <meta property="og:description" content="Transparent pricing for Bulk SMS, Voice, RCS, and WhatsApp Automation. Choose the perfect plan for your business needs." />
            <meta property="og:image" content="https://xshootsms.com/og-image.svg" />
            <meta property="og:site_name" content="Xshootsms" />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:title" content="Pricing - Xshootsms | Enterprise Messaging Plans" />
            <meta property="twitter:description" content="Transparent pricing for Bulk SMS, Voice, RCS, and WhatsApp Automation. Choose the perfect plan for your business needs." />
            <meta property="twitter:image" content="https://xshootsms.com/og-image.svg" />

            <script type="application/ld+json">
              {`
              {
                "@context": "https://schema.org",
                "@type": "PriceSpecification",
                "price": "0.16",
                "priceCurrency": "INR",
                "minPrice": "0.16",
                "maxPrice": "0.25",
                "unitCode": "C62",
                "description": "Bulk SMS starting at ₹0.16 per unit"
              }
            `}
            </script>
          </Helmet>

          <div className="container mx-auto px-4 max-w-[1400px]">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-4xl mx-auto mb-28"
            >
              <div className="flex justify-center mb-10">
                <CurrencySelector currency={currency} onChange={changeCurrency} />
              </div>

              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-green-600 text-white px-10 py-4 rounded-full text-sm font-black mb-8 uppercase tracking-widest shadow-2xl hover:shadow-emerald-500/50 transition-shadow"
              >
                <Sparkles className="w-5 h-5" />
                Pricing
              </motion.span>

              <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
                <span className="text-foreground">Scale Conversations, Not Costs</span>
                <br />
                <span className="">
                  Across SMS, Voice, RCS & WhatsApp
                </span>
              </h1>

              <p className="text-muted-foreground text-xl md:text-2xl leading-relaxed font-medium mb-10">
                Interactive sliders for usage-based pricing and monthly plans for WhatsApp automation.
              </p>

              <Button
                size="lg"
                className="btn-primary px-10 py-6 text-lg shadow-2xl hover:shadow-emerald-500/50 transition-shadow"
                onClick={() => setContactOpen(true)}
              >
                Contact Sales
              </Button>
            </motion.div>

            {/* Trust Badges */}
            <TrustBadges />

            {/* Sticky section nav */}
            <SectionNav />

            {/* Usage-Based Services */}
            <BulkSmsPricing currency={currency} onGetStarted={handleGetStarted} />
            <VoiceSmsPricing currency={currency} onGetStarted={handleGetStarted} />
            <RcsPricing currency={currency} onGetStarted={handleGetStarted} />

            {/* WhatsApp */}
            <WhatsappPricing currency={currency} onGetStarted={handleGetStarted} />

            {/* Cost Calculator */}
            <div className="mb-32">
              <CostCalculator />
            </div>

            {/* Testimonials */}
            <div className="mb-32">
              <PricingTestimonials />
            </div>

            {/* FAQ */}
            <div className="mb-32">
            </div>

            {/* Footer Notes */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center mt-24 space-y-4 glass-card rounded-3xl shadow-xl p-12 max-w-3xl mx-auto border border-border"
            >
              <div className="text-4xl mb-6">📌</div>
              <p className="text-sm text-muted-foreground font-bold">* Prices are indicative</p>
              <p className="text-sm text-muted-foreground font-bold">
                * All prices are exclusive of taxes
              </p>
              <p className="text-sm text-muted-foreground font-bold">
                * Usage-based plans come with lifetime validity unless stated otherwise
              </p>
            </motion.div>
          </div>
        </main>

        <Footer onOpenLegal={setLegalModal} />
      </div>

      <OptInModal open={isOptInOpen} onClose={() => setIsOptInOpen(false)} />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
      {legalModal === "privacy" && <PrivacyPolicyModal onClose={() => setLegalModal(null)} />}
      {legalModal === "terms" && <TermsModal onClose={() => setLegalModal(null)} />}
      {legalModal === "cookies" && <CookiePolicyModal onClose={() => setLegalModal(null)} />}
      {legalModal === "gdpr" && <GDPRModal onClose={() => setLegalModal(null)} />}
      <MobileCTABar onOpenOptIn={() => setIsOptInOpen(true)} />
      <WhatsAppFloat />
    </>
  );
};

export default Pricing;