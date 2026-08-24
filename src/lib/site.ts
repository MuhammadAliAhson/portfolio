/**
 * Single source of truth for identity, contact and commercial config.
 * Everything here is deliberately editable in one place — see the TODOs.
 */

export const site = {
  name: "Muhammad Ali Ahson",
  practice: "AI Systems Engineering",
  /** Public-facing label. Role-neutral by design: capability sells harder than a title. */
  title: "AI Systems & Backend Engineer",

  // TODO(domain): swap to the custom domain once purchased.
  // Canonical URLs, sitemap, OG images and JSON-LD all derive from this one value.
  url: "https://portfolio-ahson.vercel.app",

  // TODO(email): replace with hello@<yourdomain> once the domain is live.
  email: "aliahson56@gmail.com",

  // Phone deliberately omitted: publish a business number or publish nothing.
  location: "Islamabad, Pakistan",
  timezone: "PKT (UTC+5)",

  // TODO(availability): confirm this line, and check your employment contract
  // before advertising availability publicly.
  availability: "Currently accepting one new engagement",

  // TODO(booking): add your Cal.com or Calendly link, e.g. "https://cal.com/aliahson/30min".
  // While null, every "Book a call" control routes to /contact instead of a scheduler.
  bookingUrl: null as string | null,

  socials: {
    linkedin: "https://www.linkedin.com/in/muhammadaliahson/",
    github: "https://github.com/MuhammadAliAhson",
    huggingface: "https://huggingface.co/maliahson",
    medium: "https://aliahson.medium.com/",
  },

  mediumFeed: "https://aliahson.medium.com/feed",
} as const;

/** Real, calculated overlap windows. PKT is UTC+5; shifts noted where DST applies. */
export const OVERLAP = [
  {
    region: "Australia (AEST)",
    theirHours: "1:00pm – 5:00pm",
    myHours: "8:00am – 12:00pm PKT",
    note: "Shifts an hour earlier during AEDT.",
  },
  {
    region: "UK (GMT)",
    theirHours: "9:00am – 1:00pm",
    myHours: "2:00pm – 6:00pm PKT",
    note: "Shifts an hour earlier during BST.",
  },
  {
    region: "US East (EDT)",
    theirHours: "8:00am – 11:00am",
    myHours: "5:00pm – 8:00pm PKT",
    note: "Early-morning overlap only.",
  },
] as const;

/**
 * TODO(pricing): fill these in to switch the site from scope-based to price-based
 * expectations. Set `amount` on any band and it renders automatically; left null,
 * the site publishes scope and duration ranges instead — which is still a
 * qualifying signal, just a softer one.
 */
export const PRICE_BANDS: {
  id: string;
  label: string;
  amount: string | null;
  scope: string;
}[] = [
  { id: "audit", label: "Production readiness audit", amount: null, scope: "Fixed scope, 1–2 weeks" },
  { id: "project", label: "Project build", amount: null, scope: "Fixed scope, most run 4–10 weeks" },
  { id: "retainer", label: "Monthly retainer", amount: null, scope: "Rolling, 2 or 4 days a week" },
];

export const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
  { href: "/insights", label: "Insights" },
] as const;
