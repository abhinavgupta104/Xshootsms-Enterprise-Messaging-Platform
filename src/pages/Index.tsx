import { useState } from "react";
import { Helmet } from "react-helmet-async";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { PlatformOverview } from "@/components/sections/PlatformOverview";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Solutions } from "@/components/sections/Solutions";
import { WhyXshootsms } from "@/components/sections/WhyXshootsms";
import { ProductPreview } from "@/components/sections/ProductPreview";
import Company from "@/components/sections/Company";
import { Industries } from "@/components/sections/Industries";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCTA } from "@/components/sections/FinalCTA";

import { OptInModal } from "@/components/OptInModal";
import { ContactModal } from "@/components/modals/ContactModal";

import PrivacyPolicyModal from "@/components/modals/legal/PrivacyPolicyModal";
import TermsModal from "@/components/modals/legal/TermsModal";
import CookiePolicyModal from "@/components/modals/legal/CookiePolicyModal";
import GDPRModal from "@/components/modals/legal/GDPRModal";

/* ---------------- TYPES ---------------- */

type LegalType = "privacy" | "terms" | "cookies" | "gdpr" | null;

/* ---------------- PAGE ---------------- */

export default function Index() {
  const [isOptInOpen, setIsOptInOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [legalModal, setLegalModal] = useState<LegalType>(null);

  return (
    <>
      <Helmet>
        <title>Xshootsms – Enterprise Messaging Platform</title>
      </Helmet>

      <div className="min-h-screen flex flex-col">
        {/* NAVBAR */}
        <Navbar
          onOpenOptIn={() => setIsOptInOpen(true)}
          onOpenContact={() => setIsContactOpen(true)}
        />

        {/* MAIN CONTENT */}
        <main className="flex-1">
          <Hero
            onOpenOptIn={() => setIsOptInOpen(true)}
            onOpenContact={() => setIsContactOpen(true)}
          />
          <TrustStrip />
          <PlatformOverview />
          <HowItWorks />
          <Solutions />
          <WhyXshootsms />
          <ProductPreview />
          <Company />
          <Industries />
          <Testimonials />
          <FinalCTA />
        </main>

        {/* FOOTER */}
        <Footer onOpenLegal={setLegalModal} />

        {/* CORE MODALS */}
        <OptInModal
          open={isOptInOpen}
          onClose={() => setIsOptInOpen(false)}
        />

        <ContactModal
          open={isContactOpen}
          onClose={() => setIsContactOpen(false)}
        />

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
      </div>
    </>
  );
}
