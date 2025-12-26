import { Button } from "@/components/ui/button";

export const OptInModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center">
      <div className="bg-white text-black p-8 rounded-xl space-y-4">
        <h2 className="text-2xl font-bold">OPT-IN MODAL</h2>

        <Button onClick={onClose}>Close</Button>
      </div>
    </div>
  );
};
