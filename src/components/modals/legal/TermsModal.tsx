import { X } from "lucide-react";

type LegalModalProps = {
  onClose: () => void;
};

const TermsModal = ({ onClose }: LegalModalProps) => {
  return (
    <div className="fixed inset-0 z-[99999] flex items-start justify-center bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative my-16 w-full max-w-4xl rounded-xl bg-background p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
        >
          <X size={20} />
        </button>

        <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>

        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            These Terms of Service (“Terms”) govern your access to and use of the Xshootsms platform, website, APIs, and messaging services. By using our services, you agree to be bound by these Terms.

About Our Services

We provide enterprise communication solutions including SMS, WhatsApp messaging, email, voice services, APIs, and automation tools that enable businesses to send and manage messages at scale through their applications or systems.

Our services may include delivery reports, analytics, dashboards, APIs (HTTP, SMPP, XML), and developer tools.

Eligibility

You must be a business entity or authorized representative to use our services. You agree to provide accurate, current, and complete information when registering or using the platform.

Client Responsibilities

You are responsible for:

Ensuring all message content complies with applicable laws and regulations

Obtaining all required consents from end users before sending messages

Including opt-out mechanisms for promotional messages where required

Securing your account credentials and access keys

Preventing misuse, spam, fraud, or unlawful activity using our services

You must not use our platform for illegal, abusive, or deceptive purposes.

Message Content

You retain responsibility for all content sent using our services. We do not review, approve, or control message content and are not liable for content created or transmitted by you.

APIs & Developer Access

We may provide APIs, documentation, and developer tools to integrate our services into your systems. You are responsible for ensuring secure implementation and compliance with our technical guidelines.

Service Availability

We strive to provide reliable services but do not guarantee uninterrupted or error-free delivery. Message delivery may be affected by network issues, telecom operators, or factors beyond our control.

Fees & Billing

You agree to pay all applicable fees associated with your usage. Fees may be usage-based, recurring, or one-time, as agreed. Failure to pay may result in service suspension or termination.

Termination

We may suspend or terminate access to our services if:

You violate these Terms

Required payments are not made

We are legally required to do so

Upon termination, you must stop using our services and APIs.

Intellectual Property

We retain all rights, title, and interest in our platform, software, APIs, and content. You receive a limited, non-exclusive right to use our services during the term of your agreement.

Data Protection & Privacy

You are responsible for obtaining all necessary user consents under applicable data protection laws. We process personal data only to provide our services and in accordance with our Privacy Policy.

Disclaimer

Our services are provided “as is” and “as available.” We disclaim all warranties to the extent permitted by law, including implied warranties of merchantability or fitness for a particular purpose.

Limitation of Liability

To the maximum extent permitted by law, we are not liable for indirect, incidental, special, or consequential damages, including lost profits or business interruption.

Our total liability shall not exceed the fees paid by you for the services during the preceding twelve (12) months.

Indemnification

You agree to indemnify and hold us harmless from claims, damages, or losses arising from your misuse of the services, violation of laws, or breach of these Terms.

Force Majeure

We are not responsible for delays or failures caused by events beyond our reasonable control, including network outages, natural disasters, or governmental actions.

Governing Law & Dispute Resolution

These Terms are governed by the laws of India. Any disputes shall be resolved through arbitration in accordance with applicable Indian arbitration laws.

Changes to These Terms

We may update these Terms from time to time. Continued use of the services after changes means you accept the updated Terms.
          </p>

          <h2 className="text-xl font-semibold text-foreground">
            Use of Services
          </h2>
          <ul className="list-disc pl-6">
            <li>You must use the platform lawfully</li>
            <li>Unauthorized or abusive use is prohibited</li>
            <li>You are responsible for your account activity</li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground">
            Limitation of Liability
          </h2>
          <p>
            Xshootsms is not liable for indirect, incidental, or consequential
            damages arising from the use of the platform.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
