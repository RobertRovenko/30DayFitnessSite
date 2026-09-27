import React from "react";

import PhoneMockup from "./PhoneMockup";

// Screens shown across the site, in the order they should appear in a gallery.
// Each entry carries the title and sentence shown under the phone, the label
// the screen is announced with, and the device capture that draws it.
//
// The artwork is a real capture rather than a re-drawn approximation: the app's
// own colours, type and layout are the thing being shown, so the asset is the
// source of truth and the site only supplies the phone's surroundings.
//
// Order is deliberate: it walks a user through the app the way they would meet
// it - land on Home, start a workout, browse the library, then open the menu.
const mockup = (file) => `${process.env.PUBLIC_URL}/phonemockups/${file}`;
const SCREENS = [
  {
    id: "home",
    title: "Home",
    caption: "Pick up where you left off and see every program.",
    label:
      "The 30 Day Fitness home screen: a week strip showing day 1 of 7, a highlighted card offering to continue day 29 of the Upper Lower program, and a list of workout programs below.",
    src: mockup("homescreen.png"),
  },
  {
    id: "workout",
    title: "Workout",
    caption: "Reps, sets and technique guidance while you train.",
    label:
      "The active workout screen for a barbell skullcrusher: exercise artwork, a progress bar showing the fourth of eight movements, the rep and set counters, and a button to log the set.",
    src: mockup("workoutscreen.png"),
  },
  {
    id: "exercise-list",
    title: "Exercise Library",
    caption: "Filter 71 movements by the muscle group you are training.",
    label:
      "The exercise library screen: filter chips for muscle groups, a count of 71 moves, and a scrollable list of exercises such as barbell squat and bench dip with the muscle group each one trains.",
    // The file is misspelled in public/phonemockups. The string has to match
    // the name on disk, so renaming the asset means changing it here too.
    src: mockup("excercicelist.png"),
  },
  {
    id: "menu",
    title: "Menu",
    caption: "Quick tools, the exercise library and your custom plans.",
    label:
      "The menu screen: quick tools for a timer and a rep counter, a link to the exercise library, and a section for custom workout plans with a button to create one.",
    src: mockup("menuscreen.png"),
  },
];

// A labelled phone mockup. The caption is real text rather than baked into the
// image, so it stays selectable, translatable and readable by a screen reader.
const PhoneMockupCard = ({ screen, widthClass, caption = true }) => {
  const { title, caption: text } = screen;

  return (
    <figure className="flex flex-col items-center">
      <PhoneMockup screen={screen} widthClass={widthClass} hoverable />
      {caption && (
        <figcaption className="mt-6 max-w-[9.5rem] text-center sm:max-w-[12rem] lg:max-w-[15rem]">
          <div className="text-sm font-bold uppercase tracking-[0.16em] text-accent">
            {title}
          </div>
          <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
            {text}
          </p>
        </figcaption>
      )}
    </figure>
  );
};

export { PhoneMockup, PhoneMockupCard };
export { SCREENS };
export default SCREENS;