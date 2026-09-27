import { motion, useReducedMotion } from "framer-motion";

// Shared scroll-reveal motion for every page. Everything below the hero starts
// below the fold, so rather than dropping the whole layout in at once each block
// fades up as it scrolls into view. `viewport.once` keeps the page calm when you
// scroll back up instead of replaying animations you have already seen.
//
// The site animates from one small vocabulary rather than a bespoke effect per
// section, and that is most of what keeps it reading as deliberate instead of
// busy. A new kind of entrance belongs here, not inline at the call site.
const EASE_OUT = [0.22, 1, 0.36, 1];
const DURATION = 0.55;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  shown: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION, ease: EASE_OUT },
  },
};

// Used when the OS asks for reduced motion: cross-fade only, nothing travels.
const fadeOnly = {
  hidden: { opacity: 0 },
  shown: { opacity: 1, transition: { duration: 0.3 } },
};

// Cards and tiles, which read better as coming forward than as sliding up the
// page. Scaled off 1 so the transform stays composited.
const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  shown: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
};

// Two-column splits, where each half enters from the side it sits on.
const slideInLeft = {
  hidden: { opacity: 0, x: -32 },
  shown: { opacity: 1, x: 0, transition: { duration: DURATION, ease: EASE_OUT } },
};

const slideInRight = {
  hidden: { opacity: 0, x: 32 },
  shown: { opacity: 1, x: 0, transition: { duration: DURATION, ease: EASE_OUT } },
};

// The group parent carries the stagger, the children carry the movement.
const stagger = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

// Reduced motion wins over whatever was requested. This is the one part that
// has to be right: the previous `variants || (reduceMotion ? ... )` meant that
// passing a named variant bypassed the check completely.
const pickVariants = (variants, reduceMotion) =>
  reduceMotion ? fadeOnly : variants || fadeUp;

// Keeps the markup semantics intact - a reveal is a <ul> on a list, not a <div>.
const TAGS = {
  div: motion.div,
  section: motion.section,
  nav: motion.nav,
  ul: motion.ul,
  ol: motion.ol,
  li: motion.li,
  p: motion.p,
  h2: motion.h2,
  h3: motion.h3,
  header: motion.header,
  aside: motion.aside,
  figure: motion.figure,
  dl: motion.dl,
};

// One block that animates itself in as it enters the viewport.
const Reveal = ({
  as = "div",
  className,
  amount = 0.2,
  variants,
  children,
  ...rest
}) => {
  const Tag = TAGS[as] || motion.div;
  const reduceMotion = useReducedMotion();

  return (
    <Tag
      className={className}
      variants={pickVariants(variants, reduceMotion)}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

// Parent that hands its "now visible" state down to the RevealItems beneath it.
const RevealGroup = ({ as = "div", className, amount = 0.2, children, ...rest }) => (
  <Reveal as={as} className={className} amount={amount} variants={stagger} {...rest}>
    {children}
  </Reveal>
);

// Child of a RevealGroup. It declares no initial/whileInView of its own, so it
// inherits the parent's variant label and the group staggers as one.
const RevealItem = ({ as = "div", className, variants, children, ...rest }) => {
  const Tag = TAGS[as] || motion.div;
  const reduceMotion = useReducedMotion();

  return (
    <Tag
      className={className}
      variants={pickVariants(variants, reduceMotion)}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export {
  Reveal,
  RevealGroup,
  RevealItem,
  fadeUp,
  fadeOnly,
  scaleIn,
  slideInLeft,
  slideInRight,
  stagger,
};
