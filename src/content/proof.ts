import { site } from "@/lib/site";

/** Four hard numbers, business-framed, each with its technical detail behind it. */
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

/**
 * TODO(testimonials): the single highest-leverage addition to this site.
 * Add entries here and the testimonial block renders itself. Until then it stays
 * hidden rather than showing a placeholder, because a fake quote costs more trust
 * than an absent one.
 */
export const TESTIMONIALS: {
  quote: string;
  name: string;
  role: string;
  company: string;
  photo?: string;
}[] = [];

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
