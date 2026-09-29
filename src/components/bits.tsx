import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type CSSProperties,
  type MouseEvent,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { cn } from "../utils/cn";
import { useRoom } from "../lib/room";
import { ACCENTS, ROOMS } from "../lib/content";
import {
  fade,
  fadeUp,
  inkBleed,
  lineMask,
  settle,
  slideLeft,
  slideRight,
  t,
  viewportLoose,
  viewportOnce,
} from "../lib/motion";

/* ----------------------------- smart image ------------------------------- */

export function SmartImage({
  src,
  fallback,
  alt,
  className,
  style,
  loading = "lazy",
}: {
  src: string;
  fallback: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  loading?: "lazy" | "eager";
}) {
  const [current, setCurrent] = useState(src);
  const [failed, setFailed] = useState(false);

  // Degrade to a designed paper surface rather than a broken-image hole.
  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={className}
        style={{
          ...style,
          background:
            "linear-gradient(148deg, #FFF1DC 0%, #FFE3BA 38%, #FFD9A8 72%, #FFA532 100%)",
          boxShadow: "inset 0 0 0 1px rgba(35,40,75,0.08)",
        }}
      />
    );
  }

  // Book covers keep their true published colours (you cannot duotone a jacket);
  // every other photograph is graded into the two-ink world.
  const isCover = typeof className === "string" && className.includes("object-contain");

  return (
    <img
      src={current}
      alt={alt}
      loading={loading}
      decoding="async"
      className={cn(className, !isCover && "duotone")}
      style={style}
      onError={() => {
        if (current !== fallback) setCurrent(fallback);
        else setFailed(true);
      }}
    />
  );
}

/* ------------------------------- magnetic ------------------------------- */

export function Magnetic({
  children,
  strength = 0.28,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();

  const move = (e: MouseEvent<HTMLSpanElement>) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    ref.current.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate3d(0,0,0)";
  };

  return (
    <span
      ref={ref}
      onMouseMove={move}
      onMouseLeave={reset}
      className={cn("inline-block transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]", className)}
    >
      {children}
    </span>
  );
}

/* -------------------------------- buttons ------------------------------- */

type BtnProps = {
  children: ReactNode;
  to?: string;
  href?: string;
  accent?: string;
  tone?: "solid" | "ghost";
  /** Explicit text colour — safer than a Tailwind important modifier. */
  textColor?: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
};

export function Button({
  children,
  to,
  href,
  accent = "#FFA532",
  tone = "solid",
  textColor,
  className,
  onClick,
  type = "button",
}: BtnProps) {
  const base = cn(
    "press group relative inline-flex min-h-[52px] items-center justify-center gap-2.5 overflow-hidden rounded-full px-7 py-3.5 text-[0.94rem] font-semibold tracking-[0.01em]",
    tone === "solid" ? "" : "border border-current/25 hover:border-current/50",
    className,
  );
  // solid buttons are always the amber ink with navy type — 6.3:1
  const fill = "#FFA532";
  const colorStyle = {
    color: textColor ?? (tone === "solid" ? "#23284B" : undefined),
  };

  const label = (
    <Magnetic strength={0.2} className="relative">
      <span className="relative flex items-center gap-2.5">
        <span>{children}</span>
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="h-4 w-4 shrink-0 overflow-hidden"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <g className="transition-transform duration-[520ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[150%]">
            <path d="M4 12h15" />
            <path d="M13 6l6 6-6 6" />
          </g>
          <g className="-translate-x-[150%] transition-transform duration-[520ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0">
            <path d="M4 12h15" />
            <path d="M13 6l6 6-6 6" />
          </g>
        </svg>
      </span>
    </Magnetic>
  );

  // Fill layers sit first in DOM order; the label is position:relative so it
  // paints above them — no negative z-index, which would escape to a stacking
  // context created by an `isolate` or `transform` ancestor.
  const fills = (
    <>
      {tone === "solid" && (
        <span aria-hidden className="absolute inset-0 rounded-full" style={{ backgroundColor: fill }} />
      )}
      {tone === "solid" && (
        <span
          aria-hidden
          className="absolute inset-0 origin-bottom scale-y-0 rounded-full transition-transform duration-[620ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
          style={{ backgroundColor: "#23284B" }}
        />
      )}
      {tone === "ghost" && (
        <span
          aria-hidden
          className="absolute inset-0 origin-bottom scale-y-0 rounded-full opacity-15 transition-transform duration-[620ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
          style={{ backgroundColor: accent }}
        />
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={base} style={colorStyle} onClick={onClick}>
        {fills}
        {label}
      </Link>
    );
  }
  if (href) {
    return (
      <a
        href={href}
        className={base}
        style={colorStyle}
        onClick={onClick}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {fills}
        {label}
      </a>
    );
  }
  return (
    <button type={type} className={base} style={colorStyle} onClick={onClick}>
      {fills}
      {label}
    </button>
  );
}

/* ----------------------------- section heading -------------------------- */

export function SectionHeading({
  kicker,
  title,
  lead,
  accent = "#FFA532",
  size = "lg",
  id,
}: {
  kicker?: string;
  title: ReactNode;
  lead?: ReactNode;
  accent?: string;
  size?: "sm" | "md" | "lg" | "xl";
  id?: string;
}) {
  const sizes = {
    sm: "text-[clamp(1.9rem,4.2vw,3.1rem)]",
    md: "text-[clamp(2.3rem,5.6vw,4.3rem)]",
    lg: "text-[clamp(2.7rem,7vw,5.6rem)]",
    xl: "text-[clamp(3.1rem,9vw,7.6rem)]",
  };

  return (
    <header className="relative">
      {kicker && (
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="smallcaps mb-5 flex items-center gap-3"
          style={{ color: accent }}
        >
          <span aria-hidden className="inline-block h-px w-8" style={{ backgroundColor: accent }} />
          {kicker}
        </motion.p>
      )}
      <h2
        id={id}
        className={cn("display", sizes[size])}
      >
        <MaskedLines>{title}</MaskedLines>
      </h2>
      {lead && (
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="measure mt-7 text-[1.06rem] leading-[1.68] text-ink/80 sm:text-[1.19rem]"
        >
          {lead}
        </motion.div>
      )}
    </header>
  );
}

/** Splits children on "\n" and reveals each line from behind a mask. */
export function MaskedLines({ children }: { children: ReactNode }) {
  const lines = Array.isArray(children) ? children : [children];
  return (
    <>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.14em]">
          <motion.span
            className="block will-change-transform"
            variants={lineMask}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            custom={i}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </>
  );
}

