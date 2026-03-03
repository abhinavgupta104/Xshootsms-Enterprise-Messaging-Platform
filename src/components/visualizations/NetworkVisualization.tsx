import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const FloatingStat = ({ label, value, x, y, delay }: { label: string; value: string; x: number; y: number; delay: number }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.5, y: y + 20 }}
        animate={{ opacity: [0, 1, 1, 0], scale: [0.5, 1, 1, 0.8], y: y - 50 }}
        transition={{ duration: 4, delay, repeat: Infinity, repeatDelay: 2 }}
        className="absolute z-20 px-3 py-1 rounded-full bg-background/80 backdrop-blur border border-cyan/30 text-xs font-mono shadow-lg pointer-events-none"
        style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
    >
        <span className="text-cyan font-bold mr-1">{value}</span>
        <span className="text-muted-foreground">{label}</span>
    </motion.div>
);

export const NetworkVisualization = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="relative w-full h-[600px] flex items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-navy-deep to-background border border-white/5 shadow-2xl" style={{ willChange: 'transform' }}>
            {/* Background Glow */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px]" />
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange/5 rounded-full blur-[120px]" />

            {/* Dynamic Stats */}
            <FloatingStat label="SMS Sent" value="+1.2k" x={-150} y={-100} delay={0} />
            <FloatingStat label="OTP Verified" value="99.9%" x={160} y={-80} delay={1.5} />
            <FloatingStat label="Active Users" value="850+" x={-120} y={120} delay={3} />
            <FloatingStat label="API Latency" value="12ms" x={140} y={100} delay={4.5} />

            {/* Central Node representing XShootSMS */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1 }}
                className="relative z-10 w-40 h-40 rounded-full bg-background border-2 border-cyan/50 shadow-[0_0_40px_rgba(6,182,212,0.4)] flex items-center justify-center group cursor-pointer"
            >
                <div className="absolute inset-0 rounded-full bg-cyan/5 animate-pulse" />
                <div className="text-center relative z-10">
                    <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan to-orange drop-shadow-sm">X</span>
                </div>

                {/* Orbiting Elements */}
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 15 + i * 5, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 rounded-full border border-cyan/10"
                        style={{ padding: (i + 1) * 25 }}
                    >
                        <div className="w-2 h-2 rounded-full bg-cyan shadow-[0_0_10px_#06b6d4]" />
                    </motion.div>
                ))}
            </motion.div>

            {/* Connected Nodes representing Services */}
            {[
                { x: -160, y: -100, color: "bg-orange", label: "SMS", icon: "💬" },
                { x: 160, y: -100, color: "bg-green-500", label: "WhatsApp", icon: "📱" },
                { x: -160, y: 100, color: "bg-purple-500", label: "RCS", icon: "✨" },
                { x: 160, y: 100, color: "bg-blue-500", label: "Voice", icon: "🎙️" },
            ].map((node, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 0, y: 0 }}
                    animate={{ opacity: 1, x: node.x, y: node.y }}
                    transition={{ delay: 0.5 + i * 0.2, duration: 0.8 }}
                    className="absolute z-10 flex flex-col items-center gap-3 group"
                >
                    <motion.div
                        whileHover={{ scale: 1.1, y: -5 }}
                        className={`w-16 h-16 rounded-2xl glass-card flex items-center justify-center border ${node.color.replace('bg-', 'border-')}/30 shadow-lg relative overflow-hidden`}
                    >
                        <div className={`absolute inset-0 ${node.color}/10 group-hover:${node.color}/20 transition-colors`} />
                        <span className="text-2xl drop-shadow-sm">{node.icon}</span>
                        <div className={`absolute bottom-2 w-1.5 h-1.5 rounded-full ${node.color} shadow-[0_0_8px_currentColor]`} />
                    </motion.div>
                    <span className="text-sm font-semibold text-foreground/80 bg-background/50 px-3 py-1 rounded-full backdrop-blur-sm border border-white/5">{node.label}</span>

                    {/* Connection Line to Center */}
                    <svg className="absolute top-1/2 left-1/2 -z-10 w-[400px] h-[400px] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-30">
                        <motion.line
                            x1="50%"
                            y1="50%"
                            x2={100 - ((node.x / 4) + 50) + "%"} // Adjusted for larger container
                            y2={100 - ((node.y / 4) + 50) + "%"}
                            stroke="url(#gradient-line)"
                            strokeWidth="1.5"
                            className="text-cyan"
                            strokeDasharray="4 4"
                            initial={{ pathLength: 0, strokeDashoffset: 10 }}
                            animate={{ pathLength: 1, strokeDashoffset: 0 }}
                            transition={{ delay: 1 + i * 0.2, duration: 1.5 }}
                        />
                        <defs>
                            <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="rgba(6,182,212,0.1)" />
                                <stop offset="50%" stopColor="rgba(6,182,212,0.5)" />
                                <stop offset="100%" stopColor="rgba(6,182,212,0.1)" />
                            </linearGradient>
                        </defs>
                    </svg>
                </motion.div>
            ))}

            {/* Floating Particles */}
            {[...Array(30)].map((_, i) => (
                <motion.div
                    key={`p-${i}`}
                    className="absolute w-1 h-1 bg-cyan/30 rounded-full blur-[1px]"
                    initial={{
                        x: Math.random() * 600 - 300,
                        y: Math.random() * 600 - 300,
                        opacity: 0,
                        scale: 0
                    }}
                    animate={{
                        y: [null, Math.random() * -100],
                        opacity: [0, 0.6, 0],
                        scale: [0, 1.5, 0]
                    }}
                    transition={{
                        duration: 4 + Math.random() * 3,
                        repeat: Infinity,
                        delay: Math.random() * 5,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </div>
    );
};
