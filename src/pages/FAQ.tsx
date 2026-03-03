import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, MessageCircle, FileText, Settings, CreditCard, Search } from "lucide-react";
import { pricingFAQ } from "@/data/pricingFAQ";
import { ContactModal } from "@/components/modals/ContactModal";
import { OptInModal } from "@/components/OptInModal";
// Legal Modals
import PrivacyPolicyModal from "@/components/modals/legal/PrivacyPolicyModal";
import TermsModal from "@/components/modals/legal/TermsModal";
import CookiePolicyModal from "@/components/modals/legal/CookiePolicyModal";
import GDPRModal from "@/components/modals/legal/GDPRModal";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { MobileCTABar } from "@/components/layout/MobileCTABar";

type LegalType = "privacy" | "terms" | "cookies" | "gdpr" | null;

const categories = [
    { id: "general", label: "General", icon: MessageCircle },
    { id: "pricing", label: "Pricing & Billing", icon: CreditCard },
    { id: "technical", label: "Technical", icon: Settings },
    { id: "support", label: "Support", icon: FileText },
];

export default function FAQ() {
    const [activeCategory, setActiveCategory] = useState("general");
    const [searchQuery, setSearchQuery] = useState("");
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    // Modal States
    const [isOptInOpen, setIsOptInOpen] = useState(false);
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [legalModal, setLegalModal] = useState<LegalType>(null);

    // Filter FAQs
    const filteredFAQs = pricingFAQ.filter(faq => {
        const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === "general" || faq.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <>
            <Helmet>
                <title>FAQ – Bulk SMS, WhatsApp API & Messaging Platform | Xshootsms</title>
                <meta name="description" content="Answers to common questions about Xshootsms – India's leading Bulk SMS provider. Learn about WhatsApp Business API pricing, RCS messaging, OTP delivery, and enterprise communication APIs." />
                <link rel="canonical" href="https://xshootsms.com/faq" />

                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://xshootsms.com/faq" />
                <meta property="og:title" content="FAQ – Bulk SMS, WhatsApp API & Enterprise Messaging | Xshootsms" />
                <meta property="og:description" content="Got questions about Bulk SMS in India, WhatsApp Business API, RCS, or OTP delivery? Find all answers here." />
                <meta property="og:image" content="https://xshootsms.com/og-image.svg" />
                <meta property="og:site_name" content="Xshootsms" />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:title" content="FAQ – Bulk SMS, WhatsApp API & Enterprise Messaging | Xshootsms" />
                <meta property="twitter:description" content="Got questions about Bulk SMS in India, WhatsApp Business API, RCS, or OTP delivery? Find all answers here." />
                <meta property="twitter:image" content="https://xshootsms.com/og-image.svg" />

                {/* Breadcrumb Schema */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            {
                                "@type": "ListItem",
                                "position": 1,
                                "name": "Home",
                                "item": "https://xshootsms.com"
                            },
                            {
                                "@type": "ListItem",
                                "position": 2,
                                "name": "FAQ",
                                "item": "https://xshootsms.com/faq"
                            }
                        ]
                    })}
                </script>

                {/* FAQPage Schema — enables Google rich snippet accordions */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        mainEntity: pricingFAQ.map(faq => ({
                            "@type": "Question",
                            name: faq.question,
                            acceptedAnswer: {
                                "@type": "Answer",
                                text: faq.answer
                            }
                        }))
                    })}
                </script>
            </Helmet>

            <div className="min-h-screen flex flex-col bg-background">
                <Navbar
                    onOpenOptIn={() => setIsOptInOpen(true)}
                    onOpenContact={() => setIsContactOpen(true)}
                />

                <main className="flex-1 pt-32 pb-20" id="main-content">
                    {/* Header */}
                    <section className="relative py-20 bg-muted/30 overflow-hidden">
                        <div className="absolute inset-0 bg-grid-black/[0.02] -z-10" />
                        <div className="container-custom text-center">
                            <h1
                                className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                            >
                                Bulk SMS, WhatsApp API &{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">Messaging Platform FAQs</span>
                            </h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
                            >
                                Find answers to common questions about Bulk SMS in India, WhatsApp Business API integration, OTP delivery, RCS messaging, and enterprise communication plans.
                            </motion.p>

                            {/* Search Bar */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="max-w-xl mx-auto relative"
                            >
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search for answers..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    aria-label="Search frequently asked questions"
                                    className="w-full pl-12 pr-4 py-4 rounded-full border border-border bg-background shadow-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                />
                            </motion.div>
                        </div>
                    </section>

                    {/* Content */}
                    <section className="container-custom py-16">
                        <div className="grid lg:grid-cols-4 gap-10">
                            {/* Sidebar Categories */}
                            <div className="hidden lg:block space-y-2">
                                <p className="font-semibold text-sm text-muted-foreground mb-4 uppercase tracking-wider px-4">Categories</p>
                                {categories.map(cat => {
                                    const count = pricingFAQ.filter(faq => faq.category === cat.id).length;
                                    return (
                                        <button
                                            key={cat.id}
                                            onClick={() => setActiveCategory(cat.id)}
                                            className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeCategory === cat.id
                                                ? "bg-primary/10 text-primary"
                                                : "text-muted-foreground hover:bg-muted"
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <cat.icon className="w-4 h-4" />
                                                {cat.label}
                                            </div>
                                            <span className={`text-xs px-2 py-0.5 rounded-full ${activeCategory === cat.id ? "bg-primary/20" : "bg-muted"}`}>
                                                {count}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* FAQ List */}
                            <div className="lg:col-span-3 space-y-4">
                                {filteredFAQs.length === 0 ? (
                                    <div className="text-center py-20 text-muted-foreground">
                                        <p>No results found for "{searchQuery}"</p>
                                    </div>
                                ) : (
                                    filteredFAQs.map((faq, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="border border-border rounded-xl bg-card overflow-hidden"
                                        >
                                            <button
                                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-muted/50 transition-colors"
                                            >
                                                <h2 className="font-semibold text-foreground pr-8 text-base md:text-lg">{faq.question}</h2>
                                                <ChevronDown
                                                    className={`w-5 h-5 text-muted-foreground transition-transform duration-300 flex-shrink-0 ${openIndex === index ? "rotate-180" : ""
                                                        }`}
                                                />
                                            </button>
                                            <AnimatePresence>
                                                {openIndex === index && (
                                                    <motion.div
                                                        initial={{ height: 0 }}
                                                        animate={{ height: "auto" }}
                                                        exit={{ height: 0 }}
                                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                                    >
                                                        <div className="px-6 pb-5 text-muted-foreground border-t border-border/50 pt-4">
                                                            {faq.answer}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    ))
                                )}
                            </div>
                        </div>
                    </section>
                </main>

                <Footer onOpenLegal={setLegalModal} />

                {/* CORE MODALS */}
                <OptInModal
                    open={isOptInOpen}
                    onClose={() => setIsOptInOpen(false)}
                />

                <ContactModal
                    isOpen={isContactOpen}
                    onClose={() => setIsContactOpen(false)}
                />

                {/* LEGAL MODALS */}
                {legalModal === "privacy" && <PrivacyPolicyModal onClose={() => setLegalModal(null)} />}
                {legalModal === "terms" && <TermsModal onClose={() => setLegalModal(null)} />}
                {legalModal === "cookies" && <CookiePolicyModal onClose={() => setLegalModal(null)} />}
                {legalModal === "gdpr" && <GDPRModal onClose={() => setLegalModal(null)} />}

            </div>
            <MobileCTABar onOpenOptIn={() => setIsOptInOpen(true)} />
            <WhatsAppFloat />
        </>
    );
}