/** Italic word that settles a beat later. */
export function Settle({ children }: { children: ReactNode }) {
  return (
    <motion.em
      variants={settle}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className="inline-block font-normal italic"
      style={{ fontVariationSettings: '"SOFT" 88, "WONK" 1' }}
    >
      {children}
    </motion.em>
  );
}

/** Ink-bleed word reveal. */
export function InkWords({ text, accent }: { text: string; accent?: string }) {
  return (
    <span className="inline">
      {text.split(" ").map((w, i) => (
        <motion.span
          key={i}
          variants={inkBleed}
          initial="hidden"
          whileInView="show"
          viewport={viewportLoose}
          custom={i}
          className="inline-block will-change-transform"
          style={accent ? { color: accent } : undefined}
        >
          {w}&nbsp;
        </motion.span>
      ))}
    </span>
  );
}

/* ------------------------------ chapter label --------------------------- */

export function ChapterLabel({
  numeral,
  title,
  accent,
  dark,
}: {
  numeral: string;
  title: string;
  accent: string;
  dark?: boolean;
}) {
  return (
    <motion.div
      variants={slideLeft}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className="lg:sticky lg:top-28"
    >
      <div
        className="display tabular select-none leading-[0.78] text-[clamp(3.6rem,12vw,8.2rem)] lg:text-[clamp(5rem,7vw,9.5rem)]"
        style={{ color: accent, opacity: 0.92 }}
        aria-hidden
      >
        {numeral}
      </div>
      <div className="mt-3 flex items-center gap-3">
        <span className="h-px w-10" style={{ backgroundColor: accent }} />
        <span
          className="smallcaps"
          style={{ color: dark ? "rgba(255,250,242,0.82)" : "rgba(35,40,75,0.78)" }}
        >
          {title}
        </span>
      </div>
    </motion.div>
  );
}

/* -------------------------------- reveal -------------------------------- */

