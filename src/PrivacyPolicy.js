import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Crown, Mail } from "lucide-react";

import { Reveal } from "./Reveal";
import ScrollProgress from "./ScrollProgress";
import ScreenGallery from "./ScreenGallery";

const PLAY_URL =
  "https://play.google.com/store/apps/details?id=com.rovenkodev.FitnessGuru";
const DEV_PLAY_URL = "https://play.google.com/store/apps/dev?id=6638725637924776409";

const LAST_UPDATED = "25 September 2026";

// TODO(owner): point this at a monitored inbox before publishing. The in-app
// paywall links straight to this page, so it has to stay reachable.
const CONTACT_EMAIL = "rovenkodevsupport@gmail.com";

// The policy is data rather than markup so the copy stays readable and the
// table of contents can never drift out of sync with the sections below.
const POLICY = [
  {
    id: "overview",
    title: "Overview",
    paragraphs: [
      "30 Day Fitness (“the App”) is a fitness and workout-planning app developed by RovenkoDev and distributed through Google Play. This Privacy Policy explains what information the App handles, what is kept on your device, and how the optional “30 Day Fitness Pro” subscription is billed and validated.",
      "The short version: your workout data never leaves your phone. The only data that involves us at all is the anonymous purchase status that Google Play and RevenueCat use to confirm you have an active Pro subscription.",
    ],
  },
  {
    id: "no-collection",
    title: "What we do not collect",
    paragraphs: [
      "30 Day Fitness has no account system. You never sign up, and we never ask you for your name, email address, phone number, date of birth or any other personally identifiable information. Specifically, we do not:",
    ],
    list: [
      "Collect, request or store your name, email address, phone number or any other direct identifier.",
      "Collect your contacts, messages, call logs, location or photo library.",
      "Use advertising networks, third-party trackers or cross-app advertising identifiers.",
      "Build advertising or behavioural profiles, or sell, rent or trade your information to anyone.",
      "Track where you exercise, who you train with, or any detail about your health beyond what you choose to log on your own device.",
    ],
  },
  {
    id: "on-device-data",
    title: "Workout data stored on your device",
    paragraphs: [
      "The App records your training activity locally, in the private app storage that Android sandboxes for 30 Day Fitness. This includes the days you have completed, your current program and week, streaks and statistics, your custom training plans, favourites and trophies, your unit and weight preferences, and your reminder settings.",
      "This information stays on your device. It is not transmitted to us, and because we never receive it, we cannot view it, export it, or use it for any purpose. Uninstalling the App deletes this data permanently — there is no cloud backup for us to restore from.",
    ],
  },
  {
    id: "purchases",
    title: "In-app purchases and 30 Day Fitness Pro",
    paragraphs: [
      "The App offers an optional auto-renewing subscription, “30 Day Fitness Pro”, which unlocks additional workout programs and features. Pro is described in full inside the App before you buy, and its exact price, billing period and any applicable taxes are shown to you by Google Play at the checkout step before you confirm.",
      "All payments are processed by Google Play, the store from which you downloaded the App. Google collects and processes your payment details, such as your card or other payment method, your billing country and the purchase receipt, under its own privacy policy. Your full payment credentials are never transmitted to, stored by, or seen by RovenkoDev, and we have no access to them.",
      "To confirm that a purchase succeeded, and to keep Pro unlocked on this device and on any other device signed in to the same Google account, the App uses RevenueCat, a third-party subscription entitlement service. RevenueCat receives an anonymous, randomly generated app-instance identifier together with your purchase and subscription status. That information is used solely to verify your entitlement and to process refunds or subscription changes. It is not linked to your name, your email address or any other directly identifying information, and it is not used for advertising.",
      "If you do not purchase Pro, the App works as described and no purchase information is generated at all.",
    ],
  },
  {
    id: "pro-unlocks",
    title: "What Pro unlocks",
    paragraphs: [
      "Pro is an access pass to the content the free version holds back. It unlocks:",
    ],
    list: [
      "Every workout program and every difficulty level that is otherwise locked.",
      "Up to 3 custom training plans you build yourself — free accounts can create 1.",
      "The full set of progress statistics, streaks, trophies and achievements.",
      "All exercise demonstrations, technique tips and training guides.",
      "Progress tracking, reminders and every other free feature, with no ads.",
    ],
    paragraphsAfter:
      "Your Pro status is tied to your Google account rather than to the phone, so it follows you to a new device. If you reinstall the App, change device, or find Pro missing, use “Restore Purchases” inside the App to re-apply your entitlement.",
  },
  {
    id: "subscription",
    title: "Subscriptions, cancellation and refunds",
    paragraphs: [
      "Pro is an auto-renewing subscription. It continues from period to period until you cancel it, and renews automatically at the price shown at checkout. Your subscription stays active even if you stop using the App, and it stays active if you uninstall — cancelling is a separate step you must take.",
      "Because the purchase is handled by Google Play, you cancel, pause, request a refund or raise a billing dispute through Google Play itself: open the Play Store, tap your profile picture, then Payments & subscriptions → Subscriptions, and manage “30 Day Fitness Pro” from there. Refund eligibility, timing and any applicable fees are determined by Google Play, and we do not see or handle your payment details. Where you have a statutory right to cancel or to obtain a refund, that right is unaffected by this policy.",
    ],
  },
  {
    id: "permissions",
    title: "Permissions and network use",
    paragraphs: [
      "The App stores your workout data in its own private app storage, which Android sandboxes so that no other app can read it. It uses a network connection only to reach Google Play when you buy or restore a subscription, and to verify whether your Pro entitlement is currently active — your workout data is never uploaded.",
      "Reminders use standard Android notifications, which are delivered only to you. The App does not use notifications to send marketing messages, and it does not read the contents of your other notifications. Any additional entries that appear in Android's permission list for this App are technical defaults required by the Android runtime and the underlying development framework; the App does not use them to collect or transmit personal information.",
    ],
  },
  {
    id: "third-parties",
    title: "Third-party services",
    paragraphs: [
      "We work with two third parties, and only in the ways described above:",
    ],
    list: [
      "Google Play — processes and stores your payment details, and manages your subscription, refunds and billing relationship under its own privacy policy.",
      "RevenueCat — verifies your Pro entitlement on our behalf, holding only an anonymous app-instance identifier and your purchase status.",
    ],
    paragraphsAfter:
      "We do not embed advertising networks, social media SDKs, analytics or crash-reporting services that would collect personal information.",
  },
  {
    id: "retention",
    title: "Retention and deletion",
    paragraphs: [
      "Your on-device workout data is retained on your phone until you delete it, and is erased when you uninstall the App. We hold no copy of it, so there is nothing for us to delete on request.",
      "Google Play retains purchase records for your account under its own policy, and RevenueCat retains the anonymous app-instance identifier and your subscription status for as long as is needed to verify your entitlement and to handle refunds or subscription changes. Once you stop subscribing, Pro access ends at the close of the paid period and the entitlement is no longer treated as active.",
    ],
  },
  {
    id: "children",
    title: "Children’s privacy",
    paragraphs: [
      "30 Day Fitness is intended for adults. It is not directed at children under 13, nor at users below the minimum age of digital consent in your jurisdiction. We do not knowingly collect personal information from children. Purchases should be made by an adult using an account they control; if you believe a child has created an account or made a purchase, contact us and we will help resolve it.",
    ],
  },
  {
    id: "health",
    title: "Fitness and health disclaimer",
    paragraphs: [
      "The App provides general fitness information and workout plans. It is not medical advice, and it is not a substitute for a doctor, physiotherapist or qualified trainer. You are responsible for choosing exercises that suit your own health and fitness level, and for stopping if anything hurts. Talk to a medical professional before starting a new training programme — particularly if you are pregnant, recovering from an injury, or managing a health condition.",
      "To the fullest extent permitted by law, RovenkoDev is not liable for injury, illness or damage arising from your use of the App, or from following any workout plan in it. The full terms covering this, and how to use the App safely, are set out in the Terms of Service.",
    ],
  },
  {
    id: "changes",
    title: "Changes to this policy",
    paragraphs: [
      "We may update this Privacy Policy as the App, or Google Play’s requirements for apps that sell digital goods, change. The “Last updated” date at the top always reflects the current version. If a change materially affects how information is used, we will make that clear in the App or on this page. Continuing to use the App after a change means you accept the updated policy.",
    ],
  },
  {
    id: "contact",
    title: "Contact us",
    paragraphs: [
      "If you have a question about this policy, need help with a purchase, or want to raise a concern about your data, get in touch:",
    ],
  },
];

