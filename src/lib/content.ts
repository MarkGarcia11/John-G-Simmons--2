/**
 * All content below is transcribed from the live jgsimmons.com site
 * (WordPress page "Home", id 25) and its media library.
 * Anything not present on the live site is marked [replace with ...].
 */

const U = "https://jgsimmons.com/wp-content/uploads";

/** Real image assets scraped from the jgsimmons.com media library. */
export const IMG = {
  /** Portrait of John Galbraith Simmons (attached photograph, hosted on the live site). */
  portrait: `${U}/revslider/LANDING/JGSNEW_JPG-copy.gif`,
  /** Landing / hero photograph from the live site. */
  heroPlate: `${U}/revslider/LANDING/JGSWEBSITE.jpg`,
  sci100: `${U}/2023/02/SCI100.png`,
  doctors: `${U}/2023/02/COVER_D_D_PIC.jpg`,
  /** 89×120 on the live site — edition unconfirmed. */
  coverPic: `${U}/2023/02/COVER_PIC.jpg`,
  tpa: `${U}/2023/02/TPA-FOR-STROKE-cover-e1676734115833.jpg`,
  lamplighter: `${U}/revslider/LANDING/Screenshot_2020-01-29-Company-Name10.png`,
  piper: `${U}/revslider/LANDING/SCREENSHOT_CRIED_THE_PIPER.png`,
  sharing: `${U}/revslider/LANDING/Screenshot_THE-SHARING.png`,
  midnight: `${U}/revslider/LANDING/MIDNIGHT_WALKING.png`,
} as const;

/** Local generated atmosphere, used as onError fallback and as backdrop plates. */
export const PLATE = {
  desk: "images/hero-desk.jpg",
  noir: "images/noir-street.jpg",
  translation: "images/translation-desk.jpg",
  manuscript: "images/manuscript.jpg",
  lab: "images/lab-glass.jpg",
  portrait: "images/portrait-fallback.jpg",
} as const;

/* The whole site is printed in two inks: navy #23284B and amber #FFA532.
   Everything below is one of those two, or a tint/shade of one of them. */

export const INK = {
  navy: "#23284B",
  amber: "#FFA532",
  /** amber, shaded — safe as type on paper (≥4.5:1) */
  amberDeep: "#9A5B08",
  /** amber, tinted — paper stock and quiet fills */
  amberTint: "#FFE3BA",
} as const;

export const ROOMS = {
  /** paper stock: amber ink at 4% */
  ivory: "#FFFAF2",
  /** amber ink at 10% */
  parchment: "#FFF1DC",
  /** amber ink at 6% */
  science: "#FFF6E8",
  /** the one dark room: full-strength navy ink */
  fiction: "#23284B",
  /** amber ink at 10% */
  translation: "#FFF1DC",
  /** amber ink at 22% — the warmest room on the site */
  essays: "#FFE7C4",
  /** amber ink at 6% */
  about: "#FFF6E8",
} as const;

/** `brand` is the amber at full strength — fills, dark rooms, graphics. */
export const ACCENTS = {
  brand: "#FFA532",
  /** amber shaded for type on paper */
  deep: "#9A5B08",
  navy: "#23284B",

  // legacy aliases, so every existing call site keeps working
  terracotta: "#9A5B08",
  clay: "#9A5B08",
  teal: "#9A5B08",
  coral: "#9A5B08",
  saffron: "#9A5B08",
  amber: "#FFA532",
  olive: "#23284B",
  forest: "#23284B",
  indigo: "#23284B",
  sand: "#FFE3BA",
  sage: "#FFE3BA",
  rose: "#FFE3BA",
  aqua: "#FFE3BA",
} as const;

export type Book = {
  id: string;
  title: string;
  subtitle?: string;
  contributor?: string;
  publisher: string;
  year: string;
  hook: string;
  synopsis: string;
  cover: string;
  coverFallback: string;
  alt: string;
  note?: string;
  links: { label: string; href: string }[];
};

/* ---------------------------------- SCIENCE --------------------------------- */

