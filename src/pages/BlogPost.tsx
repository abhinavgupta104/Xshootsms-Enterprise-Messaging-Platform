import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { PortableText } from "@portabletext/react";
import { Calendar, Clock, ArrowLeft, Twitter, Linkedin, Facebook, Share2 } from "lucide-react";
import { client, urlFor } from "../lib/sanity";

/* ── Helpers ──────────────────────────────────────────────── */

const getInitials = (name: string) =>
    name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

const avatarColour = (name: string) => {
    const colours = [
        "bg-cyan/80", "bg-orange/80", "bg-purple-500/80",
        "bg-green-500/80", "bg-blue-500/80", "bg-pink-500/80",
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return colours[Math.abs(hash) % colours.length];
};

/* ── ReadingProgress bar ───────────────────────────────────── */

const ReadingProgress = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const onScroll = () => {
            const el = document.documentElement;
            const scrolled = el.scrollTop || document.body.scrollTop;
            const total = el.scrollHeight - el.clientHeight;
            setProgress(total > 0 ? (scrolled / total) * 100 : 0);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div
            className="fixed top-0 left-0 z-[9999] h-[3px] bg-gradient-to-r from-cyan to-blue-500 transition-all duration-75"
            style={{ width: `${progress}%` }}
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-label="Reading progress"
        />
    );
};

/* ── Fallback posts ───────────────────────────────────────── */

