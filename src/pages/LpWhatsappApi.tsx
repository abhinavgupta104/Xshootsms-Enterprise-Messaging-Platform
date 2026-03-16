import { AdLandingPage } from "@/components/landing/AdLandingPage";

export default function LpWhatsappApi() {
  return (
    <AdLandingPage
      serviceKey="whatsapp-api"
      accentColor="cyan"
      badge="WhatsApp Business API"
      title="Enterprise WhatsApp Automation For Sales And Support"
      subtitle="Convert conversations into revenue with official API automation, intelligent chatbots, and seamless CRM integration. Scale customer engagement 24/7."
      heroBullets={[
        "Official API onboarding",
        "Bot + agent hybrid flows",
        "CRM and backend sync",
        "Template management",
      ]}
      socialProof={{
        stats: [
          { value: "8M+", label: "WhatsApp messages monthly" },
          { value: "3x", label: "Faster lead response" },
          { value: "24/7", label: "Automated availability" },
          { value: "+40%", label: "Support productivity" },
        ],
      }}
      problem={{
        title: "Leads go cold when response times are inconsistent",
        description:
          "Without structured WhatsApp automation, teams miss high-intent leads, support quality becomes unpredictable, and conversions leak at every stage of the funnel.",
        bullets: [
          "Manual chat workflows create delayed first responses",
          "No standardized message templates across teams",
          "Zero visibility into conversation-level conversion data",
        ],
      }}
      solution={{
        title: "A complete WhatsApp conversion engine",
        description:
          "H2S enables API-driven WhatsApp journeys for lead qualification, customer support, reminders, and post-sale engagement with full automation.",
        bullets: [
          "Template strategy for marketing, utility, and service messages",
          "Trigger-based conversation workflows with smart routing",
          "Unified analytics for response time and conversion tracking",
        ],
      }}
      features={[
        {
          title: "Official WhatsApp API",
          description: "Compliant setup with production-ready messaging flows and template approval.",
        },
        {
          title: "Bot + Agent Hybrid",
          description: "Automate common intents and seamlessly hand over to human agents when needed.",
        },
        {
          title: "Conversation Automation",
          description: "Trigger contextual updates, reminders, and drip sequences automatically.",
        },
        {
          title: "CRM Integration",
          description: "Push lead status and conversation outcomes to Salesforce, HubSpot, or custom systems.",
        },
      ]}
      benefits={[
        {
          metric: "3x",
          label: "Faster Response",
          description: "Automated first replies reduce wait time and dramatically improve conversion odds.",
        },
        {
          metric: "+40%",
          label: "Team Productivity",
          description: "Templates and bot automation help support teams handle more conversations daily.",
        },
        {
          metric: "24/7",
          label: "Always On",
          description: "Keep engagement active with intelligent automation beyond business hours.",
        },
      ]}
      howItWorks={[
        {
          step: "01",
          title: "Funnel Mapping",
          description: "Identify acquisition, support, and retention touchpoints for automation.",
        },
        {
          step: "02",
          title: "API Setup",
          description: "Configure official API access, templates, and compliance verification.",
        },
        {
          step: "03",
          title: "Automation Build",
          description: "Implement chatbot flows, routing rules, and CRM connectors.",
        },
        {
          step: "04",
          title: "Optimize",
          description: "Measure outcomes and continuously improve engagement quality.",
        },
      ]}
      faqs={[
        {
          question: "Do you handle official WhatsApp API onboarding?",
          answer:
            "Yes. We provide end-to-end onboarding including business verification, API setup, and template approval for production-ready usage.",
        },
        {
          question: "Can we automate lead qualification on WhatsApp?",
          answer:
            "Yes. We design automated flows to collect intent signals, score leads, route to sales, and trigger follow-up actions automatically.",
        },
        {
          question: "Will this integrate with our existing CRM?",
          answer:
            "Yes. We provide API and webhook integrations with Salesforce, HubSpot, Zoho, and custom internal systems out of the box.",
        },
      ]}
      heroImage="/landing/whatsapp-hero.svg"
      finalCtaTitle="Ready to turn WhatsApp into your highest-converting channel?"
      finalCtaText="Get a custom WhatsApp API implementation plan with automation design, CRM integration, and dedicated engineering support."
      ctaText="Start Free Demo"
    />
  );
}
