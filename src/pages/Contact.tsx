import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSeo } from "../lib/seo";
import { Section } from "../lib/room";
import { ACCENTS, IMG, PLATE, ROOMS } from "../lib/content";
import { unmask, viewportOnce } from "../lib/motion";
import {
  Button,
  ChapterLabel,
  PageHero,
  Reveal,
  SectionHeading,
  Settle,
  SmartImage,
} from "../components/bits";

const REASONS = [
  {
    id: "editor",
    label: "Editor or press",
    hint: "Commissioning, rights, review copies, speaking.",
    to: "John",
  },
  { id: "reader", label: "A reader", hint: "A note about a book, or a question.", to: "John" },
  {
    id: "translation",
    label: "Translation enquiry",
    hint: "French to English, literary or academic.",
    to: "John & Jocelyne",
  },
] as const;

const FIELD =
  "mt-2.5 w-full rounded-[10px] border border-ink/16 bg-ivory/70 px-5 py-4 text-[1.02rem] text-ink placeholder:text-ink/72 transition-colors duration-300 focus:border-clay focus:bg-ivory focus:outline-none";

export default function Contact() {
  useSeo(
    "Contact John Galbraith Simmons | Editors, Readers & Translation Enquiries",
    "Write to John Galbraith Simmons — or to John and Jocelyne Geneviève Barque for literary translation enquiries. Editors, presses and readers welcome.",
  );

  const [reason, setReason] = useState<string>("editor");
  const [sent, setSent] = useState(false);
  const current = REASONS.find((r) => r.id === reason) ?? REASONS[0];

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      {/* -------------------------------- hero ------------------------------ */}
      <div className="relative isolate grain overflow-hidden pt-16 pb-16 lg:pt-24 lg:pb-20">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(118deg, #FFFAF2 0%, #FFF6E8 44%, #FFE3BA 74%, #FFD9A8 100%)",
          }}
        />
        <div className="mx-auto w-full max-w-[1560px] px-5 sm:px-8 lg:px-12">
          <PageHero
            kicker="CONTACT — ONE CLEAR NEXT STEP"
            accent={ACCENTS.clay}
            title={[
              <>Say what you</>,
              <>
                need, <Settle>plainly.</Settle>
              </>,
            ]}
            lead="No forms with twelve fields, no newsletter trap. Write a note, choose who it is for, and it will be read by a person."
          />
        </div>
      </div>

      {/* ------------------------------- the form ---------------------------- */}
      <Section
        bg={ROOMS.ivory}
        accent={ACCENTS.clay}
        className="py-16 lg:py-24"
        rail={<ChapterLabel numeral="→" title="Write to us" accent={ACCENTS.clay} />}
      >
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.18fr)_minmax(0,0.82fr)] lg:gap-16">
          {/* form */}
          <div>
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-[12px] border border-olive/30 bg-ivory/70 p-10"
                  role="status"
                >
                  <p className="smallcaps text-olive">Thank you</p>
                  <h2 className="display mt-4 text-[clamp(1.9rem,4.2vw,2.9rem)] text-ink">
                    Your note is on its way to{" "}
                    <em style={{ fontVariationSettings: '"SOFT" 92, "WONK" 1' }}>{current.to}</em>.
                  </h2>
                  <p className="measure mt-5 text-[1.05rem] leading-[1.7] text-ink/76">
                    You should hear back within a few days. [replace with the real confirmation message and
                    the form's delivery method — this form is not yet connected to an inbox]
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="press mt-8 min-h-[48px] rounded-full border border-ink/20 px-6 py-3 text-[0.92rem] font-semibold text-ink hover:border-ink/50"
                  >
                    Write another note
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-[12px] border border-ink/10 bg-ivory/45 p-7 sm:p-10"
                >
                  <fieldset>
                    <legend className="smallcaps text-ink/72">Who is this note for?</legend>
                    <div className="mt-5 grid gap-3 sm:grid-cols-3">
                      {REASONS.map((r) => {
                        const active = reason === r.id;
                        return (
                          <label
                            key={r.id}
                            className="press relative flex min-h-[112px] cursor-pointer flex-col justify-between rounded-[10px] border p-5 transition-colors duration-300"
                            style={{
                              borderColor: active ? ACCENTS.clay : "rgba(35,40,75,0.16)",
                              backgroundColor: active ? "rgba(255,165,50,0.10)" : "transparent",
                            }}
                          >
                            <input
                              type="radio"
                              name="reason"
                              value={r.id}
                              checked={active}
                              onChange={() => setReason(r.id)}
                              className="sr-only"
                            />
                            <span
                              className="text-[1.02rem] font-semibold leading-snug"
                              style={{ color: active ? "#7A4708" : "#23284B" }}
                            >
                              {r.label}
                            </span>
                            <span className="mt-2 text-[0.85rem] leading-[1.5] text-ink/72">{r.hint}</span>
                            <span
                              aria-hidden
                              className="absolute top-4 right-4 h-2.5 w-2.5 rounded-full"
                              style={{ backgroundColor: active ? ACCENTS.clay : "rgba(35,40,75,0.16)" }}
                            />
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>

                  <div className="mt-9 grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="smallcaps text-ink/72">
                        Your name
                      </label>
                      <input id="name" name="name" type="text" required autoComplete="name" placeholder="First and last name" className={FIELD} />
                    </div>
                    <div>
                      <label htmlFor="email" className="smallcaps text-ink/72">
                        Email address
                      </label>
                      <input id="email" name="email" type="email" required autoComplete="email" placeholder="your@email.com" className={FIELD} />
                    </div>
                  </div>

                  <div className="mt-6">
                    <label htmlFor="subject" className="smallcaps text-ink/72">
                      Subject <span className="normal-case tracking-normal opacity-60">(optional)</span>
                    </label>
                    <input id="subject" name="subject" type="text" placeholder="What is this about?" className={FIELD} />
                  </div>

                  <div className="mt-6">
                    <label htmlFor="message" className="smallcaps text-ink/72">
                      Your note
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={7}
                      placeholder={`A few sentences will do. This note will be read by ${current.to}.`}
                      className={`${FIELD} resize-y`}
                    />
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-5">
                    <Button type="submit" accent={ACCENTS.clay}>
                      Send the note
                    </Button>
                    <p className="max-w-[28ch] text-[0.86rem] leading-[1.55] text-ink/72">
                      [replace with a real privacy note — the address is used only to reply]
                    </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* sidebar */}
          <aside>
            <motion.figure variants={unmask} initial="hidden" whileInView="show" viewport={viewportOnce}>
              <div className="relative overflow-hidden rounded-[12px] shadow-[0_44px_84px_-40px_rgba(35,40,75,0.5)]">
                <SmartImage
                  src={IMG.portrait}
                  fallback={PLATE.portrait}
                  alt="Portrait of John Galbraith Simmons"
                  className="aspect-[4/5] w-full object-cover object-top grayscale"
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(35,40,75,0.5), transparent 48%)" }}
                />
                <figcaption className="absolute right-5 bottom-5 left-5 text-[0.84rem] text-[#FFFAF2]/82">
                  John Galbraith Simmons, New York City
                </figcaption>
              </div>
            </motion.figure>

            <Reveal className="mt-9">
              <h2 className="display text-[1.85rem] leading-[1.12] text-ink">
                Prefer to write <em style={{ fontVariationSettings: '"SOFT" 92, "WONK" 1' }}>directly?</em>
              </h2>
              <dl className="mt-6 space-y-5">
                <div>
                  <dt className="smallcaps text-ink/72">Direct email</dt>
                  <dd className="mt-2">
                    <a
                      href="mailto:[replace with direct email]"
                      className="ul-draw break-all text-[1.05rem] font-semibold text-clay"
                    >
                      [replace with direct email]
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="smallcaps text-ink/72">Translation enquiries</dt>
                  <dd className="mt-2 text-[1rem] leading-[1.62] text-ink/78">
                    Addressed to John &amp; Jocelyne Geneviève Barque. [replace with a shared address]
                  </dd>
                </div>
                <div>
                  <dt className="smallcaps text-ink/72">Based in</dt>
                  <dd className="mt-2 text-[1rem] text-ink/78">New York City, United States</dd>
                </div>
                <div>
                  <dt className="smallcaps text-ink/72">Represented by</dt>
                  <dd className="mt-2 text-[1rem] leading-[1.62] text-ink/78">
                    [replace with agent or agency details, if any]
                  </dd>
                </div>
              </dl>
            </Reveal>

            <Reveal index={1} className="mt-9">
              <div className="rounded-[12px] border border-ink/12 bg-parchment/60 p-7">
                <p className="smallcaps text-clay">A note on response times</p>
                <p className="mt-4 text-[0.98rem] leading-[1.68] text-ink/76">
                  [replace with an expected response window and any preferences — for example, review
                  copy requests, translation sample policy, or speaking availability]
                </p>
              </div>
            </Reveal>
          </aside>
        </div>
      </Section>

      {/* ------------------------------- closing ----------------------------- */}
      <Section bg={ROOMS.parchment} accent={ACCENTS.terracotta} className="py-20 lg:py-24">
        <SectionHeading
          kicker="BEFORE YOU GO"
          accent={ACCENTS.terracotta}
          size="md"
          title={[
            <>Or read first,</>,
            <>
              and <Settle>write afterwards.</Settle>
            </>,
          ]}
        />
        <Reveal className="mt-10">
          <div className="flex flex-wrap gap-3">
            <Button href="/science" accent={ACCENTS.terracotta}>
              The science &amp; medicine books
            </Button>
            <Button href="/fiction" accent={ACCENTS.terracotta} tone="ghost">
              The noir quartet
            </Button>
            <Button href="/translation" accent={ACCENTS.terracotta} tone="ghost">
              The translations
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