export const scienceBooks: Book[] = [
  {
    id: "the-scientific-100",
    title: "The Scientific 100",
    subtitle: "A Ranking of the Most Influential Scientists, Past and Present",
    publisher: "[replace with confirmed publisher — Citadel or Carol]",
    year: "1996",
    hook: "A hundred lives, ranked — and the argument behind the ranking.",
    synopsis:
      "A collective biography of the hundred most influential scientists, past and present, written for general and professional readers alike. [replace with 2–3 sentence approved synopsis from the author]",
    cover: IMG.sci100,
    coverFallback: PLATE.lab,
    alt: "Cover of The Scientific 100: A Ranking of the Most Influential Scientists, Past and Present by John Galbraith Simmons",
    note:
      "Content flag: the existing site credits this title to both Citadel and to Carol (1996). [replace with the confirmed publisher and edition details]",
    links: [
      { label: "Read about the book", href: "/science#the-scientific-100" },
      { label: "[replace with buy link]", href: "#" },
    ],
  },
  {
    id: "doctors-and-discoveries",
    title: "Doctors and Discoveries",
    subtitle: "Lives That Created Today's Medicine",
    publisher: "Houghton Mifflin",
    year: "2002",
    hook: "The people behind the medicine we now take for granted.",
    synopsis:
      "A collective biography of the lives that created today's medicine, aimed at both general and professional audiences. [replace with 2–3 sentence approved synopsis from the author]",
    cover: IMG.doctors,
    coverFallback: PLATE.lab,
    alt: "Cover of Doctors and Discoveries: Lives That Created Today's Medicine by John Galbraith Simmons",
    note: "Cover image on the live site is 81×120px. [replace with high-resolution cover file]",
    links: [
      { label: "Read about the book", href: "/science#doctors-and-discoveries" },
      { label: "[replace with buy link]", href: "#" },
    ],
  },
  {
    id: "tpa-for-stroke",
    title: "tPA for Stroke",
    subtitle: "The Story of a Controversial Drug",
    contributor: "in collaboration with Justin A. Zivin, MD, PhD",
    publisher: "Oxford University Press",
    year: "2011",
    hook: "One drug, one emergency, and a decade of argument.",
    synopsis:
      "Written in collaboration with Justin A. Zivin MD, PhD, the story of a controversial drug — the clot-buster that changed stroke treatment and divided the field that built it. [replace with 2–3 sentence approved synopsis from the author]",
    cover: IMG.tpa,
    coverFallback: PLATE.lab,
    alt: "Cover of tPA for Stroke: The Story of a Controversial Drug by John Galbraith Simmons and Justin A. Zivin",
    links: [
      { label: "Read about the book", href: "/science#tpa-for-stroke" },
      { label: "[replace with buy link]", href: "#" },
    ],
  },
];

export const scienceWriting = [
  {
    title: "The Ions Have It: Targeting the Ion Channels for Drug Discovery",
    outlet: "[replace with publication and date]",
    kind: "Scientific",
  },
  {
    title: "Simulation for Operational Readiness in a New Freestanding Emergency Department",
    outlet: "Simul Healthc. 2016 Oct; 11(5): 345–356",
    kind: "Medical",
    href: "https://pubmed.ncbi.nlm.nih.gov/?term=Simulation+for+Operational+Readiness+in+a+New+Freestanding+Emergency+Department",
  },
  {
    title: "New York Academy of Sciences — eBriefing",
    outlet: "New York Academy of Sciences · [replace with title and date]",
    kind: "Scientific",
    href: "https://www.nyas.org/",
  },
  {
    title: "Reporting on new developments in cancer research",
    outlet: "[replace with outlet and dates]",
    kind: "Medical",
  },
  {
    title: "Consultant, Celera Genomics",
    outlet: "Science & industry · [replace with dates and scope]",
    kind: "Scientific",
  },
  {
    title: "Current Biography — long association",
    outlet: "Current Biography · [replace with list of profiles written]",
    kind: "Literary",
    href: "https://www.infobase.com/product/current-biography",
  },
];

/* ---------------------------------- FICTION --------------------------------- */

export type Novel = {
  id: string;
  title: string;
  year: string;
  cover: string;
  coverFallback: string;
  alt: string;
  order: number;
  synopsis: string;
  note?: string;
};

