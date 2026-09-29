import { motion } from "framer-motion";
import { useSeo } from "../lib/seo";
import { Section } from "../lib/room";
import { ACCENTS, PLATE, ROOMS, scienceBooks, scienceWriting, IMG } from "../lib/content";
import { fadeUp, viewportOnce, unmask, viewportLoose } from "../lib/motion";
import {
  Button,
  ChapterLabel,
  InkWords,
  PageHero,
  Reveal,
  SectionHeading,
  Settle,
  SmartImage,
} from "../components/bits";
import { ScienceAtmos } from "../components/Atmos";

export default function Science() {
  useSeo(
    "Science & Medicine | John Galbraith Simmons",
    "The Scientific 100, Doctors and Discoveries and tPA for Stroke — books on the history of science and medicine by John Galbraith Simmons, plus decades of scientific and medical reporting.",
  );

  return (
    <>
      {/* ------------------------------- hero ------------------------------- */}
      <div className="relative isolate grain overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div aria-hidden className="absolute inset-0 -z-20">
          <SmartImage src={PLATE.lab} fallback={PLATE.lab} alt="" className="h-full w-full object-cover" />
        </div>
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(112deg, rgba(255,246,232,0.97) 0%, rgba(255,246,232,0.93) 40%, rgba(255,217,168,0.38) 74%, rgba(255,165,50,0.22) 100%)",
          }}
        />
        <div className="absolute inset-0 -z-[5]">
          <ScienceAtmos accent={ACCENTS.teal} />
        </div>

        <div className="mx-auto w-full max-w-[1560px] px-5 sm:px-8 lg:px-12">
          <PageHero
            kicker="CHAPTER I — DISCOVERY"
            accent={ACCENTS.teal}
            title={[
              <>Science &amp;</>,
              <>
                <em style={{ fontVariationSettings: '"SOFT" 92, "WONK" 1' }}>Medicine</em>
              </>,
            ]}
            lead={
              <>
                Three books, aimed at both general and professional audiences, on the history of science
                and medicine — and the story of one drug that divided the field that made it.{" "}
                <InkWords text="What the body hides is what these books go looking for." accent={ACCENTS.forest} />
              </>
            }
          />
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="#the-scientific-100" accent={ACCENTS.teal}>
              See the three books
            </Button>
            <Button href="#writing-for-science" accent={ACCENTS.teal} tone="ghost">
              Writing for science
            </Button>
          </div>
        </div>
      </div>

      {/* ---------------------------- book features -------------------------- */}
      {scienceBooks.map((b, i) => (
        <section
          key={b.id}
          id={b.id}
          className={`scroll-mt-28 ${i % 2 ? "bg-ivory/70" : ""}`}
        >
          <Section
            bg={i % 2 ? ROOMS.parchment : ROOMS.science}
            accent={ACCENTS.teal}
            className="py-20 lg:py-28"
            rail={<ChapterLabel numeral={`0${i + 1}`} title={b.title} accent={ACCENTS.teal} />}
          >
            <div
              className={`grid grid-cols-1 items-start gap-y-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-x-14 ${
                i % 2 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              {/* the plate */}
              <motion.div
                variants={unmask}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                className="relative"
              >
                <div className="overflow-hidden rounded-[12px] bg-ivory/60 p-5 shadow-[0_44px_84px_-40px_rgba(35,40,75,0.5)]">
                  <SmartImage
                    src={b.cover}
                    fallback={b.coverFallback}
                    alt={b.alt}
                    className="mx-auto aspect-[2/3] w-full max-w-[320px] object-contain"
                  />
                </div>
                <div
                  aria-hidden
                  className="absolute -bottom-10 -left-8 -z-10 h-44 w-44 rounded-full opacity-45 blur-[64px]"
                  style={{ background: ACCENTS.teal }}
                />
                <p className="mt-4 text-[0.8rem] leading-relaxed text-ink/72">
                  Cover image from jgsimmons.com.{" "}
                  {b.note ?? "[replace with the publisher's high-resolution cover]"}
                </p>
              </motion.div>

              {/* the text */}
              <div>
                <p className="smallcaps" style={{ color: ACCENTS.teal }}>
                  {b.publisher} · <span className="tabular">{b.year}</span>
                </p>
                <h2 className="display mt-4 text-[clamp(2.35rem,6vw,4.6rem)] text-ink">
                  {b.title}
                  {b.subtitle && (
                    <span className="mt-3 block text-[clamp(1.15rem,2.4vw,1.85rem)] leading-[1.22] font-normal text-ink/72 italic">
                      {b.subtitle}
                    </span>
                  )}
                </h2>
                {b.contributor && (
                  <p className="mt-4 text-[0.92rem] font-semibold text-clay">{b.contributor}</p>
                )}

                <p className="display-soft mt-7 text-[clamp(1.28rem,2.7vw,1.95rem)] leading-[1.3] text-forest">
                  {b.hook}
                </p>

                <div className="measure mt-7 space-y-5 text-[1.06rem] leading-[1.72] text-ink/82">
                  <p>{b.synopsis}</p>
                </div>

                {b.note && (
                  <p className="mt-7 rounded-[10px] border-l-2 bg-ivory/55 px-5 py-4 text-[0.92rem] leading-[1.62] text-ink/72">
                    <span className="smallcaps mr-2 text-clay">Editorial note</span>
                    {b.note}
                  </p>
                )}

                <div className="mt-9 flex flex-wrap gap-3">
                  <Button href="#writing-for-science" accent={ACCENTS.teal}>
                    Read about the book
                  </Button>
                  <Button href="/contact" accent={ACCENTS.teal} tone="ghost">
                    Ask John about it
                  </Button>
                </div>

                <dl className="mt-9 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-ink/10 pt-7 sm:grid-cols-3">
                  {[
                    ["Publisher", b.publisher],
                    ["Year", b.year],
                    ["Edition", b.id === "the-scientific-100" ? "[replace with edition]" : "Hardcover & paperback [confirm]"],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="smallcaps text-ink/72">{k}</dt>
                      <dd className="mt-2 text-[0.95rem] leading-snug text-ink/82">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </Section>
        </section>
      ))}

      {/* -------------------------- writing for science ---------------------- */}
      <Section
        bg={ROOMS.parchment}
        accent={ACCENTS.forest}
        className="py-24 lg:py-32"
        rail={<ChapterLabel numeral="№" title="Writing for science" accent={ACCENTS.forest} />}
      >
        <SectionHeading
          kicker="WRITING FOR SCIENCE"
          accent={ACCENTS.forest}
          size="md"
          title={[
            <>Thirty years of reporting</>,
            <>
              on what <Settle>medicine was becoming.</Settle>
            </>,
          ]}
          lead="For many years associated with the magazine Current Biography, he has written for Nature, produced articles for the New York Academy of Sciences, reported on new developments in cancer research, and served as a consultant for Celera Genomics."
        />

        <ul className="mt-14 divide-y divide-ink/10 border-y border-ink/10">
          {scienceWriting.map((w, i) => (
            <motion.li
              key={w.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewportLoose}
              custom={i}
              className="group grid grid-cols-1 gap-y-2 py-7 transition-colors duration-[520ms] hover:bg-ivory/45 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_auto] lg:items-baseline lg:gap-x-10"
            >
              <div>
                <span className="smallcaps mr-3 text-forest/60 tabular">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {w.href ? (
                  <a
                    href={w.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="Read"
                    className="display-soft text-[1.28rem] leading-snug text-ink"
                  >
                    <span className="ul-draw">{w.title}</span>
                  </a>
                ) : (
                  <span className="display-soft text-[1.28rem] leading-snug text-ink/88">{w.title}</span>
                )}
              </div>
              <p className="text-[0.95rem] leading-relaxed text-ink/72">{w.outlet}</p>
              <p
                className="smallcaps whitespace-nowrap rounded-full px-3.5 py-1.5"
                style={{ backgroundColor: `${ACCENTS.teal}22`, color: ACCENTS.forest }}
              >
                {w.kind}
              </p>
            </motion.li>
          ))}
        </ul>

        <Reveal className="mt-12">
          <div className="flex flex-wrap items-center gap-3">
            <Button href="/contact" accent={ACCENTS.forest}>
              Commission a science piece
            </Button>
            <Button href="/essays" accent={ACCENTS.forest} tone="ghost">
              See all essays and press
            </Button>
          </div>
        </Reveal>
      </Section>

      {/* ------------------------------ cover archive ----------------------- */}
      <Section
        bg={ROOMS.science}
        accent={ACCENTS.teal}
        className="py-20 lg:py-24"
        rail={<ChapterLabel numeral="▤" title="Cover archive" accent={ACCENTS.teal} />}
      >
        <SectionHeading
          kicker="COVER ARCHIVE"
          accent={ACCENTS.teal}
          size="sm"
          title={[
            <>
              Every cover we <Settle>currently hold.</Settle>
            </>,
          ]}
          lead="These are the cover files recovered from the original jgsimmons.com media library. Two are very small and need replacing with publisher files before launch."
        />
        <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4 lg:gap-9">
          {[
            { src: IMG.sci100, alt: "Cover of The Scientific 100 by John Galbraith Simmons", label: "The Scientific 100", note: "301 × 302 px" },
            { src: IMG.doctors, alt: "Cover of Doctors and Discoveries by John Galbraith Simmons", label: "Doctors and Discoveries", note: "81 × 120 px — [replace with high-resolution cover]" },
            { src: IMG.tpa, alt: "Cover of tPA for Stroke by John Galbraith Simmons and Justin A. Zivin", label: "tPA for Stroke", note: "1347 × 2048 px" },
            { src: IMG.coverPic, alt: "Unidentified edition cover from the original jgsimmons.com media library", label: "[confirm which edition this cover represents]", note: "89 × 120 px — [replace with high-resolution cover]" },
          ].map((c, i) => (
            <Reveal key={c.label} index={i}>
              <figure>
                <div className="overflow-hidden rounded-[10px] bg-ivory/70 p-4 shadow-[0_28px_54px_-30px_rgba(35,40,75,0.45)]">
                  <SmartImage
                    src={c.src}
                    fallback={PLATE.lab}
                    alt={c.alt}
                    className="mx-auto aspect-[2/3] w-full object-contain"
                  />
                </div>
                <figcaption className="mt-4">
                  <p className="text-[0.94rem] font-semibold leading-snug text-ink/86">{c.label}</p>
                  <p className="mt-1.5 text-[0.8rem] leading-relaxed text-ink/72">{c.note}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* --------------------------- credibility band ------------------------ */}
      <Section bg={ROOMS.science} accent={ACCENTS.teal} className="py-20 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
          <Reveal>
            <h2 className="display text-[clamp(1.95rem,4.4vw,3.15rem)] text-ink">
              Written for readers who <em style={{ fontVariationSettings: '"SOFT" 90, "WONK" 1' }}>want the
              evidence</em>, not the headline.
            </h2>
            <p className="measure mt-6 text-[1.06rem] leading-[1.72] text-ink/80">
              The science writing sits alongside the books: general and professional audiences, the same
              standard of accuracy for both. [replace with an approved paragraph on the reporting approach]
            </p>
          </Reveal>
          <Reveal index={1}>
            <div className="overflow-hidden rounded-[12px] shadow-[0_44px_84px_-40px_rgba(35,40,75,0.5)]">
              <SmartImage
                src={IMG.heroPlate}
                fallback={PLATE.desk}
                alt="Books and notes on the author's desk in natural light"
                className="aspect-[16/11] w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
