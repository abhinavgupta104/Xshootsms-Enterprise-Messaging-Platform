import { X } from "lucide-react";

type LegalModalProps = {
  onClose: () => void;
};

const PrivacyPolicyModal = ({ onClose }: LegalModalProps) => {
  return (
    <div className="fixed inset-0 z-[99999] flex items-start justify-center bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative my-16 w-full max-w-4xl rounded-xl bg-background p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
        >
          <X size={20} />
        </button>

        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            We respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our website and services.

Information We Collect

We may collect:

Your name, email address, phone number, and company details

Information you submit through forms or inquiries

Usage data such as IP address, browser type, pages visited, and interaction data

Cookies and similar tracking technologies

How We Use Your Information

We use your information to:

Provide, operate, and improve our services

Respond to inquiries and provide customer support

Send service-related or marketing communications (you may opt out at any time)

Maintain security, prevent fraud, and comply with legal obligations

We do not sell your personal data.

Cookies

We use cookies to improve functionality and analyze website usage. You can manage or disable cookies through your browser settings. Disabling cookies may limit certain features of the service.

Data Sharing

We may share information with trusted third-party service providers who assist us in operating our services, such as hosting, analytics, or support. These providers are required to protect your data and use it only for authorized purposes.

Data Security

We implement reasonable technical and organizational measures to protect your information. However, no method of online transmission or storage is completely secure.

Children’s Privacy

Our services are not intended for individuals under the age of 13. We do not knowingly collect personal data from children.

International Data Transfers

Your information may be processed in countries where data protection laws may differ. By using our services, you consent to such processing.

Your Rights

Depending on applicable laws, you may have the right to access, correct, delete, or restrict the processing of your personal data.

Changes to This Policy

We may update this Privacy Policy from time to time. Any changes will be effective once posted.

Contact Us

If you have questions about this Privacy Policy, you can contact us at:
📧 hello@xshootsms.com
          </p>

          <p>
            We collect only the information necessary to provide our services
            and comply with legal obligations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyModal;
