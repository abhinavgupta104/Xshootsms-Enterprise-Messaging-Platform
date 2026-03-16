import { AdLandingPage } from "@/components/landing/AdLandingPage";

export default function LpRcs() {
  return (
    <AdLandingPage
      serviceKey="rcs"
      accentColor="purple"
      badge="RCS Business Messaging"
      title="Transform Customer Conversations With Rich Messaging"
      subtitle="Send branded, interactive messages with carousels, CTAs, and verified sender identity. Replace plain SMS with app-like experiences that convert."
      heroBullets={[
        "Verified sender identity",
        "Rich cards and carousels",
        "Real-time analytics",
        "API-first integration",
      ]}
      socialProof={{
        stats: [
          { value: "10M+", label: "RCS messages delivered" },
          { value: "4.2x", label: "Higher engagement vs SMS" },
          { value: "500+", label: "Businesses onboarded" },
          { value: "98.7%", label: "Delivery rate" },
        ],
      }}
      problem={{
        title: "Plain text messages are invisible in a crowded inbox",
        description:
          "When messages lack branding, visuals, and interactive elements, they get ignored. Unknown sender IDs erode trust and kill conversions before they start.",
        bullets: [
          "Flat click-through rates on text-only campaigns",
          "Zero brand presence inside the message thread",
          "Customers distrust messages from unknown senders",
        ],
      }}
      solution={{
        title: "Branded, interactive messaging infrastructure",
        description:
          "H2S gives you verified RCS channels with rich media templates, carousel support, and one-tap CTAs that feel native and convert instantly.",
        bullets: [
          "Verified business profile with logo and brand colors",
          "Carousels, hero images, and quick-reply buttons",
          "End-to-end delivery, read, and click tracking",
        ],
      }}
      features={[
        {
          title: "Verified Sender",
          description: "Display your brand identity directly in the message thread for instant trust.",
        },
        {
          title: "Rich Media Templates",
          description: "Send carousels, hero images, and CTA buttons in a single interactive message.",
        },
        {
          title: "Smart Segmentation",
          description: "Target audiences by behavior, lifecycle stage, or geography for precision campaigns.",
        },
        {
          title: "API and Automation",
          description: "Trigger RCS flows from your CRM, checkout, or marketing stack via REST APIs.",
        },
      ]}
      benefits={[
        {
          metric: "4.2x",
          label: "Higher Engagement",
          description: "Interactive rich content drives dramatically stronger response vs plain SMS.",
        },
        {
          metric: "35%+",
          label: "Click-Through Rate",
          description: "Visual CTAs and product cards produce measurably higher campaign performance.",
        },
        {
          metric: "<72 hrs",
          label: "Go-Live",
          description: "From signup to live campaign in under three days with guided onboarding.",
        },
      ]}
      howItWorks={[
        {
          step: "01",
          title: "Discovery Call",
          description: "We map your campaigns, audiences, and conversion goals together.",
        },
        {
          step: "02",
          title: "Template Design",
          description: "Create rich RCS creatives with message logic and branded CTAs.",
        },
        {
          step: "03",
          title: "Integration",
          description: "Connect API/webhook flows and validate delivery behavior end-to-end.",
        },
        {
          step: "04",
          title: "Launch and Scale",
          description: "Go live, track CTR and conversion, iterate based on real data.",
        },
      ]}
      faqs={[
        {
          question: "Is RCS better than SMS for promotions?",
          answer:
            "For most campaign types, yes. RCS adds branding, rich visuals, and CTA buttons that significantly improve click and conversion rates compared to plain-text SMS.",
        },
        {
          question: "Do you provide template design support?",
          answer:
            "Yes. Our team helps with campaign architecture, template planning, and launch-ready message assets so you can go live fast.",
        },
        {
          question: "Can RCS integrate with our existing CRM?",
          answer:
            "Absolutely. We provide REST API and webhook integrations so your internal systems can trigger and track RCS campaigns programmatically.",
        },
      ]}
      heroImage="/landing/rcs-hero.svg"
      finalCtaTitle="Ready to upgrade from SMS to rich, branded messaging?"
      finalCtaText="Get a custom RCS implementation plan with campaign architecture, API integration roadmap, and priority onboarding from our engineering team."
      ctaText="Start Free Demo"
    />
  );
}
