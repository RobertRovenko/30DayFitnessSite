import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Crown, ShieldCheck } from "lucide-react";

import Carousel from "./Carousel";
import HeroShowcase from "./HeroShowcase";
import ProjectCard from "./ProjectCard";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";

const PLAY_URL =
  "https://play.google.com/store/apps/details?id=com.rovenkodev.FitnessGuru";
const DEV_URL = "https://www.robertrovenko.com/";

// Mirrors the in-app paywall (components/PaywallOverlay.js -> PLACEHOLDER).
// purchasesStore.js still points at RevenueCat Test Store product ids, so these
// are advertised as "from" prices and Google Play always shows the real one.
// Array order is the display order: Monthly first, then the Yearly plan, which
// still carries the gold frame, glow and savings ribbon as the recommended one.
const PRO_PLANS = [
  {
    key: "monthly",
    name: "Monthly",
    price: "$7.99",
    unit: "/month",
    caption: "billed monthly",
    badge: null,
    primary: false,
  },
  {
    key: "annual",
    name: "Yearly",
    price: "$47.99",
    unit: "/year",
    caption: "billed yearly",
    badge: "SAVE 50%",
    primary: true,
  },
];

// Free vs Pro. Kept in sync with the app's entitlement gates: the core program,
// progress tracking, demos and reminders are free, and Pro unlocks the rest.
// Custom-plan limits come from workoutPrograms.js (FREE=1, PRO=3).
const PRO_COMPARISON = [
  { label: "Workout programs", free: "Core program", pro: "All 11 unlocked" },
  { label: "Custom training plans", free: "1 plan", pro: "3 plans" },
  { label: "Progress, streaks & trophies", free: true, pro: true },
  { label: "Exercise demos & technique tips", free: true, pro: true },
  { label: "Reminders", free: true, pro: true },
  { label: "No ads", free: true, pro: true },
];

const PRO_INCLUDES = [
  "Every program and every difficulty level",
  "Up to 3 custom training plans you build yourself",
  "Full progress tracking, streaks and statistics",
  "Exercise demos, technique tips and guides",
  "Cancel or change your plan any time in Google Play",
];

// A tick for the boolean rows, the raw value otherwise - the same check/label
// treatment the in-app paywall uses for its plan rows.
const ComparisonValue = ({ value, pro }) => {
  if (value === true) {
    return (
      <span
        className={`inline-flex h-6 w-6 items-center justify-center rounded-full ${
          pro ? "bg-accent/15 text-accent" : "bg-white/5 text-ink-secondary"
        }`}
      >
        <Check size={14} />
      </span>
    );
  }
  return (
    <span className={pro ? "font-black text-accent" : "text-ink-secondary"}>
      {value}
    </span>
  );
};

const SectionHeading = ({ eyebrow, title, copy }) => (
  <div className="mx-auto max-w-2xl text-center">
    {eyebrow ? (
      <span className="text-[11px] font-black uppercase tracking-[0.25em] text-accent">
        {eyebrow}
      </span>
    ) : null}
    <h2 className="mt-3 font-bebas text-4xl tracking-wider text-ink-primary sm:text-5xl">
      {title}
    </h2>
    {copy ? <p className="mt-4 text-ink-secondary">{copy}</p> : null}
  </div>
);

