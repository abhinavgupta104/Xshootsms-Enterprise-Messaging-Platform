import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL || '';

interface OptInModalProps {
  open: boolean;
  onClose: () => void;
}

export const OptInModal = ({ open, onClose }: OptInModalProps) => {
  const [consent, setConsent] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setConsent(false);
    setIsSuccess(false);
    setError('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setIsSubmitting(true);
    setError('');

    try {
      const res = await fetch(`${API_BASE}/api/lead`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim() || 'N/A',
          source: 'Get a Quote Form',
        }),
      });

      if (!res.ok) throw new Error('Failed to submit');

      setIsSuccess(true);
    } catch (err) {
      console.error('Quote form submission error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-md"
            onClick={handleClose}
          />

          {/* MODAL WRAPPER (CENTERED FIX) */}
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 18 }}
              className="w-full max-w-md"
            >
              <div className="bg-background rounded-2xl shadow-2xl border border-border overflow-hidden">

                {/* HEADER */}
                <div className="p-6 border-b border-border relative">
                  <button
                    onClick={handleClose}
                    className="absolute right-4 top-4 text-muted-foreground hover:text-foreground min-h-12 min-w-12 flex items-center justify-center"
                    aria-label="Close opt-in form"
                  >
                    <X size={20} />
                  </button>

                  <h2 className="text-2xl font-bold">
                    Get started with Xshootsms
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Enter your details and our team will contact you shortly.
                  </p>
                </div>

                {/* BODY */}
                {isSuccess ? (
                  <div className="p-8 text-center space-y-3">
                    <CheckCircle className="mx-auto text-green-500" size={48} />
                    <h3 className="text-xl font-semibold text-foreground">Thank you!</h3>
                    <p className="text-sm text-muted-foreground">
                      Our team will reach out to you shortly.
                    </p>
                    <Button onClick={handleClose} className="mt-4 btn-primary">
                      Close
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="p-6 space-y-4">
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
                        I agree to receive communication from{" "}
                        <strong>Xshootsms</strong> via RCS, SMS, WhatsApp, Email, or
                        Call. I understand I can opt out anytime.
                      </span>
                    </label>

                    {error && (
                      <p className="text-sm text-red-500 text-center">{error}</p>
                    )}

                    {/* SUBMIT BUTTON */}
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
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
