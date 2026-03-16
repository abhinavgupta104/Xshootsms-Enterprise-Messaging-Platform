import { AdLandingPage } from "@/components/landing/AdLandingPage";

export default function LpBulkSms() {
  return (
    <AdLandingPage
      serviceKey="bulk-sms"
      accentColor="emerald"
      badge="Bulk SMS Platform"
      title="Enterprise Messaging Infrastructure Built For Scale"
      subtitle="High-throughput SMS delivery with intelligent routing, DLT compliance, and real-time analytics. Send millions of messages with consistent delivery and transparent pricing."
      heroBullets={[
        "Promotional and transactional routes",
        "DLT compliance built in",
        "High-speed REST API",
        "Real-time delivery callbacks",
      ]}
      socialProof={{
        stats: [
          { value: "10M+", label: "Messages delivered daily" },
          { value: "98.3%", label: "Average delivery rate" },
          { value: "8.2K/sec", label: "Peak throughput" },
          { value: "<200ms", label: "API latency" },
        ],
      }}
      problem={{
        title: "Campaign performance suffers with unreliable delivery infrastructure",
        description:
          "When routing quality is inconsistent and DLT compliance is unclear, SMS campaigns underperform. Delivery delays cost revenue, and lack of visibility makes optimization impossible.",
        bullets: [
          "Delivery delays destroy time-sensitive campaign ROI",
          "DLT complexity slows go-to-market execution",
          "Zero visibility into delivery failures and root causes",
        ],
      }}
      solution={{
        title: "Transparent, high-performance messaging at any scale",
        description:
          "H2S provides optimized routing, automated DLT compliance, and real-time analytics to maximize campaign reach and efficiency from day one.",
        bullets: [
          "Intelligent routing for consistent delivery across carriers",
          "Automated DLT setup and template approval workflows",
          "Granular delivery analytics with failure reason breakdowns",
        ],
      }}
      features={[
        {
          title: "High-Speed API",
          description: "Send millions of messages through robust REST APIs with sub-200ms latency.",
        },
        {
          title: "DLT Compliance",
          description: "Automated sender ID registration, template management, and regulatory compliance.",
        },
        {
          title: "Smart Routing",
          description: "Intelligent carrier selection for optimal delivery rates across all networks.",
        },
        {
          title: "Live Reporting",
          description: "Track sent, delivered, failed, and callback status with real-time dashboards.",
        },
      ]}
      benefits={[
        {
          metric: "98%+",
          label: "Delivery Rate",
          description: "Optimized routing delivers consistent performance across all major carriers.",
        },
        {
          metric: "30%",
          label: "Lower Cost",
          description: "Smart routing and volume optimization reduce per-message spend significantly.",
        },
        {
          metric: "<24 hrs",
          label: "Setup Time",
          description: "From signup to first API call in under a day with automated DLT onboarding.",
        },
      ]}
      howItWorks={[
        {
          step: "01",
          title: "Requirements",
          description: "Define campaign type, expected volume, and delivery targets.",
        },
        {
          step: "02",
          title: "Compliance Setup",
          description: "Configure DLT registration, sender IDs, and template approvals.",
        },
        {
          step: "03",
          title: "API Integration",
          description: "Connect your systems and start triggering SMS workflows via REST API.",
        },
        {
          step: "04",
          title: "Scale",
          description: "Monitor delivery analytics and continuously tune route performance.",
        },
      ]}
      faqs={[
        {
          question: "Do you support both transactional and promotional SMS?",
          answer:
            "Yes. We provide separate optimized routes for promotional and transactional messages with full DLT compliance for both.",
        },
        {
          question: "Can we integrate SMS with our product backend?",
          answer:
            "Yes. Our REST API supports programmatic SMS triggers for transactional events, alerts, and marketing campaigns from any stack.",
        },
        {
          question: "How granular are your delivery reports?",
          answer:
            "We provide per-message delivery status with failure reason codes, carrier-level reporting, and real-time webhook callbacks.",
        },
      ]}
      heroImage="/landing/sms-hero.svg"
      finalCtaTitle="Ready to scale your messaging with enterprise-grade infrastructure?"
      finalCtaText="Get a custom SMS implementation plan with optimized routing, DLT compliance automation, and transparent volume-based pricing."
      ctaText="Start Messaging Now"
    />
  );
}