function DayFitness() {
  return (
    <div className="flex min-h-screen flex-col bg-app-bg font-inter text-ink-primary">
      {/* Header */}
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 z-30 flex w-full items-center justify-between border-b border-white/10 bg-app-bg px-5 py-4 sm:px-8"
      >
        <Link to="/" className="flex items-center gap-3">
          <span className="font-oswald text-xl font-semibold tracking-wide sm:text-2xl">
            30 DAY FITNESS
          </span>
        </Link>

        <div className="flex items-center gap-4 sm:gap-6">
          <a
            href="#pro"
            className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-app-bg transition hover:brightness-110"
          >
            <Crown size={11} />
            <span className="hidden sm:inline">30 Day Fitness </span>Pro
          </a>
          <a
            href={DEV_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-semibold uppercase tracking-[0.25em] text-ink-tertiary transition hover:text-ink-primary"
          >
            <span className="text-accent">rovenko</span>dev
          </a>
        </div>
      </motion.header>

      <main className="flex-grow">
        {/* Hero. The five alpha clips are the full-bleed background of the whole
            section rather than a panel beside the copy, so the headline sits
            over them behind a scrim that keeps its contrast. */}
        <section className="relative isolate overflow-hidden">
          {/* -z-20 keeps the clips at the floor of the section's stacking context,
              the scrim above them at -z-10, and the copy above that. On wide
              screens the device is also slid right so it sits beside the copy
              instead of behind the headline; the alpha clips leave their own
              margins transparent, so the shift opens no visible gap. That starts
              at lg, not md: between 768 and 1024 the copy still spans most of the
              column and would collide with the device. */}
          <HeroShowcase className="-z-20 lg:translate-x-[22%]" />

          {/* Scrim over the clips, between them and the copy. Three tiers, because
              how bright the device reads depends on how much of the frame the
              copy covers. On phones the device is cropped tight and can stay
              fairly visible. In the md range the hero is nearly square, so the
              device fills the frame behind the copy and has to be held right
              down. From lg up the copy is beside the device, so the scrim can
              hold near-opaque across the text column and then fall away,
              leaving the device crisp where nothing else competes. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-app-bg/95 via-app-bg/75 to-app-bg/60 md:from-app-bg md:via-app-bg/90 md:to-app-bg/85 lg:bg-gradient-to-r lg:from-app-bg lg:via-app-bg/80 lg:to-app-bg/20"
          />

          {/* A second fade, bottom edge only, so the device dissolves into the
              next section rather than being cut off square by the hero's end.
              Side-by-side only: where the copy runs to the bottom of the section
              the fade would swallow the device for no benefit. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 hidden h-40 bg-gradient-to-t from-app-bg to-transparent lg:block"
          />

          <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-20 sm:px-8 md:pb-32 md:pt-32">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl text-center md:text-left"
            >
              <div>
                <span className="text-[11px] font-black uppercase tracking-[0.25em] text-accent">
                  Gym-focused 30-day plans
                </span>

                <h1 className="mt-4 font-bebas text-6xl leading-[0.9] tracking-wider sm:text-7xl md:text-8xl">
                  <span className="block text-ink-primary">30 DAY</span>
                  <span className="block text-accent">FITNESS</span>
                </h1>

                <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-secondary">
                  Your ultimate gym companion. Structured workout programs,
                  exercise demonstrations and progress tracking that carry you
                  from day one to day thirty.
                </p>

                <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                  <a
                    href={PLAY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 text-sm font-black uppercase tracking-wider text-app-bg shadow-gold transition hover:brightness-110"
                  >
                    Get it on Google Play
                    <ArrowRight size={16} />
                  </a>
                  <a
                    href="#pro"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-app-surface px-8 py-4 text-sm font-bold uppercase tracking-wider text-ink-primary transition hover:border-accent/40 hover:text-accent"
                  >
                    <Crown size={15} />
                    See what&rsquo;s in Pro
                  </a>
                </div>

                <dl className="mt-10 flex items-center justify-center gap-8 md:justify-start">
                  {[
                    ["11", "programs"],
                    ["30", "days"],
                    ["0", "accounts"],
                  ].map(([stat, label]) => (
                    <div key={label}>
                      <dt className="font-bebas text-3xl text-accent">
                        {stat}
                      </dt>
                      <dd className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink-tertiary">
                        {label}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 30 Day Fitness Pro - mirrors the in-app paywall (PaywallOverlay.js):
            the same two plans, the same savings ribbon and the same free/Pro
            split the app gates content behind. */}
        <section id="pro" className="relative scroll-mt-24 px-5 sm:px-8">
          <div className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-app-surface p-6 sm:p-10 md:p-14">
            <Reveal>
              <SectionHeading
                eyebrow="In-app subscription"
                title="Unlock 30 Day Fitness"
                copy="Every program, every day. Cancel anytime."
              />
            </Reveal>

            {/* Plan cards. The yearly plan carries the gold frame + glow and the
                savings ribbon, exactly like the app's primary plan card. The two
                cards stagger in as the row scrolls into view. */}
            <RevealGroup className="mx-auto mt-12 grid max-w-3xl gap-5 md:grid-cols-2">
              {PRO_PLANS.map((plan) => (
                <RevealItem key={plan.key} className="relative">
                  {plan.badge ? (
                    <span className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full border-2 border-app-surface bg-accent px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-app-bg">
                      {plan.badge}
                    </span>
                  ) : null}

                  <a
                    href={PLAY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${plan.name} plan, ${plan.price} ${plan.unit} ${plan.caption}`}
                    className={`flex min-h-[140px] flex-col justify-center rounded-2xl border px-6 py-7 transition hover:brightness-110 ${
                      plan.primary
                        ? "border-accent bg-app-raised shadow-gold"
                        : "border-white/10 bg-app-bg hover:border-accent/40"
                    }`}
                  >
                    <span className="text-[11px] font-black uppercase tracking-[0.2em] text-ink-tertiary">
                      {plan.name}
                    </span>
                    <span className="mt-2 flex items-baseline gap-1">
                      <span className="font-bebas text-5xl leading-none text-ink-primary">
                        {plan.price}
                      </span>
                      <span className="text-sm font-bold text-ink-secondary">
                        {plan.unit}
                      </span>
                    </span>
                    <span className="mt-2 text-xs font-semibold text-ink-tertiary">
                      {plan.caption}
                    </span>
                  </a>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal
              as="p"
              className="mt-6 text-center text-xs text-ink-tertiary"
            >
              Starting prices shown - Google Play displays the final price at
              checkout.
            </Reveal>

            {/* Free vs Pro. The header and every row rise in one after the
                other as the table scrolls into view. */}
            <RevealGroup className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-app-bg">
              <RevealItem className="grid grid-cols-[1fr_5rem_6rem] items-center gap-2 border-b border-white/10 bg-app-raised px-5 py-3.5 sm:grid-cols-[1fr_7rem_8rem] sm:px-6">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-ink-tertiary">
                  What&rsquo;s included
                </span>
                <span className="text-center text-[10px] font-black uppercase tracking-[0.2em] text-ink-tertiary">
                  Free
                </span>
                <span className="text-center text-[10px] font-black uppercase tracking-[0.2em] text-accent">
                  Pro
                </span>
              </RevealItem>

              {PRO_COMPARISON.map((row) => (
                <RevealItem
                  key={row.label}
                  className="grid grid-cols-[1fr_5rem_6rem] items-center gap-2 border-b border-white/5 px-5 py-4 last:border-b-0 sm:grid-cols-[1fr_7rem_8rem] sm:px-6"
                >
                  <span className="text-sm text-ink-secondary">
                    {row.label}
                  </span>
                  <span className="flex justify-center">
                    <ComparisonValue value={row.free} />
                  </span>
                  <span className="flex justify-center">
                    <ComparisonValue value={row.pro} pro />
                  </span>
                </RevealItem>
              ))}
            </RevealGroup>

            <RevealGroup
              as="ul"
              className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-2"
            >
              {PRO_INCLUDES.map((item) => (
                <RevealItem
                  as="li"
                  key={item}
                  className="flex items-start gap-3 text-sm text-ink-secondary"
                >
                  <Check size={16} className="mt-0.5 shrink-0 text-accent" />
                  {item}
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal
              as="p"
              className="mx-auto mt-8 flex max-w-3xl items-start justify-center gap-2 text-center text-xs leading-relaxed text-ink-tertiary"
            >
              <ShieldCheck size={15} className="mt-0.5 shrink-0 text-accent" />
              <span>
                Cancel anytime in the App Store or Google Play. Subscriptions
                renew automatically until cancelled, and can be restored any
                time with &ldquo;Restore Purchases&rdquo; in the app.
              </span>
            </Reveal>
          </div>
        </section>

        {/* Download & Carousel */}
        <Reveal
          as="section"
          className="mx-auto mt-24 grid w-full max-w-6xl items-center gap-12 px-5 sm:px-8 md:grid-cols-2 md:gap-16"
        >
          <div>
            <SectionHeading
              eyebrow="Google Play"
              title="Download the App Now"
              copy="Start your transformation today with 30 Day Fitness. Available now on Google Play!"
            />

            <div className="mt-8 flex justify-center">
              <a
                href={PLAY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-sm font-black uppercase tracking-wider text-app-bg shadow-gold transition hover:brightness-110"
              >
                Get it on Google Play
                <ArrowRight size={16} />
              </a>
            </div>

            <p className="mt-6 flex items-center justify-center gap-2 text-xs text-ink-tertiary">
              <ShieldCheck size={14} className="shrink-0 text-accent" />
              Free to download - no account required.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-app-surface p-5 sm:p-8">
            <Carousel />
          </div>
        </Reveal>

        {/* Project Card */}
        <Reveal>
          <ProjectCard />
        </Reveal>

        {/* Google Play Banner */}
        <Reveal
          as="section"
          className="mx-auto mt-20 w-full max-w-6xl px-5 pb-20 sm:px-8"
        >
          {/* Desktop */}
          <img
            src={`${process.env.PUBLIC_URL}/googleplaybanner.png`}
            alt="30 Day Fitness on Google Play"
            className="hidden w-full rounded-2xl border border-white/10 md:block"
          />
          {/* Mobile */}
          <img
            src={`${process.env.PUBLIC_URL}/googleplaybannermobile.png`}
            alt="30 Day Fitness on Google Play"
            className="block w-full rounded-2xl border border-white/10 md:hidden"
          />
        </Reveal>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-app-bg px-6 py-8 text-sm text-ink-tertiary">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
          <p>
            &copy; {new Date().getFullYear()} 30 Day Fitness. All rights
            reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <a
              href={PLAY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-accent"
            >
              Google Play
            </a>
            <a
              href={DEV_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-accent"
            >
              rovenkodev
            </a>
            <Link to="/privacy-policy" className="transition hover:text-accent">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default DayFitness;
