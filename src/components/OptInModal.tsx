import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface OptInModalProps {
  open: boolean;
  onClose: () => void;
}

export const OptInModal = ({ open, onClose }: OptInModalProps) => {
  const [consent, setConsent] = useState(false);

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
            onClick={onClose}
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
                    onClick={onClose}
                    className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
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
                <div className="p-6 space-y-4">
                  <input
                    required
                    placeholder="Full Name"
                    className="w-full rounded-xl border border-border px-4 py-3 focus:ring-2 focus:ring-cyan outline-none bg-background"
                  />

                  <input
                    type="email"
                    required
                    placeholder="Business Email"
                    className="w-full rounded-xl border border-border px-4 py-3 focus:ring-2 focus:ring-cyan outline-none bg-background"
                  />

                  <input
                    type="tel"
                    required
                    placeholder="Phone Number"
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
                      <strong>Xshootsms</strong> via SMS, WhatsApp, Email, or
                      Call. I understand I can opt out anytime.
                    </span>
                  </label>

                  {/* SUBMIT BUTTON */}
                  <Button
                    disabled={!consent}
                    className="w-full py-6 text-base font-semibold btn-primary mt-2"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
