import { useEffect, useState } from "react";

const SESSION_KEY = "exit_intent_shown";

/**
 * Fires when the user moves their cursor near the top of the browser
 * (toward the tab bar / address bar), indicating potential exit.
 * Only triggers once per browser session.
 */
export const useExitIntent = () => {
    const [triggered, setTriggered] = useState(false);

    useEffect(() => {
        // Don't fire on mobile — mouseleave doesn't work reliably
        if ("ontouchstart" in window) return;
        // Only once per session
        if (sessionStorage.getItem(SESSION_KEY)) return;

        const handleMouseLeave = (e: MouseEvent) => {
            // clientY < 5 means cursor is heading into the browser chrome
            if (e.clientY < 5 && !sessionStorage.getItem(SESSION_KEY)) {
                sessionStorage.setItem(SESSION_KEY, "1");
                setTriggered(true);
            }
        };

        document.addEventListener("mouseleave", handleMouseLeave);
        return () => document.removeEventListener("mouseleave", handleMouseLeave);
    }, []);

    return triggered;
};
