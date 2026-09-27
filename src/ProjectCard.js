import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

import MuscleExplorer from "./MuscleExplorer";

const ProjectCard = () => {
  const project = {
    title: "30 Day Fitness",
    backgroundColor: "",
    foregroundColor: "#EAEAEA", // TEXT_PRIMARY
    codeLink: "",
    siteLink:
      "https://play.google.com/store/apps/details?id=com.rovenkodev.FitnessGuru",
    codeText: "Code Private",
    siteText: "Get 30 Day Fitness Pro",
  };

  const adText = `30 Day Fitness is your ultimate gym companion! Take the first step towards transforming your body with our workout plan, expert tips, and a collection of detailed demonstration images that guide you on the right technique in the gym. Start on the free core program, then unlock every program, every difficulty and every custom plan with 30 Day Fitness Pro. Discover a variety of exercises and easily navigate through our user-friendly app. In just 30 days, you’ll feel more motivated, stronger, and experience a positive boost in your fitness journey!`;

  // The free/Pro split mirrors the app: the core program, progress tracking,
  // reminders and exercise demos are free, and Pro unlocks the rest. Kept in
  // sync with workoutPrograms.js (FREE_CUSTOM_PLAN_LIMIT / PRO_CUSTOM_PLAN_LIMIT)
  // and the in-app paywall.
  const features = [
    "Free: the core 30-day program, progress tracking and reminders",
    "30 Day Fitness Pro unlocks every program and difficulty",
    "Build up to 3 custom plans with Pro (free accounts get 1)",
    "Exercise demonstration images and additional tips",
    "Statistics, streaks and achievements to track your progress",
    "Customizable notification reminders",
    "Cancel your Pro subscription any time in Google Play",
    "No account, no sign-up and no personal data required",
  ];

  const disclaimer =
    "Please note: For the best experience, we do suggest that you have a gym available. The app is more bodybuilding-oriented. If you have any injuries or health concerns, please consult a doctor. 30 Day Fitness does not take responsibility for any injuries or misuse of the app; this is a workout plan. Purchases are billed through Google Play and Pro unlocks on your Google account — see our Privacy Policy for details.";


  return (
    <motion.div layout="position" className="relative">
      <motion.div
        key="expanded"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden px-4 sm:px-6 mt-16"
      >
        <div
          style={{
            backgroundColor: project.backgroundColor,
            color: project.foregroundColor,
          }}
          className="mx-auto w-full max-w-6xl rounded-3xl border border-white/10 bg-app-surface p-6 sm:p-8"
        >
          {/* The phone carousel used to occupy the first column of this grid.
              With it gone the copy has the whole card to itself, so the block
              is rebalanced into two columns rather than left as a single
              measure stretched across 1100px. */}
          <div className="grid gap-10 md:grid-cols-2 md:items-start md:gap-14">
            <div className="space-y-6">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-app-bg">
                  <Sparkles size={11} /> Free core program
                </span>
                <h3 className="mt-4 font-bebas text-4xl tracking-wider text-ink-primary sm:text-5xl">
                  {project.title}
                </h3>
              </div>
  
              <p className="text-base leading-relaxed text-ink-secondary">
                {adText}
              </p>
  
              <div className="flex flex-wrap items-center gap-3">
                {project.siteLink && (
                  <a
                    href={project.siteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-black uppercase tracking-wider text-app-bg shadow-gold transition hover:brightness-110"
                  >
                    {project.siteText}
                  </a>
                )}
              </div>
            </div>

            {/* The free/Pro split and the safety note, in the second column. */}
            <div className="space-y-6">
              <span className="block text-[11px] font-black uppercase tracking-[0.25em] text-accent">
                Info
              </span>

              <ul className="space-y-3">
                {features.map((feat, idx) => (
                  <li
                    key={idx}
                    className="flex gap-3 text-sm leading-relaxed text-ink-secondary"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
  
              <p className="rounded-2xl border border-white/10 bg-app-raised p-4 text-xs leading-relaxed text-ink-tertiary">
                {disclaimer}
              </p>
            </div>
          </div>

          <MuscleExplorer className="mt-12 border-t border-white/10 pt-12" />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;
