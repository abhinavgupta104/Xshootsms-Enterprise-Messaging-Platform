/**
 * Shared Framer Motion animation variants and transitions.
 * Use these across all sections for consistent, smooth animations.
 */

import type { Variants, Transition } from "framer-motion";

// --------------- EASINGS ---------------
/** Premium expo-out easing - smooth deceleration */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
/** Soft ease-in-out for looping background elements */
export const EASE_IN_OUT = [0.45, 0, 0.55, 1] as const;

// --------------- BASE TRANSITIONS ---------------
export const smoothTransition: Transition = {
    duration: 0.7,
    ease: EASE_OUT_EXPO,
};

export const fastTransition: Transition = {
    duration: 0.5,
    ease: EASE_OUT_EXPO,
};

export const springTransition: Transition = {
    type: "spring",
    stiffness: 260,
    damping: 22,
};

// --------------- VARIANTS ---------------

/** Fade up from below — most common scroll reveal */
export const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40, willChange: "transform, opacity" },
    visible: {
        opacity: 1,
        y: 0,
        transition: smoothTransition,
    },
};

/** Fade in from left  */
export const fadeLeft: Variants = {
    hidden: { opacity: 0, x: -50, willChange: "transform, opacity" },
    visible: {
        opacity: 1,
        x: 0,
        transition: smoothTransition,
    },
};

/** Fade in from right */
export const fadeRight: Variants = {
    hidden: { opacity: 0, x: 50, willChange: "transform, opacity" },
    visible: {
        opacity: 1,
        x: 0,
        transition: smoothTransition,
    },
};

/** Scale + fade in */
export const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.92, willChange: "transform, opacity" },
    visible: {
        opacity: 1,
        scale: 1,
        transition: smoothTransition,
    },
};

/** Container that staggers its direct children */
export const staggerContainer: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.05,
        },
    },
};

/** Faster stagger for denser grids */
export const staggerContainerFast: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.07,
            delayChildren: 0.0,
        },
    },
};

/** Common viewport settings — trigger once, 80 px before edge */
export const viewport = { once: true, margin: "-80px" } as const;
