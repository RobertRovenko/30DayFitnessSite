import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";

import DayFitness from "./DayFitness";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsOfService from "./TermsOfService";

const EASE_OUT = [0.22, 1, 0.36, 1];

// React Router does not restore scroll between routes, so arriving from the
// bottom of a long legal page dropped you that far down the next one. The jump
// runs on layout effect timing, before paint, so the new page is never seen
// assembled part way down.
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <>
      <ScrollToTop />

      {/* Keyed on the path, so navigating remounts this and replays the fade.
          Deliberately enter-only, with no AnimatePresence and no exit: a
          mode="wait" crossfade holds the outgoing page on screen while it
          animates out, and on three routes that reads as the app hesitating
          rather than as polish. Remounting alone gets the same effect with no
          dead time.

          `initial={false}` on the very first render keeps the fade off the
          initial page load. Fading the document in from opacity 0 would push
          the LCP element's paint behind a 250ms animation, and the hero is
          built quite carefully not to give that away. */}
      <motion.div
        key={location.pathname}
        initial={hasMounted ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ duration: reduceMotion ? 0 : 0.25, ease: EASE_OUT }}
      >
        <Routes location={location}>
          <Route path="/" element={<DayFitness />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
        </Routes>
      </motion.div>
    </>
  );
}

export default App;
