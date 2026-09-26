import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import AlphaVideo from "./AlphaVideo";

// The hero's media. This slot used to hold a single static phone mockup
// (30dfe.png); it now cycles through the five alpha clips, crossfading them as
// a full-bleed background behind the whole hero rather than a box beside the
// copy. The section stacks the copy above this layer and dims it with a scrim.
//
// Two things shape the implementation:
//
//  - The hero is above the fold, so the lazy-mount the old showcase section
//    relied on is not available here. Instead exactly one clip is kept warmed
//    ahead of the one on screen: first paint costs a single download (over its
//    ~125KB poster), and at most two clips are ever in the DOM at once.
//  - Both routes loop, so there is no "ended" event to advance on. The cycle runs
//    off a dwell timer that only starts once the clip has actually painted, and
//    is capped so a slow connection can never leave the hero stuck.
const CLIPS = [
  "homescreenvideo",
  "paywallvideo",
  "excerciselistvideo",
  "insightsscreenvideo",
  "menuscreenvideo",
];

// Long enough to read a screen, short enough that the set reads as motion rather
// than a slideshow. Five of these is a little over half a minute per pass.
const DWELL_MS = 4500;
const FADE_MS = 700;
// If the warmed clip still has not produced a frame by now, cycle anyway. A
// crossfade that catches up a moment late beats a hero that stops dead.
const MAX_WAIT_MS = 6000;
// The clip on screen is still downloading when the next one could start. Warming
// immediately would split the connection and delay the hero's first real frame,
// which is precisely what LCP measures, so the warm-up waits a beat. Dwell is
// 4.5s, leaving ample time to fetch and decode the next clip afterwards.
const WARM_DELAY_MS = 1200;

const posterFor = (name) =>
  `${process.env.PUBLIC_URL}/assets/videos/optimized/${name}.png`;

const HeroShowcase = ({ className = "" }) => {
  // Two permanent layers: the front one is on screen, the back one holds the
  // clip warming up to replace it. Swapping *which index is visible* rather than
  // reordering the layers means each layer's opacity always has something to
  // animate, and no layer is ever created or destroyed mid-transition.
  const [front, setFront] = useState(0);
  const [names, setNames] = useState([CLIPS[0], null]);
  const [ready, setReady] = useState({});
  const [advance, setAdvance] = useState(false);
  const [forced, setForced] = useState(false);
  const [dropSlot, setDropSlot] = useState(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  const current = names[front];
  const next = names[1 - front];
  // Booleans rather than the whole `ready`/`names` objects: warming the next
  // clip must not restart the dwell timer of the one on screen.
  const currentReady = Boolean(current && ready[current]);
  const nextReady = Boolean(next && ready[next]);
  const currentIndex = CLIPS.indexOf(current);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  const markReady = (name) =>
    setReady((prev) => (prev[name] ? prev : { ...prev, [name]: true }));

  // Dwell. Starts only once the clip is on screen, so a slow load does not eat
  // into the time the visitor spends actually looking at it.
  useEffect(() => {
    if (reduceMotion || !currentReady) return undefined;
    setAdvance(false);
    setForced(false);
    const dwell = setTimeout(() => setAdvance(true), DWELL_MS);
    const cap = setTimeout(() => {
      setAdvance(true);
      setForced(true);
    }, DWELL_MS + MAX_WAIT_MS);
    return () => {
      clearTimeout(dwell);
      clearTimeout(cap);
    };
  }, [current, currentReady, reduceMotion]);

  // Warm exactly one clip ahead, and only once the current one is playing. This
  // is the lazy-mount substitute for a section that cannot scroll out of view.
  useEffect(() => {
    if (reduceMotion || next || !currentReady || currentIndex < 0) return undefined;
    const slot = 1 - front;
    const upcoming = CLIPS[(currentIndex + 1) % CLIPS.length];
    const warm = setTimeout(() => {
      setNames((prev) => {
        if (prev[slot]) return prev;
        const copy = [...prev];
        copy[slot] = upcoming;
        return copy;
      });
    }, WARM_DELAY_MS);
    return () => clearTimeout(warm);
  }, [reduceMotion, next, currentReady, currentIndex, front]);

  // Crossfade, preferring a clip that has actually drawn. Fading into a poster
  // that has not decoded yet would read as a flicker, not a transition.
  useEffect(() => {
    if (reduceMotion || !advance || !next) return;
    if (!nextReady && !forced) return;
    setDropSlot(front);
    setFront(1 - front);
    setAdvance(false);
  }, [reduceMotion, advance, next, nextReady, forced, front]);

  // The outgoing layer is kept alive for the length of the fade, then dropped so
  // its decoder is released and it stops competing for bandwidth.
  useEffect(() => {
    if (dropSlot === null) return undefined;
    const drop = setTimeout(() => {
      setNames((prev) => {
        const copy = [...prev];
        copy[dropSlot] = null;
        return copy;
      });
      setDropSlot(null);
    }, FADE_MS);
    return () => clearTimeout(drop);
  }, [dropSlot]);

  return (
    <div
      // A full-bleed layer filling the section, not an in-flow box. This outer
      // div owns the layout so a caller can nudge the whole layer - sliding the
      // device clear of the copy on desktop - without colliding with the
      // transform framer-motion writes on the inner element. overflow-hidden
      // clips the entrance scale, and pointer-events-none means the layer can
      // never intercept the CTA buttons stacked above it.
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      role="img"
      aria-label="Animated screens from the 30 Day Fitness app"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="absolute inset-0"
      >
        {[0, 1].map((slot) => (
          <div
            key={slot}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${
              slot === front ? "opacity-100" : "opacity-0"
            }`}
          >
            {names[slot] ? (
              <AlphaVideo
                // Keyed by clip, so moving a slot to a new clip gives it a fresh
                // player rather than re-pointing a live one at a new source.
                key={names[slot]}
                name={names[slot]}
                poster={posterFor(names[slot])}
                className="h-full w-full"
                // Covered while the copy sits on top of the screen - in a tall,
                // narrow box a contained 16:9 clip shrinks to a stamp floating in
                // empty space. From lg up the hero is wide and short and the
                // device is beside the copy, so containing it keeps the whole
                // device visible at full height.
                fit="object-cover lg:object-contain"
                onReady={() => markReady(names[slot])}
              />
            ) : null}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default HeroShowcase;
