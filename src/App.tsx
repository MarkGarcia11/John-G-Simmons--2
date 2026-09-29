import { useEffect, useRef, useState } from "react";
import {
  HashRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { RoomProvider, useRoom } from "./lib/room";
import { ACCENTS, ROOMS } from "./lib/content";
import Loader from "./components/Loader";
import Nav, { ProgressBar } from "./components/Nav";
import Footer from "./components/Footer";
import { CursorDot, PaperPlane } from "./components/Atmos";

import Home from "./pages/Home";
import Science from "./pages/Science";
import Fiction from "./pages/Fiction";
import Translation from "./pages/Translation";
import Essays from "./pages/Essays";
import About from "./pages/About";
import Contact from "./pages/Contact";

function ScrollToTop() {
  const { pathname } = useLocation();
  const { setRoom } = useRoom();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    // every route starts on calm ivory paper; a dark room overrides this on mount
    setRoom(ROOMS.ivory, ACCENTS.terracotta, false);
  }, [pathname, setRoom]);
  return null;
}

/** Coloured wipe matching the destination section's accent. */
function PageWipe() {
  const { pathname } = useLocation();
  const { room } = useRoom();
  const reduce = useReducedMotion();
  const [wipe, setWipe] = useState(false);
  const first = useRef(true);

  useEffect(() => {
    if (reduce) return;
    if (first.current) {
      first.current = false;
      return;
    }
    setWipe(true);
    const id = window.setTimeout(() => setWipe(false), 900);
    return () => window.clearTimeout(id);
  }, [pathname, reduce]);

  return (
    <AnimatePresence>
      {wipe && (
        <motion.div
          key={`wipe-${pathname}`}
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[65]"
          style={{ backgroundColor: room.accent }}
          initial={{ scaleY: 0, originY: 1 }}
          animate={{ scaleY: [0, 1, 1, 0] }}
          exit={{ scaleY: 0 }}
          transition={{
            duration: 0.9,
            times: [0, 0.36, 0.42, 1],
            ease: [0.76, 0, 0.24, 1],
          }}
        />
      )}
    </AnimatePresence>
  );
}

function Shell() {
  const location = useLocation();
  const reduce = useReducedMotion();

  return (
    <>
      <ProgressBar />
      <PageWipe />
      <PaperPlane />
      <CursorDot />
      <ScrollToTop />
      <Nav />
      <main id="main">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: reduce ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : -12 }}
            transition={{ duration: reduce ? 0.15 : 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/science" element={<Science />} />
              <Route path="/fiction" element={<Fiction />} />
              <Route path="/translation" element={<Translation />} />
              <Route path="/essays" element={<Essays />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <HashRouter>
      <RoomProvider>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-[#23284B] focus:px-5 focus:py-3 focus:text-[#FFFAF2]"
        >
          Skip to content
        </a>
        <Loader onDone={() => setLoaded(true)} />
        {loaded && <Shell />}
      </RoomProvider>
    </HashRouter>
  );
}
