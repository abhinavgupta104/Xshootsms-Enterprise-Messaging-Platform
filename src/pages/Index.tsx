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
import { Industries } from "@/components/sections/Industries";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCTA } from "@/components/sections/FinalCTA";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Xshootsms - Enterprise Messaging Platform | Bulk SMS, RCS, WhatsApp & Voice APIs</title>
        <meta 
          name="description" 
          content="Xshootsms is an enterprise-grade CPaaS platform for Bulk SMS, RCS, WhatsApp Business, and Voice APIs. Scale your business communication with 99.9% uptime and global reach." 
        />
        <meta name="keywords" content="bulk SMS, RCS messaging, WhatsApp Business API, voice API, CPaaS, enterprise messaging, SMS gateway" />
        <meta property="og:title" content="Xshootsms - Enterprise Messaging That Scales With Your Business" />
        <meta property="og:description" content="Bulk SMS, RCS, WhatsApp Business & Voice APIs built for speed, reliability, and growth." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://xshootsms.com" />
      </Helmet>

      <div className="min-h-screen">
        <Navbar />
        <main>
          <Hero />
          <TrustStrip />
          <PlatformOverview />
          <HowItWorks />
          <Solutions />
          <WhyXshootsms />
          <ProductPreview />
          <Industries />
          <Testimonials />
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
