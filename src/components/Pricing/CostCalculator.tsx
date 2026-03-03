import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, TrendingUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CostCalculator = () => {
    const [volumes, setVolumes] = useState({
        sms: 0,
        voice: 0,
        rcs: 0,
        whatsapp: "none" as "none" | "growth" | "scale" | "pro"
    });

    const calculateCosts = () => {
        let total = 0;
        type BreakDownItem = { service: string; volume: number | null; cost: number; rate: number | null };
        const breakdown: BreakDownItem[] = [];

        // SMS calculation
        if (volumes.sms > 0) {
            let smsRate = 0.25;
            if (volumes.sms > 100000) smsRate = 0.16;
            else if (volumes.sms > 50000) smsRate = 0.18;
            else if (volumes.sms > 10000) smsRate = 0.2;

            const smsCost = volumes.sms * smsRate;
            total += smsCost;
            breakdown.push({ service: "Bulk SMS", volume: volumes.sms, cost: smsCost, rate: smsRate });
        }

        // Voice calculation
        if (volumes.voice > 0) {
            let voiceRate = 0.35;
            if (volumes.voice > 100000) voiceRate = 0.25;
            else if (volumes.voice > 50000) voiceRate = 0.28;
            else if (volumes.voice > 10000) voiceRate = 0.3;

            const voiceCost = volumes.voice * voiceRate;
            total += voiceCost;
            breakdown.push({ service: "Voice Calls", volume: volumes.voice, cost: voiceCost, rate: voiceRate });
        }

        // RCS calculation
        if (volumes.rcs > 0) {
            let rcsCost = 3500;
            if (volumes.rcs > 100000) rcsCost = 24000;
            else if (volumes.rcs > 50000) rcsCost = 15000;

            total += rcsCost;
            breakdown.push({ service: "RCS Messaging", volume: volumes.rcs, cost: rcsCost, rate: null });
        }

        // WhatsApp calculation
        const whatsappPrices = {
            growth: 3599,
            scale: 7799,
            pro: 14999
        };

        if (volumes.whatsapp !== "none") {
            const whatsappCost = whatsappPrices[volumes.whatsapp];
            total += whatsappCost;
            breakdown.push({ service: `WhatsApp (${volumes.whatsapp})`, volume: null, cost: whatsappCost, rate: null });
        }

        return { total, breakdown };
    };

    const { total, breakdown } = calculateCosts();

    return (
        <div className="max-w-6xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white px-10 py-4 rounded-full mb-6 shadow-2xl">
                    <Calculator className="w-7 h-7" />
                    <span className="font-black text-xl tracking-wide">Cost Calculator</span>
                </div>
                <p className="text-muted-foreground text-xl font-medium">
                    Calculate your estimated monthly costs across all services
                </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-10">
                {/* Input Section */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass-card rounded-3xl p-8 border border-border space-y-6"
                >
                    <h3 className="text-2xl font-black text-foreground mb-6">Enter Your Monthly Volume</h3>

                    {/* SMS Input */}
                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">
                            Bulk SMS Messages
                        </label>
                        <input
                            type="number"
                            min="0"
                            value={volumes.sms || ""}
                            onChange={(e) => setVolumes({ ...volumes, sms: Number(e.target.value) })}
                            placeholder="e.g., 50000"
                            className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                        />
                    </div>

                    {/* Voice Input */}
                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">
                            Voice Calls
                        </label>
                        <input
                            type="number"
                            min="0"
                            value={volumes.voice || ""}
                            onChange={(e) => setVolumes({ ...volumes, voice: Number(e.target.value) })}
                            placeholder="e.g., 10000"
                            className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>

                    {/* RCS Input */}
                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">
                            RCS Messages
                        </label>
                        <input
                            type="number"
                            min="0"
                            value={volumes.rcs || ""}
                            onChange={(e) => setVolumes({ ...volumes, rcs: Number(e.target.value) })}
                            placeholder="e.g., 50000"
                            className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        />
                    </div>

                    {/* WhatsApp Select */}
                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">
                            WhatsApp Plan
                        </label>
                        <select
                            value={volumes.whatsapp}
                            onChange={(e) => setVolumes({ ...volumes, whatsapp: e.target.value as "none" | "growth" | "scale" | "pro" })}
                            className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        >
                            <option value="none">None</option>
                            <option value="growth">Growth (₹3,599/month)</option>
                            <option value="scale">Scale (₹7,799/month)</option>
                            <option value="pro">Pro (₹14,999/month)</option>
                        </select>
                    </div>
                </motion.div>

                {/* Results Section */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass-card rounded-3xl p-8 border-2 border-emerald-500 relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-green-500/10"></div>

                    <div className="relative z-10">
                        <h3 className="text-2xl font-black text-foreground mb-6 flex items-center gap-2">
                            <TrendingUp className="w-6 h-6 text-emerald-600" />
                            Estimated Cost
                        </h3>

                        {/* Total */}
                        <div className="mb-8 p-6 bg-gradient-to-br from-emerald-600 to-green-600 rounded-2xl text-white">
                            <div className="text-sm font-bold mb-2 opacity-90">Total Monthly Cost</div>
                            <div className="text-5xl font-black">
                                ₹{total.toLocaleString('en-IN')}
                            </div>
                            <div className="text-sm mt-2 opacity-90">+ applicable taxes</div>
                        </div>

                        {/* Breakdown */}
                        {breakdown.length > 0 ? (
                            <div className="space-y-3">
                                <div className="text-sm font-bold text-muted-foreground mb-3">Cost Breakdown</div>
                                {breakdown.map((item, index) => (
                                    <div key={index} className="flex justify-between items-center p-4 bg-muted/50 rounded-xl">
                                        <div>
                                            <div className="font-bold text-foreground">{item.service}</div>
                                            {item.volume && (
                                                <div className="text-xs text-muted-foreground">
                                                    {item.volume.toLocaleString()} {item.rate && `@ ₹${item.rate}`}
                                                </div>
                                            )}
                                        </div>
                                        <div className="font-black text-foreground">
                                            ₹{Math.round(item.cost).toLocaleString('en-IN')}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 text-muted-foreground">
                                <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                <p>Enter your volumes to see estimated costs</p>
                            </div>
                        )}

                        {total > 0 && (
                            <Button className="w-full mt-6 btn-primary" size="lg">
                                Get Custom Quote
                            </Button>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
