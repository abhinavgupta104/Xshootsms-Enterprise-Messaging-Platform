import { AdLandingPage } from "@/components/landing/AdLandingPage";

export default function LpVoiceCall() {
  return (
    <AdLandingPage
      serviceKey="voice-call"
      accentColor="blue"
      badge="Voice Call API"
      title="Programmable Voice Infrastructure For Critical Communications"
      subtitle="Automated outbound calls for OTP fallback, urgent alerts, and scheduled reminders. Enterprise-grade reliability with sub-second API triggers."
      heroBullets={[
        "Automated call workflows",
        "OTP fallback triggers",
        "Multilingual TTS support",
        "Real-time call analytics",
      ]}
      socialProof={{
        stats: [
          { value: "5M+", label: "Calls processed monthly" },
          { value: "99.9%", label: "API uptime SLA" },
          { value: "87%", label: "Average pickup rate" },
          { value: "<200ms", label: "API response time" },
        ],
      }}
      problem={{
        title: "Critical alerts fail when text-only channels are unreliable",
        description:
          "OTP delivery, payment confirmations, and emergency notifications need a fallback that cuts through noise. SMS alone leaves gaps that cost revenue.",
        bullets: [
          "SMS can be missed or delayed during high-traffic periods",
          "Manual calling workflows are expensive and do not scale",
          "No automated fallback when primary channels fail",
        ],
      }}
      solution={{
        title: "Intelligent voice automation with smart triggers",
        description:
          "H2S voice APIs let you launch automated calls for reminders, OTP fallback, and time-sensitive alerts at any scale with real-time monitoring.",
        bullets: [
          "Pre-built call templates for rapid deployment",
          "API and webhook triggers from your existing systems",
          "Live call status monitoring and outcome analytics",
        ],
      }}
      features={[
        {
          title: "Text-to-Speech Engine",
          description: "Dynamic multilingual TTS or pre-recorded audio for any use case.",
        },
        {
          title: "Fallback Logic",
          description: "Auto-trigger voice calls when SMS OTP delivery is not confirmed.",
        },
        {
          title: "Call Scheduling",
          description: "Batch calls by geography, timezone, or business-hour windows.",
        },
        {
          title: "Delivery Analytics",
          description: "Track answer rate, call duration, and completion metrics in real time.",
        },
      ]}
      benefits={[
        {
          metric: "+28%",
          label: "Alert Completion",
          description: "Voice fallback dramatically improves successful delivery of urgent notifications.",
        },
        {
          metric: "99.9%",
          label: "API Uptime",
          description: "Enterprise-grade infrastructure for business-critical call events.",
        },
        {
          metric: "<48 hrs",
          label: "Go-Live",
          description: "Launch your first voice campaign with guided implementation support.",
        },
      ]}
      howItWorks={[
        {
          step: "01",
          title: "Workflow Planning",
          description: "Define call triggers, scripts, and escalation logic for your use case.",
        },
        {
          step: "02",
          title: "Voice Configuration",
          description: "Set up language, voice profile, and optimized delivery routes.",
        },
        {
          step: "03",
          title: "System Integration",
          description: "Connect your app or CRM to initiate calls via our REST API.",
        },
        {
          step: "04",
          title: "Monitor and Optimize",
          description: "Track outcomes in real time and optimize based on pickup patterns.",
        },
      ]}
      faqs={[
        {
          question: "Can voice calls be used as OTP fallback?",
          answer:
            "Yes. Configure automatic fallback logic to trigger a voice call when SMS OTP delivery is not confirmed within your specified timeout.",
        },
        {
          question: "Do you support multilingual campaigns?",
          answer:
            "Yes. We support multiple languages using both TTS and pre-recorded audio content, configurable per campaign or recipient.",
        },
        {
          question: "Is call status available in real time?",
          answer:
            "Yes. You receive webhook callback events and real-time reports for answered, failed, and completed calls.",
        },
      ]}
      heroImage="/landing/voice-hero.svg"
      finalCtaTitle="Need a fail-safe voice layer for mission-critical communications?"
      finalCtaText="Get a custom voice automation strategy with optimized call flows, fallback design, and priority engineering support for your integration."
      ctaText="Book Demo"
    />
  );
}
