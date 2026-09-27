import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AlertTriangle, ArrowLeft, Crown, Mail } from "lucide-react";

import { Reveal } from "./Reveal";
import ScreenGallery from "./ScreenGallery";
import ScrollProgress from "./ScrollProgress";

const PLAY_URL =
  "https://play.google.com/store/apps/details?id=com.rovenkodev.FitnessGuru";
const DEV_PLAY_URL = "https://play.google.com/store/apps/dev?id=6638725637924776409";

const LAST_UPDATED = "26 September 2026";

// Same monitored-inbox TODO as the privacy policy - keep the two in sync.
const CONTACT_EMAIL = "rovenkodevsupport@gmail.com";

// TODO(owner): this is the one part that cannot be written generically. Confirm
// the registered legal entity and your country of residence before publishing.
const GOVERNING_LAW =
  "the jurisdiction in which the RovenkoDev publisher is established";

// The terms are data rather than markup so the copy stays readable and the table
// of contents can never drift out of sync with the sections below.
//
// The health and safety sections are deliberately the most detailed part of the
// page, and deliberately worded as obligations on you rather than promises from
// us: the App is a general fitness tool on Google Play, not medical care, and the
// most likely way a user of an app like this gets hurt is by training through
// sharp pain, ignoring a warning sign, or loading weight on a broken movement.
//
// Liability wording is only ever effective up to what local consumer law allows -
// several jurisdictions will not let you exclude liability for gross negligence
// or for recklessness, and EU/UK consumer protections can override the rest. Have
// a lawyer review the whole page before it ships.
const TERMS = [
  {
    id: "acceptance",
    title: "Acceptance of these terms",
    paragraphs: [
      "These Terms of Service (“Terms”) are a legal agreement between you and RovenkoDev, the publisher of the 30 Day Fitness mobile application (“the App”). They apply to every person who downloads, installs, opens or uses the App, in any country, and they cover both the free version and the optional paid “30 Day Fitness Pro” subscription.",
      "By downloading, installing or using the App you confirm that you have read, understood and agree to these Terms, and accept them in full. If you do not agree with any part of them, do not install or use the App. If you use the App on behalf of someone else, you confirm that you are able to accept these Terms for them and that you have explained the health and safety terms below to them.",
      "These Terms apply in addition to, and not instead of, any separate agreement, and alongside our Privacy Policy. Google Play’s own Terms of Service also govern your use of the store and of payments, and nothing here replaces them.",
    ],
  },
  {
    id: "eligibility",
    title: "Eligibility and who may use the App",
    paragraphs: [
      "The App is intended for adults aged 18 or over. You must be legally able to enter into a binding contract where you live. By using the App you confirm that you are at or above the age of majority in your jurisdiction, or that you have the consent and supervision of a parent or legal guardian who has read these Terms with you.",
      "This matters for safety, not paperwork. The App is built for adult lifting, and several movements in it - heavy barbell work, loaded squats, presses and deadlifts - are not appropriate for a child’s skeleton, growth plates or training history. If you are under 18, do not follow a training program from the App on your own. Get a qualified coach instead.",
    ],
  },
  {
    id: "not-medical-advice",
    title: "The App is not medical advice or healthcare",
    paragraphs: [
      "The App provides general fitness information, exercise demonstrations and workout plans for a general adult audience. It is not medical advice, and it is not a diagnostic, therapeutic or rehabilitation tool. It is not a substitute for a doctor, physiotherapist, sports scientist, registered dietitian or qualified personal trainer, and using it creates no clinician-patient or trainer-client relationship of any kind.",
      "Nothing in the App - including its exercises, programs, rep and weight schemes, progress targets, streak reminders, and any text, image, video or estimate in it - has been designed, reviewed or approved by a licensed medical professional to diagnose, treat, cure or prevent any disease, injury or medical condition. The App is not a regulated medical device and makes no medical claim.",
      "We are not a healthcare provider. Nothing we publish in the App is a substitute for professional judgement about your own body, and you are the only person who can judge whether a movement is safe for you. Do not use the App to manage an injury, to return from one, to manage a chronic condition, or to rehabilitate a body part that is not working properly.",
    ],
  },
  {
    id: "get-professional-help",
    title: "Consult a qualified professional first",
    paragraphs: [
      "Speak to a doctor before beginning any new exercise program, and do so before you start if any of the following applies to you:",
    ],
    list: [
      "You are pregnant, may be pregnant, or are trying to become pregnant.",
      "You are recovering from an injury, surgery, fracture, sprain, hernia, concussion, or any other musculoskeletal problem.",
      "You have, or have had, a heart condition, high or uncontrolled blood pressure, high cholesterol, diabetes, a respiratory condition such as asthma, epilepsy, or a history of fainting, chest pain or a heart attack.",
      "You take any medication affecting your heart rate, blood pressure, balance, coordination, energy or reaction time - including beta blockers, stimulants, diuretics, ADHD medication and blood thinners.",
      "You manage a condition that exertion, heat, or being underloaded or undernourished would make worse.",
      "You are a member of the armed forces, police or emergency services, or work a job with a heavy physical load where a new program may itself be a safety risk.",
      "You have any doubt at all about whether exercising is right for you. If you are unsure, that alone is reason enough to ask first.",
    ],
    after: [
      "This is not a formality. A doctor can tell you which movements to avoid, whether you need to modify them, and whether your heart, joints and nutrition can support the training the App describes. If a professional tells you to stop, to rest, or to avoid an exercise, do that. Their instructions always take priority over anything in the App, over these Terms, and over any goal, streak or program the App is tracking.",
      "A video demonstration shows how a movement is generally performed. It cannot show you what your body is doing, and it cannot tell you whether you should be doing it at all. Only a professional who can assess you can answer that.",
    ],
  },
  {
    id: "safety-instructions",
    title: "How to train safely",
    paragraphs: [
      "A workout plan is not a set of instructions you must follow. Every set, rep and kilogram in the App is a general suggestion for a healthy adult, not an instruction to you personally. You are always free to do less, to stop, or to skip an exercise, and you should be. The App is a guide, not a rule, and the rule is always your own judgement and that of a professional who has assessed you.",
      "Stop training, and do not resume until a qualified professional has assessed you, if any of the following happens:",
    ],
    list: [
      "You feel pain during an exercise. Sharp or sudden pain, and pain in a joint, is a stop signal - not something to push through. Muscle effort and burning are different from pain that makes you flinch, and only the first is expected in training.",
      "Pain persists into the next day, or builds over days or weeks. Pain that does not settle is a common early sign of something that needs a professional opinion.",
      "You feel pain, weakness, numbness, tingling, dizziness, nausea, unusual breathlessness, a headache, or visual disturbance during or after training.",
      "You notice swelling, reduced range of movement, a painful click or grind, or loss of strength in a movement you previously had.",
      "You are ill, feverish, injured, or have not recovered from your last session when the next one is scheduled.",
    ],
    after: [
      "The App cannot warn you about a risk it does not know exists. It does not know your medical history, your current injury, your sleep, your stress or your nutrition. Only you do.",
    ],
  },
  {
    id: "overtraining",
    title: "Do not overtrain",
    paragraphs: [
      "Your body needs recovery more than it needs effort. Overtraining is real, it is easy to miss, and it can leave you injured, ill or stalled for months. The programs, streaks, reminders and progress targets in the App are tracking features, not training prescriptions, and they are not physiological advice. A streak is a number, and it is never a reason to train when you should rest.",
      "The programs are built around progressive resistance training with prescribed rest between sets, and that rest is part of the program rather than an optional extra. Skipping the rest period, adding load every session, or repeating a session because a target was missed are all ways to overtrain yourself while believing you are being disciplined.",
      "Stop, and give yourself time, if you notice:",
    ],
    list: [
      "Performance declining across several sessions while your effort stays high or rises.",
      "Persistent fatigue, broken sleep, or feeling run down and more prone to getting ill.",
      "Loss of appetite, weight loss, restlessness, irritability or low mood between sessions.",
      "Muscle soreness that outlasts the usual recovery window, or joints that feel progressively worse rather than better.",
      "A resting heart rate higher than usual, or becoming winded by work you managed last month.",
      "Motivation that disappears and does not return after a genuine break. Training through a total loss of motivation is a reliable route to a stress injury.",
    ],
    after: [
      "Rest days are part of training. If you are wondering whether you can train today and the honest answer is that you are tired, sore, ill or unmotivated, the answer is no. The App will keep counting your days without you, and it will be there when you come back.",
    ],
  },
  {
    id: "loading-and-equipment",
    title: "Do not lift more than you can control",
    paragraphs: [
      "Load only what you can lift with sound form. Adding weight, reps or sets until your technique breaks down is not progress, and the plans in the App are not permission to do so. If your form degrades, the set is over regardless of what the App says the target is. Do not follow the program’s numbers when your body tells you something different.",
      "The following apply to any session:",
    ],
    list: [
      "Warm up before you lift, and do not skip the warm-up on the days you least feel like doing it.",
      "Use a spotter or safety equipment for heavy barbell movements, and learn to bail safely before you need to.",
      "Do not attempt a lift you have not practised with a lighter weight first.",
      "Stop the set if you lose control of the bar, cannot complete the range of movement, or feel the load pulling on a structure - your back, shoulder, neck, elbow or knee - rather than working the target muscle.",
      "Never train through sharp pain, and never use pain or a personal record as a reason to continue.",
      "Do not use the App while intoxicated, too exhausted to coordinate, or in an environment that is unsafe for lifting.",
    ],
  },
  {
    id: "assumption-of-risk",
    title: "You train at your own risk",
    paragraphs: [
      "Resistance training carries inherent risks. Muscle soreness, strain, sprain, tendinopathy, joint irritation, disc injury, stress fracture, tendon rupture, cardiac events, heat illness and, in rare cases, paralysis or death are all possible outcomes of lifting weights. The risk is present even when you are fit, experienced, warmed up, using good technique, and following every instruction you were given. The risk is present in any gym and is not created or increased by the App, but you accept that you expose yourself to it when you choose to train.",
      "You accept these risks voluntarily and knowingly. You accept them whether or not you have read the safety sections above, whether or not you have consulted a professional, and whether or not you have used the App at all.",
      "It is your responsibility to assess whether a movement, a load or a program is appropriate for your body, your history and your current condition, and to decide whether to take part in it. If you are not sure whether an activity is safe for you, do not do it, and seek professional advice first.",
    ],
  },
  {
    id: "no-liability",
    title: "We are not liable for injury or damage",
    paragraphs: [
      "You use the App, and any exercise or program in it, entirely at your own risk and on your own judgment. To the fullest extent permitted by applicable law, RovenkoDev and anyone involved in producing the App are not liable for any injury, illness, pain, condition, loss, damage, cost or expense of any kind arising out of or connected with your use of the App, your performance or non-performance of any exercise, your reliance on any content in the App, or any equipment you use in connection with it - regardless of whether the cause was an exercise performed as shown, performed differently, performed incorrectly, modified, skipped, or performed while injured, ill, exhausted or medically unsuitable.",
      "We are also not liable for indirect or consequential loss, including lost profits, lost opportunity, loss of data, or loss of health, fitness, training progress or competition outcome, even where we were told such loss was possible.",
      "Nothing in these Terms excludes or limits liability that cannot lawfully be excluded or limited, including liability for death or personal injury caused by our negligence, for fraud or fraudulent misrepresentation, or for any other liability that applicable law does not permit us to exclude. Some jurisdictions - including much of the EU and the UK, and several US states - give consumers protections that these Terms cannot take away, and where such a right applies it prevails over anything written here.",
      "If any of these limitations is not permitted where you live, that part does not apply to you, and only the remaining parts do.",
    ],
  },
  {
    id: "indemnity",
    title: "You agree to indemnify us",
    paragraphs: [
      "To the fullest extent permitted by applicable law, you agree to indemnify, defend and hold harmless RovenkoDev and its publisher, developers and affiliates from and against any and all claims, demands, losses, liabilities, damages, costs and expenses, including reasonable legal fees, arising out of or connected with your use of the App, your breach of these Terms, your violation of any law or the rights of a third party, or your performance of any exercise in connection with the App.",
    ],
  },
  {
    id: "no-results",
    title: "No promise of results",
    paragraphs: [
      "The App is a tool. It is not a guarantee that you will build muscle, lose weight, meet any target, finish any program, or achieve any particular result, and it is not a promise of any specific outcome. Weight-loss claims in particular are subject to your overall diet, activity, genetics, hormones, sleep, health and consistency, most of which the App does not know and cannot control.",
      "The App’s progress, streak, trophy and reminder features are there to help you stay organised. They are not predictions, not medical or physiological advice, and completing them does not mean you are training well or safely. Only a qualified professional can advise on what your results should be for you.",
    ],
  },
  {
    id: "purchases",
    title: "Subscriptions, payments and refunds",
    paragraphs: [
      "The App offers an optional auto-renewing subscription, “30 Day Fitness Pro”, which unlocks additional programs and features. Pro is described in full inside the App before you buy, and its exact price, billing period and any applicable taxes are shown by Google Play at the checkout step before you confirm. Prices may change, and any change applies from your next renewal.",
      "All payments are processed by Google Play, the store you downloaded the App from. Google collects and processes your payment details under its own terms and privacy policy. Your full payment credentials are never transmitted to, stored by, or seen by RovenkoDev, and we have no access to them. To confirm a purchase and keep Pro active on your devices, the App uses RevenueCat, a third-party entitlement service that receives an anonymous app-instance identifier and your purchase status. This is the only purchase-related data involved; see the Privacy Policy for detail.",
      "Subscriptions renew automatically at the end of each billing period unless you cancel at least 24 hours before the renewal date. Cancelling stops future renewals but does not refund the current period. You can manage or cancel your subscription in your Google Play account settings. Refunds, order queries and chargebacks are handled by Google Play under its policies, and any refund request should be raised through Google Play first so we can assist.",
      "As a consumer you may also have statutory rights that these Terms do not remove - including the right to a refund where digital content is faulty or materially misdescribed - and you can contact us about them using the details in the contact section.",
    ],
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    paragraphs: [
      "You may use the App for your own personal, non-commercial training. You must not, and must not permit anyone else to:",
    ],
    list: [
      "Use the App to design, sell or distribute commercial training programs, courses or coaching without our written permission.",
      "Copy, reproduce, republish, reverse engineer, decompile, disassemble, or create derivative works from the App or its content, or extract it for reuse elsewhere, except where that restriction is prohibited by law or expressly allowed by Google Play.",
      "Remove or obscure any copyright, trademark, attribution or other proprietary notice in the App or its content.",
      "Use automated tools, bots, scrapers or scripts to access the App, or interfere with, disrupt, overload, or attempt to gain unauthorised access to the App or its servers.",
      "Transmit malware, or use the App in a way that infringes anyone else’s rights or breaks the law.",
      "Misrepresent your training data, progress or results, including by altering locally stored data to falsify achievements.",
    ],
    after: [
      "We may suspend or terminate your access, and cancel any subscription without refund, if you breach these Terms or if we are required to do so by law or by Google Play.",
    ],
  },
  {
    id: "ip",
    title: "Intellectual property",
    paragraphs: [
      "The App, its name, its design, its graphics, animations, exercise demonstrations, videos, text, workout programs, training plans, interface, code and underlying software are owned by RovenkoDev or its licensors and are protected by copyright, trademark and other intellectual property laws. The name “30 Day Fitness” and related branding are our marks and may not be used without permission.",
      "These Terms grant you a personal, limited, non-exclusive, non-transferable, revocable licence to use the App on a device you control, for your own use, for as long as you comply with these Terms. We grant no other rights. Any feedback you send us about the App may be used by us freely and without restriction or obligation to you.",
    ],
  },
  {
    id: "third-parties",
    title: "Third-party services and content",
    paragraphs: [
      "The App relies on third-party services to function, including Google Play for distribution and payment, and RevenueCat for subscription entitlement. Those services are provided under their own terms and privacy policies, which govern them, and we are not responsible for their availability, changes or conduct.",
      "Exercise demonstrations and any other external content shown in or alongside the App are provided as general information about how a movement is performed. They are not endorsements, are not tailored to you, and do not replace an assessment by a qualified professional. A demonstration is a generic illustration, not evidence that the movement is right for you.",
    ],
  },
  {
    id: "warranties",
    title: "Disclaimer of warranties",
    paragraphs: [
      "Except where applicable law says otherwise, the App is provided “as is” and “as available”, without warranties of any kind, whether express or implied, including any implied warranty of merchantability, fitness for a particular purpose, non-infringement, accuracy, or quality. We do not warrant that the App will be uninterrupted, error-free or secure, or that any content in it is complete, current, accurate, or free of defects, and we do not warrant that any outcome will be achieved by using it.",
      "Fitness content is inherently general. We do not warrant that the App is appropriate for you, that following it is safe for you, or that it will suit your health, fitness, experience, age or goals, and we do not warrant that it meets any health, medical or nutritional standard.",
    ],
  },
  {
    id: "availability",
    title: "Availability, changes and suspension",
    paragraphs: [
      "We may change, update, suspend or discontinue any part of the App at any time, and we may modify programs, exercises, targets and content. We do not guarantee that the App, or any feature of it, will always be available, that it will be uninterrupted or error-free, or that we will maintain support for a particular version of Android. Because the App is distributed through Google Play, its availability on your device also depends on your device, your region, and Google Play’s own policies.",
      "We may also stop the service on reasonable notice, in which case any prepaid but unexpired period will be handled in line with the refund terms above and applicable law.",
    ],
  },
  {
    id: "changes",
    title: "Changes to these terms",
    paragraphs: [
      "We may update these Terms as the App, our products, or the law change. The “Last updated” date at the top of this page always reflects the current version. Where a change materially affects your rights we will make that clear in the App or on this page. Continued to use the App after a change means you accept the updated Terms. If you do not accept them, stop using the App and delete it; you can also cancel any subscription and request a refund under the purchase terms above.",
    ],
  },
  {
    id: "general",
    title: "General terms",
    paragraphs: [
      "These Terms are governed by the laws of " +
        GOVERNING_LAW +
        ", without regard to conflict of law rules, and any dispute that cannot be settled informally will be subject to the exclusive jurisdiction of the courts of that place, without affecting any mandatory consumer protections available to you where you live.",
      "If a provision of these Terms is held unenforceable, it will be modified to the minimum extent necessary or severed, and the rest of these Terms will continue in force. Our failure to enforce a provision is not a waiver of it, and a waiver on one occasion is not a waiver on any other. Headings are for convenience only and do not affect interpretation. These Terms, together with our Privacy Policy, are the entire agreement between you and RovenkoDev regarding the App and replace any earlier statement of its terms.",
    ],
  },
  {
    id: "contact",
    title: "Contact us",
    paragraphs: [
      "Questions about these Terms, a safety concern, a report of a defect in a program, or a problem with your account or subscription are all welcome. If your question concerns your health or an injury, please contact your doctor or another qualified professional first - we cannot give medical advice - and then get in touch so we can improve the App.",
      "Email us at " +
        CONTACT_EMAIL +
        ". We aim to reply to support enquiries within 30 days. If your issue concerns a purchase, please include your Google Play order number so we can help faster, and raise refunds through Google Play so they can be processed correctly.",
    ],
  },
];
// Highlights the two warnings that matter most, pulled to the top of the page so
// they are read before anything else rather than buried in section 3.
const KEY_WARNINGS = [
  "The App is a fitness tool, not medical advice, and it is not a substitute for a doctor, physiotherapist or qualified trainer.",
  "Stop training if you are injured or in pain. Do not train through sharp or joint pain, and do not resume until a qualified professional has assessed you.",
  "Load only what you can control. If your form breaks down, the set is over - the App’s numbers are a suggestion, not an instruction.",
  "Rest is part of training. Do not chase streaks, targets or reminders through fatigue, and do not overtrain.",
  "You train at your own risk. To the fullest extent permitted by law we are not liable for injury or damage arising from your use of the App.",
];

