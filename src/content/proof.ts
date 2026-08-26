import { site } from "@/lib/site";

/**
 * Four hard numbers, business-framed, each with its technical detail behind it.
 * No longer rendered as a standalone grid on the home page — project highlights
 * and testimonials lead instead — but kept here as the source for these figures
 * wherever they're quoted (case study pages, the capability PDF).
 */
export const PROOF_NUMBERS = [
  {
    value: "Days to 1 hr",
    label: "Proposal turnaround",
    detail: "Multi-stage LLM pipeline with rate-card pricing and branded document output",
  },
  {
    value: "100",
    label: "Concurrent requests on one existing GPU",
    detail: "vLLM continuous batching and KV-cache tuning on a single RTX 2080 Ti",
  },
  {
    value: "24",
    label: "Permission cases mapped before launch",
    detail: "Microsoft Entra ID role-based access control, audit-ready from day one",
  },
  {
    value: "+60%",
    label: "Retrieval efficiency over single-path RAG",
    detail: "Hybrid dense and sparse search with cross-encoder re-ranking",
  },
] as const;

/**
 * Industry descriptors, used because no client has approved being named.
 * Honest, and still credible. Replace with logos only when you have written consent.
 */
export const CLIENT_DESCRIPTORS = [
  "Australian engineering consultancy",
  "AI product studio",
  "Healthcare document digitisation",
  "Agricultural technology platform",
  "Podcast and media production",
  "Banking decision support",
] as const;

/** Verifiable public profiles. These are the third-party signals that exist today. */
export const PLATFORM_PROOF = [
  { label: "Open models on Hugging Face", href: site.socials.huggingface },
  { label: "Code on GitHub", href: site.socials.github },
  { label: "Writing on Medium", href: site.socials.medium },
  { label: "Career history on LinkedIn", href: site.socials.linkedin },
] as const;

export interface Testimonial {
  quote: string;
  name: string;
  /** Country, as the client gave it. Location does trust work a job title cannot. */
  location: string;
  /** The client's organisation, or the marketplace the engagement came through. */
  company: string;
  /**
   * How to read `company`. "platform" makes the card say "via Fiverr" rather
   * than implying Fiverr was the client, and marks the review as one a visitor
   * can go and read for themselves.
   */
  source: "company" | "platform";
  /** 1–5. Omit until the client has actually given a rating. */
  rating?: number;
  photo?: string;
}

/**
 * Real reviews, in the clients' own words. Only two edits were made, both
 * mechanical: an obvious typo ("witn" → "with"), and a full stop mid-sentence
 * turned into a comma. Nothing was reworded, trimmed or improved.
 *
 * TODO(fiverr-link): add the public Fiverr profile URL to site.socials so the
 * three marketplace reviews below link to the page they came from. A review a
 * visitor can verify is worth several they cannot.
 *
 * Worth keeping straight: Cerecon is the organisation I work in, not an
 * independent client of this practice (see /about). Amrita's review is genuine
 * but internal, and the site no longer says so anywhere — the disclosure line
 * was removed by request. /about still states the employment relationship.
 *
 * TestimonialCard renders any entry with an empty `quote` in a visibly
 * "awaiting confirmation" state, so a name can be added here before the words
 * are confirmed without inventing what that person said.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "I am very happy with the service. Muhammad exceeded our expectations. He delivered the milestones on time and was always understanding, even with changes to the iterations and scope.",
    name: "Amrita Kaur",
    location: "Malaysia",
    company: "Cerecon",
    source: "company",
    rating: 5,
  },
  {
    quote:
      "Ali Ahson was incredible to work with! His attention to detail and professionalism were outstanding, and exceeded all my expectations. Plus, his quick responsiveness and language fluency made the whole process smooth and enjoyable!",
    name: "Darnthic",
    location: "United Kingdom",
    company: "Fiverr",
    source: "platform",
    rating: 5,
  },
  {
    quote:
      "Went above my expectations, very polite and very experienced in his line of work, and was quick with replies and went above and beyond in assisting after finishing the deadline.",
    name: "Omarkaff",
    location: "United Kingdom",
    company: "Fiverr",
    source: "platform",
    rating: 5,
  },
  {
    quote: "Can't wait to work together again.",
    name: "Rahhem",
    location: "United States",
    company: "Fiverr",
    source: "platform",
    rating: 5,
  },
];

/**
 * Derived, never hand-maintained: the headline "5.0 from 4 reviews" line has to
 * stay true the moment a review is added or a rating changes. `average` is null
 * until at least one entry carries a rating.
 */
