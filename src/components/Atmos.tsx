import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

const drift = (delay: number, dur: number, y = 26, x = 10) => ({
  initial: { y: 0, x: 0, opacity: 0 },
  animate: {
    y: [0, -y, 0],
    x: [0, x, 0],
    opacity: [0, 0.85, 0],
  },
  transition: {
    duration: dur,
    delay,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
});

/* ---------------------------- SCIENCE & MEDICINE --------------------------- */

export function ScienceAtmos({ accent = "#9A5B08" }: { accent?: string }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* DNA double helix */}
      <svg
        className="absolute -left-6 top-[8%] h-[520px] w-[190px] opacity-[0.16]"
        viewBox="0 0 190 520"
        fill="none"
      >
        {[...Array(2)].map((_, s) => (
          <path
            key={s}
            d={
              s === 0
                ? "M40 0 C 150 65, 150 130, 40 195 C -70 260, -70 325, 40 390 C 150 455, 150 520, 40 520"
                : "M150 0 C 40 65, 40 130, 150 195 C 260 260, 260 325, 150 390 C 40 455, 40 520, 150 520"
            }
            stroke={accent}
            strokeWidth="2.5"
          />
        ))}
        {[...Array(13)].map((_, i) => (
          <line
            key={i}
            x1={i % 2 ? 55 : 105}
            x2={i % 2 ? 135 : 85}
            y1={i * 40}
            y2={i * 40}
            stroke={accent}
            strokeWidth="1.6"
          />
        ))}
      </svg>

      {/* ion-channel particles */}
      {[
        { l: "18%", t: "22%", s: 10, d: 0 },
        { l: "72%", t: "16%", s: 7, d: 1.4 },
        { l: "84%", t: "58%", s: 13, d: 2.6 },
        { l: "38%", t: "72%", s: 8, d: 0.8 },
        { l: "61%", t: "86%", s: 11, d: 2 },
        { l: "12%", t: "54%", s: 6, d: 3.1 },
      ].map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            left: p.l,
            top: p.t,
            width: p.s * 3,
            height: p.s * 3,
            background: `radial-gradient(circle, ${accent}, transparent 68%)`,
            filter: "blur(3px)",
          }}
          {...drift(p.d, 9 + i, 34, 16)}
        />
      ))}

      {/* microscope lens rings */}
      <div
        className="absolute right-[8%] top-[12%] h-40 w-40 rounded-full border"
        style={{ borderColor: `${accent}40` }}
      />
      <div
        className="absolute right-[8%] top-[12%] m-8 h-24 w-24 rounded-full border"
        style={{ borderColor: `${accent}28` }}
      />

      {/* heartbeat / pulse line */}
      <svg className="absolute bottom-[6%] left-[6%] h-16 w-[min(560px,70vw)] opacity-30" viewBox="0 0 560 60" fill="none">
        <motion.path
          d="M0 30 H150 L172 30 L186 8 L202 52 L218 20 L232 30 H400 L420 30 L434 12 L450 48 L464 30 H560"
          stroke={accent}
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3.4, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}

/* ---------------------------------- FICTION -------------------------------- */

