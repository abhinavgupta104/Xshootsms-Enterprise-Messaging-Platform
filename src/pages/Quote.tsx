import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Quote() {
  const [consent, setConsent] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const API_BASE = import.meta.env.VITE_API_URL || "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setIsSubmitting(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/api/lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim() || "N/A",
          source: "Get a Quote Page",
        }),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container-custom">
        <div className="relative w-full max-w-md mx-auto rounded-xl bg-background p-8 shadow-2xl">
          <h1 className="text-2xl font-bold mb-2">Get a Quote</h1>
          <p className="text-sm text-muted-foreground mb-4">Enter your details and our team will contact you shortly.</p>

          {isSuccess ? (
            <div className="text-center">
              <h3 className="text-xl font-semibold text-foreground">Thank you!</h3>
              <p className="text-sm text-muted-foreground">Our team will reach out to you shortly.</p>
              <div className="mt-4">
                <Link to="/" className="text-sm text-muted-foreground hover:text-cyan">Back to home</Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                aria-label="Full Name"
                className="w-full rounded-xl border border-border px-4 py-3 focus:ring-2 focus:ring-cyan outline-none bg-background"
              />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Business Email"
                aria-label="Business Email"
                className="w-full rounded-xl border border-border px-4 py-3 focus:ring-2 focus:ring-cyan outline-none bg-background"
              />

              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number"
                aria-label="Phone Number"
                className="w-full rounded-xl border border-border px-4 py-3 focus:ring-2 focus:ring-cyan outline-none bg-background"
              />

              <label className="flex items-start gap-3 text-xs text-muted-foreground leading-relaxed">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1"
                />
                <span>
                  I agree to receive communication from <strong>Xshootsms</strong> via RCS, SMS, WhatsApp, Email, or Call. I understand I can opt out anytime.
                </span>
              </label>

              {error && <p className="text-sm text-red-500 text-center">{error}</p>}

              <Button
                type="submit"
                disabled={!consent || isSubmitting || !name.trim() || !phone.trim()}
                className="w-full py-6 text-base font-semibold btn-primary mt-2"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