const getFallbackPost = (slug: string | undefined) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fallbackPosts: Record<string, any> = {
        "whatsapp-business-api-vs-bulk-sms": {
            title: "WhatsApp Business API vs Bulk SMS: Which is better for ROI?",
            excerpt: "Discover the key differences between WhatsApp Business API and Bulk SMS to choose the right channel for your business growth.",
            body: [
                { _type: "block", children: [{ _type: "span", text: "In today's digital marketing landscape, choosing the right messaging channel can significantly impact your ROI. Let's compare WhatsApp Business API and Bulk SMS to help you make an informed decision." }] },
                { _type: "block", style: "h2", children: [{ _type: "span", text: "Delivery & Open Rates" }] },
                { _type: "block", children: [{ _type: "span", text: "WhatsApp Business API boasts a 98% open rate compared to Bulk SMS's 20–30%. This means your messages are far more likely to be seen and acted upon by your customers." }] },
                { _type: "block", style: "h2", children: [{ _type: "span", text: "Cost Comparison" }] },
                { _type: "block", children: [{ _type: "span", text: "While SMS pricing is straightforward per message, WhatsApp charges per 24-hour conversation window. For high-engagement campaigns targeting existing customers, WhatsApp often proves more cost-effective on a per-conversion basis." }] },
                { _type: "block", style: "h2", children: [{ _type: "span", text: "Rich Media Support" }] },
                { _type: "block", children: [{ _type: "span", text: "WhatsApp supports images, videos, documents, and interactive buttons. Bulk SMS is limited to 160 characters of plain text. This makes WhatsApp ideal for product catalogs, interactive customer support, and promotional campaigns that need visual impact." }] },
                { _type: "block", style: "h2", children: [{ _type: "span", text: "Use Case Recommendation" }] },
                { _type: "block", children: [{ _type: "span", text: "Use Bulk SMS for OTPs, transactional alerts, and reaching users without internet. Use WhatsApp Business API for marketing campaigns, customer support, and rich engagement where open rates and interactivity matter most." }] },
            ],
            author: "Abhinav Gupta",
            publishedAt: "2026-02-15T12:00:00Z",
            updatedAt: "2026-02-15T12:00:00Z",
            category: "Marketing",
            readTime: "5 min read",
        },
        "customer-support-voice-apis": {
            title: "How to Automate Customer Support Using Voice APIs",
            excerpt: "Learn how programmable voice APIs can reduce support costs while improving customer satisfaction through intelligent IVR systems.",
            body: [
                { _type: "block", children: [{ _type: "span", text: "Voice APIs are revolutionizing customer support by enabling intelligent automation while maintaining a human touch. Here's how to implement them effectively for your business." }] },
                { _type: "block", style: "h2", children: [{ _type: "span", text: "Interactive Voice Response (IVR)" }] },
                { _type: "block", children: [{ _type: "span", text: "Modern IVR systems built on programmable Voice APIs can handle 60–80% of common customer queries without human intervention. This dramatically reduces wait times and operational costs." }] },
                { _type: "block", style: "h2", children: [{ _type: "span", text: "Intelligent Call Routing" }] },
                { _type: "block", children: [{ _type: "span", text: "Smart routing ensures customers reach the right department immediately. Use caller data, call history, and AI-powered intent prediction to route every call to the best available agent." }] },
                { _type: "block", style: "h2", children: [{ _type: "span", text: "Cost Savings & ROI" }] },
                { _type: "block", children: [{ _type: "span", text: "Companies implementing Voice API automation report 40–60% reduction in support costs while simultaneously improving CSAT scores. Automated outbound campaigns for reminders and follow-ups further multiply the ROI." }] },
            ],
            author: "Sarthak Gupta",
            publishedAt: "2026-02-10T12:00:00Z",
            updatedAt: "2026-02-10T12:00:00Z",
            category: "Automation",
            readTime: "7 min read",
        },
        "dlt-registration-guide-india": {
            title: "The Ultimate Guide to DLT Registration in India",
            excerpt: "Everything you need to know about TRAI's DLT regulation, registration process, and compliance for sending commercial SMS in India.",
            body: [
                { _type: "block", children: [{ _type: "span", text: "DLT (Distributed Ledger Technology) registration is now mandatory for all businesses sending commercial SMS in India. Introduced by TRAI, the DLT framework is designed to eliminate spam and protect consumers. Non-compliance means your Bulk SMS campaigns will be blocked." }] },
                { _type: "block", style: "h2", children: [{ _type: "span", text: "What Is DLT and Why Does It Matter?" }] },
                { _type: "block", children: [{ _type: "span", text: "DLT is a blockchain-based platform that creates a secure, tamper-proof registry for all entities sending commercial SMS in India. Every business, header (Sender ID), and message template must be registered before any SMS can be delivered." }] },
                { _type: "block", style: "h2", children: [{ _type: "span", text: "Step-by-Step DLT Registration Process" }] },
                { _type: "block", children: [{ _type: "span", text: "Step 1: Register as a Principal Entity on any operator's DLT portal — Jio, Vodafone, or Airtel. Step 2: Upload KYC documents (PAN card, GST certificate, incorporation documents). Step 3: Wait for approval, typically 24–48 business hours. Step 4: Register your Headers (Sender IDs, e.g., XSHOTS). Step 5: Register your Content Templates for every unique message type you send." }] },
                { _type: "block", style: "h2", children: [{ _type: "span", text: "Template Categories" }] },
                { _type: "block", children: [{ _type: "span", text: "DLT templates fall into three categories: Transactional (OTPs, account alerts — highest priority), Service Implicit (service messages for existing customers), and Promotional (marketing campaigns — filtered during DND hours). Using the correct category prevents delivery failures." }] },
                { _type: "block", style: "h2", children: [{ _type: "span", text: "How Xshootsms Simplifies DLT Compliance" }] },
                { _type: "block", children: [{ _type: "span", text: "Xshootsms provides a dedicated DLT compliance team to guide you through registration, template mapping, and ongoing compliance. Our platform automatically matches your messages to registered templates, ensuring 100% delivery and zero compliance risk." }] },
            ],
            author: "Compliance Team",
            publishedAt: "2026-02-05T12:00:00Z",
            updatedAt: "2026-02-05T12:00:00Z",
            category: "Compliance",
            readTime: "10 min read",
        },
    };
    return fallbackPosts[slug || ""] || null;
};

const BLOG_POST_FETCH_TIMEOUT_MS = 8000;

/* ── Main Component ───────────────────────────────────────── */

