import React, { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { fadeOnly, fadeUp, stagger } from "./Reveal";

const img = (path) => `${process.env.PUBLIC_URL}/${path}`;

// public/workoutdemonstration is organised one directory per muscle group, so
// every group below names its directory and the clips are read straight out of
// it. Each group has exactly two.
const demo = (folder, file) => img(`workoutdemonstration/${folder}/${file}`);

// The seven muscle groups the core program trains. The artwork is the app's
// own: a slate torso with the target muscle picked out in crimson, on a
// transparent background.
//
// The figures are the 640px copies in public/musclegroups/web, not the 2048px
// originals beside them. A tile is about 110px across, so the originals were
// roughly seventeen times the pixels they ever occupy - and because all seven
// tiles sit on screen at once, that is 1.24MB of art for one row. The copies
// bring it to 553KB, and the originals stay on disk untouched. Naming them by
// group also means nothing here inherits the two misspellings in the originals
// (bicepullustration, tricepillustration).
//
// Only the selected group's two clips are ever in the document. All fourteen
// together are 8.6MB, so fetching them up front would be a serious regression;
// they are requested on selection and then cached by the browser.
const GROUPS = [
  {
    id: "chest",
    label: "Chest",
    folder: "chest",
    src: img("musclegroups/web/chest.png"),
    blurb:
      "Pressing movements that build the chest and the front of the shoulders together. Add load before you add reps - the bench is the measure of your upper body's strength.",
    exercises: [
      {
        id: "dips",
        name: "Dips",
        src: demo("chest", "dips.webp"),
        cue: "Lean slightly forward, lower until the elbows pass 90 degrees, press back up.",
      },
      {
        id: "flatBenchPress",
        name: "Flat Bench Press",
        src: demo("chest", "flatBenchPress.webp"),
        cue: "Pin the shoulder blades, lower to the chest, press up and slightly in.",
      },
    ],
  },
  {
    id: "back",
    label: "Back",
    folder: "back",
    src: img("musclegroups/web/back.png"),
    blurb:
      "Pulling movements for the lats, traps and rear delts - the muscles that hold your posture up under load. Lead with the elbows and let the shoulders come last.",
    exercises: [
      {
        id: "machinePulldown",
        name: "Machine Pulldown",
        src: demo("back", "machinePulldown.webp"),
        cue: "Chest tall, elbows driven down to the sides rather than back.",
      },
      {
        id: "oneArmRow",
        name: "One-Arm Row",
        src: demo("back", "oneArmRow.webp"),
        cue: "Brace the torso, pull the elbow past the hip and pause at the top.",
      },
    ],
  },
  {
    id: "shoulders",
    label: "Shoulders",
    folder: "shoulder",
    src: img("musclegroups/web/shoulders.png"),
    blurb:
      "The delts cap the shoulder and carry most of your pressing, plus the work behind it in every row. Small isolation work like this is what closes a gap once the big lifts have stalled.",
    exercises: [
      {
        id: "cableLateralRaise",
        name: "Cable Lateral Raise",
        src: demo("shoulder", "cableLateralRaise.webp"),
        cue: "Lead with the elbow to shoulder height and stop - past that the trap takes over.",
      },
      {
        id: "dbShoulderPress",
        name: "Dumbbell Shoulder Press",
        src: demo("shoulder", "dbShoulderPress.webp"),
        cue: "Press from ear level rather than the chest, so the rear delts keep working.",
      },
    ],
  },
  {
    id: "biceps",
    label: "Biceps",
    folder: "bicep",
    src: img("musclegroups/web/biceps.png"),
    blurb:
      "Elbow flexion, and the grip strength that sits behind every pull you make. The curls worth doing are the ones you can still control at the bottom of the rep.",
    exercises: [
      {
        id: "dumbellCurl",
        name: "Dumbbell Curl",
        src: demo("bicep", "dumbellCurl.webp"),
        cue: "Elbows pinned to the ribs, control the lowering, no swinging.",
      },
      {
        id: "preacherCurl",
        name: "Preacher Curl",
        src: demo("bicep", "preacherCurl.webp"),
        cue: "The fixed upper arm takes momentum out of it, so the whole rep is biceps.",
      },
    ],
  },
  {
    id: "triceps",
    label: "Triceps",
    folder: "tricep",
    src: img("musclegroups/web/triceps.png"),
    blurb:
      "Two thirds of the arm's muscle sits in the triceps, which is why they decide how heavy your presses can get. Full extension is where the work happens.",
    exercises: [
      {
        id: "oneArmTricepExtension",
        name: "One-Arm Tricep Extension",
        src: demo("tricep", "oneArmTricepExtension.webp"),
        cue: "Elbow high and pointing forward, extend fully and squeeze at the top.",
      },
      {
        id: "ropeExtension",
        name: "Rope Extension",
        src: demo("tricep", "ropeExtension.webp"),
        cue: "Elbows pinned, then abduct the arms at the bottom and squeeze the rope apart.",
      },
    ],
  },
  {
    id: "legs",
    label: "Legs",
    folder: "leg",
    src: img("musclegroups/web/legs.png"),
    blurb:
      "Squat, hinge, lunge. The legs carry the heaviest loads on the programme and drive the most whole-body progress across a 30-day block.",
    exercises: [
      {
        id: "barbellSquat",
        name: "Barbell Squat",
        src: demo("leg", "barbellSquat.webp"),
        cue: "Brace hard, sit between the hips, drive the floor away.",
      },
      {
        id: "legPress",
        name: "Leg Press",
        src: demo("leg", "legPress.webp"),
        cue: "Feet mid-platform, knees tracking over the toes without collapsing in.",
      },
    ],
  },
  {
    id: "core",
    label: "Core",
    folder: "abs",
    src: img("musclegroups/web/core.png"),
    blurb:
      "The core braces every loaded movement before it bends anything. Strong abs are less about crunches and more about resisting movement - and about holding the trunk steady once it is loaded.",
    exercises: [
      {
        id: "hangingStraightLegRaise",
        name: "Hanging Straight-Leg Raise",
        src: demo("abs", "hangingStraightLegRaise.webp"),
        cue: "Hang from the bar and lift to hip height without swinging.",
      },
      {
        id: "weightedCrunches",
        name: "Weighted Crunches",
        src: demo("abs", "weightedCrunches.webp"),
        cue: "Load the chest and curl the ribs toward the pelvis, not just the shoulders.",
      },
    ],
  },
];


// Seven tiles, one panel. Picking a muscle swaps the panel to the two
// movements that train it, and only that group's clips are ever in the
// document - all fourteen are 8.6MB between them.
const MuscleExplorer = ({ className = "" }) => {
  const [activeId, setActiveId] = useState(GROUPS[0].id);
  const tabRefs = useRef([]);
  const active = GROUPS.find((group) => group.id === activeId);

  // The seven tiles cascade in as the section arrives. The variants are
  // imported from Reveal so the whole site shares one easing curve, and the
  // reduced-motion check is repeated here because these are raw motion
  // elements rather than a Reveal, so it does not run on our behalf.
  const reduceMotion = useReducedMotion();
  const tileVariants = reduceMotion ? fadeOnly : fadeUp;

  // Roving arrow-key support. A tablist that only answers to a mouse is not
  // really a tablist, so Left/Right wrap around and Home/End jump to the ends.
  const handleKeyDown = (event, index) => {
    let next = null;
    if (event.key === "ArrowRight") next = (index + 1) % GROUPS.length;
    else if (event.key === "ArrowLeft")
      next = (index - 1 + GROUPS.length) % GROUPS.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = GROUPS.length - 1;

    if (next === null) return;
    event.preventDefault();
    setActiveId(GROUPS[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <section className={className} aria-labelledby="muscle-explorer-title">
      <div className="max-w-2xl">
        <span className="text-[11px] font-black uppercase tracking-[0.25em] text-accent">
          Free core program
        </span>
        <h3
          id="muscle-explorer-title"
          className="mt-3 font-bebas text-3xl tracking-wider text-ink-primary sm:text-4xl"
        >
          Every muscle has a plan
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
          The core program works all seven across the month. Pick a muscle group
          to see the two movements that train it, and how to run them.
        </p>
      </div>

      {/* 4-up on a phone so the figures stay legible, then a single row of
          seven from md, which is the shape the section is really about. */}
      <motion.div
        role="tablist"
        aria-label="Muscle groups"
        variants={stagger}
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, amount: 0.3 }}
        className="mt-8 grid grid-cols-4 gap-2.5 sm:gap-3 md:grid-cols-7"
      >
        {GROUPS.map((group, index) => {
          const selected = group.id === activeId;

          return (
            <motion.button
              key={group.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={`muscle-tab-${group.id}`}
              aria-selected={selected}
              aria-controls="muscle-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveId(group.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              // motion.button rather than a RevealItem on purpose: the tablist
              // -> tab relationship is only valid if the tab is a direct child,
              // and RevealItem would interpose a <div>.
              variants={tileVariants}
              className={`group flex flex-col items-center gap-2 rounded-2xl border p-2.5 transition ${
                selected
                  ? "border-accent/60 bg-accent-wash shadow-gold"
                  : "border-white/10 bg-app-raised hover:border-accent/40"
              }`}
            >
              {/* The label below is the accessible name, so the figure itself
                  is decorative and stays out of the tree. */}
              <img
                src={group.src}
                alt=""
                width={640}
                height={640}
                loading="lazy"
                decoding="async"
                className={`h-14 w-14 transition duration-300 sm:h-16 sm:w-16 ${
                  selected
                    ? "scale-105"
                    : "opacity-75 group-hover:opacity-100"
                }`}
              />
              <span
                className={`text-center text-[10px] font-black uppercase leading-tight tracking-[0.1em] transition sm:text-[11px] ${
                  selected
                    ? "text-accent"
                    : "text-ink-tertiary group-hover:text-ink-primary"
                }`}
              >
                {group.label}
              </span>
            </motion.button>
          );
        })}
      </motion.div>


      {/* Keyed on the group so the swap animates rather than snapping. */}
      <motion.div
        key={activeId}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        role="tabpanel"
        id="muscle-panel"
        aria-labelledby={`muscle-tab-${activeId}`}
        tabIndex={0}
        className="mt-6 rounded-3xl border border-white/10 bg-app-raised p-5 focus-visible:outline-none sm:p-7"
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-9">
          <div className="lg:w-[38%]">
            <span className="text-[11px] font-black uppercase tracking-[0.25em] text-accent">
              {active.label}
            </span>
            <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
              {active.blurb}
            </p>
          </div>

          {/* Every group has exactly two movements, so this is a fixed pair
              rather than a wrapping list. */}
          <div className="grid flex-1 gap-3.5 sm:grid-cols-2">
            {active.exercises.map((exercise) => (
              <figure
                key={exercise.id}
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-app-surface p-3"
              >
                {/* The WebPs are 208px square, so ~112px is about 1:1 on a
                    retina screen - any larger and the animation softens. */}
                <img
                  src={exercise.src}
                  alt={`Animated demonstration of the ${exercise.name}.`}
                  width={208}
                  height={208}
                  loading="lazy"
                  decoding="async"
                  className="h-28 w-28 shrink-0 rounded-xl object-cover"
                />
                <figcaption className="min-w-0">
                  <div className="text-sm font-bold text-ink-primary">
                    {exercise.name}
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-ink-tertiary">
                    {exercise.cue}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <p className="mt-6 border-t border-white/10 pt-4 text-[11px] leading-relaxed text-ink-tertiary">
          These are the same animations used inside the app, read straight from
          the program's demonstration library - two per muscle group, so you can
          check your form before you start a set.
        </p>
      </motion.div>
    </section>
  );
};

export default MuscleExplorer;

