/**
 * The plainest possible answer to "how do I actually start working with you",
 * shown at the top of /process before any of the detail below. No jargon —
 * this is for whoever signs off on the engagement, not the engineer reading it.
 */
export const HOW_TO_ENGAGE = [
  {
    step: "01",
    title: "Book a free call",
    detail: "Thirty minutes. Tell me the problem — no charge, no obligation.",
  },
  {
    step: "02",
    title: "Get a written plan and a fixed quote",
    detail: "You see the price and the scope before anything starts. No surprises later.",
  },
  {
    step: "03",
    title: "Watch it get built, week by week",
    detail: "A working demo every week, so you always know exactly where things stand.",
  },
  {
    step: "04",
    title: "Take the handover",
    detail: "Documentation, a walkthrough, and 30 days of support after you go live.",
  },
] as const;

/** Four phases for the home page. The full eight-step version lives below. */
export const PHASES = [
  {
    step: "01",
    name: "Assess",
    duration: "Week 1",
    summary: "Read the system, run it, and find out what actually blocks you.",
    youGet: "A written findings document, ranked by risk and effort.",
  },
  {
    step: "02",
    name: "Design",
    duration: "Week 1–2",
    summary: "Agree the target architecture, the contracts, and the order of work.",
    youGet: "An architecture document and a sequenced plan with durations.",
  },
  {
    step: "03",
    name: "Build",
    duration: "Weeks 2–8",
    summary: "Ship in reviewable increments, with a working demo every week.",
    youGet: "A running system in your own cloud account, plus tests in CI.",
  },
  {
    step: "04",
    name: "Hand over",
    duration: "Final week",
    summary: "Documentation, a walkthrough, and 30 days of support afterwards.",
    youGet: "Setup docs, a recorded walkthrough, and a named support window.",
  },
] as const;

/** The full pipeline, for buyers who want the detail. */
export const PIPELINE = [
  { step: "01", name: "Prototype", detail: "Read the existing code and test the domain assumptions behind it." },
  { step: "02", name: "Audit", detail: "Locate memory leaks, unvalidated inputs and gaps in authentication." },
  { step: "03", name: "Refactor", detail: "Separate tangled business logic into modules that can be tested alone." },
  { step: "04", name: "Architect", detail: "Define explicit API schemas and persistent data boundaries." },
  { step: "05", name: "Test", detail: "Build automated suites across the edge and failure cases, not just the happy path." },
  { step: "06", name: "Secure", detail: "Configure per-user OAuth 2.0 tokens and role-based access control." },
  { step: "07", name: "Deploy", detail: "Set up repeatable CI/CD pipelines on your cloud infrastructure." },
  { step: "08", name: "Scale", detail: "Tune cache memory, request batching and query latency against measurements." },
] as const;

export const ENGAGEMENT_MODELS = [
  {
    id: "audit",
    name: "Production readiness audit",
    forWho: "You need to know what is wrong before committing a budget.",
    shape: "Fixed scope, 1–2 weeks",
    includes: [
      "Architecture, security and performance review",
      "Prioritised findings document",
      "60-minute walkthrough call",
    ],
    entry: true,
  },
  {
    id: "project",
    name: "Project build",
    forWho: "You know what needs building and want a fixed scope and price.",
    shape: "Fixed scope, most run 4–10 weeks",
    includes: [
      "Agreed deliverables and milestones",
      "Weekly demo and written progress note",
      "Handover documentation and 30-day support",
    ],
    entry: false,
  },
  {
    id: "retainer",
    name: "Monthly retainer",
    forWho: "You need ongoing engineering capacity alongside your own team.",
    shape: "Rolling monthly, 2 or 4 days a week",
    includes: [
      "Reserved days each week, agreed in advance",
      "Backlog worked in your priority order",
      "30 days notice either way, no lock-in",
    ],
    entry: false,
  },
] as const;

export const WEEK_SHAPE = [
  {
    name: "Monday",
    detail: "Written plan for the week: what ships, what is at risk, what I need from you.",
  },
  {
    name: "Every day",
    detail: "Short written update in your Slack or Teams channel. No status meetings.",
  },
  {
    name: "Midweek",
    detail: "A live call if a decision needs one. Otherwise the channel is enough.",
  },
  {
    name: "Friday",
    detail: "A working demo of what changed, plus the week in review against the plan.",
  },
] as const;

export const CONTRACTING = [
  {
    question: "Who owns the code",
    answer:
      "You do. All intellectual property in the work transfers to you on final payment. I keep no ownership stake and no licence back.",
  },
  {
    question: "Confidentiality",
    answer:
      "I sign your NDA on request, before any access is granted. Nothing about your project appears publicly without your written approval, which is why the case studies on this site name industries rather than companies.",
  },
  {
    question: "Invoicing",
    answer:
      "Invoiced in USD or AUD by bank transfer, or through Wise or Payoneer if that is easier. Fixed-scope work is billed 40% on start and 60% on delivery. Retainers are billed monthly in advance.",
  },
  {
    question: "If the project overruns",
    answer:
      "On fixed-scope work, an overrun caused by my estimate is my cost, not yours. If the scope itself changes, I re-quote the difference in writing before doing the work, and you decide whether to proceed.",
  },
  {
    question: "Exit terms",
    answer:
      "If an audit turns up nothing you can act on, you do not pay for it. Retainers end on 30 days notice from either side. Every build includes 30 days of support after handover for defects in what I delivered.",
  },
] as const;

export const ONBOARDING = [
  "Read-only repository access, or a copy of the codebase under NDA",
  "A named decision maker who can approve scope changes",
  "A staging environment, or the credentials to create one in your account",
  "One walkthrough call with whoever built the current system",
  "Your definition of success, written down, before the first commit",
] as const;
