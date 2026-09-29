import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { useRoom } from "../lib/room";
import { Magnetic } from "./bits";

const LINKS = [
  { to: "/science", label: "Science & Medicine" },
  { to: "/fiction", label: "Fiction" },
  { to: "/translation", label: "Translation" },
  { to: "/essays", label: "Essays & Press" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function ProgressBar() {
  const { room } = useRoom();
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 z-[60] h-[3px] w-full origin-left"
      style={{ scaleX: x, backgroundColor: room.accent }}
    />
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { room } = useRoom();
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dark = room.dark;

  return (
    <header
      className="sticky top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-[700ms]"
      style={{
        backgroundColor: scrolled ? (dark ? "rgba(35,40,75,0.82)" : "rgba(255,250,242,0.86)") : "transparent",
        backdropFilter: scrolled ? "blur(16px) saturate(150%)" : "none",
        borderBottom: scrolled
          ? `1px solid ${dark ? "rgba(255,250,242,0.12)" : "rgba(35,40,75,0.09)"}`
          : "1px solid transparent",
      }}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex w-full max-w-[1560px] items-center justify-between gap-6 px-5 py-4 sm:px-8 lg:px-12"
      >
        <Link
          to="/"
          className="group flex min-h-[44px] items-center gap-3"
          aria-label="John Galbraith Simmons — home"
        >
          <span
            aria-hidden
            className="display grid h-10 w-10 place-items-center rounded-full text-[0.95rem] leading-none transition-transform duration-[600ms] group-hover:rotate-[-8deg]"
            style={{
              backgroundColor: room.accent,
              color: dark ? "#23284B" : "#FFFAF2",
              fontVariationSettings: '"SOFT" 40, "WONK" 1',
            }}
          >
            JG
          </span>
          <span
            className="display hidden text-[1.06rem] leading-none tracking-[-0.015em] sm:block"
            style={{ color: dark ? "#FFFAF2" : "#23284B" }}
          >
            John Galbraith <em className="not-italic" style={{ fontVariationSettings: '"SOFT" 80, "WONK" 1', fontStyle: "italic" }}>Simmons</em>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                className="relative flex min-h-[44px] items-center px-3.5 text-[0.86rem] font-semibold tracking-[0.012em]"
                style={{ color: dark ? "rgba(255,250,242,0.82)" : "rgba(35,40,75,0.78)" }}
              >
                {({ isActive }) => (
                  <>
                    <span className="ul-draw">{l.label}</span>
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-3 bottom-2 h-[2px] rounded-full"
                        style={{ backgroundColor: room.accent }}
                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Magnetic strength={0.18}>
            <Link
              to="/contact"
              className="press inline-flex min-h-[44px] items-center gap-2 rounded-full px-5 py-2.5 text-[0.84rem] font-semibold"
              style={{
                backgroundColor: dark ? "#FFA532" : "#23284B",
                color: dark ? "#23284B" : "#FFFAF2",
              }}
            >
              Write to John
            </Link>
          </Magnetic>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="press flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full px-3 lg:hidden"
          style={{
            color: dark ? "#FFFAF2" : "#23284B",
            border: `1px solid ${dark ? "rgba(255,250,242,0.28)" : "rgba(35,40,75,0.18)"}`,
          }}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden className="flex flex-col gap-[5px]">
            <span
              className="block h-[1.5px] w-5 transition-transform duration-[420ms]"
              style={{
                backgroundColor: "currentColor",
                transform: open ? "translateY(3.2px) rotate(45deg)" : "none",
              }}
            />
            <span
              className="block h-[1.5px] w-5 transition-transform duration-[420ms]"
              style={{
                backgroundColor: "currentColor",
                transform: open ? "translateY(-3.2px) rotate(-45deg)" : "none",
              }}
            />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden lg:hidden"
            style={{
              backgroundColor: dark ? "rgba(35,40,75,0.97)" : "rgba(255,250,242,0.98)",
              borderTop: `1px solid ${dark ? "rgba(255,250,242,0.12)" : "rgba(35,40,75,0.09)"}`,
            }}
          >
            <ul className="px-5 py-4 sm:px-8">
              {LINKS.map((l, i) => (
                <motion.li
                  key={l.to}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 + i * 0.055, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  style={{ borderBottom: `1px solid ${dark ? "rgba(255,250,242,0.10)" : "rgba(35,40,75,0.08)"}` }}
                >
                  <NavLink
                    to={l.to}
                    className="display-soft flex min-h-[56px] items-center text-[1.42rem]"
                    style={{ color: dark ? "#FFFAF2" : "#23284B" }}
                  >
                    {l.label}
                  </NavLink>
                </motion.li>
              ))}
              <li className="pt-5 pb-2">
                <Link
                  to="/contact"
                  className="press flex min-h-[52px] items-center justify-center rounded-full px-6 text-[0.95rem] font-semibold"
                  style={{ backgroundColor: room.accent, color: dark ? "#23284B" : "#FFFAF2" }}
                >
                  Write to John
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
