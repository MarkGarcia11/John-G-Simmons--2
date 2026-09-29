import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

import { useSeo } from "../lib/seo";
import { useRoom } from "../lib/room";
import { ACCENTS, CHAPTERS, IMG, PLATE, ROOMS, numbers, outlets, scienceBooks, novels } from "../lib/content";
import { lineMask, fadeUp, viewportOnce, viewportLoose, t } from "../lib/motion";
import {
  BookCard,
  Button,
  ChapterLabel,
  InkWords,
  Marquee,
  Reveal,
  SectionHeading,
  Settle,
  SmartImage,
} from "../components/bits";
import { Section } from "../lib/room";
import { EssaysAtmos, FictionAtmos, ScienceAtmos, TranslationAtmos } from "../components/Atmos";

/* ---------------------------------- HERO ---------------------------------- */

function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "16%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-8%"]);

  return (
    <section
      ref={ref}
      className="relative isolate grain min-h-[92vh] overflow-hidden pt-10 pb-20 sm:pt-16 lg:min-h-[100vh] lg:pb-28"
      aria-labelledby="hero-title"
    >
      {/* full-bleed atmospheric plate */}
      <motion.div aria-hidden className="absolute inset-0 -z-20" style={{ y: bgY }}>
        <SmartImage
          src={PLATE.desk}
          fallback={PLATE.desk}
          alt=""
          loading="eager"
          className="h-[116%] w-full object-cover object-[62%_50%]"
        />
      </motion.div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(100deg, rgba(255,250,242,0.97) 0%, rgba(255,250,242,0.92) 32%, rgba(255,246,232,0.66) 55%, rgba(255,217,168,0.28) 78%, rgba(35,40,75,0.18) 100%)",
        }}
      />

      {/* loose pages drifting across the hero on load */}
      {!reduce &&
        [0, 1, 2].map((i) => (
          <motion.span
            key={i}
            aria-hidden
            className="absolute -z-[5] block rounded-[6px]"
            style={{
              width: 62 + i * 16,
              height: 86 + i * 18,
              top: `${18 + i * 26}%`,
              left: "-14%",
              background: "linear-gradient(150deg,#FFFAF2 0%,#FFE3BA 100%)",
              boxShadow: "0 22px 44px -24px rgba(35,40,75,0.5)",
            }}
            initial={{ x: "-14vw", rotate: -14, opacity: 0 }}
            animate={{ x: "116vw", rotate: 22, opacity: [0, 0.85, 0] }}
            transition={{ duration: 17 + i * 5, delay: 0.4 + i * 2.6, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

      <div className="mx-auto grid w-full max-w-[1560px] grid-cols-1 items-center gap-y-14 px-5 sm:px-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-x-14 lg:px-12">
        <motion.div style={{ y: textY }}>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="smallcaps flex flex-wrap items-center gap-x-3 gap-y-1 text-clay"
          >
            <span aria-hidden className="inline-block h-px w-9 bg-clay" />
            Author · Science &amp; Medical Writer
            <span aria-hidden className="opacity-45">
              /
            </span>
            Novelist · Translator
          </motion.p>

          <h1
            id="hero-title"
            className="display mt-7 text-[clamp(3.15rem,11vw,9.2rem)] leading-[0.9] text-ink"
          >
            <span className="block overflow-hidden pb-[0.11em]">
              <motion.span
                className="block"
                variants={lineMask}
                initial="hidden"
                animate="show"
                custom={0}
              >
                John Galbraith
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.11em]">
              <motion.span
                className="block italic text-terracotta"
                style={{ fontVariationSettings: '"SOFT" 96, "WONK" 1' }}
                variants={lineMask}
                initial="hidden"
                animate="show"
                custom={1}
              >
                Simmons
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={t(1, 0.55)}
            className="measure-tight mt-8 text-[1.16rem] leading-[1.62] text-ink/85 sm:text-[1.42rem]"
          >
            From the laboratory to the shadows:{" "}
            <em className="text-clay" style={{ fontVariationSettings: '"SOFT" 88, "WONK" 1' }}>
              one writer, one curiosity about what lies beneath.
            </em>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={t(0.9, 0.82)}
            className="mt-10 flex flex-wrap items-center gap-3.5"
          >
            <Button to="/science" accent={ACCENTS.terracotta}>
              Explore the Books
            </Button>
            <Button to="/about" accent={ACCENTS.terracotta} tone="ghost">
              Read the Story
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={t(1, 1.15)}
            className="mt-8 text-[0.88rem] leading-relaxed text-ink/72"
          >
            Oxford University Press · Houghton Mifflin · Nature · Contra Mundum Press
          </motion.p>
        </motion.div>

        {/* overlapping plate composition */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={t(1.25, 0.45)}
          className="relative h-[440px] w-full sm:h-[560px] lg:h-[640px]"
        >
          <div className="absolute inset-y-0 right-0 w-[76%] overflow-hidden rounded-[12px] shadow-[0_50px_90px_-40px_rgba(35,40,75,0.6)]">
            <SmartImage
              src={PLATE.desk}
              fallback={PLATE.desk}
              alt="A writing desk beside a window: books, a notebook and coffee in late afternoon light"
              className="h-full w-full object-cover object-[44%_50%]"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(35,40,75,0.34), transparent 46%)" }}
            />
          </div>

          {/* the portrait, tipped in like a plate */}
          <figure className="absolute bottom-8 left-0 w-[42%] max-w-[230px] rotate-[-3deg] overflow-hidden rounded-[10px] border-[6px] border-[#FFFAF2] shadow-[0_34px_60px_-26px_rgba(35,40,75,0.62)]">
            <SmartImage
              src={IMG.portrait}
              fallback={PLATE.portrait}
              alt="Portrait of the author John Galbraith Simmons"
              className="aspect-[3/4] w-full object-cover grayscale"
            />
          </figure>

          {/* covers overlapping */}
          <figure className="absolute top-6 left-[6%] w-[30%] max-w-[168px] rotate-[4deg] overflow-hidden rounded-[8px] shadow-[0_30px_58px_-24px_rgba(35,40,75,0.62)]">
            <SmartImage
              src={IMG.sci100}
              fallback={PLATE.lab}
              alt="Cover of The Scientific 100 by John Galbraith Simmons"
              className="aspect-square w-full object-contain"
            />
          </figure>
          <figure className="absolute top-[26%] left-[30%] w-[28%] max-w-[156px] rotate-[-6deg] overflow-hidden rounded-[8px] shadow-[0_30px_58px_-24px_rgba(35,40,75,0.62)]">
            <SmartImage
              src={IMG.tpa}
              fallback={PLATE.lab}
              alt="Cover of tPA for Stroke by John Galbraith Simmons and Justin A. Zivin"
              className="aspect-[2/3] w-full object-contain"
            />
          </figure>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------- ONE STORY -------------------------------- */

function OneStory() {
  return (
    <Section
      bg={ROOMS.ivory}
      accent={ACCENTS.terracotta}
      className="py-24 lg:py-32"
      rail={
        <ChapterLabel numeral="—" title="The through-line" accent={ACCENTS.terracotta} />
      }
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
        <div>
          <SectionHeading
            kicker="ONE STORY, NOT THREE CAREERS"
            accent={ACCENTS.terracotta}
            size="md"
            title={[
              <>Science, noir and translation are</>,
              <>
                the <Settle>same question</Settle> asked
              </>,
              <>three different ways.</>,
            ]}
          />
          <div className="measure mt-8 space-y-6 text-[1.08rem] leading-[1.72] text-ink/82">
            <p>
              <InkWords text="In the laboratory the thing that matters is what the body is hiding." /> In a
              novel it is what a person is hiding. In a translation it is what a language is hiding — the
              turn of phrase that will not cross over, the word that keeps its secret until someone carries
              it across by hand.
            </p>
            <p>
              John Galbraith Simmons has spent a working life moving between those three rooms: collective
              biographies of science and medicine, a noir quartet of novels, and — with Jocelyne Geneviève
              Barque — some of the first English versions of major French works.
            </p>
            <p className="border-l-2 pl-6 text-ink/72 italic" style={{ borderColor: ACCENTS.terracotta }}>
              [replace with an approved first-person paragraph in John's own voice — two or three sentences
              on why these three strands belong to one curiosity]
            </p>
          </div>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button to="/about" accent={ACCENTS.terracotta} tone="ghost">
              Read the full biography
            </Button>
          </div>
        </div>

        <Reveal className="relative">
          <div className="overflow-hidden rounded-[12px] shadow-[0_40px_80px_-38px_rgba(35,40,75,0.55)]">
            <SmartImage
              src={IMG.heroPlate}
              fallback={PLATE.desk}
              alt="John Galbraith Simmons at work — photograph from the author's own collection"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <div
            aria-hidden
            className="absolute -bottom-8 -right-4 hidden h-40 w-40 rounded-full opacity-70 blur-[60px] lg:block"
            style={{ background: ACCENTS.terracotta }}
          />
          <p className="mt-4 text-[0.82rem] text-ink/72">
            Photograph from the author's collection. [replace with a high-resolution portrait]
          </p>
        </Reveal>
      </div>
    </Section>
  );
}

/* ------------------------------ CREDIBILITY ------------------------------- */

function Credibility() {
  return (
    <section className="border-y border-ink/8 bg-parchment/60 py-12">
      <p className="smallcaps mb-7 px-5 text-center text-ink/72 sm:px-8">
        Published, reported and translated with
      </p>
      <Marquee items={outlets} accent={ACCENTS.clay} separator="✳" />
      <div className="mt-2 opacity-70">
        <Marquee items={[...outlets].reverse()} accent={ACCENTS.sand} separator="✳" reverse />
      </div>
    </section>
  );
}

/* ------------------------------- CHAPTERS --------------------------------- */

function ChapterBands() {
  return (
    <div className="relative py-24 lg:py-32">
      <div className="mx-auto w-full max-w-[1560px] px-5 sm:px-8 lg:px-12">
        <SectionHeading
          kicker="FOUR CHAPTERS"
          accent={ACCENTS.olive}
          size="lg"
          title={[
            <>Four rooms in</>,
            <>
              the <Settle>same house.</Settle>
            </>,
          ]}
          lead="Each chapter has its own light. Follow them in any order — they are all the same argument."
        />
      </div>

      <div className="mt-16 space-y-6 lg:mt-20 lg:space-y-8">
        {CHAPTERS.map((c, i) => {
          const Atmos =
            i === 0 ? ScienceAtmos : c.dark ? FictionAtmos : i === 2 ? TranslationAtmos : EssaysAtmos;
          return (
            <motion.div
              key={c.href}
              variants={i % 2 === 0 ? fadeUp : fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewportLoose}
              custom={i}
              className="relative"
            >
              <Link
                to={c.href}
                data-cursor="Read"
                className="group relative isolate block overflow-hidden"
                style={{ backgroundColor: c.bg }}
              >
                <div
                  aria-hidden
                  className="absolute inset-0 -z-10 opacity-[0.18] transition-opacity duration-[900ms] group-hover:opacity-[0.32]"
                  style={{
                    background: c.dark
                      ? "linear-gradient(115deg, #FFA532, transparent 72%)"
                      : "linear-gradient(115deg, #FFA532, transparent 72%)",
                  }}
                />
                <div
                  aria-hidden
                  className="absolute inset-0 -z-10"
                  style={{
                    background: `linear-gradient(90deg, ${
                      c.dark ? "rgba(35,40,75,0.96)" : "rgba(255,250,242,0.92)"
                    } 0%, ${
                      c.dark ? "rgba(35,40,75,0.72)" : "rgba(255,250,242,0.68)"
                    } 52%, transparent 100%)`,
                  }}
                />
                <div className="absolute inset-0 -z-10">
                  <Atmos accent={c.accent} />
                </div>

                <div
                  className={`mx-auto grid w-full max-w-[1560px] grid-cols-1 items-center gap-y-8 px-5 py-14 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.82fr)] lg:gap-x-14 lg:px-12 lg:py-20 ${
                    i % 2 ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div>
                    <div className="flex items-baseline gap-4">
                      <span
                        aria-hidden
                        className="display leading-none text-[clamp(3rem,9vw,7rem)]"
                        style={{ color: c.accent, opacity: 0.95 }}
                      >
                        {c.num}
                      </span>
                      <span
                        className="smallcaps"
                        style={{ color: c.dark ? "rgba(255,250,242,0.78)" : "rgba(35,40,75,0.78)" }}
                      >
                        Chapter {c.n} — {c.label}
                      </span>
                    </div>
                    <h3
                      className="display mt-4 text-[clamp(2.4rem,6.6vw,5.2rem)]"
                      style={{ color: c.dark ? "#FFFAF2" : "#23284B" }}
                    >
                      {c.title}
                    </h3>
                    <p
                      className="measure-tight mt-5 text-[1.12rem] leading-[1.62]"
                      style={{ color: c.dark ? "rgba(255,250,242,0.80)" : "rgba(35,40,75,0.78)" }}
                    >
                      {c.line}
                    </p>
                    <span
                      className="mt-7 inline-flex min-h-[52px] items-center gap-2.5 rounded-full px-6 py-3 text-[0.92rem] font-semibold transition-all duration-[620ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:gap-4"
                      style={{
                        backgroundColor: c.accent,
                        color: c.dark ? "#23284B" : "#FFFAF2",
                      }}
                    >
                      Open the chapter
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 12h15" />
                        <path d="M13 6l6 6-6 6" />
                      </svg>
                    </span>
                  </div>

                  <div className="relative">
                    <div className="overflow-hidden rounded-[12px] shadow-[0_44px_84px_-38px_rgba(35,40,75,0.62)]">
                      <SmartImage
                        src={c.plate}
                        fallback={c.plate}
                        alt={`${c.title} — atmospheric photograph for the ${c.label} chapter`}
                        className="aspect-[16/10] w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                      />
                    </div>
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 rounded-[12px] opacity-0 transition-opacity duration-[700ms] group-hover:opacity-100"
                      style={{ background: `linear-gradient(to top, ${c.accent}66, transparent 60%)` }}
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ----------------------------- FEATURED BOOKS ----------------------------- */

function Featured() {
  const scroller = useRef<HTMLDivElement>(null);
  const featured = [
    {
      ...scienceBooks[2],
      meta: `${scienceBooks[2].publisher} · ${scienceBooks[2].year}`,
      href: "/science#tpa-for-stroke",
    },
    {
      ...scienceBooks[1],
      meta: `${scienceBooks[1].publisher} · ${scienceBooks[1].year}`,
      href: "/science#doctors-and-discoveries",
    },
    {
      ...scienceBooks[0],
      meta: `${scienceBooks[0].year} · [publisher to confirm]`,
      href: "/science#the-scientific-100",
    },
    {
      id: novels[1].id,
      title: novels[1].title,
      cover: novels[1].cover,
      coverFallback: novels[1].coverFallback,
      alt: novels[1].alt,
      meta: "Noir quartet",
      href: "/fiction",
    },
  ];

  const nudge = (dir: number) => {
    scroller.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  };

  return (
    <Section
      bg={ROOMS.parchment}
      accent={ACCENTS.clay}
      className="py-24 lg:py-32"
      rail={<ChapterLabel numeral="§" title="Selected works" accent={ACCENTS.clay} />}
    >
      <div className="flex flex-wrap items-end justify-between gap-8">
        <SectionHeading
          kicker="SELECTED WORKS"
          accent={ACCENTS.clay}
          size="md"
          title={[
            <>The books, in</>,
            <>
              the <Settle>order they arrived.</Settle>
            </>,
          ]}
        />
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => nudge(-1)}
            aria-label="Previous books"
            className="press grid h-12 w-12 place-items-center rounded-full border border-ink/18 text-ink hover:border-ink/45"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 12H5" />
              <path d="M11 6l-6 6 6 6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => nudge(1)}
            aria-label="Next books"
            className="press grid h-12 w-12 place-items-center rounded-full border border-ink/18 text-ink hover:border-ink/45"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12h15" />
              <path d="M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={scroller}
        className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-8 overflow-x-auto pb-6"
      >
        {featured.map((b, i) => (
          <div key={b.id} className="w-[76vw] shrink-0 snap-start sm:w-[320px]">
            <BookCard
              cover={b.cover}
              coverFallback={b.coverFallback}
              alt={b.alt}
              title={b.title}
              meta={b.meta}
              accent={ACCENTS.clay}
              href={b.href}
              index={i}
              tall
            />
          </div>
        ))}
      </div>
    </Section>
  );
}

/* -------------------------------- NUMBERS --------------------------------- */

function Numbers() {
  return (
    <Section
      bg={ROOMS.ivory}
      accent={ACCENTS.olive}
      className="py-24 lg:py-28"
      rail={<ChapterLabel numeral="№" title="By the numbers" accent={ACCENTS.olive} />}
    >
      <SectionHeading
        kicker="THE RECORD, BRIEFLY"
        accent={ACCENTS.olive}
        size="sm"
        title={[
          <>
            Four decades of <Settle>work in print.</Settle>
          </>,
        ]}
      />
      <dl className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-[12px] bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
        {numbers.map((n, i) => (
          <motion.div
            key={n.label}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            custom={i}
            className="bg-ivory p-8 lg:p-9"
          >
            <dt className="sr-only">{n.label}</dt>
            <dd>
              <span
                className="display tabular block text-[clamp(3rem,7vw,4.6rem)] leading-none"
                style={{ color: ACCENTS.olive }}
              >
                {n.figure}
              </span>
              <span className="smallcaps mt-4 block text-ink/72">{n.label}</span>
              <span className="mt-3 block text-[0.88rem] leading-[1.6] text-ink/72">{n.note}</span>
            </dd>
          </motion.div>
        ))}
      </dl>
    </Section>
  );
}

/* ---------------------------------- CTA ----------------------------------- */

function Cta() {
  return (
    <section className="relative isolate grain overflow-hidden py-24 lg:py-32">
      <div aria-hidden className="absolute inset-0 -z-20">
        <SmartImage
          src={PLATE.manuscript}
          fallback={PLATE.manuscript}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(120deg, rgba(255,250,242,0.95) 0%, rgba(255,246,232,0.90) 46%, rgba(255,165,50,0.32) 100%)",
        }}
      />
      <div className="mx-auto w-full max-w-[1560px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16">
          <div>
            <SectionHeading
              kicker="ONE CLEAR NEXT STEP"
              accent={ACCENTS.saffron}
              size="lg"
              title={[
                <>Commission a piece,</>,
                <>
                  ask about a book, or <Settle>write to two translators.</Settle>
                </>,
              ]}
            />
            <p className="measure mt-7 text-[1.12rem] leading-[1.7] text-ink/80">
              Editors, presses and readers are equally welcome. Translation enquiries are read by John
              and Jocelyne together.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3.5">
            <Button to="/contact" accent={ACCENTS.saffron} textColor="#23284B">
              Write to John
            </Button>
            <Button to="/essays" accent={ACCENTS.saffron} tone="ghost">
              Read the essays
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- PAGE ---------------------------------- */

export default function Home() {
  useSeo(
    "John Galbraith Simmons | Author, Science Writer, Novelist & Translator",
    "From the laboratory to the shadows: John Galbraith Simmons on science and medicine, a noir quartet of novels, and literary translation with Jocelyne Geneviève Barque.",
  );
  useRoom();

  return (
    <>
      <Hero />
      <OneStory />
      <Credibility />
      <ChapterBands />
      <Featured />
      <Numbers />
      <Cta />
    </>
  );
}