export const novels: Novel[] = [
  {
    id: "lamplighter",
    title: "Lamplighter",
    year: "[replace with publication year]",
    cover: IMG.lamplighter,
    coverFallback: PLATE.noir,
    alt: "Cover of Lamplighter, a novel by John Galbraith Simmons",
    order: 1,
    synopsis:
      "The first of the quartet. [replace with approved 2–3 sentence synopsis — the live site carries the title only]",
  },
  {
    id: "cried-the-piper",
    title: "Cried the Piper",
    year: "[replace with publication year]",
    cover: IMG.piper,
    coverFallback: PLATE.noir,
    alt: "Cover of Cried the Piper, a novel by John Galbraith Simmons",
    order: 2,
    synopsis:
      "[replace with approved 2–3 sentence synopsis — the live site carries the title only]",
  },
  {
    id: "the-sharing",
    title: "The Sharing",
    year: "1983",
    cover: IMG.sharing,
    coverFallback: PLATE.noir,
    alt: "Cover of The Sharing, a novel by John Galbraith Simmons",
    order: 3,
    synopsis:
      "Published in 1983. [replace with approved 2–3 sentence synopsis — the live site carries the title only]",
    note: "Publication year sourced from the National Endowment for the Arts translator bio. [confirm]",
  },
  {
    id: "midnight-walking",
    title: "Midnight Walking",
    year: "1986",
    cover: IMG.midnight,
    coverFallback: PLATE.noir,
    alt: "Cover of Midnight Walking, a novel by John Galbraith Simmons",
    order: 4,
    synopsis:
      "Published in 1986. [replace with approved 2–3 sentence synopsis — the live site carries the title only]",
    note: "Publication year sourced from the National Endowment for the Arts translator bio. [confirm]",
  },
];

/* -------------------------------- TRANSLATION ------------------------------- */

export const translations = [
  {
    id: "aline-and-valcour",
    title: "Aline and Valcour, or the Philosophical Novel",
    author: "Marquis de Sade",
    publisher: "Contra Mundum Press",
    year: "2019",
    volumes: "3 volumes",
    note: "The first-ever English-language translation of Sade's epic novel.",
    href: "https://www.contramundum.press/",
  },
  {
    id: "outlaw",
    title: "Outlaw: Author Armed and Dangerous",
    author: "Rédoine Faïd",
    publisher: "Contra Mundum Press",
    year: "[replace with year]",
    volumes: "A memoir",
    note: "[replace with approved one-line description]",
    href: "https://www.contramundum.press/",
  },
  {
    id: "ten-little-anarchists",
    title: "Ten Little Anarchists",
    author: "Daniel de Roulet",
    publisher: "Autonomedia",
    year: "[replace with year]",
    volumes: "[replace with format]",
    note: "[replace with approved one-line description]",
    href: "https://www.autonomedia.org/",
  },
];

export const translationBio = [
  "His work as a translator, in collaboration with his wife, Jocelyne Geneviève Barque, includes Marquis de Sade's multivolume Aline and Valcour, or the Philosophical Novel (Contra Mundum, 2019).",
  "Simmons broke into translation in 1994 with Return to Vietnam. He and Jocelyne Geneviève Barque joined the board of translators in 2004 for the three-volume International Dictionary of Psychoanalysis; they also worked on The Encyclopedia of the Age of War and Reconstruction.",
];

/* ----------------------------------- ESSAYS -------------------------------- */

export type Essay = {
  title: string;
  outlet: string;
  date: string;
  kind: "Scientific" | "Medical" | "Literary";
  href?: string;
};

