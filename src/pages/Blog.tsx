import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react";
import { client, urlFor } from "../lib/sanity";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { MobileCTABar } from "@/components/layout/MobileCTABar";

// Legal Modals
import { useState as useStateModal } from "react";
import PrivacyPolicyModal from "@/components/modals/legal/PrivacyPolicyModal";
import TermsModal from "@/components/modals/legal/TermsModal";
import CookiePolicyModal from "@/components/modals/legal/CookiePolicyModal";
import GDPRModal from "@/components/modals/legal/GDPRModal";
import { ContactModal } from "@/components/modals/ContactModal";
import { OptInModal } from "@/components/OptInModal";

type LegalType = "privacy" | "terms" | "cookies" | "gdpr" | null;

interface Post {
    slug: { current: string };
    title: string;
    excerpt: string;
    mainImage: unknown;
    author: string;
    publishedAt: string;
    readTime: string;
    category: string;
}

/* Derive initials from an author name */
const getInitials = (name: string) => {
    return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
};

/* Deterministic background colour from a string */
const avatarColour = (name: string) => {
    const colours = [
        "bg-cyan/80", "bg-orange/80", "bg-purple-500/80",
        "bg-green-500/80", "bg-blue-500/80", "bg-pink-500/80",
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return colours[Math.abs(hash) % colours.length];
};

const mockPosts: Post[] = [
    {
        slug: { current: "whatsapp-business-api-vs-bulk-sms" },
        title: "WhatsApp Business API vs Bulk SMS: Which is better for ROI?",
        excerpt: "Discover the key differences between WhatsApp Business API and Bulk SMS to choose the right channel for your business growth.",
        mainImage: null,
        author: "Abhinav Gupta",
        publishedAt: "2026-02-15T12:00:00Z",
        readTime: "5 min read",
        category: "Marketing",
    },
    {
        slug: { current: "customer-support-voice-apis" },
        title: "How to Automate Customer Support Using Voice APIs",
        excerpt: "Learn how programmable voice APIs can reduce support costs while improving customer satisfaction through intelligent IVR systems.",
        mainImage: null,
        author: "Sarthak Gupta",
        publishedAt: "2026-02-10T12:00:00Z",
        readTime: "7 min read",
        category: "Automation",
    },
    {
        slug: { current: "dlt-registration-guide-india" },
        title: "The Ultimate Guide to DLT Registration in India",
        excerpt: "Everything you need to know about TRAI's DLT regulation, registration process, and compliance for sending commercial SMS in India.",
        mainImage: null,
        author: "Compliance Team",
        publishedAt: "2026-02-05T12:00:00Z",
        readTime: "10 min read",
        category: "Compliance",
    },
];

export const Blog = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState("All");

    // Modal states
    const [isOptInOpen, setIsOptInOpen] = useState(false);
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [legalModal, setLegalModal] = useState<LegalType>(null);

    useEffect(() => {
        const query = `*[_type == "post"] | order(publishedAt desc) {
      title, slug, excerpt, mainImage,
      "author": author->name,
      publishedAt, readTime,
      "category": categories[0]->title
    }`;
        client.fetch(query)
            .then((data) => {
                setPosts(data && data.length > 0 ? data : mockPosts);
                setIsLoading(false);
            })
            .catch(() => {
                setPosts(mockPosts);
                setIsLoading(false);
            });
    }, []);

    const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category).filter(Boolean)))];
    const filtered = activeCategory === "All" ? posts : posts.filter((p) => p.category === activeCategory);

    return (
        <>
            <Helmet>
                <title>Blog – RCS, WhatsApp API & Mobile Marketing Insights | Xshootsms</title>
                <meta
                    name="description"
                    content="Explore the Xshootsms blog for expert guides on Bulk SMS marketing in India, WhatsApp Business API, RCS messaging, OTP delivery, DLT compliance, and Voice API automation."
                />
                <link rel="canonical" href="https://xshootsms.com/blog" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://xshootsms.com/blog" />
                <meta property="og:title" content="RCS & WhatsApp API Insights | Xshootsms Blog" />
                <meta property="og:description" content="Expert advice, industry trends, and practical guides on RCS, WhatsApp API, and enterprise messaging." />
                <meta property="og:image" content="https://xshootsms.com/og-image.svg" />
                <meta property="og:site_name" content="Xshootsms" />
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:title" content="Blog – Bulk SMS & WhatsApp API Insights | Xshootsms" />
                <meta property="twitter:description" content="Expert advice, industry trends, and practical guides on Bulk SMS, WhatsApp API, and enterprise messaging." />
                <meta property="twitter:image" content="https://xshootsms.com/og-image.svg" />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        itemListElement: [
                            { "@type": "ListItem", position: 1, name: "Home", item: "https://xshootsms.com" },
                            { "@type": "ListItem", position: 2, name: "Blog", item: "https://xshootsms.com/blog" },
                        ],
                    })}
                </script>
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "CollectionPage",
                        name: "Xshootsms Blog",
                        description: "Insights on Bulk SMS, WhatsApp API & Mobile Marketing",
                        url: "https://xshootsms.com/blog",
                    })}
                </script>
            </Helmet>

            <div className="min-h-screen flex flex-col bg-background">
                <Navbar
                    onOpenOptIn={() => setIsOptInOpen(true)}
                    onOpenContact={() => setIsContactOpen(true)}
                />

                <main className="flex-1 pt-32 pb-16" id="main-content">
                    <div className="container-custom px-4 md:px-8">
                        {/* Header */}
                        <div className="text-center mb-12">
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="text-4xl md:text-6xl font-bold mb-6"
                            >
                                RCS &amp; WhatsApp API{" "}
                                <span className="text-gradient-accent">Blog</span>
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
                            >
                                Expert guides on Bulk SMS marketing, WhatsApp Business API, RCS Messaging, DLT compliance, OTP delivery, and mobile engagement strategies for Indian businesses.
                            </motion.p>

                            {/* Internal links strip */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="flex flex-wrap justify-center gap-3 mt-6"
                            >
                                <Link
                                    to="/pricing"
                                    className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan border border-cyan/30 bg-cyan/5 hover:bg-cyan/10 px-4 py-2 rounded-full transition-colors"
                                >
                                    View Pricing <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                                <Link
                                    to="/#platform"
                                    className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground border border-border hover:border-cyan/30 hover:text-cyan px-4 py-2 rounded-full transition-colors"
                                >
                                    Explore Platform <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                            </motion.div>
                        </div>

                        {/* Category Filter Tabs */}
                        {!isLoading && categories.length > 1 && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="flex flex-wrap justify-center gap-3 mb-10"
                            >
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${activeCategory === cat
                                            ? "bg-gradient-to-r from-cyan to-blue-500 text-white shadow-md"
                                            : "bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground border border-border/50"
                                            }`}
                                    >
                                        <Tag className="w-3.5 h-3.5" />
                                        {cat}
                                    </button>
                                ))}
                            </motion.div>
                        )}

                        {/* Loading */}
                        {isLoading && (
                            <div className="text-center py-20 text-muted-foreground">
                                <div className="w-10 h-10 rounded-full border-4 border-cyan/20 border-t-cyan animate-spin mx-auto mb-4" />
                                Loading posts...
                            </div>
                        )}

                        {/* Empty state */}
                        {!isLoading && filtered.length === 0 && (
                            <div className="text-center py-20 bg-muted/20 rounded-2xl border border-dashed border-border">
                                <p className="text-lg text-muted-foreground">No posts in this category yet.</p>
                            </div>
                        )}

                        {/* Blog Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filtered.map((post, index) => {
                                const initials = getInitials(post.author || "Admin");
                                const colour = avatarColour(post.author || "Admin");
                                return (
                                    <motion.article
                                        key={post.slug.current}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.08 }}
                                        className="group glass-card overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col"
                                    >
                                        {/* Image */}
                                        {post.mainImage ? (
                                            <div className="relative h-48 overflow-hidden flex-shrink-0">
                                                <img
                                                    src={urlFor(post.mainImage).width(500).height(300).url()}
                                                    alt={post.title}
                                                    width="500"
                                                    height="300"
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                    loading="lazy"
                                                />
                                                {post.category && (
                                                    <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-cyan border border-cyan/20">
                                                        {post.category}
                                                    </div>
                                                )}
                                            </div>
                                        ) : post.category && (
                                            <div className="px-6 pt-5">
                                                <span className="inline-block px-3 py-1 rounded-full bg-cyan/10 text-cyan text-xs font-semibold border border-cyan/20">
                                                    {post.category}
                                                </span>
                                            </div>
                                        )}

                                        {/* Content */}
                                        <div className="p-6 flex flex-col flex-1">
                                            {/* Meta */}
                                            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />
                                                    {new Date(post.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                                                </div>
                                                {post.readTime && (
                                                    <div className="flex items-center gap-1">
                                                        <Clock className="w-3 h-3" />
                                                        {post.readTime}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Title */}
                                            <Link to={`/blog/${post.slug.current}`} className="block mb-3">
                                                <h2 className="text-xl font-bold text-foreground group-hover:text-cyan transition-colors line-clamp-2">
                                                    {post.title}
                                                </h2>
                                            </Link>

                                            {/* Excerpt */}
                                            <p className="text-muted-foreground text-sm mb-6 line-clamp-3 flex-1">
                                                {post.excerpt}
                                            </p>

                                            {/* Author & CTA */}
                                            <div className="flex items-center justify-between pt-4 border-t border-border/50">
                                                <div className="flex items-center gap-2">
                                                    {/* Initials avatar */}
                                                    <div className={`w-8 h-8 rounded-full ${colour} flex items-center justify-center`}>
                                                        <span className="text-white text-xs font-bold">{initials}</span>
                                                    </div>
                                                    <span className="text-xs font-medium text-foreground">
                                                        {post.author || "Admin"}
                                                    </span>
                                                </div>
                                                <Link
                                                    to={`/blog/${post.slug.current}`}
                                                    className="flex items-center gap-1 text-sm font-semibold text-cyan group-hover:translate-x-1 transition-transform"
                                                >
                                                    Read More
                                                    <ArrowRight className="w-4 h-4" />
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.article>
                                );
                            })}
                        </div>
                    </div>
                </main>

                <Footer onOpenLegal={setLegalModal} />

                {/* Modals */}
                <OptInModal open={isOptInOpen} onClose={() => setIsOptInOpen(false)} />
                <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
                {legalModal === "privacy" && <PrivacyPolicyModal onClose={() => setLegalModal(null)} />}
                {legalModal === "terms" && <TermsModal onClose={() => setLegalModal(null)} />}
                {legalModal === "cookies" && <CookiePolicyModal onClose={() => setLegalModal(null)} />}
                {legalModal === "gdpr" && <GDPRModal onClose={() => setLegalModal(null)} />}
            </div>
            <MobileCTABar onOpenOptIn={() => setIsOptInOpen(true)} />
            <WhatsAppFloat />
        </>
    );
};
