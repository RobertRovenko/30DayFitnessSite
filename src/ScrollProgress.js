import React from "react";
import { motion, useScroll } from "framer-motion";

// A hairline along the bottom of the sticky header showing how far through the
// document the reader is.
//
// Driven straight off the page scroll rather than a timer or a guessed page
// height, so it can only ever report real position. Deliberately left in place
// under prefers-reduced-motion: a 2px indicator that tracks the reader's own
// scrolling is not the kind of autonomous, unrequested movement that setting
// is about - it responds to them, it does not move on its own.
const ScrollProgress = ({ className = "" }) => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      aria-hidden="true"
      // scaleX rather than width, so the bar is transformed and never relaid
      // out on every scroll frame.
      style={{ scaleX: scrollYProgress }}
      className={`pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left bg-accent ${className}`}
    />
  );
};

export default ScrollProgress;
