export interface CaseStudy {
  slug: string;
  /** Business result, in the buyer's language. Leads everything. */
  result: string;
  title: string;
  /** Industry descriptor, not a client name. No client has approved being named. */
  clientType: string;
  industry: string;
  length: string;
  /** How the work was actually delivered. Stated plainly to avoid implying a contract. */
  context: string;
  metric: { value: string; label: string; provenance: string };
  problem: string;
  approach: string[];
  results: string[];
  stack: string[];
  /** Key into components/diagrams/index.tsx */
  diagram: "proposal-engine" | "inference-serving" | "contextual-rag";
  confidentiality: string;
  services: string[];
}

/**
 * Every claim here traces to work described in src/data/portfolioData.ts.
 * No client is named, no testimonial is implied, and each number carries its
 * provenance so a reader can tell a measurement from an audited benchmark.
 */
export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "enterprise-proposal-engine",
    result: "Fee proposals now go out the same day instead of taking days",
    title: "Turning project briefs into client-ready fee proposals",
    clientType: "Australian engineering consultancy",
    industry: "Engineering and construction consultancy",
    length: "Ongoing",
    context: "Delivered as lead engineer inside the organisation's own team.",
    metric: {
      value: "Days to under 1 hour",
      label: "Proposal turnaround",
      provenance: "Measured against the manual process it replaced.",
    },
    problem:
      "Senior engineers were spending days assembling fee proposals by hand: reading the brief, pricing the work against a rate card, and rebuilding the same branded Word and Excel documents each time. Quotes reached clients slowly, and no two proposals were structured quite the same way.",
    approach: [
      "A FastAPI service on Azure App Service, with the domain logic kept separate from the request handlers so document generation stays testable on its own.",
      "A multi-stage generation pipeline that holds state between stages, so context from the brief survives all the way to the final document rather than being re-prompted at each step.",
      "A rebuilt prompt-assembly layer, which raised prompt fidelity and context retention across the pipeline.",
      "Automated Word and Excel output driven by the firm's own templates, branding and rate-card rules.",
      "Per-user OAuth 2.0 against the Total Synergy v4 API, replacing a shared service account so every write is attributed to the engineer who made it.",
      "Role-based access control through Microsoft Entra ID, mapped across 24 distinct use cases before any code was written.",
      "Azure DevOps CI/CD using asynchronous zip deployment, which resolved recurring deployment timeouts and oversized build artifacts.",
    ],
    results: [
      "Proposals go out the same day, so quotes land while the enquiry is still warm.",
      "Closed a standing audit gap: every record now traces to a named engineer rather than a shared account.",
      "Every user sees only what their role permits, which was a precondition for wider internal rollout.",
      "The codebase moved from GitHub to Azure DevOps with commit history intact, and new features now ship on a structured foundation.",
    ],
    stack: [
      "Python",
      "FastAPI",
      "Azure App Service",
      "Azure DevOps",
      "Microsoft Entra ID",
      "OAuth 2.0",
      "LLM APIs",
    ],
    diagram: "proposal-engine",
    confidentiality:
      "Details generalised at the client's request. No screenshots, client name or commercial figures are published.",
    services: ["security-auth-deployment", "backend-api-development", "llm-rag-agents"],
  },
  {
    slug: "high-throughput-inference",
    result: "Production AI throughput on one GPU the team already owned",
    title: "Serving 100 concurrent requests from a single RTX 2080 Ti",
    clientType: "AI product studio",
    industry: "Software and AI products",
    length: "Part of a year-long engagement",
    context: "Delivered as an employed AI engineer, building for the studio's clients.",
    metric: {
      value: "100 concurrent",
      label: "Requests on one RTX 2080 Ti",
      provenance: "Measured under in-house concurrent load testing.",
    },
    problem:
      "An LLM feature needed to serve real concurrent traffic, but the available hardware was a single consumer-grade GPU. The obvious answer was to buy more GPUs. The question was whether the existing card could carry production load without running out of memory or queueing requests into unusable latency.",
    approach: [
      "Integrated vLLM with continuous batching, so arriving requests join an in-flight batch instead of waiting for the previous one to finish.",
      "Tuned KV-cache memory allocation and chunked prefill to stop the memory spikes that were crashing the process under burst traffic.",
      "Built an asynchronous scheduler that buffers and batches incoming traffic, keeping the GPU busy rather than idle between calls.",
      "Instrumented latency and throughput across concurrent load tests, so every tuning decision was made against a measurement.",
    ],
    results: [
      "Ran production AI on a single existing GPU, with no new hardware spend.",
      "Held token generation rates steady under sustained concurrency by minimising GPU idle time.",
      "Gave the team a load profile they can re-run, so capacity questions have an answer rather than an estimate.",
    ],
    stack: ["Python", "vLLM", "PagedAttention", "PyTorch", "FastAPI", "Docker"],
    diagram: "inference-serving",
    confidentiality:
      "Client and product details withheld. Figures come from in-house load testing, not a published benchmark.",
    services: ["performance-and-cost", "llm-rag-agents"],
  },
  {
    slug: "contextual-rag-framework",
    result: "Faster, better-grounded answers at lower token cost",
    title: "Routing each query to the retrieval method that suits it",
    clientType: "AI product studio",
    industry: "Software and AI products",
    length: "Part of a year-long engagement",
    context: "Delivered as an employed AI engineer, building for the studio's clients.",
    metric: {
      value: "+60%",
      label: "Retrieval efficiency",
      provenance: "Measured on an in-house test set against a single-path RAG baseline.",
    },
    problem:
      "Different questions need different retrieval strategies. A single approach adds latency to simple keyword lookups and returns poor recall on conceptual questions. The result is a system that feels slow and vague at the same time, and nobody can say which of the two problems they are looking at.",
    approach: [
      "A query classifier that inspects intent and keyword density up front and routes each request down the appropriate path.",
      "A hybrid retrieval layer combining FAISS dense vector search with BM25 sparse search, so exact terms and conceptual matches are both covered.",
      "Cross-encoder re-ranking over candidate chunks before the prompt is built, so the model reads the best few rather than the nearest many.",
      "Context compaction and deduplication, which keeps prompts from bloating with repeated passages.",
    ],
    results: [
      "Retrieved 60% more efficiently than the single-path baseline on the same test set.",
      "Cut token spend per answer by sending the model less context that adds nothing.",
      "Traded latency against answer quality per query type, instead of applying one compromise to everything.",
    ],
    stack: ["Python", "FAISS", "BM25", "Cross-encoder re-ranking", "LangChain", "LangGraph"],
    diagram: "contextual-rag",
    confidentiality:
      "Client and corpus details withheld. The 60% figure is my own measurement on an internal evaluation set, not an audited benchmark.",
    services: ["llm-rag-agents", "performance-and-cost"],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((study) => study.slug === slug);
}
