import { X } from "lucide-react";

type LegalModalProps = {
  onClose: () => void;
};

const CookiePolicyModal = ({ onClose }: LegalModalProps) => {
  return (
    <div className="fixed inset-0 z-[99999] flex items-start justify-center bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative my-16 w-full max-w-4xl rounded-xl bg-background p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
        >
          <X size={20} />
        </button>

        <h1 className="text-3xl font-bold mb-6">Cookie Policy</h1>

        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
           We use cookies and similar tracking technologies to improve your experience, analyze usage, and enhance the performance of our website and services.

This Cookie Policy explains what cookies are, how we use them, and the choices available to you.

What Are Cookies

Cookies are small text files stored on your device by your web browser. They help websites recognize your device, remember preferences, and improve functionality. Cookies do not typically identify you personally unless you choose to provide such information.

Types of Cookies We Use

Essential Cookies
These cookies are necessary for the website to function properly and cannot be disabled in our systems.

Preference Cookies
These cookies remember your settings, such as language or region, to provide a more personalized experience.

Analytics Cookies
These cookies help us understand how users interact with our website, allowing us to improve performance and usability.

Marketing Cookies
These cookies may be used to deliver relevant content and measure the effectiveness of marketing campaigns.

How We Use Cookies

We use cookies to:

Remember user preferences

Improve website functionality and security

Analyze traffic and usage patterns

Prevent fraud and misuse

Deliver relevant content and communications

Third-Party Cookies

We may allow trusted third-party service providers (such as analytics providers) to place cookies on our website. These cookies are governed by the respective third party’s privacy policies.

Your Consent

We process cookies based on your consent. By clicking “Allow Cookies” or continuing to use our website, you agree to the use of cookies as described in this policy.

Managing or Disabling Cookies

You can control or disable cookies through your browser settings. Please note that disabling cookies may affect certain features or functionality of the website.

Changes to This Cookie Policy

We may update this Cookie Policy from time to time. Any changes will be effective once posted on this page.
          </p>

          <h2 className="text-xl font-semibold text-foreground">
            Types of Cookies We Use
          </h2>
          <ul className="list-disc pl-6">
            <li>Essential cookies</li>
            <li>Analytics cookies</li>
            <li>Performance cookies</li>
          </ul>

          <p>
            You may control or disable cookies through your browser settings.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicyModal;
