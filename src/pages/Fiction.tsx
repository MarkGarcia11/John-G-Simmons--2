import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useSeo } from "../lib/seo";
import { Section, useRoom } from "../lib/room";
import { ACCENTS, PLATE, ROOMS, novels } from "../lib/content";
import { viewportOnce, unmask } from "../lib/motion";
import {
  Button,
  ChapterLabel,
  Marquee,
  Reveal,
  SectionHeading,
  Settle,
  SmartImage,
} from "../components/bits";
import { FictionAtmos } from "../components/Atmos";

const HEADLINE = "FOUR NOVELS. ONE LONG WALK AFTER MIDNIGHT.";

function Typewriter({ text, accent }: { text: string; accent: string }) {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(reduce ? text : "");
  const [done, setDone] = useState(reduce);

  useEffect(() => {
    if (reduce) return;
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) {
        window.clearInterval(id);
        setDone(true);
      }
    }, 42);
    return () => window.clearInterval(id);
  }, [text, reduce]);

  return (
    <h1
      className={`text-[clamp(1.85rem,5.2vw,4.15rem)] leading-[1.08] ${
        done ? "display" : "font-mono tracking-[0.02em]"
      }`}
      style={{ color: "#FFFAF2" }}
    >
      {shown}
      {!done && (
        <span
          aria-hidden
          className="ml-1 inline-block h-[0.92em] w-[0.5ch] align-[-0.12em]"
          style={{ backgroundColor: accent, animation: "blink 1s steps(2,start) infinite" }}
        />
      )}
      <style>{`@keyframes blink { 0%,49% { opacity: 1 } 50%,100% { opacity: 0 } }`}</style>
    </h1>
  );
}