export function Reveal({
  children,
  variant = "up",
  index = 0,
  className,
  style,
}: {
  children: ReactNode;
  variant?: "up" | "left" | "right" | "fade";
  index?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const v =
    variant === "left"
      ? slideLeft
      : variant === "right"
        ? slideRight
        : variant === "fade"
          ? fade
          : fadeUp;
  return (
    <motion.div
      variants={v}
      initial="hidden"
      whileInView="show"
      viewport={viewportLoose}
      custom={index}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------- marquee -------------------------------- */

export function Marquee({
  items,
  accent = "#FFA532",
  outline = false,
  reverse = false,
  separator = "◆",
}: {
  items: string[];
  accent?: string;
  outline?: boolean;
  reverse?: boolean;
  separator?: string;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden py-2">
      <div className={cn("marquee-track", reverse && "reverse")}>
        {doubled.map((item, i) => (
          <span key={i} className="flex shrink-0 items-center gap-8 pr-8">
            <span
              className={cn(
                "whitespace-nowrap",
                outline ? "display text-[clamp(2.2rem,5vw,4.4rem)]" : "text-[0.95rem] font-semibold tracking-[0.05em] uppercase",
              )}
              style={
                outline
                  ? { color: "transparent", WebkitTextStroke: `1.3px ${accent}` }
                  : undefined
              }
            >
              {item}
            </span>
            <span aria-hidden style={{ color: accent }} className="text-[0.62rem] opacity-70">
              {separator}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------- book card ----------------------------- */

export function BookCard({
  cover,
  coverFallback,
  alt,
  title,
  meta,
  accent,
  dark,
  href,
  index = 0,
  tall = false,
}: {
  cover: string;
  coverFallback: string;
  alt: string;
  title: string;
  meta: string;
  accent: string;
  dark?: boolean;
  href?: string;
  index?: number;
  tall?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const tilt = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `perspective(1100px) rotateY(${px * 9}deg) rotateX(${-py * 9}deg) translateY(-8px)`;
    ref.current.style.boxShadow = `0 34px 70px -28px rgba(35,40,75,0.55), 0 0 0 1px ${accent}33`;
  };
  const reset = () => {
    if (!ref.current) return;
    ref.current.style.transform = "perspective(1100px) rotateY(0deg) rotateX(0deg) translateY(0)";
    ref.current.style.boxShadow = "0 18px 40px -24px rgba(35,40,75,0.42)";
  };

  return (
    <motion.article
      variants={index % 2 === 0 ? slideLeft : slideRight}
      initial="hidden"
      whileInView="show"
      viewport={viewportLoose}
      custom={Math.floor(index / 2)}
      className="group"
    >
      <div
        ref={ref}
        onMouseMove={tilt}
        onMouseLeave={reset}
        className="tilt-card relative overflow-hidden rounded-[12px]"
        style={{ boxShadow: "0 18px 40px -24px rgba(35,40,75,0.42)" }}
      >
        <SmartImage
          src={cover}
          fallback={coverFallback}
          alt={alt}
          className={cn(
            "w-full bg-[#FFFAF2] object-contain",
            tall ? "aspect-[2/3] p-4" : "aspect-[3/4] p-3",
          )}
        />
        {/* accent wash slides up with the label */}
        <div
          className="absolute inset-0 flex items-end p-5 opacity-0 transition-opacity duration-[520ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100 group-focus-within:opacity-100"
          style={{
            background:
              "linear-gradient(to top, #FFA532 0%, rgba(255,165,50,0.94) 42%, rgba(255,165,50,0.22) 78%)",
          }}
        >
          <span className="translate-y-3 text-[0.82rem] font-bold uppercase tracking-[0.2em] text-[#23284B] transition-transform duration-[520ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0">
            {href ? "Read about the book" : "[replace with link]"}
          </span>
        </div>
      </div>

      <div className="mt-5">
        <p className="smallcaps" style={{ color: accent }}>
          {meta}
        </p>
        <h3
          className={cn(
            "display-soft mt-2 text-[1.42rem] leading-[1.12]",
            dark ? "text-[#FFFAF2]" : "text-ink",
          )}
        >
          {title}
        </h3>
        {href && (
          <Link
            to={href}
            className={cn("ul-draw mt-2 inline-block text-[0.92rem] font-semibold", dark ? "text-[#FFFAF2]/85" : "text-ink/72")}
          >
            Read about the book
          </Link>
        )}
      </div>
    </motion.article>
  );
}

/* ------------------------------- page hero ------------------------------ */

/** Register the paper colour while a page hero occupies the middle of the screen. */
function useHeroRoom(accent: string, dark?: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  const { setRoom } = useRoom();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // light heroes sit on paper stock; the amber accent signals the dark room
    const bgFor: Record<string, string> = {
      [ACCENTS.brand]: ROOMS.fiction,
    };
    const bg = bgFor[accent] ?? ROOMS.ivory;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setRoom(bg, accent, dark)),
      { rootMargin: "-42% 0px -42% 0px", threshold: 0 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [accent, dark, setRoom]);
  return ref;
}

export function PageHero({
  kicker,
  title,
  lead,
  accent,
  dark,
  children,
}: {
  kicker: string;
  title: ReactNode;
  lead?: ReactNode;
  accent: string;
  dark?: boolean;
  children?: ReactNode;
}) {
  const roomRef = useHeroRoom(accent, dark);
  return (
    <div ref={roomRef} className="relative">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={t(0.8, 0.1)}
        className="smallcaps mb-6"
        style={{ color: accent }}
      >
        {kicker}
      </motion.p>
      <h1
        className="display text-[clamp(3rem,10.5vw,8.6rem)]"
        style={{ color: dark ? "#FFFAF2" : "#23284B" }}
      >
        <MaskedLines>{title}</MaskedLines>
      </h1>
      {lead && (
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={t(0.9, 0.45)}
          className="measure mt-8 text-[1.1rem] leading-[1.7] sm:text-[1.32rem]"
          style={{ color: dark ? "rgba(255,250,242,0.82)" : "rgba(35,40,75,0.80)" }}
        >
          {lead}
        </motion.div>
      )}
      {children}
    </div>
  );
}

export { t };
