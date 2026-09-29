import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useSeo } from "../lib/seo";
import { Section } from "../lib/room";
import { ACCENTS, IMG, PLATE, ROOMS, translationBio, translations } from "../lib/content";
import { unmask, viewportOnce, viewportLoose, fadeUp } from "../lib/motion";
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
import { TranslationAtmos } from "../components/Atmos";

/** The heading morphs between English and French every few seconds. */
function LangSwap() {
  const words = ["Translation", "Traduction"];
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % words.length), 3800);
    return () => window.clearInterval(id);
  }, [reduce, words.length]);

  return (
    <span className="relative inline-block align-baseline">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[i]}
          initial={{ opacity: 0, y: "38%", rotateX: -55, filter: "blur(5px)" }}
          animate={{ opacity: 1, y: "0%", rotateX: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: "-38%", rotateX: 55, filter: "blur(5px)" }}
          transition={{ duration: reduce ? 0.15 : 0.72, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block origin-bottom text-coral italic"
          style={{ fontVariationSettings: '"SOFT" 92, "WONK" 1' }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
      <span className="sr-only">(Translation / Traduction)</span>
    </span>
  );
}

export default function Translation() {
  useSeo(
    "Translation | John Galbraith Simmons & Jocelyne Geneviève Barque",
    "Literary translation by John Galbraith Simmons and Jocelyne Geneviève Barque: Sade's Aline and Valcour (Contra Mundum, 2019), Outlaw: Author Armed and Dangerous by Rédoine Faïd, and Ten Little Anarchists by Daniel de Roulet.",
  );

  return (
    <>
      {/* -------------------------------- hero ------------------------------ */}
      <div className="relative isolate grain overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div aria-hidden className="absolute inset-0 -z-20">
          <SmartImage
            src={PLATE.translation}
            fallback={PLATE.translation}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(118deg, rgba(255,246,232,0.97) 0%, rgba(255,246,232,0.93) 42%, rgba(255,217,168,0.40) 76%, rgba(255,165,50,0.26) 100%)",
          }}
        />
        <div className="absolute inset-0 -z-[5]">
          <TranslationAtmos accent={ACCENTS.coral} />
        </div>

        <div className="mx-auto w-full max-w-[1560px] px-5 sm:px-8 lg:px-12">
          <PageHero
            kicker="CHAPTER III — TRANSLATION / TRADUCTION"
            accent={ACCENTS.coral}
            title={[
              <>The art of</>,
              <>
                <LangSwap />
              </>,
            ]}
            lead={
              <>
                Two translators, one shared line.{" "}
                <InkWords
                  text="Every sentence is carried across by hand, and some words refuse to travel alone."
                  accent={ACCENTS.clay}
                />
              </>
            }
          />
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="#works" accent={ACCENTS.coral}>
              See the translated works
            </Button>
            <Button href="/contact" accent={ACCENTS.coral} tone="ghost">
              Translation enquiries
            </Button>
          </div>
        </div>
      </div>

      {/* --------------------------- shared credit --------------------------- */}
      <Section
        bg={ROOMS.translation}
        accent={ACCENTS.coral}
        className="py-20 lg:py-28"
        rail={<ChapterLabel numeral="III" title="The shared credit" accent={ACCENTS.coral} />}
      >
        <Reveal>
          <p className="smallcaps" style={{ color: ACCENTS.coral }}>
            The credit line, as it appears on the title page
          </p>
          <p className="display mt-7 text-[clamp(1.85rem,5vw,3.65rem)] leading-[1.08] text-ink">
            Translated by{" "}
            <em style={{ fontVariationSettings: '"SOFT" 92, "WONK" 1', color: ACCENTS.coral }}>
              John Galbraith Simmons
            </em>{" "}
            &amp;{" "}
            <em style={{ fontVariationSettings: '"SOFT" 92, "WONK" 1', color: ACCENTS.coral }}>
              Jocelyne Geneviève Barque
            </em>
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:gap-14">
          <motion.figure variants={unmask} initial="hidden" whileInView="show" viewport={viewportOnce}>
            <div className="overflow-hidden rounded-[12px] shadow-[0_44px_84px_-40px_rgba(35,40,75,0.5)]">
              <SmartImage
                src={IMG.portrait}
                fallback={PLATE.portrait}
                alt="Portrait of the translator John Galbraith Simmons"
                className="aspect-[4/5] w-full object-cover object-top"
              />
            </div>
            <figcaption className="mt-5">
              <h3 className="display-soft text-[1.45rem] text-ink">John Galbraith Simmons</h3>
              <p className="mt-2 text-[0.96rem] leading-[1.66] text-ink/72">
                Novelist, science writer and translator. Born in Chicago, graduate of Northwestern
                University, master's degree in developmental studies from Long Island University,
                post-graduate studies in psychoanalysis. He lives in New York City.
              </p>
            </figcaption>
          </motion.figure>

          <motion.figure
            variants={unmask}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            custom={1}
          >
            <div className="relative overflow-hidden rounded-[12px] shadow-[0_44px_84px_-40px_rgba(35,40,75,0.5)]">
              <SmartImage
                src={PLATE.translation}
                fallback={PLATE.translation}
                alt="Placeholder photograph for the translator Jocelyne Geneviève Barque"
                className="aspect-[4/5] w-full object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 flex items-end p-6"
                style={{ background: "linear-gradient(to top, rgba(255,165,50,0.86), transparent 62%)" }}
              >
                <p className="smallcaps text-[#23284B]">
                  [replace with photograph of Jocelyne Geneviève Barque]
                </p>
              </div>
            </div>
            <figcaption className="mt-5">
              <h3 className="display-soft text-[1.45rem] text-ink">Jocelyne Geneviève Barque</h3>
              <p className="mt-2 text-[0.96rem] leading-[1.66] text-ink/72">
                [replace with an approved biographical note — two or three sentences]
              </p>
            </figcaption>
          </motion.figure>
        </div>

        <div className="measure mt-14 space-y-5 text-[1.06rem] leading-[1.72] text-ink/82">
          {translationBio.map((p, i) => (
            <Reveal key={i} index={i}>
              <p>{p}</p>
            </Reveal>
          ))}
          <Reveal index={3}>
            <p className="border-l-2 pl-6 italic text-ink/72" style={{ borderColor: ACCENTS.coral }}>
              [replace with a joint statement from John and Jocelyne on how they translate together —
              who drafts, who revises, how the voice is agreed]
            </p>
          </Reveal>
        </div>
      </Section>

      {/* ------------------------------- works ------------------------------- */}
      <Section
        bg={ROOMS.parchment}
        accent={ACCENTS.coral}
        className="scroll-mt-28 py-20 lg:py-28"
        rail={<ChapterLabel numeral="§" title="Translated works" accent={ACCENTS.coral} />}
      >
        <div id="works" className="scroll-mt-28">
          <SectionHeading
            kicker="TRANSLATED WORKS"
            accent={ACCENTS.coral}
            size="md"
            title={[
              <>French carried into English</>,
              <>
                with <Settle>literary seriousness.</Settle>
              </>,
            ]}
          />
        </div>

        <div className="mt-14 space-y-px overflow-hidden rounded-[12px] bg-ink/10">
          {translations.map((w, i) => (
            <motion.article
              key={w.id}
              id={w.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewportLoose}
              custom={i}
              className="group scroll-mt-28 bg-ivory p-8 transition-colors duration-[620ms] hover:bg-ivory lg:p-11"
            >
              <div className="grid grid-cols-1 gap-y-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)] lg:gap-x-12">
                <div>
                  <p className="smallcaps" style={{ color: ACCENTS.coral }}>
                    {w.volumes} · {w.publisher} · <span className="tabular">{w.year}</span>
                  </p>
                  <h3 className="display mt-4 text-[clamp(1.85rem,4.2vw,3.15rem)] leading-[1.06] text-ink">
                    {w.title}
                  </h3>
                  <p className="mt-3 text-[1.06rem] text-ink/72 italic">
                    by {w.author} — translated by John Galbraith Simmons &amp; Jocelyne Geneviève Barque
                  </p>
                  <p className="measure mt-6 text-[1.04rem] leading-[1.72] text-ink/82">{w.note}</p>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <Button href={w.href} accent={ACCENTS.coral} tone="ghost">
                      Visit the publisher
                    </Button>
                    <Button href="/contact" accent={ACCENTS.coral}>
                      Ask about this book
                    </Button>
                  </div>
                </div>

                <dl className="space-y-4 border-t border-ink/10 pt-6 lg:border-t-0 lg:border-l lg:border-ink/10 lg:pt-0 lg:pl-12">
                  {[
                    ["Original language", "French"],
                    ["Shared credit", "J. G. Simmons & J. G. Barque"],
                    ["Publisher", w.publisher],
                    ["Format", w.volumes],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="smallcaps text-ink/72">{k}</dt>
                      <dd className="mt-1.5 text-[0.96rem] leading-snug text-ink/84">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </motion.article>
          ))}
        </div>

        <Reveal className="mt-12">
          <p className="measure text-[1.02rem] leading-[1.7] text-ink/72">
            [replace with any additional titles: Return to Vietnam (1994), the three-volume International
            Dictionary of Psychoanalysis (2004), and The Encyclopedia of the Age of War and
            Reconstruction — with full publication details]
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/contact" accent={ACCENTS.coral}>
              Write to John &amp; Jocelyne
            </Button>
            <Button href="/essays" accent={ACCENTS.coral} tone="ghost">
              Essays &amp; press
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