export const essays: Essay[] = [
  {
    title:
      "A Tale of Literary and Financial Debauchery: On Joel Warner's \u201cThe Curse of the Marquis de Sade\u201d",
    outlet: "Los Angeles Review of Books",
    date: "April 11, 2023",
    kind: "Literary",
    href: "https://lareviewofbooks.org/article/a-tale-of-literary-and-financial-debauchery-on-joel-warners-the-curse-of-the-marquis-de-sade/",
  },
  {
    title: "Sade's Publisher: A Memoir — a review",
    outlet: "The Huffington Post",
    date: "[replace with date]",
    kind: "Literary",
    href: "https://www.huffpost.com/entry/sades-publisher-a-memoir-reviewed-by-john-galbraith_b_59cbb2c8e4b0b99ee4a9c97d",
  },
  {
    title: "Lindau and the Zeitgeist: Annual meeting of Nobel laureates",
    outlet: "Nature (2010) 467, S14–S15",
    date: "2010",
    kind: "Scientific",
    href: "https://www.nature.com/nature/",
  },
  {
    title: "The Ions Have It: Targeting the Ion Channels for Drug Discovery",
    outlet: "[replace with publication and date]",
    date: "[replace]",
    kind: "Scientific",
  },
  {
    title: "Simulation for Operational Readiness in a New Freestanding Emergency Department",
    outlet: "Simulation in Healthcare 2016 Oct; 11(5): 345–356",
    date: "October 2016",
    kind: "Medical",
    href: "https://pubmed.ncbi.nlm.nih.gov/?term=Simulation+for+Operational+Readiness+in+a+New+Freestanding+Emergency+Department",
  },
  {
    title: "New York Academy of Sciences — eBriefing",
    outlet: "New York Academy of Sciences",
    date: "[replace with date]",
    kind: "Scientific",
    href: "https://www.nyas.org/",
  },
  {
    title: "Locked-In — Lesson for Stroke Awareness",
    outlet: "BrainBlogger",
    date: "[replace with date]",
    kind: "Medical",
    href: "http://www.brainblogger.com/author/jgsimmons/",
  },
  {
    title: "Into the Looking Glass — Stroke, tPA, and Avoiding a Fate Worse Than Death",
    outlet: "BrainBlogger",
    date: "[replace with date]",
    kind: "Medical",
    href: "http://www.brainblogger.com/author/jgsimmons/",
  },
  {
    title: "Is Schizophrenia Really a Brain Disease?",
    outlet: "BrainBlogger · Opinion",
    date: "[replace with date]",
    kind: "Medical",
    href: "http://www.brainblogger.com/author/jgsimmons/",
  },
  {
    title: "The Anti-Psychiatry Movement",
    outlet: "BrainBlogger · Psychology & Psychiatry",
    date: "[replace with date]",
    kind: "Medical",
    href: "http://www.brainblogger.com/author/jgsimmons/",
  },
  {
    title: "Full Recovery from Schizophrenia?",
    outlet: "BrainBlogger · Psychology & Psychiatry",
    date: "[replace with date]",
    kind: "Medical",
    href: "http://www.brainblogger.com/author/jgsimmons/",
  },
  {
    title: "The Personality of Chronic Fatigue",
    outlet: "BrainBlogger · Biopsychosocial Health",
    date: "[replace with date]",
    kind: "Medical",
    href: "http://www.brainblogger.com/author/jgsimmons/",
  },
  {
    title: "Marijuana Withdrawal Syndrome — Drugs & Clinical Trials",
    outlet: "BrainBlogger",
    date: "[replace with date]",
    kind: "Medical",
    href: "http://www.brainblogger.com/author/jgsimmons/",
  },
  {
    title: "Free Will is NOT An Illusion",
    outlet: "BrainBlogger · Opinion",
    date: "[replace with date]",
    kind: "Literary",
    href: "http://www.brainblogger.com/author/jgsimmons/",
  },
];

export const outlets = [
  "Oxford University Press",
  "Houghton Mifflin",
  "Nature",
  "New York Academy of Sciences",
  "Current Biography",
  "Contra Mundum Press",
  "Autonomedia",
  "Los Angeles Review of Books",
  "Celera Genomics",
  "National Endowment for the Arts",
];

/* ------------------------------------ BIO ----------------------------------- */

