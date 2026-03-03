import { useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";

// Defer GA4 initialization until after the page is interactive
let gaInitialized = false;

const initGA = async () => {
    if (gaInitialized) return;
    gaInitialized = true;
    const ReactGA = (await import("react-ga4")).default;
    ReactGA.initialize("G-JYFYB3K5SJ");
    return ReactGA;
};

export const AnalyticsProvider = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation();

    const trackPageView = useCallback(async () => {
        const ReactGA = (await import("react-ga4")).default;
        if (gaInitialized) {
            ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
        }
    }, [location]);

    useEffect(() => {
        // Defer analytics initialization until after first paint
        const timer = setTimeout(() => {
            initGA().then(() => trackPageView());
        }, 3000); // Wait 3 seconds after mount to initialize analytics

        return () => clearTimeout(timer);
    }, [trackPageView]); // Initialize analytics and track first pageview

    useEffect(() => {
        // Track subsequent page views immediately (GA already loaded)
        if (gaInitialized) {
            trackPageView();
        }
    }, [location, trackPageView]);

    return <>{children}</>;
};
