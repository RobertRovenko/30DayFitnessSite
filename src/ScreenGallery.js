import React from "react";

import { RevealGroup, RevealItem } from "./Reveal";
import { SCREENS, PhoneMockupCard } from "./screens";

// The four app screens, shown at the foot of the legal pages.
//
// The point on these pages is to show what the App actually looks like, so the
// phones here are real device captures from public/phonemockups rather than a
// re-drawn approximation: the app's own colours, type and layout are the thing
// being shown, so the asset is the source of truth. They load lazily, because a
// legal page runs long and this gallery sits at the very bottom of it.
//
// Widths are stepped down from the hero's single-phone size so four fit across
// a laptop without becoming unreadable, and so they still work two-up on a
// phone. `caption` is off in the tightest layout only to keep the type from
// wrapping awkwardly under a narrow frame.
const GALLERY_SCREEN_WIDTHS =
  "w-[9.5rem] sm:w-[10.5rem] lg:w-[11.5rem] xl:w-[12.5rem]";

const ScreenGallery = ({
  screens = SCREENS,
  className = "mx-auto flex max-w-6xl flex-col items-center gap-14 px-5 pb-20 sm:px-8",
}) => (
  <RevealGroup className={className}>
    {/* A grid rather than a wrapping flex row: the four figures are the same
        width, so flex was free to break the row three-plus-one at exactly the
        width where it looks most accidental. 2-up on a phone, 4-up from lg. */}
    <div className="grid grid-cols-2 items-start justify-items-center gap-x-8 gap-y-12 sm:gap-x-10 lg:grid-cols-4">
      {screens.map((screen) => (
        <RevealItem key={screen.id} className="flex justify-center">
          <PhoneMockupCard
            screen={screen}
            widthClass={GALLERY_SCREEN_WIDTHS}
          />
        </RevealItem>
      ))}
    </div>
  </RevealGroup>
);

export default ScreenGallery;