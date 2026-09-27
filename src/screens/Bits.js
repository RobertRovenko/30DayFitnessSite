import React from "react";

// Shared pieces for the four app-screen mockups in this folder.
//
// Everything here is authored in the app's native pixels (1080 wide) and scaled
// down by PhoneShell, so the numbers here are real design units, not
// percentages - which is why they are all round and large.

export const SCREEN_W = 1080;
export const SCREEN_H = 2217;

// Bottom navigation shared by Home and Menu. The app highlights the active tab
// in the gold accent and leaves the rest in TEXT_TERTIARY.
//
// SPACING NOTE: lengths are arbitrary px rather than named steps, so they mean
// the same thing on the 1080px artwork canvas at any root font size. The same
// note applies to every screen in this folder.
//
// The icons are inlined rather than pulled from lucide because the app's own
// set is a heavier, squarer weight than the library's, and matching that is
// most of what makes the mockup read as the product rather than as an icon set.
const ListIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.2}
    strokeLinecap="round"
    {...props}
  >
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const GridIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <rect x="3" y="3" width="8" height="8" rx="2.4" />
    <rect x="13" y="3" width="8" height="8" rx="2.4" />
    <rect x="3" y="13" width="8" height="8" rx="2.4" />
    <rect x="13" y="13" width="8" height="8" rx="2.4" />
  </svg>
);

const ChartIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
  </svg>
);

const UserIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.2}
    strokeLinecap="round"
    {...props}
  >
    <circle cx="12" cy="8" r="4.2" />
    <path d="M4.5 20.5c1.6-4 4.2-6 7.5-6s5.9 2 7.5 6" />
  </svg>
);

const TABS = [
  { id: "home", label: "Home", Icon: ListIcon },
  { id: "menu", label: "Menu", Icon: GridIcon },
  { id: "insights", label: "Insights", Icon: ChartIcon },
  { id: "profile", label: "Profile", Icon: UserIcon },
];

export const BottomNav = ({ active }) => (
  <div className="flex h-[196px] shrink-0 items-start justify-between border-t border-white/10 bg-app-bg px-[46px] pt-[34px]">
    {TABS.map(({ id, label, Icon }) => (
      <div
        key={id}
        className={`flex w-[200px] flex-col items-center gap-[18px] ${
          id === active ? "text-accent" : "text-ink-tertiary"
        }`}
      >
        <Icon className="h-[60px] w-[60px]" />
        <span className="text-[34px] font-medium tracking-wide">{label}</span>
      </div>
    ))}
  </div>
);

// The app's rounded progress bar: a dim track with a gold fill.
export const ProgressBar = ({ percent, height = 20, className = "" }) => (
  <div
    style={{ height }}
    className={`w-full overflow-hidden rounded-full bg-white/10 ${className}`}
  >
    <div
      className="h-full rounded-full bg-accent"
      style={{ width: `${Math.max(0, Math.min(100, percent))}%` }}
    />
  </div>
);

// Small uppercase heading with the gold bullet the app uses above a group.
export const GroupLabel = ({ children, className = "" }) => (
  <div className={`flex shrink-0 items-center gap-[16px] ${className}`}>
    <span className="h-[18px] w-[18px] rounded-full bg-accent" />
    <span className="text-[36px] font-bold uppercase tracking-[0.14em] text-ink-secondary">
      {children}
    </span>
  </div>
);

// Right-pointing chevron, used on every tappable row in the app.
export const RowChevron = ({ className = "h-[56px] w-[56px]" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.6}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 5l7 7-7 7" />
  </svg>
);

// A dumbbell, standing in for the app's anatomical exercise artwork. Drawn
// rather than imported so the mockups carry no image weight of their own.
export const DumbbellGlyph = ({ className = "h-[120px] w-[120px]" }) => (
  <svg viewBox="0 0 120 120" fill="currentColor" className={className} aria-hidden="true">
    <rect x="46" y="52" width="28" height="16" rx="4" />
    <rect x="26" y="40" width="14" height="40" rx="5" />
    <rect x="16" y="30" width="12" height="60" rx="6" />
    <rect x="80" y="40" width="14" height="40" rx="5" />
    <rect x="92" y="30" width="12" height="60" rx="6" />
  </svg>
);