/** Outline-to-fill marquee of the book titles; direction follows scroll direction. */
function TitleMarquee({ reverse }: { reverse: boolean }) {
  return (
    <div className="relative overflow-hidden py-8">
      <div className={`marquee-track ${reverse ? "reverse" : ""}`}>
        {[...novels, ...novels, ...novels, ...novels].map((n, i) => (
          <span key={`${n.id}-${i}`} className="flex shrink-0 items-baseline gap-10 pr-10">
            <span
              className="display whitespace-nowrap text-[clamp(2.6rem,7vw,6rem)]"
              style={{ color: "transparent", WebkitTextStroke: `1.4px ${ACCENTS.amber}` }}
            >
              {n.title}
            </span>
            <span aria-hidden className="text-[0.7rem]" style={{ color: ACCENTS.amber }}>
              ◆
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Fiction() {
  useSeo(
    "Fiction — The Noir Quartet | John Galbraith Simmons",
    "Lamplighter, Cried the Piper, The Sharing and Midnight Walking: the noir quartet by novelist John Galbraith Simmons.",
  );

  const reduce = useReducedMotion();
  const [reverse, setReverse] = useState(false);
  const last = useRef(0);
  const { setRoom } = useRoom();

  // the whole page is the dark room — register it before any section does
  useEffect(() => {
    setRoom(ROOMS.fiction, ACCENTS.amber, true);
  }, [setRoom]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setReverse(y < last.current);
      last.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="room-dark">
      {/* -------------------------------- hero ------------------------------ */}
      <div className="relative isolate grain grain-light overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-32">
        <div aria-hidden className="absolute inset-0 -z-20">
          <SmartImage
            src={PLATE.noir}
            fallback={PLATE.noir}
            alt=""
            className="h-full w-full object-cover object-[50%_62%]"
          />
        </div>
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(180deg, rgba(35,40,75,0.92) 0%, rgba(35,40,75,0.86) 42%, rgba(35,40,75,0.97) 100%)",
          }}
        />
        <div className="absolute inset-0 -z-[5]">
          <FictionAtmos accent={ACCENTS.amber} />
        </div>

        <div className="mx-auto w-full max-w-[1560px] px-5 sm:px-8 lg:px-12">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="smallcaps mb-8"
            style={{ color: ACCENTS.amber }}
          >
            CHAPTER II — SHADOW · A NOIR QUARTET
          </motion.p>

          <Typewriter text={HEADLINE} accent={ACCENTS.amber} />

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: reduce ? 0 : 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="measure mt-9 text-[1.12rem] leading-[1.7] text-[#FFFAF2]/82 sm:text-[1.32rem]"
          >
            Simmons is the author of a noir quartet:{" "}
            <em style={{ fontVariationSettings: '"SOFT" 92, "WONK" 1', color: ACCENTS.amber }}>
              Lamplighter, Cried the Piper, The Sharing, Midnight Walking.
            </em>{" "}
            Four novels about the hour when the streetlamps are the only thing still telling the truth.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: reduce ? 0 : 1.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <Button href="#the-quartet" accent={ACCENTS.amber} textColor="#23284B">
              See the four novels
            </Button>
            <Button href="/contact" accent={ACCENTS.amber} tone="ghost" textColor="#FFFAF2">
              Rights and enquiries
            </Button>
          </motion.div>
        </div>
      </div>

      <TitleMarquee reverse={reverse} />

      {/* ------------------------------ the quartet -------------------------- */}
      <Section
        bg={ROOMS.fiction}
        accent={ACCENTS.amber}
        dark
        className="scroll-mt-28 py-20 lg:py-28"
        rail={<ChapterLabel numeral="II" title="The quartet" accent={ACCENTS.amber} dark />}
      >
        <div id="the-quartet" className="scroll-mt-28">
          <SectionHeading
            kicker="READING ORDER"
            accent={ACCENTS.amber}
            size="md"
            title={[
              <span style={{ color: "#FFFAF2" }}>Four cases, filed</span>,
              <span style={{ color: "#FFFAF2" }}>
                in the <Settle>order they were written.</Settle>
              </span>,
            ]}
            lead={
              <span className="text-[#FFFAF2]/78">
                The live site lists the quartet as Lamplighter, Cried the Piper, The Sharing, Midnight
                Walking. Publication years for the middle pair are drawn from the National Endowment for
                the Arts translator biography. [replace with confirmed reading order and years]
              </span>
            }
          />
        </div>

        <div className="mt-16 space-y-16 lg:space-y-24">
          {novels.map((n) => (
            <article
              key={n.id}
              id={n.id}
              className="scroll-mt-28 grid grid-cols-1 items-center gap-y-9 lg:grid-cols-[minmax(0,0.62fr)_minmax(0,1.38fr)] lg:gap-x-14"
            >
              <motion.div variants={unmask} initial="hidden" whileInView="show" viewport={viewportOnce}>
                <div
                  className="relative overflow-hidden rounded-[12px] shadow-[0_50px_100px_-42px_rgba(35,40,75,0.85)]"
                  style={{ background: "rgba(255,250,242,0.06)" }}
                >
                  <SmartImage
                    src={n.cover}
                    fallback={n.coverFallback}
                    alt={n.alt}
                    className="aspect-[3/4] w-full object-contain p-5"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-0 transition-opacity duration-[800ms] hover:opacity-100"
                    style={{ background: `linear-gradient(to top, ${ACCENTS.amber}59, transparent 62%)` }}
                  />
                </div>
                <p className="mt-4 text-[0.8rem] leading-relaxed text-[#FFFAF2]/64">
                  Cover image from jgsimmons.com. [replace with the publisher's cover file]
                </p>
              </motion.div>

              <div>
                <div className="flex items-baseline gap-4">
                  <span
                    aria-hidden
                    className="display tabular text-[clamp(2.4rem,6vw,4.4rem)] leading-none"
                    style={{ color: ACCENTS.amber }}
                  >
                    {String(n.order).padStart(2, "0")}
                  </span>
                  <span className="smallcaps text-[#FFFAF2]/70">
                    Novel {n.order} of 4 · <span className="tabular">{n.year}</span>
                  </span>
                </div>

                <h3
                  className="display mt-4 text-[clamp(2.35rem,6.4vw,5rem)]"
                  style={{ color: "#FFFAF2" }}
                >
                  {n.title}
                </h3>

                <p className="measure mt-6 text-[1.08rem] leading-[1.72] text-[#FFFAF2]/80">{n.synopsis}</p>

                {n.note && (
                  <p className="mt-6 rounded-[10px] border-l-2 px-5 py-4 text-[0.9rem] leading-[1.6] text-[#FFFAF2]/62"
                     style={{ borderColor: ACCENTS.amber, backgroundColor: "rgba(255,165,50,0.08)" }}>
                    <span className="smallcaps mr-2" style={{ color: ACCENTS.amber }}>
                      Editorial note
                    </span>
                    {n.note}
                  </p>
                )}

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href="/contact" accent={ACCENTS.amber} textColor="#23284B">
                    Read about the book
                  </Button>
                  <Button href="/essays" accent={ACCENTS.amber} tone="ghost" textColor="#FFFAF2">
                    Read the essays
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* ------------------------------- lamplight --------------------------- */}
      <Section bg={ROOMS.fiction} accent={ACCENTS.amber} dark className="relative overflow-hidden pb-28">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <FictionAtmos accent={ACCENTS.amber} />
        </div>
        <Reveal className="relative">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-16">
            <div>
              <h2 className="display text-[clamp(2.15rem,5.2vw,3.9rem)]" style={{ color: "#FFFAF2" }}>
                Noir is not a genre here. It is a{" "}
                <em style={{ fontVariationSettings: '"SOFT" 92, "WONK" 1', color: ACCENTS.amber }}>
                  method of looking.
                </em>
              </h2>
              <p className="measure mt-7 text-[1.08rem] leading-[1.72] text-[#FFFAF2]/80">
                The same instinct that reads an X-ray or a chart reads a street at midnight: something is
                being concealed, and the job is to find it without being seen. [replace with an approved
                paragraph in John's voice about the noir quartet]
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button href="/translation" accent={ACCENTS.amber} textColor="#23284B">
                  On to the translations
                </Button>
              </div>
            </div>
            <div className="overflow-hidden rounded-[12px] shadow-[0_50px_100px_-42px_rgba(35,40,75,0.85)]">
              <SmartImage
                src={PLATE.noir}
                fallback={PLATE.noir}
                alt="A wet New York street at night lit by a single amber streetlamp"
                className="aspect-[16/11] w-full object-cover"
              />
            </div>
          </div>
        </Reveal>

        <div className="relative mt-16 opacity-60">
          <Marquee
            items={novels.map((n) => n.title)}
            accent={ACCENTS.amber}
            outline
            separator="◆"
            reverse={reverse}
          />
        </div>
      </Section>
    </div>
  );
}
