import type { Variants, Transition } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1] as const;

export const t = (duration = 0.85, delay = 0): Transition => ({
  duration,
  delay,
  ease: EASE as unknown as Transition["ease"],
});

/** Line-by-line masked headline reveal with a slight rotation. */
export const lineMask: Variants = {
  hidden: { y: "110%", rotate: 1.2, opacity: 0 },
  show: (i: number = 0) => ({
    y: "0%",
    rotate: 0,
    opacity: 1,
    transition: { ...t(1.05, i * 0.11), rotate: t(1.25, i * 0.11) },
  }),
};

/** Italic words that settle a beat after the rest of the line. */
export const settle: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: t(0.9, 0.35 + i * 0.1),
  }),
};

/** Ink-bleed: words arrive out of a soft blur and resolve. */
export const inkBleed: Variants = {
  hidden: { opacity: 0, filter: "blur(14px)", letterSpacing: "0.06em" },
  show: (i: number = 0) => ({
    opacity: 1,
    filter: "blur(0px)",
    letterSpacing: "-0.012em",
    transition: t(1.15, i * 0.07),
  }),
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number = 0) => ({ opacity: 1, y: 0, transition: t(0.85, i * 0.09) }),
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  show: (i: number = 0) => ({ opacity: 1, transition: t(1.1, i * 0.1) }),
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -48 },
  show: (i: number = 0) => ({ opacity: 1, x: 0, transition: t(0.95, i * 0.12) }),
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: 48 },
  show: (i: number = 0) => ({ opacity: 1, x: 0, transition: t(0.95, i * 0.12) }),
};

/** Plate unmask: scales up and wipes open. */
export const unmask: Variants = {
  hidden: { opacity: 0, scale: 0.92, clipPath: "inset(12% 8% 12% 8% round 10px)" },
  show: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    clipPath: "inset(0% 0% 0% 0% round 10px)",
    transition: { ...t(1.15, i * 0.1), clipPath: t(1.35, i * 0.1) },
  }),
};

export const viewportOnce = { once: true, amount: 0.25 } as const;
export const viewportLoose = { once: true, amount: 0.12 } as const;

export const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
