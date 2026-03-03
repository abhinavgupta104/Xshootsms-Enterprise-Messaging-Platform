export interface BlogPost {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    content: string; // HTML string for rich text
    image: string;
    author: string;
    date: string;
    readTime: string;
    category: string;
}

export const blogPosts: BlogPost[] = [
    {
        id: 1,
        slug: "whatsapp-business-api-vs-bulk-sms",
        title: "WhatsApp Business API vs Bulk SMS: Which is better for ROI?",
        excerpt: "Discover the key differences between WhatsApp Business API and Bulk SMS to choose the right channel for your business growth.",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop",
        author: "Abhinav Gupta",
        date: "Feb 15, 2026",
        readTime: "5 min read",
        category: "Marketing",
        content: `
      <p class="mb-4">In the rapidly evolving landscape of business communication, choosing the right channel is critical for maximizing Return on Investment (ROI). Two of the most powerful contenders are the WhatsApp Business API and traditional Bulk SMS. Both have their unique strengths, but which one is right for your business?</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Understanding the Basics</h2>
      <p class="mb-4"><strong>Bulk SMS</strong> is the grandfather of mobile marketing. It's reliable, universal, and doesn't require an internet connection. It's perfect for transactional alerts like OTPs and simple notifications.</p>
      <p class="mb-4"><strong>WhatsApp Business API</strong>, on the other hand, is a rich media platform. It allows for images, videos, documents, and interactive buttons. It relies on data connectivity but offers a much higher engagement rate.</p>

      <div class="bg-muted/30 border border-cyan/20 rounded-xl p-6 my-8">
        <h3 class="text-xl font-bold text-cyan mb-2">Key Takeaway</h3>
        <p>Use <strong>SMS</strong> for critical alerts and simple notifications. Use <strong>WhatsApp</strong> for engagement, marketing campaigns, and support.</p>
      </div>

      <h2 class="text-2xl font-bold mt-8 mb-4">Conclusion</h2>
      <p class="mb-4">The best strategy often involves a hybrid approach. Use SMS as a failover for WhatsApp to ensure 100% deliverability.</p>
    `
    },
    {
        id: 2,
        slug: "customer-support-voice-apis",
        title: "How to Automate Customer Support Using Voice APIs",
        excerpt: "Learn how programmable voice APIs can reduce support costs while improving customer satisfaction through intelligent IVR systems.",
        image: "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?q=80&w=1000&auto=format&fit=crop",
        author: "Sarthak Gupta",
        date: "Feb 10, 2026",
        readTime: "7 min read",
        category: "Automation",
        content: `
      <p class="mb-4">Customer support is expensive. Voice APIs allow you to build intelligent IVR (Interactive Voice Response) systems that can handle common queries without human intervention.</p>
      <h2 class="text-2xl font-bold mt-8 mb-4">Benefits of Voice Automation</h2>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>24/7 Availability</li>
        <li>Instant Scalability</li>
        <li>Reduced Operational Costs</li>
      </ul>
    `
    },
    {
        id: 3,
        slug: "dlt-registration-guide-india",
        title: "The Ultimate Guide to DLT Registration in India",
        excerpt: "Everything you need to know about TRAI's DLT regulation, registration process, and compliance for sending commercial SMS in India.",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop",
        author: "Compliance Team",
        date: "Feb 05, 2026",
        readTime: "10 min read",
        category: "Compliance",
        content: `
      <p class="mb-4">DLT (Distributed Ledger Technology) registration is now mandatory for all businesses sending SMS in India. This guide walks you through the steps.</p>
      <h2 class="text-2xl font-bold mt-8 mb-4">Step-by-Step Process</h2>
      <ol class="list-decimal pl-6 mb-4 space-y-2">
        <li>Register as a Principal Entity on any operator's DLT portal (Jio, Vodafone, Airtel).</li>
        <li>Upload KYC documents (PAN, GST, etc.).</li>
        <li>Wait for approval (usually 24-48 hours).</li>
        <li>Register your Headers (Sender IDs).</li>
        <li>Register your Content Templates.</li>
      </ol>
    `
    },
];
