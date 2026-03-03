import { useState, lazy, Suspense, useEffect } from "react";
import { MobileCTABar } from "@/components/layout/MobileCTABar";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { useExitIntent } from "@/hooks/useExitIntent";
import { Helmet } from "react-helmet-async";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// Critical above-the-fold components - loaded eagerly
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";

// Below-the-fold components - lazy loaded to reduce initial JS
const PlatformOverview = lazy(() => import("@/components/sections/PlatformOverview").then(m => ({ default: m.PlatformOverview })));
const HowItWorks = lazy(() => import("@/components/sections/HowItWorks").then(m => ({ default: m.HowItWorks })));
const Solutions = lazy(() => import("@/components/sections/Solutions").then(m => ({ default: m.Solutions })));
const WhyXshootsms = lazy(() => import("@/components/sections/WhyXshootsms").then(m => ({ default: m.WhyXshootsms })));
const ProductPreview = lazy(() => import("@/components/sections/ProductPreview").then(m => ({ default: m.ProductPreview })));
const Company = lazy(() => import("@/components/sections/Company"));
const GlobalMap = lazy(() => import("@/components/visualizations/GlobalMap").then(m => ({ default: m.GlobalMap })));
const Industries = lazy(() => import("@/components/sections/Industries").then(m => ({ default: m.Industries })));
const Testimonials = lazy(() => import("@/components/sections/Testimonials").then(m => ({ default: m.Testimonials })));
const FinalCTA = lazy(() => import("@/components/sections/FinalCTA").then(m => ({ default: m.FinalCTA })));

// Modals - only loaded when triggered by user interaction
const OptInModal = lazy(() => import("@/components/OptInModal").then(m => ({ default: m.OptInModal })));
const ContactModal = lazy(() => import("@/components/modals/ContactModal").then(m => ({ default: m.ContactModal })));
const PrivacyPolicyModal = lazy(() => import("@/components/modals/legal/PrivacyPolicyModal"));
const TermsModal = lazy(() => import("@/components/modals/legal/TermsModal"));
const CookiePolicyModal = lazy(() => import("@/components/modals/legal/CookiePolicyModal"));
const GDPRModal = lazy(() => import("@/components/modals/legal/GDPRModal"));

/* ---------------- TYPES ---------------- */

type LegalType = "privacy" | "terms" | "cookies" | "gdpr" | null;

// Minimal section fallback
const SectionFallback = () => <div className="min-h-[200px]" />;

/* ---------------- PAGE ---------------- */

export default function Index() {
  const [isOptInOpen, setIsOptInOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [legalModal, setLegalModal] = useState<LegalType>(null);
  const exitIntentTriggered = useExitIntent();

  // Open opt-in modal on exit intent
  useEffect(() => {
    if (exitIntentTriggered) setIsOptInOpen(true);
  }, [exitIntentTriggered]);

  return (
    <>
      <Helmet>
        <title>Xshootsms – Enterprise Messaging Platform</title>
        <meta
          name="description"
          content="Leading WhatsApp Business API and Bulk SMS Provider in India. Secure OTP SMS, Promotional campaigns, RCS Messaging & Enterprise Messaging solutions."
        />
        <meta name="keywords" content="SMS API, WhatsApp Business API, RCS Messaging, Voice API, Enterprise Messaging, Bulk SMS" />
        <link rel="canonical" href="https://xshootsms.com/" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://xshootsms.com/" />
        <meta property="og:title" content="Xshootsms – Enterprise Messaging Platform" />
        <meta property="og:description" content="Power mission-critical communication with Xshootsms. Scalable SMS, WhatsApp, RCS & Voice APIs for modern businesses." />
        <meta property="og:image" content="https://xshootsms.com/og-image.svg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://xshootsms.com/" />
        <meta property="twitter:title" content="Xshootsms – Enterprise Messaging Platform" />
        <meta property="twitter:description" content="Power mission-critical communication with Xshootsms. Scalable SMS, WhatsApp, RCS & Voice APIs for modern businesses." />
        <meta property="twitter:image" content="https://xshootsms.com/og-image.svg" />

        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Xshootsms",
              "url": "https://xshootsms.com",
              "logo": "https://xshootsms.com/xxx.jpeg",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91 97391 75550",
                "contactType": "sales",
                "areaServed": "IN",
                "availableLanguage": "en"
              },
              "sameAs": [
                "https://www.facebook.com/shootbulksms",
                "https://www.instagram.com/xshootsms?igsh=MWN5dHFyNmk1M2dsZQ=="
              ]
            }
          `}
        </script>
      </Helmet>

      <div className="min-h-screen flex flex-col">
        {/* NAVBAR */}
        <Navbar
          onOpenOptIn={() => setIsOptInOpen(true)}
          onOpenContact={() => setIsContactOpen(true)}
        />

        {/* MAIN CONTENT */}
        <main className="flex-1" id="main-content">
          {/* Above-the-fold: loaded eagerly for fast FCP/LCP */}
          <Hero
            onOpenOptIn={() => setIsOptInOpen(true)}
            onOpenContact={() => setIsContactOpen(true)}
          />
          <TrustStrip />

          {/* Below-the-fold: lazy loaded to reduce initial bundle */}
          <Suspense fallback={<SectionFallback />}>
            <PlatformOverview />
            <HowItWorks />
            <Solutions />
            <WhyXshootsms />
            <ProductPreview />
            <Company />
            <GlobalMap />
            <Industries />
            <Testimonials />
            <FinalCTA />
          </Suspense>
        </main>

        {/* FOOTER */}
        <Footer onOpenLegal={setLegalModal} />

        {/* MODALS - only loaded when user triggers them */}
        <Suspense fallback={null}>
          {isOptInOpen && (
            <OptInModal
              open={isOptInOpen}
              onClose={() => setIsOptInOpen(false)}
            />
          )}

          {isContactOpen && (
            <ContactModal
              isOpen={isContactOpen}
              onClose={() => setIsContactOpen(false)}
            />
          )}

          {/* LEGAL MODALS */}
          {legalModal === "privacy" && (
            <PrivacyPolicyModal onClose={() => setLegalModal(null)} />
          )}

          {legalModal === "terms" && (
            <TermsModal onClose={() => setLegalModal(null)} />
          )}

          {legalModal === "cookies" && (
            <CookiePolicyModal onClose={() => setLegalModal(null)} />
          )}

          {legalModal === "gdpr" && (
            <GDPRModal onClose={() => setLegalModal(null)} />
          )}
        </Suspense>
      </div>

      {/* Global floating elements */}
      <MobileCTABar onOpenOptIn={() => setIsOptInOpen(true)} />
      <WhatsAppFloat />
    </>
  );
}