export function FictionAtmos({ accent = "#FFA532" }: { accent?: string }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* lamplight glow */}
      <div
        className="absolute left-1/2 top-[42%] h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[70px]"
        style={{
          background: `radial-gradient(circle, ${accent}59 0%, ${accent}22 42%, transparent 70%)`,
        }}
      />
      {/* rising moon */}
      <motion.div
        className="absolute right-[12%] top-[18%] h-24 w-24 rounded-full"
        style={{
          background: `radial-gradient(circle at 34% 32%, ${accent}EE, ${accent}66 62%, transparent 78%)`,
          boxShadow: `0 0 90px 24px ${accent}30`,
        }}
        initial={{ y: 70, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* moths circling the lamp */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.span
          key={i}
          className="absolute"
          style={{
            left: `${22 + i * 14}%`,
            top: `${34 + (i % 3) * 12}%`,
            width: 16 + (i % 3) * 5,
            height: 12 + (i % 2) * 4,
            opacity: 0.5,
          }}
          animate={{
            x: [0, 30 + i * 9, -18 - i * 6, 0],
            y: [0, -34 - i * 5, 20 + i * 4, 0],
            rotate: [0, 22, -18, 0],
            opacity: [0.18, 0.62, 0.28, 0.18],
          }}
          transition={{ duration: 12 + i * 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 40 28" fill="none">
            <path d="M20 14 C 12 2, 2 2, 4 12 C 5 20, 14 22, 20 14 Z" fill={accent} opacity="0.75" />
            <path d="M20 14 C 28 2, 38 2, 36 12 C 35 20, 26 22, 20 14 Z" fill={accent} opacity="0.55" />
            <ellipse cx="20" cy="14" rx="2" ry="6" fill={accent} />
          </svg>
        </motion.span>
      ))}

      {/* fireflies */}
      {[...Array(9)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${8 + i * 10}%`,
            top: `${50 + ((i * 13) % 42)}%`,
            width: 6,
            height: 6,
            background: accent,
            boxShadow: `0 0 12px 3px ${accent}88`,
          }}
          animate={{
            y: [0, -60, -20, 0],
            x: [0, 14, -12, 0],
            opacity: [0, 0.9, 0.25, 0],
          }}
          transition={{ duration: 9 + i, repeat: Infinity, delay: i * 0.9, ease: "easeInOut" }}
        />
      ))}

      {/* footsteps receding */}
      <svg className="absolute bottom-[8%] left-[10%] h-20 w-[min(460px,62vw)] opacity-25" viewBox="0 0 460 80" fill="none">
        {[...Array(8)].map((_, i) => (
          <ellipse
            key={i}
            cx={30 + i * 54}
            cy={i % 2 ? 46 : 30}
            rx="11"
            ry="17"
            transform={`rotate(${i % 2 ? 12 : -12} ${30 + i * 54} ${i % 2 ? 46 : 30})`}
            fill={accent}
            opacity={0.85 - i * 0.09}
          />
        ))}
      </svg>
    </div>
  );
}

/* -------------------------------- TRANSLATION ------------------------------ */

const GLYPHS = ["é", "ç", "à", "ü", "è", "Ω", "語", "œ", "ñ", "â"];

export function TranslationAtmos({ accent = "#FFA532" }: { accent?: string }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {GLYPHS.map((g, i) => (
        <motion.span
          key={g}
          className="display absolute select-none"
          style={{
            left: `${6 + (i * 9.4) % 88}%`,
            top: `${12 + ((i * 17) % 74)}%`,
            fontSize: `${1.6 + (i % 4) * 1.05}rem`,
            color: accent,
            opacity: 0.42,
            fontVariationSettings: '"SOFT" 70, "WONK" 1',
          }}
          animate={{
            y: [0, -28 - i * 3, 0],
            x: [0, 12 - i * 2, 0],
            rotate: [0, i % 2 ? 16 : -16, 0],
            opacity: [0.16, 0.52, 0.16],
          }}
          transition={{ duration: 11 + i * 1.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
        >
          {g}
        </motion.span>
      ))}

      {/* gliding paper sheets */}
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="absolute block rounded-[6px] bg-ivory/55"
          style={{
            width: 74,
            height: 100,
            top: `${22 + i * 26}%`,
            left: "-12%",
            boxShadow: "0 18px 40px -22px rgba(35,40,75,0.45)",
          }}
          animate={{ x: ["-12vw", "112vw"], rotate: [0, 22, -8, 14], opacity: [0, 0.75, 0] }}
          transition={{ duration: 22 + i * 6, repeat: Infinity, delay: i * 5, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ---------------------------------- ESSAYS --------------------------------- */

export function EssaysAtmos({ accent = "#FFA532" }: { accent?: string }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* loose manuscript pages turning */}
      {[0, 1, 2, 3].map((i) => (
        <motion.span
          key={i}
          className="absolute block rounded-[8px]"
          style={{
            width: 96,
            height: 128,
            left: `${12 + i * 22}%`,
            top: `${16 + ((i * 21) % 62)}%`,
            background: "linear-gradient(150deg, #FFFAF2 0%, #FFF1DC 100%)",
            boxShadow: "0 24px 50px -26px rgba(35,40,75,0.5)",
            opacity: 0.5,
          }}
          animate={{
            y: [0, -30, 6, 0],
            rotate: [0, i % 2 ? 18 : -16, i % 2 ? -8 : 10, 0],
            opacity: [0.22, 0.62, 0.3, 0.22],
          }}
          transition={{ duration: 15 + i * 2.5, repeat: Infinity, ease: "easeInOut", delay: i * 1.7 }}
        />
      ))}

      {/* quill feathers */}
      {[0, 1].map((i) => (
        <motion.svg
          key={i}
          viewBox="0 0 60 160"
          className="absolute h-40 w-16"
          style={{ left: i ? "76%" : "22%", top: i ? "24%" : "62%", opacity: 0.32 }}
          fill="none"
          animate={{ y: [0, -22, 0], rotate: [0, i ? 12 : -12, 0] }}
          transition={{ duration: 13 + i * 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M30 156 C 30 110, 30 60, 30 8" stroke={accent} strokeWidth="2" strokeLinecap="round" />
          <path d="M30 14 C 52 34, 52 86, 30 112 C 8 86, 8 34, 30 14 Z" fill={accent} opacity="0.55" />
          <path d="M30 22 L 30 108" stroke="#FFFAF2" strokeWidth="1.4" opacity="0.7" />
        </motion.svg>
      ))}
    </div>
  );
}

/* ------------------------------- PAPER PLANE ------------------------------ */

export function PaperPlane() {
  const reduce = useReducedMotion();
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 90, damping: 22, mass: 0.7 });
  const sy = useSpring(y, { stiffness: 90, damping: 22, mass: 0.7 });

  useEffect(() => {
    if (reduce) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX + 26);
      y.set(e.clientY + 22);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduce, x, y]);

  if (reduce) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[70] hidden lg:block"
      style={{ x: sx, y: sy, opacity: 0.42 }}
    >
      <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
        <path d="M2 16 L30 3 L20 30 L15 19 Z" stroke="#FFA532" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M15 19 L30 3" stroke="#FFA532" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    </motion.div>
  );
}

/* ------------------------------- CUSTOM CURSOR ---------------------------- */

export function CursorDot() {
  const dot = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 260, damping: 26, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 260, damping: 26, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest?.("[data-cursor]") as HTMLElement | null;
      if (target && dot.current) {
        dot.current.dataset.on = "1";
        dot.current.style.transform = "translate(-50%,-50%) scale(3.1)";
        if (label.current) {
          label.current.textContent = target.dataset.cursor || "View";
          label.current.style.opacity = "1";
          label.current.style.transform = "scale(1)";
        }
      } else if (dot.current) {
        dot.current.dataset.on = "0";
        dot.current.style.transform = "translate(-50%,-50%) scale(1)";
        if (label.current) {
          label.current.style.opacity = "0";
          label.current.style.transform = "scale(0.32)";
        }
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.classList.add("cursor-none");
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.classList.remove("cursor-none");
    };
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[80] hidden lg:block"
      style={{ x: sx, y: sy }}
    >
      <div
        ref={dot}
        className="grid h-[16px] w-[16px] place-items-center rounded-full transition-transform duration-[380ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ backgroundColor: "#FFA532", transform: "translate(-50%,-50%) scale(1)" }}
      >
        <span
          ref={label}
          className="pointer-events-none scale-[0.32] text-[11px] font-bold uppercase tracking-[0.08em] whitespace-nowrap text-[#FFFAF2] opacity-0 transition-opacity duration-300"
        />
      </div>
    </motion.div>
  );
}