export const TESTIMONIAL_SUMMARY = (() => {
  const rated = TESTIMONIALS.filter((t) => typeof t.rating === "number");
  const count = TESTIMONIALS.filter((t) => t.quote.trim().length > 0).length;
  if (rated.length === 0) return { count, rated: 0, average: null as string | null };
  const mean = rated.reduce((sum, t) => sum + (t.rating as number), 0) / rated.length;
  return { count, rated: rated.length, average: mean.toFixed(1) };
})();

export const INDUSTRIES = [
  {
    name: "Engineering and construction consultancy",
    detail: "Proposal generation, rate-card pricing, document automation, identity and audit trails.",
  },
  {
    name: "Healthcare",
    detail: "Document and receipt extraction pipelines, clinical reasoning model evaluation.",
  },
  {
    name: "Financial services",
    detail: "Price prediction models and analytics for banking decision support.",
  },
  {
    name: "Agriculture",
    detail: "Speech recognition and information extraction in regional languages.",
  },
  {
    name: "Media and podcasting",
    detail: "LLM-driven editing workflows that cut manual editing effort by 60%.",
  },
  {
    name: "Document-heavy operations",
    detail: "Identity documents, invoices and forms turned into structured, validated data.",
  },
] as const;

/** 12 items, not 45. The full stack list lives on /about. */
export const TECH_STRIP = [
  "Python",
  "FastAPI",
  "PostgreSQL",
  "Docker",
  "Azure",
  "Azure DevOps",
  "Microsoft Entra ID",
  "LangChain",
  "LangGraph",
  "vLLM",
  "PyTorch",
  "Hugging Face",
] as const;

/**
 * Open-source work, framed as capability rather than as a portfolio piece.
 * Lives on /insights, not the home page.
 */
export const EXPERIMENTS = [
  {
    title: "Document data extraction at 97.5% precision",
    hook: "The same detection-and-OCR pipeline behind invoice, form and ID processing.",
    detail:
      "A YOLOv8 detector trained to localise fields on national identity documents, with OCR and cross-field validation. 97.5% precision and recall on my own held-out test set.",
    tech: ["YOLOv8", "OCR", "OpenCV"],
    href: "https://huggingface.co/spaces/maliahson/CNIC_Detector",
    linkLabel: "Try the live demo",
  },
  {
    title: "Real-time object detection in uncontrolled conditions",
    hook: "Detection that holds up across varied lighting and camera angles, not just clean test images.",
    detail:
      "A number-plate localisation model with preprocessing tuned for alphanumeric clarity, deployed as an interactive demo running live video and image inference.",
    tech: ["YOLOv8", "OpenCV", "Python"],
    href: "https://huggingface.co/spaces/maliahson/YOLO_Lisencse_Plate_Detector",
    linkLabel: "Try the live demo",
  },
  {
    title: "Voice notes into structured records",
    hook: "Turning unstructured speech in a low-resource language into fields a system can query.",
    detail:
      "Whisper fine-tuned for Urdu on 18,000 text samples and two hours of audio, then translation and named entity recognition to pull crop and disease information out of farmer voice notes, served through an API.",
    tech: ["Whisper", "NER", "FastAPI"],
    href: undefined,
    linkLabel: undefined,
  },
  {
    title: "Domain fine-tuning on constrained hardware",
    hook: "Adapting an open model to a specialist domain without renting a GPU cluster.",
    detail:
      "DeepSeek R1 Distill LLaMA 8B fine-tuned on curated clinical reasoning data using 4-bit QLoRA, with reasoning-step consistency evaluated across diagnostic benchmarks. Weights published openly. Experimental, not a medical device.",
    tech: ["QLoRA", "Unsloth", "PyTorch"],
    href: "https://huggingface.co/maliahson/deepseek-finetune-medical",
    linkLabel: "View the model",
  },
] as const;