export const BlogPost = () => {
    const { slug } = useParams();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [post, setPost] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        const query = `*[_type == "post" && slug.current == $slug][0]{
      title, body, mainImage,
      "author": author->name,
      publishedAt, _updatedAt, readTime,
      "category": categories[0]->title,
      excerpt
    }`;

        const timeoutPromise = new Promise<never>((_, reject) => {
            setTimeout(() => reject(new Error("Blog post fetch timeout")), BLOG_POST_FETCH_TIMEOUT_MS);
        });

        Promise.race([client.fetch(query, { slug }), timeoutPromise])
            .then((data) => {
                if (!isMounted) return;
                setPost(data ?? getFallbackPost(slug));
            })
            .catch(() => {
                if (!isMounted) return;
                setPost(getFallbackPost(slug));
            })
            .finally(() => {
                if (!isMounted) return;
                setIsLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, [slug]);

    /* Share helpers */
    const shareUrl = typeof window !== "undefined" ? window.location.href : `https://xshootsms.com/blog/${slug}`;
    const shareTitle = post?.title ?? "";

    const shareLinks = {
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    };

    /* Portable Text components */
    const ptComponents = {
        types: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            image: ({ value }: any) => {
                if (!value?.asset?._ref) return null;
                return (
                    <img
                        src={urlFor(value).fit("max").auto("format").url()}
                        alt={value.alt || " "}
                        loading="lazy"
                        className="rounded-xl my-8 w-full max-h-[500px] object-cover"
                    />
                );
            },
        },
        block: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            h2: ({ children }: any) => (
                <h2 className="text-2xl md:text-3xl font-bold mt-8 md:mt-10 mb-4 md:mb-6 text-foreground">
                    {children}
                </h2>
            ),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            h3: ({ children }: any) => (
                <h3 className="text-xl md:text-2xl font-bold mt-6 md:mt-8 mb-3 md:mb-4 text-foreground">
                    {children}
                </h3>
            ),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            blockquote: ({ children }: any) => (
                <blockquote className="border-l-4 border-cyan pl-4 md:pl-6 italic text-lg md:text-xl my-6 md:my-8 text-muted-foreground">
                    {children}
                </blockquote>
            ),
        },
    };

    /* Loading */
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 rounded-full border-4 border-cyan/20 border-t-cyan animate-spin" aria-label="Loading article" />
                    <p className="text-sm text-muted-foreground">Loading article...</p>
                </div>
            </div>
        );
    }

    /* 404 */
    if (!post) {
        return (
            <div className="min-h-screen pt-24 flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-2xl font-bold mb-4">Article Not Found</h2>
                <p className="text-muted-foreground mb-6">The article you are looking for does not exist or has been removed.</p>
                <Link to="/blog" className="text-cyan hover:underline">Return to Blog</Link>
            </div>
        );
    }

    const initials = getInitials(post.author || "Admin");
    const colour = avatarColour(post.author || "Admin");
    const dateModified = post._updatedAt || post.updatedAt || post.publishedAt;

    return (
        <>
            <ReadingProgress />

            <Helmet>
                <title>{post.title} – Xshootsms Blog</title>
                <meta
                    name="description"
                    content={post.excerpt || `Read the latest insights about ${post.title} on the Xshootsms blog. Expert advice on Bulk SMS, WhatsApp API, and enterprise communication.`}
                />
                <link rel="canonical" href={`https://xshootsms.com/blog/${slug}`} />

                {/* Open Graph */}
                <meta property="og:type" content="article" />
                <meta property="og:url" content={`https://xshootsms.com/blog/${slug}`} />
                <meta property="og:title" content={`${post.title} – Xshootsms Blog`} />
                <meta property="og:description" content={post.excerpt || `Read the latest insights about ${post.title} on the Xshootsms blog.`} />
                <meta property="og:site_name" content="Xshootsms" />
                {post.mainImage && <meta property="og:image" content={urlFor(post.mainImage).width(1200).url()} />}
                {post.publishedAt && <meta property="article:published_time" content={post.publishedAt} />}
                {dateModified && <meta property="article:modified_time" content={dateModified} />}

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:title" content={`${post.title} – Xshootsms Blog`} />
                <meta property="twitter:description" content={post.excerpt || `Read the latest insights about ${post.title} on the Xshootsms blog.`} />
                {post.mainImage && <meta property="twitter:image" content={urlFor(post.mainImage).width(1200).url()} />}

                {/* Article Schema with dateModified */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BlogPosting",
                        headline: post.title,
                        description: post.excerpt || `Expert insights about ${post.title}.`,
                        image: post.mainImage ? urlFor(post.mainImage).width(1200).url() : "https://xshootsms.com/og-image.svg",
                        author: { "@type": "Person", name: post.author || "Admin" },
                        publisher: {
                            "@type": "Organization",
                            name: "Xshootsms",
                            logo: { "@type": "ImageObject", url: "https://xshootsms.com/logo.jpeg" },
                        },
                        datePublished: post.publishedAt,
                        dateModified: dateModified,
                        mainEntityOfPage: { "@type": "WebPage", "@id": `https://xshootsms.com/blog/${slug}` },
                    })}
                </script>

                {/* Breadcrumb */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        itemListElement: [
                            { "@type": "ListItem", position: 1, name: "Home", item: "https://xshootsms.com" },
                            { "@type": "ListItem", position: 2, name: "Blog", item: "https://xshootsms.com/blog" },
                            { "@type": "ListItem", position: 3, name: post.title, item: `https://xshootsms.com/blog/${slug}` },
                        ],
                    })}
                </script>
            </Helmet>

            <main className="pt-32 pb-20 min-h-screen" id="main-content">
                <div className="container-custom px-4 md:px-8">
                    <Link to="/blog" className="inline-flex items-center text-muted-foreground hover:text-cyan mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Blog
                    </Link>

                    {/* Article header */}
                    <header className="mb-10 text-center max-w-4xl mx-auto">
                        {post.category && (
                            <div className="inline-block px-4 py-2 rounded-full bg-cyan/10 text-cyan text-sm font-bold mb-6 border border-cyan/20">
                                {post.category}
                            </div>
                        )}
                        <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm text-muted-foreground">
                            {/* Initials avatar */}
                            <div className="flex items-center gap-2">
                                <div className={`w-9 h-9 rounded-full ${colour} flex items-center justify-center shadow-sm`}>
                                    <span className="text-white text-xs font-bold">{initials}</span>
                                </div>
                                <span className="font-medium text-foreground">{post.author || "Admin"}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>
                                    {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                                        day: "numeric", month: "long", year: "numeric",
                                    })}
                                </span>
                            </div>
                            {post.readTime && (
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    <span>{post.readTime}</span>
                                </div>
                            )}
                        </div>
                    </header>

                    {/* Featured image */}
                    {post.mainImage && (
                        <div className="rounded-2xl overflow-hidden mb-12 max-w-5xl mx-auto shadow-2xl">
                            <img
                                src={urlFor(post.mainImage).width(1200).height(600).url()}
                                alt={post.title}
                                width="1200"
                                height="600"
                                className="w-full h-auto object-cover max-h-[600px]"
                                loading="eager"
                            />
                        </div>
                    )}

                    {/* Body */}
                    <div className="max-w-3xl mx-auto">
                        <div className="prose prose-lg dark:prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-cyan max-w-none">
                            <PortableText value={post.body} components={ptComponents} />
                        </div>

                        {/* Share */}
                        <div className="border-t border-border/50 mt-12 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <span className="flex items-center gap-2 font-bold text-base md:text-lg">
                                <Share2 className="w-5 h-5 text-cyan" />
                                Share this article
                            </span>
                            <div className="flex gap-3">
                                <a
                                    href={shareLinks.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 rounded-full bg-muted/50 hover:bg-cyan/20 hover:text-cyan transition-colors"
                                    aria-label="Share on Twitter / X"
                                >
                                    <Twitter className="w-5 h-5" />
                                </a>
                                <a
                                    href={shareLinks.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 rounded-full bg-muted/50 hover:bg-cyan/20 hover:text-cyan transition-colors"
                                    aria-label="Share on LinkedIn"
                                >
                                    <Linkedin className="w-5 h-5" />
                                </a>
                                <a
                                    href={shareLinks.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 rounded-full bg-muted/50 hover:bg-cyan/20 hover:text-cyan transition-colors"
                                    aria-label="Share on Facebook"
                                >
                                    <Facebook className="w-5 h-5" />
                                </a>
                            </div>
                        </div>

                        {/* Back to Blog */}
                        <div className="mt-10 text-center">
                            <Link
                                to="/blog"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cyan/10 text-cyan font-semibold border border-cyan/20 hover:bg-cyan/20 transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                More Articles
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};