export const bioParagraphs = [
  "John Galbraith Simmons was born in Chicago and graduated Northwestern University, with a subsequent master's degree in developmental studies from Long Island University and post-graduate studies in psychoanalysis.",
  "He writes for both general and professional audiences and is the author of several works of nonfiction and four novels. His books include The Scientific 100: A Ranking of the Most Influential Scientists, Past and Present (Carol 1996), Doctors and Discoveries: Lives That Created Today's Medicine (Houghton Mifflin 2002), and (in collaboration with Justin A. Zivin MD, PhD) tPA for Stroke: The Story of a Controversial Drug (Oxford University Press 2011).",
  "For many years associated with the magazine Current Biography, he has written for Nature, produced articles for New York Academy of Sciences, reported on new developments in cancer research, and served as a consultant for Celera Genomics.",
  "His work as a translator, in collaboration with his wife, Jocelyne Geneviève Barque, includes Marquis de Sade's multivolume Aline and Valcour, or the Philosophical Novel (Contra Mundum, 2019). He lives in New York City.",
];

export const timeline = [
  { year: "Chicago", label: "Born", detail: "Born in Chicago. [replace with year]" },
  { year: "—", label: "Northwestern University", detail: "Graduated Northwestern University, where he studied philosophy." },
  { year: "—", label: "Long Island University", detail: "Master's degree in developmental studies." },
  { year: "—", label: "Postgraduate study", detail: "Post-graduate studies in psychoanalysis." },
  { year: "1983", label: "The Sharing", detail: "Second novel published." },
  { year: "1986", label: "Midnight Walking", detail: "Fourth novel published." },
  { year: "1994", label: "Return to Vietnam", detail: "First published translation." },
  { year: "1996", label: "The Scientific 100", detail: "First collective biography of science." },
  { year: "2002", label: "Doctors and Discoveries", detail: "Collective biography of medicine, Houghton Mifflin." },
  { year: "2004", label: "International Dictionary of Psychoanalysis", detail: "Joins the board of translators with Jocelyne Geneviève Barque." },
  { year: "2011", label: "tPA for Stroke", detail: "Oxford University Press, with Justin A. Zivin MD, PhD." },
  { year: "2019", label: "Aline and Valcour", detail: "First English translation of Sade's epic, Contra Mundum Press, 3 volumes." },
  { year: "2023", label: "Los Angeles Review of Books", detail: "Essay on Joel Warner's The Curse of the Marquis de Sade." },
  { year: "Now", label: "New York City", detail: "He lives and works in New York City." },
];

export const numbers = [
  { figure: "300+", label: "Articles", note: "Essay and long-form reportage across scientific, medical and literary subjects. [verify with client]" },
  { figure: "3", label: "Nonfiction books", note: "The Scientific 100, Doctors and Discoveries, tPA for Stroke. [verify with client]" },
  { figure: "4", label: "Novels", note: "The noir quartet: Lamplighter, Cried the Piper, The Sharing, Midnight Walking." },
  { figure: "2", label: "Translators, one voice", note: "All recent literary translation credited jointly with Jocelyne Geneviève Barque." },
];

export const CHAPTERS = [
  {
    n: "I",
    num: "01",
    label: "Discovery",
    title: "Science & Medicine",
    accent: ACCENTS.deep,
    href: "/science",
    kicker: "SCIENCE & MEDICINE",
    line: "Three books and thirty years of reporting on what the body hides.",
    plate: PLATE.lab,
    bg: ROOMS.science,
    dark: false,
  },
  {
    n: "II",
    num: "02",
    label: "Shadow",
    title: "Fiction",
    accent: ACCENTS.brand,
    href: "/fiction",
    kicker: "FICTION — A NOIR QUARTET",
    line: "Four novels, one long walk after midnight.",
    plate: PLATE.noir,
    bg: ROOMS.fiction,
    dark: true,
  },
  {
    n: "III",
    num: "03",
    label: "Traduction",
    title: "Translation",
    accent: ACCENTS.deep,
    href: "/translation",
    kicker: "TRANSLATION",
    line: "Two translators, one shared line — English carried across from the French.",
    plate: PLATE.translation,
    bg: ROOMS.translation,
    dark: false,
  },
  {
    n: "IV",
    num: "04",
    label: "Essays",
    title: "Essays & Press",
    accent: ACCENTS.deep,
    href: "/essays",
    kicker: "ESSAYS & PRESS",
    line: "More than three hundred pieces of scientific, medical and literary writing.",
    plate: PLATE.manuscript,
    bg: ROOMS.essays,
    dark: false,
  },
];
