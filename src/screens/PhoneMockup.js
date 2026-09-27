import React from "react";

// Draws one app screen as a phone mockup.
//
// The artwork in public/phonemockups is a real device capture, not a flat
// screen: the bezel, dynamic island and side keys are already in the PNG, and
// the area around the device is transparent. So this renders the file full
// bleed and adds only the gold spill behind the body - the bit of page-level
// treatment that ties the mockup to the dark surface it sits on. No second
// frame is drawn around it, which would both double up the bezel and clip the
// device's own rounded corners.
//
// The browser scales the bitmap to whatever width the caller sets, so there is
// no fixed canvas, no measuring and no transform: the image stays sharp at
// every column width and reflows with the grid like any other responsive
// image.
const PhoneMockup = ({
  // An entry from SCREENS, or anything with the same { src, label } shape.
  screen,
  // Overrides screen.label, for the call sites that compose their own sentence.
  label,
  widthClass = "w-[16.5rem] sm:w-[18rem]",
  // Set on the one mockup that is visible without scrolling, so the browser
  // does not defer the request.
  priority = false,
  // Opt-in hover response, for the gallery of screens. Left off by default:
  // a lift on hover is a signal that something is clickable, and the hero
  // mockup beside the download button is a picture of the app, not a link.
  hoverable = false,
  className = "",
}) => {
  if (!screen) return null;

  return (
    <div className={`flex justify-center ${className}`}>
      {/* Named group so the hover can never be triggered by an ancestor group
          further up the tree, which the gallery and the hero both have. */}
      <div
        className={`relative ${widthClass} ${
          hoverable ? "group/mockup" : ""
        }`}
      >
        {/* Accent spill behind the body, matching the gold glow the app uses
            around its highlighted card. Blurred so it reads as light.

            Stepped down on narrow viewports: the gallery puts two phones side
            by side on a phone screen, and a full 2rem spill on each side
            reaches past the page gutter there and gives the document a
            horizontal scrollbar. */}
        <div
          aria-hidden="true"
          className={`absolute -inset-3 rounded-[3.5rem] bg-accent/10 blur-3xl sm:-inset-5 lg:-inset-8 ${
            hoverable
              ? "transition-colors duration-300 group-hover/mockup:bg-accent/25"
              : ""
          }`}
        />

        {/* The intrinsic size is declared so the browser reserves the right
            box before the file decodes and the surrounding text does not jump.
            The device fills the capture edge to edge, and h-auto keeps the
            capture's own proportions at every width.

            The hover is a small lift plus a nudge in scale, both on the
            compositor. No 3D tilt: it reads as a toy rather than a device
            photo, and these are not links, so the movement should suggest the
            phone is being picked up rather than that it can be pressed. */}
        <img
          src={screen.src}
          alt={label || screen.label}
          width={1530}
          height={3036}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          // A mockup is decoration, not a document image: there is nothing to
          // select or drag off the page.
          className={`relative block h-auto w-full select-none ${
            hoverable
              ? "motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out motion-safe:group-hover/mockup:-translate-y-1 motion-safe:group-hover/mockup:scale-[1.03]"
              : ""
          }`}
          draggable={false}
        />
      </div>
    </div>
  );
};

export default PhoneMockup;