// One body paragraph. Shared so the two legal pages cannot drift apart in
// typography if the theme is ever tweaked.
function PolicyParagraph({ children }) {
  return <p className="leading-relaxed text-ink-secondary">{children}</p>;
}

// Mirrors PrivacyPolicy's section renderer, with one addition: the optional
// `after` list. The health sections need a closing paragraph that follows their
// bullet list (the list states the warning, the paragraph says what to do about
// it), which a single `paragraphs` + `list` pair cannot express.
function TermsSection({ section, index }) {
  return (
    <Reveal
      as="section"
      id={section.id}
      className="scroll-mt-24"
    >
      <div className="flex items-baseline gap-3">
        <span className="font-black tabular-nums text-accent/60">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h2 className="text-2xl font-bold text-ink-primary sm:text-3xl">
          {section.title}
        </h2>
      </div>

      <div className="mt-4 flex flex-col gap-4">
        {section.paragraphs &&
          section.paragraphs.map((text) => (
            <PolicyParagraph key={text}>{text}</PolicyParagraph>
          ))}

        {section.list && (
          <ul className="flex flex-col gap-2.5">
            {section.list.map((item) => (
              <li
                key={item}
                className="flex gap-3 leading-relaxed text-ink-secondary"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        {section.after &&
          section.after.map((text) => (
            <PolicyParagraph key={text}>{text}</PolicyParagraph>
          ))}
      </div>
    </Reveal>
  );
}
function TermsOfService() {
  return (
    <div className="flex min-h-screen flex-col bg-app-bg font-inter text-ink-primary">
      {/* Header. Identical to the privacy policy's: sticky, full width, the app
          icon, and the Pro badge. It used to be a narrow centred bar with no
          sticky offset and no badge, which made this page read as a different
          site. */}
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
        {/* Title. Flat background and centred, matching the privacy policy
            hero: no gold wash behind it, and the same generous padding. */}
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
                TERMS OF SERVICE
              </h1>
              <p className="mt-4 text-sm text-ink-tertiary">
                Last updated: {LAST_UPDATED}
              </p>
              {/* mx-auto, because the block is centred and the paragraph would
                  otherwise sit hard against the left edge. */}
              <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-ink-secondary">
                Please read these Terms in full before using 30 Day Fitness.
                Sections 3 to 8 set out the health and safety conditions that
                apply to every workout, program and exercise in the App.
              </p>
            </motion.div>
          </div>
        </section>
        {/* space-y-8 keeps the two cards from reading as one merged block -
            they share a surface colour and a radius, so without a gap between
            them the shared border looks like a mistake. The gap between the
            title block and the first card is the hero's own pb-12, the same
            spacing the privacy page uses. */}
        <div className="mx-auto max-w-3xl space-y-8 px-5 pb-20 sm:px-8">
          {/* Safety summary, so the warnings are read before the legal text
              rather than buried three screens in. */}
          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="rounded-3xl border border-accent/25 bg-app-surface p-6 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)] sm:p-8"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                <AlertTriangle size={20} />
              </span>
              <h2 className="text-lg font-bold text-ink-primary sm:text-xl">
                Before you train, read this
              </h2>
            </div>
            <ul className="mt-5 flex flex-col gap-3">
              {KEY_WARNINGS.map((warning) => (
                <li
                  key={warning}
                  className="flex gap-3 text-sm leading-relaxed text-ink-secondary"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{warning}</span>
                </li>
              ))}
            </ul>
          </motion.aside>
          {/* Table of contents */}
          <motion.nav
            aria-label="Terms of service sections"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="rounded-3xl border border-white/10 bg-app-surface p-6 sm:p-8"
          >
            <h2 className="text-[11px] font-black uppercase tracking-[0.25em] text-accent">
              In these terms
            </h2>
            <ol className="mt-4 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {TERMS.map((section, index) => (
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

          {/* Cross-link to the other legal page, so neither is orphaned. */}
          <p className="mt-8 text-sm leading-relaxed text-ink-tertiary">
            How the App handles your data is set out separately in our{" "}
            <Link
              to="/privacy-policy"
              className="text-accent transition hover:text-ink-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-12 flex flex-col gap-8"
          >
            {TERMS.map((section, index) => (
              <TermsSection key={section.id} section={section} index={index} />
            ))}
          </motion.div>

          <div className="mt-16 flex flex-col gap-3 rounded-3xl border border-white/10 bg-app-surface p-6 text-sm sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <p className="flex items-center gap-2 text-ink-secondary">
              <Mail size={16} className="shrink-0 text-accent" />
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="transition hover:text-accent"
              >
                {CONTACT_EMAIL}
              </a>
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <Link
                to="/privacy-policy"
                className="transition hover:text-accent"
              >
                Privacy Policy
              </Link>
              <Link to="/" className="transition hover:text-accent">
                Back to home
              </Link>
            </div>
          </div>
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
            <Link to="/privacy-policy" className="transition hover:text-accent">
              Privacy Policy
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

export default TermsOfService;