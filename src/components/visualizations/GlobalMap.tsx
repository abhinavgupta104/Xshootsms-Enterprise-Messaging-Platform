import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const locations = [
    { x: 200, y: 180, label: "USA West" },
    { x: 320, y: 160, label: "USA East" },
    { x: 480, y: 140, label: "London" },
    { x: 520, y: 150, label: "Frankfurt" },
    { x: 680, y: 220, label: "Mumbai" },
    { x: 700, y: 250, label: "Bangalore" },
    { x: 780, y: 230, label: "Singapore" },
    { x: 850, y: 350, label: "Sydney" },
    { x: 550, y: 380, label: "Johannesburg" },
    { x: 350, y: 400, label: "Sao Paulo" },
    { x: 650, y: 180, label: "Dubai" },
];

export const GlobalMap = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    // Only render heavy SVG animations once the map enters the viewport
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect(); // only need to fire once
                }
            },
            { threshold: 0.1 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative w-full h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden rounded-3xl bg-slate-50 border border-slate-200 shadow-xl my-20"
            style={{ willChange: "transform" }}
        >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-500/5 via-transparent to-transparent" />

            <div className="relative w-full max-w-5xl h-full mx-auto">
                {/* Abstract World Map Grid */}
                <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-no-repeat bg-center bg-contain opacity-[0.05] grayscale" />

                {/* Connection Lines — only rendered when in viewport */}
                {inView && (
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        {locations.map((loc, i) =>
                            locations.slice(i + 1).map((target, j) => {
                                const dist = Math.sqrt(
                                    Math.pow(loc.x - target.x, 2) + Math.pow(loc.y - target.y, 2)
                                );
                                if (dist > 300) return null;
                                return (
                                    <motion.line
                                        key={`${i}-${j}`}
                                        x1={`${(loc.x / 1000) * 100}%`}
                                        y1={`${(loc.y / 500) * 100}%`}
                                        x2={`${(target.x / 1000) * 100}%`}
                                        y2={`${(target.y / 500) * 100}%`}
                                        stroke="url(#line-gradient)"
                                        strokeWidth="1"
                                        strokeOpacity="0.3"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ duration: 1.5, delay: j * 0.15 }}
                                    />
                                );
                            })
                        )}
                        <defs>
                            <linearGradient id="line-gradient">
                                <stop offset="0%" stopColor="#0891b2" stopOpacity="0" />
                                <stop offset="50%" stopColor="#0891b2" stopOpacity="0.6" />
                                <stop offset="100%" stopColor="#0891b2" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                    </svg>
                )}

                {/* Location Markers — only rendered when in viewport */}
                {inView &&
                    locations.map((loc, i) => (
                        <div
                            key={i}
                            className="absolute"
                            style={{
                                left: `${(loc.x / 1000) * 100}%`,
                                top: `${(loc.y / 500) * 100}%`,
                                transform: "translate(-50%, -50%)",
                            }}
                        >
                            <div className="relative group">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: i * 0.08, type: "spring" }}
                                    className="w-3 h-3 bg-cyan-600 rounded-full shadow-[0_0_15px_rgba(8,145,178,0.5)] relative z-10"
                                />
                                <motion.div
                                    animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                                    className="absolute inset-0 bg-cyan-400 rounded-full"
                                />
                                {/* Tooltip */}
                                <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white text-slate-700 text-xs px-2 py-1 rounded border border-slate-200 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none font-medium">
                                    {loc.label}
                                </div>
                            </div>
                        </div>
                    ))}
            </div>

            {/* Overlay Text */}
            <div className="absolute bottom-10 left-0 right-0 text-center">
                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-600">
                    Global Connectivity
                </h3>
                <p className="text-slate-500 text-sm mt-2">190+ Countries • 800+ Direct Carrier Connections</p>
            </div>
        </div>
    );
};
