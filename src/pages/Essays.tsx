import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSeo } from "../lib/seo";
import { Section } from "../lib/room";
import { ACCENTS, PLATE, ROOMS, essays, outlets } from "../lib/content";

import {
  Button,
  ChapterLabel,
  Marquee,
  PageHero,
  Reveal,
  SectionHeading,
  Settle,
  SmartImage,
} from "../components/bits";
import { EssaysAtmos } from "../components/Atmos";

const FILTERS = ["All", "Scientific", "Medical", "Literary"] as const;
type Filter = (typeof FILTERS)[number];

export default function Essays() {
  useSeo(
    "Essays & Press | John Galbraith Simmons",
    "Essays, long-form reportage and reviews by John Galbraith Simmons — for the Los Angeles Review of Books, Nature, the New York Academy of Sciences, BrainBlogger and more.",
  );

  const [filter, setFilter] = useState<Filter>("All");

  const shown = useMemo(
    () => (filter === "All" ? essays : essays.filter((e) => e.kind === filter)),
    [filter],
  );

  return (
    <>
      {/* -------------------------------- hero ------------------------------ */}
      <div className="relative isolate grain overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-28">
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
              "linear-gradient(112deg, rgba(255,246,232,0.97) 0%, rgba(255,246,232,0.93) 44%, rgba(255,217,168,0.38) 78%, rgba(255,165,50,0.24) 100%)",
          }}
        />
        <div className="absolute inset-0 -z-[5]">
          <EssaysAtmos accent={ACCENTS.saffron} />
        </div>

        <div className="mx-auto w-full max-w-[1560px] px-5 sm:px-8 lg:px-12">
          <PageHero
            kicker="CHAPTER IV — ESSAYS & PRESS"
            accent={ACCENTS.saffron}
            title={[
              <>More than three hundred</>,
              <>
                pieces <Settle>in print.</Settle>
              </>,
            ]}
            lead="Essay and long-form reportage across scientific, medical and literary subjects — for general and professional readers alike."
          />

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            {[
              ["Scientific", "Reportage & eBriefings"],
              ["Medical", "Stroke, psychiatry, trials"],
              ["Literary", "Reviews & criticism"],
            ].map(([k, v]) => (
              <div key={k}>
                <p className="smallcaps text-clay">{k}</p>
                <p className="mt-1 text-[0.92rem] text-ink/72">{v}</p>
              </div>
            ))}
            <div>
              <p className="display tabular text-[2.4rem] leading-none text-clay">&gt;300</p>
              <p className="mt-1 text-[0.92rem] text-ink/72">articles [verify with client]</p>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------- the list ---------------------------- */}
      <Section
        bg={ROOMS.essays}
        accent={ACCENTS.saffron}
        className="scroll-mt-28 py-20 lg:py-28"
        rail={<ChapterLabel numeral="IV" title="Essays & press" accent={ACCENTS.saffron} />}
      >
        <SectionHeading
          kicker="SELECTED WRITING"
          accent={ACCENTS.saffron}
          size="md"
          title={[
            <>Scientific. Medical.</>,
            <>
              <Settle>Literary.</Settle>
            </>,
          ]}
          lead="Filter the list, then read the piece at its original publication. Citations on the old site were sometimes jumbled; each entry below is set out in full."
        />

        <div
          className="mt-11 flex flex-wrap gap-2.5"
          role="group"
          aria-label="Filter essays by subject"
        >
          {FILTERS.map((f) => {
            const active = filter === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={active}
                className="press min-h-[46px] rounded-full px-6 py-2.5 text-[0.88rem] font-semibold transition-colors duration-[420ms]"
                style={{
                  backgroundColor: active ? ACCENTS.forest : "transparent",
                  color: active ? "#FFFAF2" : "#23284B",
                  border: `1px solid ${active ? ACCENTS.forest : "rgba(35,40,75,0.18)"}`,
                }}
              >
                {f}
                <span className="tabular ml-2 text-[0.78rem] opacity-70">
                  {f === "All" ? essays.length : essays.filter((e) => e.kind === f).length}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-12 border-t border-ink/12">
          <AnimatePresence mode="popLayout">
            {shown.map((e, i) => (
              <motion.article
                key={e.title}
                layout
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.55, delay: i * 0.035, ease: [0.22, 1, 0.36, 1] }}
                className="group grid grid-cols-1 gap-y-3 border-b border-ink/12 py-8 transition-colors duration-[520ms] hover:bg-ivory/50 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,0.85fr)_minmax(0,0.5fr)] lg:items-baseline lg:gap-x-10"
              >
                <div>
                  <h3 className="display-soft text-[clamp(1.22rem,2.5vw,1.72rem)] leading-[1.22] text-ink">
                    {e.href ? (
                      <a
                        href={e.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="Read"
                        className="ul-draw"
                      >
                        {e.title}
                      </a>
                    ) : (
                      <span className="text-ink/82">{e.title}</span>
                    )}
                  </h3>
                  {e.href && (
                    <span className="mt-2 inline-flex items-center gap-1.5 text-[0.82rem] font-semibold text-clay">
                      Read at source
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17L17 7" />
                        <path d="M8 7h9v9" />
                      </svg>
                    </span>
                  )}
                </div>
                <p className="text-[0.97rem] leading-relaxed text-ink/72">{e.outlet}</p>
                <div className="flex items-center gap-3 lg:flex-col lg:items-end lg:gap-2">
                  <p className="tabular text-[0.92rem] text-ink/72">{e.date}</p>
                  <p
                    className="smallcaps rounded-full px-3 py-1.5"
                    style={{ backgroundColor: `${ACCENTS.saffron}2E`, color: "#5E3A05" }}
                  >
                    {e.kind}
                  </p>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {shown.length === 0 && (
          <div className="mt-12 rounded-[12px] border border-dashed border-ink/22 px-8 py-14 text-center">
            <p className="display-soft text-[1.35rem] text-ink">No pieces filed under this heading yet.</p>
            <p className="mt-3 text-[0.96rem] text-ink/72">
              [replace with additional essays in this category]
            </p>
          </div>
        )}

        <Reveal className="mt-12">
          <p className="measure text-[0.94rem] leading-[1.7] text-ink/72">
            Bibliographic note: entries marked [replace with …] are drawn from the live site without full
            citation details. Full citations, dates and outbound links should be confirmed with the author
            before launch.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/contact" accent={ACCENTS.forest}>
              Request the full bibliography
            </Button>
            <Button href="/science" accent={ACCENTS.forest} tone="ghost">
              See the books
            </Button>
          </div>
        </Reveal>
      </Section>

      {/* ------------------------------- outlets ----------------------------- */}
      <Section bg={ROOMS.parchment} accent={ACCENTS.olive} className="py-20 lg:py-24">
        <SectionHeading
          kicker="PUBLISHED, REPORTED, TRANSLATED WITH"
          accent={ACCENTS.olive}
          size="sm"
          title={[
            <>
              The names on the <Settle>spine of the work.</Settle>
            </>,
          ]}
        />
        <div className="mt-12 opacity-85">
          <Marquee items={outlets} accent={ACCENTS.olive} separator="✳" />
        </div>
        <div className="mt-2 opacity-60">
          <Marquee items={[...outlets].reverse()} accent={ACCENTS.sage} separator="✳" reverse />
        </div>

        <Reveal index={2} className="mt-14">
          <div className="overflow-hidden rounded-[12px] shadow-[0_44px_84px_-40px_rgba(35,40,75,0.5)]">
            <SmartImage
              src={PLATE.manuscript}
              fallback={PLATE.manuscript}
              alt="Typed manuscript pages and corrected proofs on a parchment table"
              className="aspect-[21/9] w-full object-cover"
            />
          </div>
          <p className="mt-4 text-[0.82rem] text-ink/72">
            Atmospheric placeholder. [replace with a real photograph of the working desk]
          </p>
        </Reveal>
      </Section>
    </>
  );
}
