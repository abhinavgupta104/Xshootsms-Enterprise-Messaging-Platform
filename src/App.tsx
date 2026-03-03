import { Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import ChatbotWidget from "./components/ChatbotWidget";

// Loading fallback with spinner so users see feedback on refresh / direct URL open
const PageFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-4">
      <div
        className="w-12 h-12 rounded-full border-4 border-cyan/20 border-t-cyan animate-spin"
        aria-label="Loading"
      />
      <p className="text-sm text-muted-foreground">Loading...</p>
    </div>
  </div>
);

// Route-level code splitting: each page is its own chunk
const Index = lazy(() => import("./pages/Index"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Blog = lazy(() => import("./pages/Blog").then(m => ({ default: m.Blog })));
const BlogPost = lazy(() => import("./pages/BlogPost").then(m => ({ default: m.BlogPost })));
const FAQ = lazy(() => import("./pages/FAQ"));

export default function App() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      // Small timeout to ensure lazy components are in the DOM
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
      <ChatbotWidget />
    </Suspense>
  );
}
