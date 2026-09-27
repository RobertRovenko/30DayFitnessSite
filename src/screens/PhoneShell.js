import React, { useCallback, useLayoutEffect, useRef, useState } from "react";

import { SCREEN_W } from "./Bits";

// Draws a mock app screen inside a phone body.
//
// The screen is a live React tree, not a bitmap: it is authored once at the
// app's native 1080x2217 and then scaled to whatever width the phone ends up
// being, so it stays sharp at any size and never reflows.
//
// The scale factor is measured in JS rather than written in CSS. The obvious
// `scale(calc(100cqw / 1080px))` is correct in the browser but postcss-calc in
// the production build rejects dividing one length by another, and taking the
// divisor as a bare number instead yields a length rather than the unitless
// number scaleX() needs - which computes to `none` and leaves an empty black
// rectangle. Measuring keeps a two-line calculation out of the stylesheet.
//
// There is deliberately no notch or punch-hole: the mock screens put the app
// title and logo in the top strip, exactly where a cutout would sit, so adding
// one would punch a hole in the header. The specular gradient across the glass
// and the side keys are what sell it - a plain border does not.
const PhoneShell = ({
  children,
  // One sentence describing the screen. The inner tree is aria-hidden, so this
  // label is what a screen reader announces for the whole mockup.
  label,
  widthClass = "w-[16.5rem] sm:w-[18rem]",
  className = "",
}) => {
  const screenRef = useRef(null);
  const [scale, setScale] = useState(0);

  // Layout effect rather than effect: the scale has to be correct before the
  // browser paints, or the 1080px artwork flashes inside the small frame.
  useLayoutEffect(() => {
    const el = screenRef.current;
    if (!el) return undefined;

    const measure = () => {
      const width = el.clientWidth;
      if (width) setScale(width / SCREEN_W);
    };

    measure();

    // The frame is sized in rem, so it changes on a root font-size change as
    // well as on a window resize.
    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", measure);
      return () => window.removeEventListener("resize", measure);
    }
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const onRef = useCallback((node) => {
    screenRef.current = node;
  }, []);

  return (
    <div className={`flex justify-center ${className}`}>
      <div className={`relative ${widthClass}`}>
        {/* Accent spill behind the body, matching the gold glow the app uses
            around its highlighted card. Blurred so it reads as light.

            Stepped down on narrow viewports: the gallery puts two phones side by
            side on a phone screen, and a full 2rem spill on each side reaches
            past the page gutter there and gives the document a horizontal
            scrollbar. */}
        <div
          aria-hidden="true"
          className="absolute -inset-3 rounded-[3.5rem] bg-accent/10 blur-3xl sm:-inset-5 lg:-inset-8"
        />

        <div className="relative w-full rounded-[2.7rem] bg-gradient-to-b from-white/20 via-white/[0.05] to-white/[0.12] p-[7px] shadow-[0_45px_80px_-30px_rgba(0,0,0,0.9)] ring-1 ring-inset ring-white/30">
          {/* Volume rocker and power key, breaking the silhouette. */}
          <span
            aria-hidden="true"
            className="absolute -left-[3px] top-[26%] h-7 w-[3px] rounded-l-[2px] bg-white/35"
          />
          <span
            aria-hidden="true"
            className="absolute -left-[3px] top-[33%] h-11 w-[3px] rounded-l-[2px] bg-white/35"
          />
          <span
            aria-hidden="true"
            className="absolute -right-[3px] top-[29%] h-16 w-[3px] rounded-r-[2px] bg-white/35"
          />

          {/* Radius is the body's 2.7rem minus the 7px bezel, so the two curves
              stay concentric and the frame reads as one solid piece. */}
          <div
            ref={onRef}
            className="relative aspect-[1080/2217] w-full overflow-hidden rounded-[2.25rem] bg-app-bg ring-1 ring-inset ring-black/70"
          >
            <div
              role="img"
              aria-label={label}
              className="absolute left-0 top-0 h-[2217px] w-[1080px] origin-top-left"
              style={{ transform: `scale(${scale})` }}
            >
              <div
                aria-hidden="true"
                className="flex h-[2217px] w-[1080px] flex-col overflow-hidden bg-app-bg text-ink-primary"
              >
                {children}
              </div>
            </div>

            {/* One soft diagonal reflection across the glass. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.07] to-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneShell;