// One consistent section block for every entry in POLICY, so the copy in the
// array above maps straight to the page and the styling can only live here.
const PolicySection = ({ section, index }) => (
  <Reveal
    as="section"
    id={section.id}
    className="scroll-mt-28 border-t border-white/10 pt-8 first:border-t-0 first:pt-0"
  >
    <h2 className="flex items-baseline gap-3 font-bebas text-2xl tracking-wider text-ink-primary sm:text-3xl">
      <span className="text-base font-black text-accent tabular-nums">
        {String(index + 1).padStart(2, "0")}
      </span>
      {section.title}
    </h2>

    <div className="mt-4 space-y-4 text-sm leading-relaxed text-ink-secondary sm:text-base">
      {section.paragraphs?.map((text) => (
        <p key={text}>{text}</p>
      ))}

      {section.list ? (
        <ul className="space-y-3 pt-1">
          {section.list.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {section.paragraphsAfter ? <p>{section.paragraphsAfter}</p> : null}

      {section.id === "contact" ? (
        <div className="flex flex-col items-start gap-3 pt-2">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-black uppercase tracking-wider text-app-bg shadow-gold transition hover:brightness-110"
          >
            <Mail size={15} />
            {CONTACT_EMAIL}
          </a>
        </div>
      ) : null}
    </div>
  </Reveal>
);

function PrivacyPolicy() {
  return (
    <div className="flex min-h-screen flex-col bg-app-bg font-inter text-ink-primary">
      {/* Header */}
      {/* Plain element, not a motion one - App fades the page in on navigation,
          and a header that also slid in on mount read as a stutter. */}
      <header className="sticky top-0 z-30 flex w-full items-center justify-between border-b border-white/10 bg-app-bg px-5 py-5 sm:px-8">
        <Link to="/" className="flex items-center gap-3">
          <span className="font-oswald text-2xl font-semibold tracking-wide sm:text-3xl">
            30 DAY FITNESS
          </span>
        </Link>

        <div className="flex items-center gap-4 sm:gap-6">
          <a
            href={PLAY_URL}
            target="_blank"
            rel="noopener noreferrer"
            // Same treatment as the home page's navbar button, so the badge
            // looks identical wherever it appears.
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-accent/40 px-3 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-accent shadow-gold transition hover:border-accent hover:bg-accent/10 hover:shadow-gold-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 sm:px-4 sm:py-2"
          >
            <Crown
              size={14}
              className="shrink-0 transition-transform duration-300 group-hover:scale-110"
            />
            <span className="hidden sm:inline">30 Day Fitness </span>Pro
          </a>
          <a
            href={DEV_PLAY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.25em] text-ink-tertiary transition hover:text-ink-primary"
          >
            <span className="text-accent">rovenko</span>dev
          </a>
        </div>

        <ScrollProgress />
      </header>

      <main className="flex-grow">
        {/* Title. Flat background - the gold wash from the old hero is gone. */}
        <section>
          <div className="mx-auto max-w-3xl px-5 pb-12 pt-16 text-center sm:px-8 md:pt-20">
            {/* Lives here rather than in the header above: the header is a
                one-line bar, and the link reads better set apart from the
                wordmark. The flex wrapper keeps it hard left even though the
                title block below it is centred. */}
            <div className="mb-8 flex justify-start">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-ink-tertiary transition hover:text-ink-primary"
              >
                <ArrowLeft size={16} />
                Back to home
              </Link>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-[11px] font-black uppercase tracking-[0.25em] text-accent">
                Legal
              </span>
              <h1 className="mt-3 font-bebas text-5xl tracking-wider sm:text-6xl">
                PRIVACY POLICY
              </h1>
              <p className="mt-4 text-sm text-ink-tertiary">
                Last updated {LAST_UPDATED}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Table of contents + policy */}
        <div className="mx-auto max-w-3xl px-5 pb-20 sm:px-8">
          <motion.nav
            aria-label="Privacy policy sections"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="rounded-3xl border border-white/10 bg-app-surface p-6 sm:p-8"
          >
            <h2 className="text-[11px] font-black uppercase tracking-[0.25em] text-accent">
              In this policy
            </h2>
            <ol className="mt-4 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {POLICY.map((section, index) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="flex gap-2.5 text-sm text-ink-secondary transition hover:text-accent"
                  >
                    <span className="font-black tabular-nums text-accent/60">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{section.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-12 flex flex-col gap-8"
          >
            {POLICY.map((section, index) => (
              <PolicySection
                key={section.id}
                section={section}
                index={index}
              />
            ))}
          </motion.div>
        </div>

        <ScreenGallery />
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
            <Link to="/terms-of-service" className="transition hover:text-accent">
              Terms of Service
            </Link>
            <Link to="/" className="transition hover:text-accent">
              Back to home
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default PrivacyPolicy;
