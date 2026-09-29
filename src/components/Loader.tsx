import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/**
 * Smooth screen loader: the name is set in Fraunces, revealed behind a mask,
 * a hairline rule sweeps across, then the paper lifts away.
 */
export default function Loader({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const total = reduce ? 420 : 2350;
    const id = window.setTimeout(() => {
      setOpen(false);
      window.setTimeout(onDone, reduce ? 120 : 820);
    }, total);
    return () => window.clearTimeout(id);
  }, [onDone, reduce]);

  const first = "John Galbraith".split("");
  const last = "Simmons".split("");

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-[#FFFAF2]"
          initial={{ y: 0 }}
          exit={{ y: "-101%" }}
          transition={{ duration: reduce ? 0.2 : 0.82, ease: [0.76, 0, 0.24, 1] }}
          aria-label="Loading the site of John Galbraith Simmons"
          role="status"
        >
          {/* terracotta ink bloom behind the name */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute h-[52vmin] w-[52vmin] rounded-full blur-[90px]"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(255,165,50,0.30), rgba(255,217,168,0.14) 55%, transparent 72%)",
            }}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1.15, opacity: 1 }}
            transition={{ duration: reduce ? 0.2 : 1.9, ease: [0.22, 1, 0.36, 1] }}
          />

          <div className="relative px-6 text-center">
            <p className="smallcaps mb-6 text-[#9A5B08]">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduce ? 0 : 0.15, duration: 0.7 }}
                className="inline-block"
              >
                Author · Science &amp; Medical Writer · Novelist · Translator
              </motion.span>
            </p>

            <h1 className="display text-[clamp(2.1rem,8.2vw,6.2rem)] text-[#23284B]">
              <span className="block overflow-hidden pb-[0.12em]">
                {first.map((c, i) => (
                  <motion.span
                    key={`f${i}`}
                    className="inline-block will-change-transform"
                    initial={{ y: "115%", opacity: 0, rotate: 3 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    transition={{
                      delay: reduce ? 0 : 0.12 + i * 0.026,
                      duration: reduce ? 0.2 : 0.86,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {c === " " ? "\u00A0" : c}
                  </motion.span>
                ))}
              </span>
              <span className="block overflow-hidden pb-[0.12em] italic">
                {last.map((c, i) => (
                  <motion.span
                    key={`l${i}`}
                    className="inline-block will-change-transform"
                    style={{ fontVariationSettings: '"SOFT" 80, "WONK" 1' }}
                    initial={{ y: "115%", opacity: 0, rotate: -3 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    transition={{
                      delay: reduce ? 0 : 0.52 + i * 0.05,
                      duration: reduce ? 0.2 : 0.95,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {c}
                  </motion.span>
                ))}
              </span>
            </h1>

            <motion.div
              className="mx-auto mt-8 h-px w-[min(420px,70vw)] origin-left bg-[#FFA532]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: reduce ? 0 : 0.9, duration: reduce ? 0.2 : 1.1, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.p
              className="mt-4 text-[0.78rem] tracking-[0.34em] text-[#6D7291] uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: reduce ? 0 : 1.35, duration: 0.7 }}
            >
              From the laboratory to the shadows
            </motion.p>
          </div>

          <span className="sr-only">Loading</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
