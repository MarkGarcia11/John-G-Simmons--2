import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useSeo } from "../lib/seo";
import { Section } from "../lib/room";
import { ACCENTS, IMG, PLATE, ROOMS, bioParagraphs, outlets, timeline } from "../lib/content";
import { unmask, viewportLoose } from "../lib/motion";
import {
  Button,
  ChapterLabel,
  InkWords,
  Marquee,
  PageHero,
  Reveal,
  SectionHeading,
  Settle,
  SmartImage,
} from "../components/bits";

export default function About() {
  useSeo(
    "About John Galbraith Simmons | Author, Science Writer, Novelist & Translator",
    "John Galbraith Simmons was born in Chicago and graduated Northwestern University, with a master's degree from Long Island University and post-graduate studies in psychoanalysis. He lives in New York City.",
  );

  const track = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const onTrackScroll = () => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  };

  return (
    <>
      {/* -------------------------------- hero ------------------------------ */}
      <div className="relative isolate grain overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(120deg, #FFF1DC 0%, #FFFAF2 42%, #FFE3BA 76%, #FFD9A8 100%)",
          }}
        />
        <div className="mx-auto grid w-full max-w-[1560px] grid-cols-1 items-center gap-y-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-x-16 lg:px-12">
          {/* the portrait, given the full weight of the page */}
          <motion.figure
            variants={unmask}
            initial="hidden"
            animate="show"
            className="relative order-2 lg:order-1"
          >
            <div className="relative overflow-hidden rounded-[12px] shadow-[0_60px_110px_-46px_rgba(35,40,75,0.66)]">
              <SmartImage
                src={IMG.portrait}
                fallback={PLATE.portrait}
                alt="Black-and-white portrait of the author John Galbraith Simmons: long white hair, wire-rimmed glasses, dark coat"
                loading="eager"
                className="aspect-[4/5] w-full object-cover object-top grayscale contrast-[1.06]"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(35,40,75,0.42), transparent 44%)" }}
              />
              <figcaption className="absolute right-5 bottom-5 left-5">
                <p className="smallcaps text-[#FFFAF2]/82">John Galbraith Simmons</p>
                <p className="mt-1 text-[0.82rem] text-[#FFFAF2]/62">
                  Photograph supplied by the author. [replace with a high-resolution portrait]
                </p>
              </figcaption>
            </div>
            <div
              aria-hidden
              className="absolute -bottom-10 -right-6 -z-10 h-48 w-48 rounded-full opacity-55 blur-[70px]"
              style={{ background: ACCENTS.terracotta }}
            />
          </motion.figure>

          <div className="order-1 lg:order-2">
            <PageHero
              kicker="ABOUT — THE LONG VERSION"
              accent={ACCENTS.clay}
              title={[
                <>Born in Chicago,</>,
                <>
                  living in <Settle>New York City.</Settle>
                </>,
              ]}
              lead="A writer for both general and professional audiences: several works of nonfiction, four novels, and a body of literary translation carried out in partnership."
            />
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href="/contact" accent={ACCENTS.clay}>
                Write to John
              </Button>
              <Button href="/translation" accent={ACCENTS.clay} tone="ghost">
                The translation work
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* --------------------------------- bio ------------------------------- */}
      <Section
        bg={ROOMS.about}
        accent={ACCENTS.clay}
        className="py-20 lg:py-28"
        rail={<ChapterLabel numeral="§" title="Biography" accent={ACCENTS.clay} />}
      >
        <SectionHeading
          kicker="BIOGRAPHY"
          accent={ACCENTS.clay}
          size="md"
          title={[
            <>One curiosity, pursued</>,
            <>
              across <Settle>three kinds of writing.</Settle>
            </>,
          ]}
        />

        <div className="mt-11 grid gap-x-16 gap-y-8 lg:grid-cols-2">
          {bioParagraphs.map((p, i) => (
            <Reveal key={i} index={i}>
              <p
                className={`text-[1.08rem] leading-[1.76] text-ink/86 ${
                  i === 0 ? "text-[1.28rem] leading-[1.62] text-ink" : ""
                }`}
              >
                {i === 0 ? <InkWords text={p} /> : p}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal index={2} className="mt-12">
          <p className="measure border-l-2 pl-6 text-[1.05rem] leading-[1.72] italic text-ink/72"
             style={{ borderColor: ACCENTS.clay }}>
            [replace with an approved first-person passage — five or six sentences in John's own voice on
            how the science writing, the novels and the translation work inform one another]
          </p>
        </Reveal>
      </Section>

      {/* ------------------------------ timeline ----------------------------- */}
      <Section
        bg={ROOMS.parchment}
        accent={ACCENTS.olive}
        className="overflow-hidden py-20 lg:py-28"
        rail={<ChapterLabel numeral="∞" title="Life & work" accent={ACCENTS.olive} />}
      >
        <SectionHeading
          kicker="LIFE & WORK"
          accent={ACCENTS.olive}
          size="md"
          title={[
            <>The long route,</>,
            <>
              in <Settle>rough order.</Settle>
            </>,
          ]}
          lead="Drag or scroll the strip sideways. Several dates on the original site are undated; those are marked for confirmation."
        />

        {/* progress hairline */}
        <div className="mt-10 h-px w-full bg-ink/12">
          <div
            className="h-px origin-left transition-[width] duration-300 ease-out"
            style={{ width: `${Math.max(6, progress * 100)}%`, backgroundColor: ACCENTS.olive }}
          />
        </div>

        <div
          ref={track}
          onScroll={onTrackScroll}
          tabIndex={0}
          role="group"
          aria-label="Life and work timeline, scrollable horizontally"
          className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-8"
        >
          {timeline.map((item, i) => (
            <motion.article
              key={`${item.year}-${item.label}`}
              variants={i % 2 === 0 ? unmask : unmask}
              initial="hidden"
              whileInView="show"
              viewport={viewportLoose}
              custom={i % 3}
              className="w-[74vw] shrink-0 snap-start sm:w-[300px]"
            >
              <div className="flex h-full flex-col rounded-[12px] border border-ink/10 bg-ivory/80 p-7 transition-shadow duration-[620ms] hover:shadow-[0_34px_66px_-34px_rgba(35,40,75,0.5)]">
                <p className="display tabular text-[1.95rem] leading-none text-olive">{item.year}</p>
                <h3 className="display-soft mt-4 text-[1.22rem] leading-snug text-ink">{item.label}</h3>
                <p className="mt-3 text-[0.93rem] leading-[1.62] text-ink/72">{item.detail}</p>
                <div aria-hidden className="mt-6 h-px w-10 bg-olive/50" />
                <p className="smallcaps mt-4 text-ink/72 tabular">
                  {String(i + 1).padStart(2, "0")} / {String(timeline.length).padStart(2, "0")}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
        <p className="mt-2 text-[0.86rem] text-ink/72">
          [replace with confirmed dates for the degrees and the two earliest novels]
        </p>
      </Section>

      {/* ----------------------------- credibility --------------------------- */}
      <Section bg={ROOMS.ivory} accent={ACCENTS.terracotta} className="py-20 lg:py-24">
        <SectionHeading
          kicker="ASSOCIATED WITH"
          accent={ACCENTS.terracotta}
          size="sm"
          title={[
            <>
              Publishers, journals and <Settle>institutions.</Settle>
            </>,
          ]}
        />
        <div className="mt-11 opacity-85">
          <Marquee items={outlets} accent={ACCENTS.terracotta} separator="✳" />
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
          <Reveal>
            <div className="overflow-hidden rounded-[12px] shadow-[0_44px_84px_-40px_rgba(35,40,75,0.5)]">
              <SmartImage
                src={PLATE.desk}
                fallback={PLATE.desk}
                alt="Books, notebook and coffee on a writing desk in late afternoon light"
                className="aspect-[16/11] w-full object-cover"
              />
            </div>
            <p className="mt-4 text-[0.82rem] text-ink/72">
              Atmospheric placeholder. [replace with a real photograph of John at work]
            </p>
          </Reveal>
          <Reveal index={1}>
            <h2 className="display text-[clamp(1.95rem,4.4vw,3.15rem)] text-ink">
              Two people, not <em style={{ fontVariationSettings: '"SOFT" 92, "WONK" 1' }}>a brand.</em>
            </h2>
            <p className="measure mt-6 text-[1.08rem] leading-[1.72] text-ink/82">
              The translation work is shared with Jocelyne Geneviève Barque and is always credited
              jointly. Translation enquiries are read by both of them.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact" accent={ACCENTS.terracotta}>
                Write to John &amp; Jocelyne
              </Button>
              <Button href="/essays" accent={ACCENTS.terracotta} tone="ghost">
                Essays &amp; press
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
