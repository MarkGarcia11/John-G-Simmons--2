import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useRoom } from "../lib/room";
import { fadeUp, viewportOnce } from "../lib/motion";
import { Reveal } from "./bits";

const COLUMNS = [
  {
    head: "Books",
    items: [
      { label: "The Scientific 100", to: "/science#the-scientific-100" },
      { label: "Doctors and Discoveries", to: "/science#doctors-and-discoveries" },
      { label: "tPA for Stroke", to: "/science#tpa-for-stroke" },
      { label: "The noir quartet", to: "/fiction" },
    ],
  },
  {
    head: "Writing",
    items: [
      { label: "Scientific & medical", to: "/essays" },
      { label: "Literary essays", to: "/essays" },
      { label: "Los Angeles Review of Books", to: "/essays" },
      { label: "Nature (2010) 467, S14–S15", to: "/essays" },
    ],
  },
  {
    head: "Translation",
    items: [
      { label: "Aline and Valcour (Sade)", to: "/translation#aline-and-valcour" },
      { label: "Outlaw: Author Armed and Dangerous", to: "/translation#outlaw" },
      { label: "Ten Little Anarchists", to: "/translation#ten-little-anarchists" },
      { label: "John & Jocelyne", to: "/translation" },
    ],
  },
  {
    head: "About",
    items: [
      { label: "Biography", to: "/about" },
      { label: "Life & work timeline", to: "/about" },
      { label: "Publishers & outlets", to: "/about" },
    ],
  },
];

export default function Footer() {
  const { room } = useRoom();

  return (
    <footer className="relative mt-24 overflow-hidden bg-[#23284B] text-[#FFFAF2]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ backgroundColor: room.accent, opacity: 0.65 }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full opacity-25 blur-[110px]"
        style={{ background: `radial-gradient(circle, ${room.accent}, transparent 68%)` }}
      />

      <div className="relative mx-auto w-full max-w-[1560px] px-5 pt-20 pb-10 sm:px-8 lg:px-12">
        <Reveal>
          <p className="smallcaps text-[#FFD9A8]">Keep in touch</p>
          <h2 className="display mt-5 max-w-[16ch] text-[clamp(2.1rem,5.4vw,4.1rem)]">
            A letter now and then, <em style={{ fontVariationSettings: '"SOFT" 90, "WONK" 1' }}>never a crowd.</em>
          </h2>
          <p className="measure mt-6 text-[1.03rem] leading-[1.7] text-[#FFFAF2]/72">
            Occasional notes on new books, new translations and essays — sent only when there is
            something worth reading. [replace with the real newsletter provider and frequency]
          </p>
          <form
            className="mt-8 flex w-full max-w-[560px] flex-col gap-3 sm:flex-row"
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor="footer-email" className="sr-only">
              Your email address
            </label>
            <input
              id="footer-email"
              type="email"
              required
              placeholder="your@email.com"
              className="min-h-[56px] w-full rounded-full border border-[#FFFAF2]/22 bg-[#FFFAF2]/8 px-6 text-[1rem] text-[#FFFAF2] placeholder:text-[#FFFAF2]/62 focus:border-[#FFFAF2]/60 focus:outline-none"
            />
            <button
              type="submit"
              className="press min-h-[56px] shrink-0 rounded-full px-8 text-[0.92rem] font-semibold"
              style={{ backgroundColor: "#FFA532", color: "#23284B" }}
            >
              Subscribe
            </button>
          </form>
          <p className="mt-3 text-[0.82rem] text-[#FFFAF2]/66">
            [replace with privacy note — no addresses shared, unsubscribe in one click]
          </p>
        </Reveal>

        <div className="mt-20 grid grid-cols-2 gap-x-8 gap-y-12 border-t border-[#FFFAF2]/12 pt-14 lg:grid-cols-6">
          {COLUMNS.map((col, ci) => (
            <motion.div
              key={col.head}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              custom={ci}
            >
              <h3 className="smallcaps text-[#FFD9A8]">{col.head}</h3>
              <ul className="mt-5 space-y-3">
                {col.items.map((it) => (
                  <li key={it.label}>
                    <Link to={it.to} className="ul-draw text-[0.92rem] leading-snug text-[#FFFAF2]/72 hover:text-[#FFFAF2]">
                      {it.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            custom={4}
            className="col-span-2"
          >
            <h3 className="smallcaps text-[#FFD9A8]">Contact &amp; Follow</h3>
            <ul className="mt-5 space-y-3">
              <li>
                <Link to="/contact" className="ul-draw text-[0.92rem] text-[#FFFAF2]/72 hover:text-[#FFFAF2]">
                  Write to John &amp; Jocelyne
                </Link>
              </li>
              <li>
                <a
                  href="mailto:[replace with direct email]"
                  className="ul-draw break-all text-[0.92rem] text-[#FFFAF2]/72 hover:text-[#FFFAF2]"
                >
                  [replace with direct email]
                </a>
              </li>
              <li>
                <a
                  href="https://lareviewofbooks.org/contributor/john-galbraith-simmons/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ul-draw text-[0.92rem] text-[#FFFAF2]/72 hover:text-[#FFFAF2]"
                >
                  Los Angeles Review of Books
                </a>
              </li>
              <li>
                <a
                  href="https://independent.academia.edu/JGSimmons"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ul-draw text-[0.92rem] text-[#FFFAF2]/72 hover:text-[#FFFAF2]"
                >
                  Academia.edu profile
                </a>
              </li>
              <li>
                <a
                  href="https://www.arts.gov/impact/literary-arts/translation-fellows/john-galbraith-simmons"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ul-draw text-[0.92rem] text-[#FFFAF2]/72 hover:text-[#FFFAF2]"
                >
                  NEA Translation Fellow
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* the wordmark, set as the last page of the book */}
        <div className="mt-24 border-t border-[#FFFAF2]/12 pt-12">
          <div
            aria-hidden
            className="display w-full text-[clamp(2.6rem,13.2vw,12rem)] leading-[0.84] tracking-[-0.045em] text-[#FFFAF2]/92"
            style={{ fontVariationSettings: '"SOFT" 40, "WONK" 1' }}
          >
            <span className="block">John Galbraith</span>
            <span className="block pl-[8%] italic" style={{ fontVariationSettings: '"SOFT" 96, "WONK" 1' }}>
              Simmons
            </span>
          </div>
          <div className="mt-10 flex flex-col gap-3 text-[0.78rem] text-[#FFFAF2]/66 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} John Galbraith Simmons. All rights reserved.</p>
            <p className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <Link to="/contact" className="ul-draw">
                Contact
              </Link>
              <a href="https://jgsimmons.com/" className="ul-draw" target="_blank" rel="noopener noreferrer">
                Original site
              </a>
              <span>[replace with privacy policy link]</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
