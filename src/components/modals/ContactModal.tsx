import { X, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

type ContactModalProps = {
  open: boolean;
  onClose: () => void;
};

export const ContactModal = ({ open, onClose }: ContactModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50">
      <div className="bg-background rounded-xl p-6 w-[90%] max-w-md relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
        >
          <X />
        </button>

        <h2 className="text-2xl font-semibold mb-2">
          Talk to an Expert
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          Contact our team directly.
        </p>

        <div className="space-y-4">
          <div className="flex items-center gap-3 border rounded-lg p-3">
            <Phone className="text-cyan" />
            <span>+91 12345 67890</span>
          </div>

          <div className="flex items-center gap-3 border rounded-lg p-3">
            <Mail className="text-orange" />
            <span>sales@xshootsms.com</span>
          </div>
        </div>

        <Button className="btn-primary w-full mt-6" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
};
