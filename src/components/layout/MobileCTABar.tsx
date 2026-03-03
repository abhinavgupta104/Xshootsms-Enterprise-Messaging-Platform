import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

type Props = {
    onOpenOptIn: () => void;
};

/**
 * Sticky bottom CTA bar — mobile only (hidden on lg+).
 * Slides up on mount and stays pinned above any system chrome.
 */
export const MobileCTABar = ({ onOpenOptIn }: Props) => {
    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="fixed bottom-0 left-0 right-0 z-[9998] lg:hidden"
            >
                {/* Safe-area padding for iOS home bar */}
                <div className="bg-background/95 backdrop-blur-xl border-t border-border/60 shadow-[0_-8px_32px_rgba(0,0,0,0.12)] px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))]">
                    <button
                        onClick={onOpenOptIn}
                        className="w-full btn-primary h-12 rounded-xl flex items-center justify-center gap-2 font-semibold text-base"
                    >
                        Get a Quote — It&apos;s Free
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};
