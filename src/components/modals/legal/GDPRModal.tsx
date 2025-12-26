import { X } from "lucide-react";

type LegalModalProps = {
  onClose: () => void;
};

const GDPRModal = ({ onClose }: LegalModalProps) => {
  return (
    <div className="fixed inset-0 z-[99999] flex items-start justify-center bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative my-16 w-full max-w-4xl rounded-xl bg-background p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
        >
          <X size={20} />
        </button>

        <h1 className="text-3xl font-bold mb-6">GDPR Compliance</h1>

        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
           We are committed to protecting your personal data and respecting your privacy rights in accordance with the General Data Protection Regulation (GDPR).

This notice explains how we handle personal data and the rights available to you under GDPR.

How We Process Personal Data

We process personal data only when there is a lawful basis to do so, including:

Your consent

Performance of a contract

Compliance with legal obligations

Legitimate business interests

Personal data is used solely to provide, operate, and improve our services.

Your Rights Under GDPR

Subject to applicable law, you have the right to:

Access your personal data

Request correction of inaccurate or incomplete data

Request deletion of your data

Restrict or object to processing

Request data portability

Withdraw consent at any time (where processing is based on consent)

Data Retention

We retain personal data only for as long as necessary to fulfill the purposes for which it was collected, or as required by law.

Data Security

We implement appropriate technical and organizational measures to protect personal data against unauthorized access, loss, misuse, or disclosure. However, no system can guarantee absolute security.

Data Transfers

Your personal data may be transferred to and processed in countries outside your jurisdiction, including India. We ensure appropriate safeguards are in place for such transfers.

Third-Party Processing

We may share personal data with trusted third-party service providers solely for service delivery and operational purposes. These providers are required to process data in compliance with GDPR standards.
          </p>

          <h2 className="text-xl font-semibold text-foreground">
            Your Rights
          </h2>
          <ul className="list-disc pl-6">
            <li>Right to access your data</li>
            <li>Right to rectification and erasure</li>
            <li>Right to data portability</li>
            <li>Right to withdraw consent</li>
          </ul>

          <p>
            For GDPR-related requests, please contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GDPRModal;
