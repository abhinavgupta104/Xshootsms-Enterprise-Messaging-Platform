import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Instagram } from "lucide-react";

const WA_URL = "https://wa.me/919739175550?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20Xshootsms%20messaging%20solutions.";
const INSTA_URL = "https://www.instagram.com/xshootsms_/";
const PHONE_URL = "tel:+919739175550";

const ContactButton = ({
    href,
    icon: Icon,
    label,
    color,
    style,
    delay,
    customIcon,
    showPulse = false,
    gradientClass
}: {
    href: string;
    icon?: React.ElementType;
    label: string;
    color?: string;
    style?: React.CSSProperties;
    delay: number;
    customIcon?: React.ReactNode;
    showPulse?: boolean;
    gradientClass?: string;
}) => {
    const [hovered, setHovered] = useState(false);

    return (
        <div className="relative group flex items-center justify-center">
            <AnimatePresence>
                {hovered && (
                    <motion.div
                        initial={{ opacity: 0, x: 10, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute right-[calc(100%+16px)] bg-white/95 backdrop-blur-xl text-slate-800 text-sm font-semibold px-4 py-2.5 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] border border-white/60 whitespace-nowrap z-10"
                    >
                        {label}
                        {/* Smooth Arrow */}
                        <svg className="absolute -right-[6px] top-1/2 -translate-y-1/2 w-2 h-4 text-white/95" viewBox="0 0 8 16" fill="currentColor">
                            <path d="M0 0l8 8-8 8V0z" />
                        </svg>
                    </motion.div>
                )}
            </AnimatePresence>

            <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="block outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-full"
            >
                {/* Glow Effect behind the button */}
                <motion.div
                    animate={{ opacity: hovered ? 0.6 : 0, scale: hovered ? 1.2 : 1 }}
                    transition={{ duration: 0.3 }}
                    className={`absolute inset-0 rounded-full blur-xl z-0 ${gradientClass}`}
                    style={{ background: color, ...style }}
                />

                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay, duration: 0.5, type: "spring", bounce: 0.4 }}
                    whileHover={{ scale: 1.15, rotate: href.includes("tel:") ? [0, -10, 10, -10, 10, 0] : 0 }}
                    whileTap={{ scale: 0.9 }}
                    className={`relative w-12 h-12 lg:w-14 lg:h-14 rounded-full shadow-[0_8px_16px_rgba(0,0,0,0.15),inset_0_2px_4px_rgba(255,255,255,0.4)] flex items-center justify-center text-white border border-white/30 transition-shadow duration-300 hover:shadow-[0_15px_30px_rgba(0,0,0,0.2),inset_0_2px_4px_rgba(255,255,255,0.5)] z-10 ${gradientClass || ""}`}
                    style={!gradientClass ? { background: color, ...style } : style}
                >
                    {showPulse && (
                        <motion.span
                            animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0, 0.4] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute inset-0 rounded-full z-0"
                            style={{ background: color }}
                        />
                    )}
                    {customIcon ? customIcon : Icon && <Icon className="w-5 h-5 lg:w-6 lg:h-6 relative z-10 drop-shadow-md" />}
                </motion.div>
            </a>
        </div>
    );
};

export const WhatsAppFloat = () => {
    return (
        <div className="fixed top-1/2 -translate-y-1/2 right-4 lg:right-6 z-[9997] flex flex-col gap-3 lg:gap-4 pointer-events-none">
            <div className="pointer-events-auto flex flex-col gap-3 lg:gap-4">
                <ContactButton
                    href={WA_URL}
                    label="Chat on WhatsApp"
                    color="#25D366"
                    delay={1.8}
                    showPulse={false}
                    customIcon={
                        <svg
                            className="w-6 h-6 lg:w-7 lg:h-7 text-white relative z-10 drop-shadow-md"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M20.472 3.51C18.188 1.24 15.145 0 11.989 0 5.438 0 .103 5.335.1 11.893c0 2.094.546 4.14 1.586 5.945L0 24l6.304-1.654a11.888 11.888 0 005.685 1.448h.005c6.549 0 11.883-5.335 11.886-11.894.002-3.177-1.232-6.163-3.408-8.39zM11.99 21.785a9.875 9.875 0 01-5.03-1.372l-.361-.214-3.741.981 1-3.647-.235-.374a9.86 9.86 0 01-1.511-5.26c.002-5.45 4.436-9.884 9.89-9.884a9.822 9.822 0 016.993 2.9 9.825 9.825 0 012.891 6.997c-.003 5.451-4.437 9.873-9.896 9.873zm5.424-7.396c-.298-.149-1.762-.869-2.035-.968-.273-.099-.472-.149-.671.149-.198.297-.769.968-.942 1.167-.173.198-.347.223-.645.074-.298-.149-1.258-.463-2.394-1.477-.885-.789-1.482-1.763-1.655-2.061-.173-.298-.018-.459.13-.607.133-.133.298-.347.447-.521.149-.174.198-.298.298-.496.099-.199.05-.373-.025-.521-.075-.149-.671-1.616-.919-2.213-.242-.58-.488-.501-.671-.51-.173-.007-.372-.009-.571-.009-.198 0-.52.074-.793.372-.272.297-1.041 1.018-1.041 2.484s1.066 2.882 1.215 3.081c.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.273-.198-.571-.347z" />
                        </svg>
                    }
                />
                <ContactButton
                    href={INSTA_URL}
                    label="Follow on Instagram"
                    style={{ background: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)" }}
                    gradientClass="bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]"
                    icon={Instagram}
                    delay={2.0}
                />
                <ContactButton
                    href={PHONE_URL}
                    label="Call Us"
                    color="#0066FF"
                    icon={Phone}
                    delay={2.2}
                />
            </div>
        </div>
    );
};

